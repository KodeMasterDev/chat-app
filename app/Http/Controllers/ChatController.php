<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function index()
    {
        return inertia('ticket', [
            'friends' => \App\Models\User::where('id', '!=', auth()->id())->get(),
        ]);
    }
}
