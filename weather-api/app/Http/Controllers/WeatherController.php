<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    /**
     * Weather code to description & icon mapping (WMO codes).
     */
    private function mapWeatherCode(int $code): array
    {
        return match (true) {
            $code === 0          => ['description' => 'Clear sky',           'icon' => '01d'],
            $code <= 3           => ['description' => 'Partly cloudy',       'icon' => '02d'],
            $code <= 48          => ['description' => 'Foggy',               'icon' => '50d'],
            $code <= 55          => ['description' => 'Drizzle',             'icon' => '09d'],
            $code <= 57          => ['description' => 'Freezing drizzle',    'icon' => '09d'],
            $code <= 65          => ['description' => 'Rain',                'icon' => '10d'],
            $code <= 67          => ['description' => 'Freezing rain',       'icon' => '13d'],
            $code <= 77          => ['description' => 'Snow',                'icon' => '13d'],
            $code <= 82          => ['description' => 'Rain showers',        'icon' => '09d'],
            $code <= 86          => ['description' => 'Snow showers',        'icon' => '13d'],
            $code === 95         => ['description' => 'Thunderstorm',        'icon' => '11d'],
            $code <= 99          => ['description' => 'Thunderstorm with hail', 'icon' => '11d'],
            default              => ['description' => 'Unknown',             'icon' => '01d'],
        };
    }

    public function getWeather(Request $request)
    {
        $city = $request->query('city');
        $units = $request->query('units', 'metric'); // 'metric' or 'imperial'

        if (!$city) {
            return response()->json(['error' => 'City is required'], 400);
        }

        // Step 1: Geocode the city name using Open-Meteo Geocoding API
        $geoResponse = Http::get('https://geocoding-api.open-meteo.com/v1/search', [
            'name' => $city,
            'count' => 1,
            'language' => 'en',
            'format' => 'json',
        ]);

        if ($geoResponse->failed() || empty($geoResponse->json('results'))) {
            return response()->json(['error' => 'City not found'], 404);
        }

        $location = $geoResponse->json('results.0');
        $lat = $location['latitude'];
        $lon = $location['longitude'];
        $cityName = $location['name'];
        $country = $location['country_code'] ?? '';

        // Step 2: Get weather data from Open-Meteo
        $tempUnit = $units === 'imperial' ? 'fahrenheit' : 'celsius';
        $windUnit = $units === 'imperial' ? 'mph' : 'kmh';

        $weatherResponse = Http::get('https://api.open-meteo.com/v1/forecast', [
            'latitude' => $lat,
            'longitude' => $lon,
            'current' => 'temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m',
            'daily' => 'temperature_2m_max,weather_code',
            'temperature_unit' => $tempUnit,
            'wind_speed_unit' => $windUnit,
            'forecast_days' => 5,
            'timezone' => 'auto',
        ]);

        if ($weatherResponse->failed()) {
            return response()->json(['error' => 'Weather API request failed'], 500);
        }

        $data = $weatherResponse->json();
        $current = $data['current'];
        $daily = $data['daily'];
        $currentWeather = $this->mapWeatherCode($current['weather_code']);

        // Build forecast array (skip today, take next 3 days)
        $forecast = [];
        for ($i = 1; $i <= min(3, count($daily['time']) - 1); $i++) {
            $dayWeather = $this->mapWeatherCode($daily['weather_code'][$i]);
            $forecast[] = [
                'date' => date('D', strtotime($daily['time'][$i])),
                'temp' => round($daily['temperature_2m_max'][$i]),
                'icon' => $dayWeather['icon'],
            ];
        }

        return response()->json([
            'city' => $cityName,
            'country' => $country,
            'temp' => round($current['temperature_2m']),
            'description' => $currentWeather['description'],
            'icon' => $currentWeather['icon'],
            'wind' => round($current['wind_speed_10m']),
            'humidity' => $current['relative_humidity_2m'],
            'forecast' => $forecast,
        ]);
    }
}
