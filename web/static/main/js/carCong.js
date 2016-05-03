var carCong={

	init:function(){
		this.bind();
	},
	bind:function(){
		// 首次加载表格数据
		$.ajax({
			
		})


		$("#J_CarConfgType").delegate('li', 'click', function(event) {
			event.preventDefault();
			$(this).addClass('active').siblings('li').removeClass('active');
			// 
			
		});
	}

}