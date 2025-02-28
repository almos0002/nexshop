<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Product;

class OrderProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Get the associated product to include its details
        $product = Product::where('uuid', $this->product_uuid)->first();
        
        return [
            'order_uuid' => $this->order_uuid,
            'product_uuid' => $this->product_uuid,
            'quantity' => $this->quantity,
            'price' => (float) $this->price,
            'product_name' => $product ? $product->name : 'Unknown Product',
            'product_image' => $product ? $product->image : null,
        ];
    }
}
