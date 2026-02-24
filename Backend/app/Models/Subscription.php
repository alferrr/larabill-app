<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'name', 'cost', 'category' ,'cycle', 'due_date', 'paid'
    ];

    // Link subscription to user
    public function user()
    {
        return $this->belongsTo(User::class);
    }


}
