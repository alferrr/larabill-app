<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use Illuminate\Http\Request;

class BudgetController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        if (!$user) return response()->json(['message' => 'Unauthorized'], 401);

        $budgets = Budget::where('user_id', $user->id)->get();

        return response()->json($budgets);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'amount' => 'required|numeric',
            'category' => 'nullable|string|max:30',
        ]);

        // one budget per user per category
        $budget = Budget::updateOrCreate(
            [
                'user_id' => $user->id,
                'category' => $validated['category'] ?? 'General'
            ],
            ['amount' => $validated['amount']]
        );

        return response()->json($budget, 201);
    }

    public function destroyAll(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        Budget::where('user_id', $user->id)->delete();

        return response()->json([
            'message' => 'All budgets reset'
        ]);
    }
}
