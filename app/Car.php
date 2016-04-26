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
 */
class Car extends Model
{
    //
}
