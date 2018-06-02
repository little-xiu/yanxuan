var cart = {
	src: location.href,
	promise1:null,
	id:null,
	sort:null,
	num:null,
	data: null,
	cartMain: document.getElementById('cart-main'),
	init: function() {
		var _this = this;
		this.dealSrc();
		this.promise1 = new Promise(function(resolve,reject) {
			//js中./代表上一级目录
			ajax('get','./json/product.json',{},function(datas) {
				var datas = JSON.parse(datas);
				for(var key in datas) {
					if(_this.sort == key) {
						var arr = datas[key];
						for(var i = 0; i < arr.length; i++) {
							if(_this.id == arr[i].id) {
								_this.data = arr[i];
								//{id: 25, img: "imgs/det-big1.png", title: " 拼色锁扣马鞍包", price: "¥299", hoverImg: "imgs/det-big1.png"}
								resolve(_this.data);
							}
						}						
					}
				}
			})
		})
		this.then();
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
	},
	then: function() {
		var _this = this;
		this.promise1.then(function(data) {
			var str = `<div class="cart-group">
									<div class="cart-item clearfix">
										<div class="cart-col1">
											<input type="checkbox" class="check ck1 checked">
										</div>
										<div class="cart-col2">
											<a href="##">
												<img src="${data.img}">
											</a>
										</div>
										<div class="cart-col3">
											<a href="##" class="cart-tit">
												${data.title}
											</a>
											<div class="pro-des">
												<a href="##">${data.title}</a>
											</div>
										</div>
										<div class="cart-col4">
											<span>¥</span><span class="unit-price">${data.price.slice(1)}</span>
										</div>
										<div class="cart-col5">
											<div class="cart-num-box">
												<span class="reduce">-</span>
												<input type="text" class="cart-ipt" value="${_this.num}">
												<span class="add">+</span>
											</div>
										</div>
										<div class="cart-col6">
											<span>¥</span><span class="sub-tit">${data.price.slice(1)*_this.num}</span>
										</div>
										<div class="cart-col7">
											<a href="##" class="move-collect">移入收藏夹</a><br/>
											<a class="cart-del">删除</a>
										</div>
									</div> 
								</div> `;
			_this.cartMain.innerHTML = str;
		})
	}
}
cart.init();