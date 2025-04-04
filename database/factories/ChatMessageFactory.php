<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ChatMessage>
 */
class ChatMessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $userIds = User::pluck('id')->toArray();

        $senderId = $this->faker->randomElement($userIds);
        $receiverId = array_filter($userIds, function ($id) use ($senderId) {
            return $id !== $senderId;
        });
        $receiverId = $this->faker->randomElement($receiverId);

        return [
            'text' => $this->faker->sentence(),
            'sender_id' => $senderId,
            'receiver_id' => $receiverId,
        ];
    }
}
