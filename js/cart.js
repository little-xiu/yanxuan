var cart = {
	src: location.href,
	promise1:null,
	id:null,
	sort:null,
	num:null,
	init: function() {
		var _this = this;
		this.dealSrc();
		this.promise1 = new Promise(function(resolve,reject) {
			//js中./代表上一级目录
			ajax('get','./json/product.json',{},function(datas) {
				var datas = JSON.parse(datas);
				for(var key in datas) {
					if(_this.sort == key) {
						var data = datas[key];
						console.log(data)
					}
				}
			})
		})
	},
	dealSrc: function() {
		var str = this.src.split('?')[1];
		var arr = str.split('&');
		for(var i = 0; i < arr.length; i++) {
			var newArr = arr[i].split('=');
			if(newArr[0] == 'id') {
				this.id = newArr[1];
			}
			if(newArr[0] == 'sort') {
				this.sort = newArr[1];
			}
			if(newArr[0] == 'num') {
				this.num = newArr[1];
			}
		}
	}
}
cart.init();