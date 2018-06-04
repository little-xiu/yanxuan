var cart = {
	src: location.href,
	promise1:null,
	id:null,
	sort:null,
	num:null,
	data: null,
	total: document.getElementById('total'),
	realSum: document.getElementById('real-sum'),
	freePostLink: document.getElementById('free-post-link'),
	freePost: document.getElementById('free-post'),
	cartMain: document.getElementById('cart-main'),
	addBtn: document.querySelector('.add'),
	reduceBtn: document.querySelector('.reduce'),
	checkBtn: null,
	checkAll: document.querySelectorAll('.checkAll'),
	totalDel: document.querySelector('.total-del'),
	singlePrice: null,
	init: function() {
		var _this = this;
		this.dealSrc();
		this.promise1 = new Promise(function(resolve,reject) {
			//请求的资源路径以执行的文件为准,这里是html文件
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
												<span class="reduce" onselectstart="return false;" style="-moz-user-select:none;">-</span>
												<input type="text" class="cart-ipt" value="${_this.num}">
												<span class="add" onselectstart="return false;" style="-moz-user-select:none;">+</span>
											</div>
										</div>
										<div class="cart-col6">
											<span>¥</span><span class="sub-tit">${data.price.slice(1)*_this.num}</span>
										</div>
										<div class="cart-col7">
											<a href="##" class="move-collect">移入收藏夹</a><br/>
											<a class="cart-del" onselectstart="return false;" style="-moz-user-select:none;">删除</a>
										</div>
									</div> 
								</div> `;
			_this.cartMain.innerHTML = str;
			_this.total.innerHTML = data.price.slice(1)*_this.num;
			_this.realSum.innerHTML = data.price.slice(1)*_this.num;
			_this.singlePrice = data.price.slice(1);
			_this.agent();
			_this.allCheck();
			_this.delAll();
		})
	},
	//用事件代理做功能
	agent: function() {
		var _this = this;
		this.checkBtn = document.querySelectorAll('.check');
		this.cartMain.onclick = function(e) {
			var e = e || event;
			var target = e.target || e.srcElement;
			if(target.tagName == "SPAN" && target.className == "add") {
				let val = target.previousElementSibling.value;
				val++;
				target.previousElementSibling.value = val;
				let sum = _this.singlePrice * val;
				_this.total.innerHTML = sum;
				_this.realSum.innerHTML = sum;
				target.parentNode.parentNode.nextElementSibling.children[1].innerHTML = sum;				
			}
			if(target.tagName == "SPAN" && target.className == "reduce") {
				let val = target.nextElementSibling.value;
				if(val <= 2) {
					val = 1;
				} else {
					val--
				}
				target.nextElementSibling.value = val;
				let sum = _this.singlePrice * val;
				_this.total.innerHTML = sum;
				_this.realSum.innerHTML = sum;
				target.parentNode.parentNode.nextElementSibling.children[1].innerHTML = sum;
			}
			//删除功能
			if(target.tagName == "A" && target.className == "cart-del") {
				target.parentNode.parentNode.parentNode.remove();
			}
			//反选			
			if(target.tagName == "INPUT" && target.className == "check ck1 checked") {
				// _this.checkAll = document.querySelectorAll('.checkAll');
				var flag = false;
				for(let i = 0; i < _this.checkBtn.length; i++) {
					if(!_this.checkBtn[i].checked) {
						flag = true;
						break;
					}
				}
				if(flag) {
					for(let i = 0; i < _this.checkAll.length; i++) {
						_this.checkAll[i].checked = false;
					} 
				} else {
					for(let i = 0; i < _this.checkAll.length; i++) {
						_this.checkAll[i].checked = true;
					} 
				}
			}
		}
	},
	allCheck: function() {
		var _this = this;
		for(var i = 0; i < this.checkAll.length; i++) {
			this.checkAll[i].onclick = function() {
				if(this.checked) {
					for(var j = 0; j < _this.checkAll.length; j++) {
						_this.checkAll[j].checked = true;
					}
					for(var k = 0; k < _this.checkBtn.length; k++) {
						_this.checkBtn[k].checked = true;
					}
				} else {
					for(var j = 0; j < _this.checkAll.length; j++) {
						_this.checkAll[j].checked = false;
					}
					for(var k = 0; k < _this.checkBtn.length; k++) {
						_this.checkBtn[k].checked = false;
					}
				}
			}
		}
	},
	delAll: function() {
		var _this = this;
		this.totalDel.onclick = function() {
			for(var i = 0; i < _this.checkBtn.length; i++) {
				if(_this.checkBtn[i].checked) {
					_this.checkBtn[i].parentNode.parentNode.parentNode.remove();
				}
			}
		}
	}
}
cart.init();

