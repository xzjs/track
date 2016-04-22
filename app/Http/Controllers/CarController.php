<?php

namespace App\Http\Controllers;

use App\Car;
use Illuminate\Http\Request;

use App\Http\Requests;
use Mockery\CountValidator\Exception;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }


    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Car::find($id)->toJson();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        echo Car::find($id)->delete();
    }

    /**
     * web端添加车辆
     * @param int $num 添加车辆的数量
     * @return mixed 添加的车辆的id
     */
    public function add($num = 1)
    {
        $car_ids = Car::where('added', 0)->take($num)->lists('id');
        Car::whereIn('id', $car_ids)->update(['added' => 1]);
        return $car_ids->toJson();

    }

    /**
     * web端删除车辆
     * @param $id
     * @return string
     */
    public function delete($id)
    {
        try {
            $car = Car::find($id);
            $car->added = 0;
            $car->save();
            return '1';
        } catch (Exception $ex) {
            return $ex->getMessage();
        }
    }
}
