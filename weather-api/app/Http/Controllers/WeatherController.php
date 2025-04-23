<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    public function getWeather(Request $request)
    {
        $city = $request->query('city');
        $units = $request->query('units', 'metric'); // 'metric' or 'imperial'

        if (!$city) {
            return response()->json(['error' => 'City is required'], 400);
        }

        $apiKey = env('OPENWEATHERMAP_API_KEY');

        $weatherResponse = Http::get('https://api.openweathermap.org/data/2.5/forecast', [
            'q' => $city,
            'units' => $units,
            'appid' => $apiKey,
        ]);

        if ($weatherResponse->failed()) {
            return response()->json(['error' => 'Weather API request failed'], 500);
        }

        return response()->json($weatherResponse->json());
    }
}
