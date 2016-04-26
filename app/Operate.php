<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Operate
 *
 * @property integer $id
 * @property float $operate_no
 * @property float $operate_num
 * @property integer $car_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\Operate whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Operate whereOperateNo($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Operate whereOperateNum($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Operate whereCarId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Operate whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Operate whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Operate extends Model
{
    //
}
