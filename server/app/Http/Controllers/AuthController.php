<?php

namespace App\Http\Controllers;

use App\Enum\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request){
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'role' => ['required', 'string', Rule::in(array_column(Role::cases(), 'value'))],
            'password' => 'required|string',
            'password_confirmation' => 'required|string|same:password',

        ]);

        $data['user'] = User::create([
            'name' => $request ->name,
            'email' => $request ->email,
            'password' => $request ->password,
            'role' => $request->role,
        ]);

        $data['token'] = $data['user']->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User Reistered Success',
            'data' => $data
        ]);
    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        if(!Auth::attempt($request->only('email', 'password'))){
            throw new \Exception('invalid login details');
        }

        $data ['user'] = $request ->user();

        $data['token'] = $data['user']->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User logged in successfully',
            'data' => $data
        ]);
        
    }

    public function user(Request $request){
        return response()->json ([
            'message' => 'User Details',
            'data' => $request->user()
        ]);
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'UserLogged out seuccesfully'
        ]);
    }

}