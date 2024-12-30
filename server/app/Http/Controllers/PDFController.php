<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class PDFController extends Controller
{
    public function index(Request $request)
    {
        // Ambil data order dengan relasi games dan user
        $orders = Order::with(['games', 'user'])->get();

        $data = $orders->map(function ($order) {
            $totalAmount = $order->games->sum('price');
            return [
                'id' => $order->id,
                'status' => $order->status,
                'amount' => $totalAmount,
                'user' => [
                    'id' => $order->user->id,
                    'name' => $order->user->name,
                    'email' => $order->user->email,
                ],
                'games' => $order->games->map(function ($game) {
                    return [
                        'id' => $game->id,
                        'name' => $game->name,
                        'image' => $game->image,
                        'price' => $game->price,
                    ];
                }),
            ];
        });

        // Buat PDF
        $pdf = Pdf::loadView('orders.OrdersReport', ['orders' => $data]);

        // save PDF
        $pdfPath = storage_path('app/public/exported_table.pdf');
        $pdf->save($pdfPath);

        // Generate URL
        $url = asset('storage/order_report.pdf');

        // return url pke json
        return response()->json([
            'message' => 'PDF Created',
            'download_url' => $url,
        ]);
    }
}
