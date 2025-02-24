<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'order_uuid' => $this->order_uuid,
            'product_uuid' => $this->product_uuid,
            'quantity' => $this->quantity,
            'price' => (float) $this->price,
        ];
    }
}
