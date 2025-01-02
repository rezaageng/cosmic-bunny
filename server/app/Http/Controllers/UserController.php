<?php

namespace App\Http\Controllers;

use App\Enum\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{


    public function index(Request $request)
    {
        $user = User::query();

        if ($request->has('search')) {
            $user->where('name', 'ilike', "%" . $request->search . "%");
        }
        $user = $user->get();

        return response()->json([
            'messages' => 'list of User',
            'data' => $user
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique::users',
            'image' => 'string',
            'role' => [
                'required',
                'string',
                Rule::in(array_column(
                    Role::cases(),
                    'value'
                ))
            ],
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/[A-Z]/',
                'regex:/[@$!%*?&#]'
            ],
        ]);

        $user = User::create($request->all());

        return response()->json([
            'message' => 'User created succesfully',
            'data' => $user,
        ]);
    }

    public function show(User $user)
    {
        return response()->json([
            'messages' => 'User details',
            'data' => $user
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users,email,' . $user->id, // Corrected
            'image' => 'required|string',
            'role' => [
                'required',
                'string',
                Rule::in(array_column(Role::cases(), 'value'))
            ],
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/[A-Z]/',
                'regex:/[@$!%*?&#]/'
            ],
        ]);

        $user->update($request->all());

        return response()->json([
            'message' => 'User Update Succes',
            'data' => $user,
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([
            'message' => 'User delete succes',
        ]);
    }
}
