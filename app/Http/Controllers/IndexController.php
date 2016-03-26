<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use League\Flysystem\Exception;

class IndexController extends Controller
{
    public function transform(Request $request)
    {
        $myfile = fopen($request->input('name'), "r") or die("Unable to open file!");
        $i=1;
        $out_csv = fopen("result0.csv", "w");
        $array = array('longitude', 'latitude', 'loc_time', 'coord_type');
        fputcsv($out_csv, $array);
        $time = strtotime('-1 days');

        while (!feof($myfile)) {
            $str = fgets($myfile);
            $str_arr = explode("\t", $str);
            if (count($str_arr) > 3) {
                $time += 30;
                if($i%199==0){
                    fclose($out_csv);
                    $out_csv=fopen("result".floor($i/190).".csv","w");
                    $array = array('longitude', 'latitude', 'loc_time', 'coord_type');
                    fputcsv($out_csv, $array);
                }
                $array = array(substr($str_arr[2], 0, -1), substr($str_arr[1], 0, -1), $time, 1);
                fputcsv($out_csv, $array);
                $i++;
            }
        }
        echo '生成成功';


        fclose($myfile);
        fclose($out_csv);

    }
}
