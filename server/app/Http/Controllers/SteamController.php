<?php

namespace App\Http\Controllers;

use App\Models\Games;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class SteamController extends Controller
{
    public function index(Request $request)
    {
        //input 'term',
        $term = $request->input('search', '');

        if (!$term) {
            return response()->json(
                [
                    "message" => "Provide search parameter",
                    "data" => []
                ]
            );
        }

        // URL API Steam dengan parameter input 
        $url = "https://store.steampowered.com/api/storesearch/?term={$term}&l=english&cc=ID";

        //request ke API Steam
        $response = Http::get($url);

        if ($response->successful()) {
            $data = collect($response["items"])->map(function ($game) {
                return [
                    "id" => $game['id'],          // Access the value using array notation
                    "name" => $game['name'],      // Access the value using array notation
                    "image" => $game['tiny_image'],// Access the value using array notation
                ];
            });

            return response()->json([
                "message" => "Success",
                "data" => $data
            ]);
        } else {
            return response()->json(['message' => 'Failed to fetch data from Steam API'], 500);
        }
    }

    public function show(Request $request)
    {
       //input 
        $gId = $request->input('id');

        if (!$gId) {
            return response()->json([
                "message" => "Provide game ID parameter",
                "data" => null
            ]);
        }

        $url = "https://store.steampowered.com/api/appdetails?appids={$gId}&l=english&cc=ID";

        $response = Http::get($url);

        if ($response->successful()) {
            $game = $response->json()[$gId]['data'] ?? null;

            if ($game) {
                
                $data = [
                    "id" => $game['steam_appid'] ?? null,
                    "name" => $game['name'] ?? null,
                    "header" => $game['header_image'] ?? null,
                    "about_game" => $game['short_description'] ?? null,
                    "description" => $game['about_the_game'] ?? null,
                    "price" => $game['price_overview']['final'] ?? null,
                    "screenshot" => $game['screenshots'][0]['path_full'] ?? null
                ];

                return response()->json([
                    "message" => "Success",
                    "data" => $data
                ]);
            } else {
                return response()->json([
                    "message" => "Game not found",
                    "data" => null
                ]);
            }
        } else {
            return response()->json([
                "message" => "Failed to fetch data from Steam API",
                "data" => null
            ]);
        }
    }
}