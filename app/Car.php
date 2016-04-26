<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Car
 *
 * @property integer $id
 * @property string $name
 * @property float $lat 纬度
 * @property float $lon 经度
 * @property boolean $added 是否添加
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\Car whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Car whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Car whereLat($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Car whereLon($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Car whereAdded($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Car whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Car whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Car extends Model
{
    //
}
