<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>轨迹控制台</title>
</head>
<body>
<h1>添加entity</h1>
<form action="http://api.map.baidu.com/trace/v2/entity/add" method="post">
    <input type="hidden" value="ABMyPFHzCuKItIEoAG2FZjtt" name="ak">
    <input type="hidden" value="112988" name="service_id">
    entity名称<input type="text" name="entity_name"><br>
    <input type="submit" value="提交">
</form>
<h1>文件转化</h1>
<form method="post" action="transform">
    <input type="hidden" name="_token" value="{{ csrf_token() }}" />
    文件名<input type="text" name="name" value="dengjiapo1.txt"><br>
    <input type="submit" value="提交">
</form>
<h1>添加track</h1>
<form method="post" action="http://api.map.baidu.com/trace/v2/track/addpoints" enctype="multipart/form-data">
    <input type="hidden" value="ABMyPFHzCuKItIEoAG2FZjtt" name="ak">
    <input type="hidden" value="112988" name="service_id">
    entity名称<input type="text" name="entity_name" value="无人车"><br>
    <input type="file" name="point_list"><br>
    <input type="submit" value="提交">
</form>
</body>
</html>