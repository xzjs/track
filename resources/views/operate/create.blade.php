<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>添加操作</title>
</head>
<body>
<form action="{{ url('/operate') }}" method="post">
    {{ csrf_field() }}
    operate_no<input type="text" name="operate_no"><br>
    car_id<input type="text" name="car_id" value="1"><br>
    <input type="submit" value="提交">
</form>
</body>
</html>