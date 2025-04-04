<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\ChatMessage;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        return Inertia::render('Chat', [
            'messages' => ChatMessage::with('user')->latest()->get(),
        ]);
    }


    public function show(User $friend)
    {
        return ChatMessage::query()
            ->where(function ($query) use ($friend) {
                $query->where('sender_id', auth()->id())
                    ->where('receiver_id', $friend->id);
            })->orWhere(function ($query) use ($friend) {
                $query->where('sender_id', $friend->id)
                    ->where('receiver_id', auth()->id());
            })
            ->with('sender', 'receiver')
            ->orderBy('id', 'asc')
            ->get();
    }

    public function store(Request $request, User $friend)
    {
        $message = ChatMessage::create([
            'sender_id' => auth()->id(),
            'receiver_id' => $friend->id,
            'text' => request()->input('message')
        ]);

        broadcast(new MessageSent($message));

        return  $message;
    }
}
