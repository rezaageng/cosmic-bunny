<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Report</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 8px;
            text-align: left;
        }
    </style>
</head>
<body>
    <h2>Laporan Order</h2>
    <table>
        <thead>
            <tr>
                <th>ID Order</th>
                <th>Nama Pengguna</th>
                <th>Email Pengguna</th>
                <th>Status</th>
                <th>Games</th>
                <th>Total Harga</th>
            </tr>
        </thead>
        <tbody>
            @foreach($orders as $order) <!-- Pastikan menggunakan $orders -->
                <tr>
                    <td>{{ $order['id'] }}</td>
                    <td>{{ $order['user']['name'] }}</td>
                    <td>{{ $order['user']['email'] }}</td>
                    <td>{{ $order['status'] }}</td>
                    <td>
                        @foreach($order['games'] as $game)
                            <div>{{ $game['name'] }} - Rp {{ number_format($game['price'], 0, ',', '.') }}</div>
                        @endforeach
                    </td>
                    <td>Rp {{ number_format($order['amount'], 0, ',', '.') }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
