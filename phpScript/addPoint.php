<?php
/**
 * Created by PhpStorm.
 * User: xzjs
 * Date: 16/3/26
 * Time: 下午4:06
 */
$myfile = fopen("1.txt", "r") or die("Unable to open file!");
function curl_post($url, $post) {
    $options = array(
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HEADER         => false,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $post,
    );

    $ch = curl_init($url);
    curl_setopt_array($ch, $options);
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
}

while (!feof($myfile)) {
    $str = fgets($myfile);
    $str_arr = explode("\t", $str);
    if (count($str_arr) > 3) {
        $array=array(
            'ak'=>'ABMyPFHzCuKItIEoAG2FZjtt',
            'service_id'=>'112988',
            'latitude'=>substr($str_arr[1], 0, -1),
            'longitude'=>substr($str_arr[2], 0, -1),
            'coord_type'=>1,
            'loc_time'=>time(),
            'entity_name'=>'比赛无人车2'
        );
        $data=curl_post("http://api.map.baidu.com/trace/v2/track/addpoint", $array);
        $result=json_decode($data,true);
        if($result['status']==0){
            echo "上传成功\n";
        }else{
            echo "上传失败\n";
        }
        sleep(3);
    }
}
fclose($myfile);