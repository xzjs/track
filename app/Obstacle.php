<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Obstacle
 *
 * @property integer $id
 * @property float $size 障碍物半径
 * @property float $lat 障碍物经度
 * @property float $lon 障碍物纬度
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\Obstacle whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Obstacle whereSize($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Obstacle whereLat($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Obstacle whereLon($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Obstacle whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Obstacle whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Obstacle extends Model
{
    //
}
