<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>carMove</title>
		<link rel="stylesheet" href="./static/carAnimate/carAni.css">
	</head>
	<body>
		<!-- <div class="pos-abs joystick" id="J_Joystick">
			<div class="bb op-flag" id="J_SpeedDown">
				<span class="glyphicon glyphicon-minus"></span>
				<p>减速</p>
			</div>
			<div class="rr op-flag" id="J_TurnR">
				<span class="glyphicon glyphicon-hand-right"></span>
				<p>右转</p>
			</div>
			<div class="tt op-flag active" id="J_SpeedUp">
				<span class="glyphicon glyphicon-plus"></span>
				<p>加速</p>
			</div>
			<div class="ll op-flag" id="J_TurnL">
				<span class="glyphicon glyphicon-hand-left"></span>
				<p>左转</p>
			</div>
			<div class="cross cross-above"></div>
			<div class="cross cross-blow"></div>
		</div> -->
		<!-- <div class="panel">
			<button class="btn btn-primary" id="J_StartBtn">开始</button>
			<button class="btn btn-default" id="J_ResetBtn">重置</button>
		</div> -->
		<div class="wraper">
			<div class="row top">
				<div class="street">
					<div class="street-stripe"></div>
					<p class="streetName">云深路</p>
					<div class="car" id="J_Car"></div>
					<p class="signpost signpost-h-b l">01</p>
					<p class="signpost signpost-h-b m">02</p>
					<p class="signpost signpost-h-b r">03</p>
					<p class="signpost mainstr">M1</p>
					<p class="signpost mainstr-v">M5</p>
				</div>
				<div class="barrierZone">
					<div class="fst-zone f-left"></div>
					<div class="snd-zone f-left"></div>
					<div class="trd-zone f-left"></div>
					<div class="left-street">
						<div class="left-street-stripe"></div>
						<p class="signpost streetName">福兴路</p>
						<p class="signpost signpost-v">10</p>
						<p class="signpost turnPoint-t l">T1</p>
						<p class="signpost turnPoint-t r">T2</p>
						<p class="signpost turnPoint-b l">T6</p>
						<p class="signpost turnPoint-b r">T7</p>
					</div>
					<div class="mid-street">
						<div class="mid-street-stripe"></div>
						<p class="streetName">福盛路</p>
						<p class="signpost signpost-v">11</p>
						<p class="signpost turnPoint-t l">T3</p>
						<p class="signpost turnPoint-t r">T4</p>
						<p class="signpost turnPoint-b l">T8</p>
						<p class="signpost turnPoint-b r">T9</p>
					</div>
					<div class="right-street">
						<div class="right-street-stripe"></div>
						<p class="streetName">福茂路</p>
						<p class="signpost signpost-v">12</p>
						<p class="signpost turnPoint-t l">T5</p>
						<p class="signpost turnPoint-b l">T10</p>

					</div>
				</div>
			</div>
			<div class="row mid">
				<div class="street">
					<div class="street-stripe"></div>
					<p class="streetName">五渠路</p>
					<p class="signpost signpost-h-t l">04</p>
					<p class="signpost signpost-h-t m">05</p>
					<p class="signpost signpost-h-t r">06</p>
					<p class="signpost signpost-h-b l">07</p>
					<p class="signpost signpost-h-b m">08</p>
					<p class="signpost signpost-h-b r">09</p>
					<p class="signpost mainstr">M2</p>
				</div>
				<div class="barrierZone">
					<div class="fst-zone f-left"></div>
					<div class="snd-zone f-left"></div>
					<div class="trd-zone f-left"></div>
					<div class="left-street">
						<div class="left-street-stripe"></div>
						<p class="streetName">福兴路</p>
						<p class="signpost signpost-v">13</p>
						<p class="signpost turnPoint-b l">T16</p>
						<p class="signpost turnPoint-b r">T17</p>
					</div>
					<div class="mid-street">
						<div class="mid-street-stripe"></div>
						<p class="streetName">福盛路</p>
						<p class="signpost signpost-v">14</p>
						<p class="signpost turnPoint-b l">T18</p>
						<p class="signpost turnPoint-b r">T19</p>
					</div>
					<div class="right-street">
						<div class="right-street-stripe"></div>
						<p class="streetName">福茂路</p>
						<p class="signpost signpost-v">15</p>
						<p class="signpost turnPoint-b l">T20</p>
					</div>
				</div>
			</div>
			<div class="row bottom">
				<div class="street">
					<div class="street-stripe"></div>
					<p class="streetName">渔乐路</p>
					<p class="signpost signpost-h-t l">010</p>
					<p class="signpost signpost-h-t m">011</p>
					<p class="signpost signpost-h-t r">012</p>
					<p class="signpost signpost-h-b l">013</p>
					<p class="signpost signpost-h-b m">014</p>
					<p class="signpost signpost-h-b r">015</p>
					<p class="signpost mainstr">M3</p>
				</div>
				<div class="barrierZone">
					<div class="fst-zone f-left"></div>
					<div class="snd-zone f-left"></div>
					<div class="trd-zone f-left"></div>
					<div class="left-street">
						<div class="left-street-stripe"></div>
						<p class="streetName">福兴路</p>
						<p class="signpost signpost-v">16</p>
						<p class="signpost turnPoint-t l">T21</p>
						<p class="signpost turnPoint-t r">T22</p>
						<p class="signpost turnPoint-b l">T26</p>
						<p class="signpost turnPoint-b r">T27</p>
					</div>
					<div class="mid-street">
						<div class="mid-street-stripe"></div>
						<p class="streetName">福盛路</p>
						<p class="signpost signpost-v">17</p>
						<p class="signpost turnPoint-t l">T23</p>
						<p class="signpost turnPoint-t r">T24</p>
						<p class="signpost turnPoint-b l">T28</p>
						<p class="signpost turnPoint-b r">T29</p>
					</div>
					<div class="right-street">
						<div class="right-street-stripe"></div>
						<p class="streetName">福茂路</p>
						<p class="signpost signpost-v">18</p>
						<p class="signpost turnPoint-t l">T25</p>
						<p class="signpost turnPoint-b l">T30</p>
					</div>
				</div>
				<div class="street">
					<div class="street-stripe"></div>
					<p class="streetName">黄浦江路</p>
					<p class="signpost signpost-h-t l">016</p>
					<p class="signpost signpost-h-t m">017</p>
					<p class="signpost signpost-h-t r">018</p>
					<p class="signpost signpost-h-b l">019</p>
					<p class="signpost signpost-h-b m">020</p>
					<p class="signpost signpost-h-b r">021</p>
					<p class="signpost mainstr">M4</p>
				</div>
			</div>
		</div>
	</body>
	<script type="text/javascript" src="./static/carAnimate/jquery.min.js"></script>
	<script type="text/javascript" src="./static/carAnimate/carAni.js"></script>
</html>