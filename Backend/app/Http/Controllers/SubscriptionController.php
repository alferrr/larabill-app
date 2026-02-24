<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SubscriptionController extends Controller
{
    // List all subscriptions of logged-in user
    public function index(Request $request)
{
    if (!$request->user()) {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    return $request->user()
        ->subscriptions()
        ->orderBy('due_date')
        ->get();
}

    // Add a new subscription
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'cost' => 'required|numeric',
            'cycle' => 'required|in:Monthly,Yearly,Weekly',
            'due_date' => 'required|date',
            'category' => 'required|string|max:30'
        ]);

        $sub = $request->user()
            ->subscriptions()
            ->create($validated);

        return response()->json($sub, 201);
    }

        public function togglePaid(Request $request, Subscription $subscription)
        {
            //  Security check: make sure it belongs to the user
            if ($subscription->user_id !== $request->user()->id) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            $subscription->paid = !$subscription->paid;
            $subscription->save();

            return response()->json($subscription);
        }
    
    public function destroy(Request $request, Subscription $subscription)
    {
        // Make sure the sub belongs to the logged-in user
        if ($subscription->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $subscription->delete();

        return response()->json(['message' => 'Subscription deleted']);
    }

    public function topCategories(Request $request)
    {
        return $request->user()
            ->subscriptions()
            ->select(
                'category',
                DB::raw('SUM(cost) as total')
            )
            ->groupBy('category')
            ->orderByDesc('total')
            ->get();
    }   

}