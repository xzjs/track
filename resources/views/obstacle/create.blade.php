<!doctype html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>添加障碍物</title>
</head>
<body>
<form action="{{url('/obstacle')}}" method="post">
    {{ csrf_field() }}
    size<input type="text" value="100" name="size"><br>
    lat<input type="text" value="67" name="lat"><br>
    lon<input type="text" value="120" name="lon"><br>
    <input type="submit" value="提交">
</form>
</body>
</html>