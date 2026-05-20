<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Address;

class AddressController extends Controller
{

    public function index()
    {
        //
    }
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(string $id)
    {
        //
    }

    public function edit()
    {
        $userId = \Auth::id();

        $address = Address::firstOrNew(
            ['user_id' => $userId],  // condição de busca
        );

        return Inertia::render('settings/address', [
            'address' => $address,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'CEP'           => 'required|string|max:9',
            'state'         => 'required|string|max:2',
            'city'          => 'required|string',
            'neighbourhood' => 'required|string',
            'street'        => 'required|string',
            'number'        => 'required|string',
            'complement'    => 'nullable|string',
        ]);

        $userId = \Auth::id();
        Address::updateOrCreate(
            ['user_id' => $userId],
            $validated,
        );

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Address updated.']);

        return to_route('settings.address.edit');
    }

    public function destroy(string $id)
    {
        //
    }
}
