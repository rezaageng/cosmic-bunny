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
                    "image" => $game['tiny_image'], // Access the value using array notation
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

    public function show(int $gId)
    {
        Log::debug($gId);

        $url = "https://store.steampowered.com/api/appdetails?appids={$gId}&l=english&cc=ID";

        $response = Http::get($url);


        if ($response->successful()) {
            $responseJson = $response->json()[$gId];
            $status = $responseJson['success'];

            if ($status) {
                $game = $responseJson['data'];

                $data = [
                    "id" => $game['steam_appid'],
                    "name" => $game['name'],
                    "header_img" => $game['header_image'],
                    "short_description" => $game['short_description'],
                    "description" => $game['about_the_game'],
                    "publisher" => $game['publishers'],
                    "price" => $game['price_overview']['final'] ?? 0,
                    "screenshot" => $game['screenshots'][0]['path_full']
                ];

                return response()->json([
                    "message" => "Success",
                    "data" => $data
                ]);
            } else {
                return response()->json([
                    "message" => "Game not found",
                ]);
            }
        } else {
            return response()->json([
                "message" => "Failed to fetch data from Steam API",
            ]);
        }
    }
}
