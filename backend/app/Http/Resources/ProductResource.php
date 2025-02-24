<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'uuid' => (int) $this->uuid,
            'name' => (string) $this->name,
            'description' => (string) $this->description,
            'price' => (double) $this->price,
            'stock' => (int) $this->stock,
            'image' => (string) $this->image,
        ];
    }
}
