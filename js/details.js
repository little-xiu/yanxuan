function Show() {
	this.box = document.getElementById('main');
	this.init();
}
Show.prototype.init = function() {
	this.getId();
	this.getData();
	this.showData();
}
Show.prototype.getId = function() {
	var aurl = location.href.split('?')[1].split('&');
	for(var i = 0; i < aurl.length; i++) {
		var arr = aurl[i].split('=');
		if(arr[0] == 'id') {
			this.id = arr[1];
		}
		if(arr[0] == 'sort') {
			this.sort = arr[1];
		}
	}	
}
Show.prototype.getData = function() {
	var _this = this;
	this.p1 = new Promise(function(resolve,reject) {
		ajax('get','./json/product.json',{},function(datas) {
			var datas = JSON.parse(datas);
			for(var key in datas) {
				if(_this.sort == key) {
					var data = datas[key];
					resolve(data);
				}
			}
		})
	})
}
Show.prototype.showData = function() {
	var _this = this;
	this.p1.then(function(data) {
		for(var i = 0; i < data.length; i++) {
			if(_this.id == data[i].id) {
				var data = data[i];
				var price = data.price.slice(1);
				//data{id: 25, img: "imgs/new1.png", title: " 男士清凉透气超轻休闲鞋", price: "¥299", hoverImg: "imgs/new11.jpg"}
				var str = `<p class="pro-path">
							首页
							<i>&gt;</i>
							<a href="##">配件</a>
							<i>&gt;</i>
							<span class="pro-name">${data.title}</span>			
						</p>
						<div class="deimg-box">
							<div class="deimg-big">
								<img src="${data.img}">
								<div class="cover"></div>
							</div>
							<div class="max-box">
								<img src="imgs/det-big1.png" alt="">
							</div>
							<ul class="deimg-sm-box">
								<li><img src="imgs/det-sm1.png"></li>
								<li><img src="imgs/det-sm2.jpg"></li>
								<li><img src="imgs/det-sm3.jpg"></li>
								<li><img src="imgs/det-sm4.jpg"></li>
								<li><img src="imgs/det-sm5.jpg"></li>
							</ul>
						</div> <!-- deimg-box -->
						<div class="detxt-box">
							<h3 class="depro-tit">${data.title}</h3>
							<p class="depro-des">小巧优雅，内含容量</p>
							<div class="details-box">
								 <div class="depro-price">
								 	<span class="txt">价格</span>
								 	<span class="flag">￥</span><span class="price">${price}</span>
								 	<div class="de-comments">
								 		<span class="num">190</span><br/>
								 		<span class="comments">用户评价</span>
								 	</div>
								 </div>
								 <div class="tickit-get">
								 	<span class="tickit1">领券</span>
									<span class="tickit2">
										<i class="de-s1 tickit-icon1"></i>
										<span class="tickit3">每满179立减20</span>
										<i class="de-s1 tickit-icon2"></i>
									</span>
									<a href="##" class="tickit-btn">
										立即领取&nbsp;&gt;
									</a>
								 </div>
								 <div class="jifen">
								 	<span class="jifen1">积分</span>
								 	<span class="jifen2">购买最高得29积分</span>
								 </div>
								 <div class="details-line"></div>
								 <div class="det-service clearfix">
								 	<span class="det-ser1">服务</span>
								 	<p class="det-ser2">
								 		.&nbsp;30天无忧退换货&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;48小时快速退款&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;满88元免邮费&nbsp;&nbsp;&nbsp;&nbsp;<br/>.&nbsp;网易自营品牌&nbsp;&nbsp;&nbsp;&nbsp;.&nbsp;国内部分地区无法配送&nbsp;&nbsp;&nbsp;&nbsp;
								 	</p>
								 </div>
							</div> <!-- details-box -->
							<div class="de-num-box clearfix">
								<span class="de-num-txt">数量</span>
								<span class="de-num-inner">
									<span class="reduce" onselectstart="return false;" style="-moz-user-select:none;">-</span>
									<input type="text" id="de-numIpt" value="1">
									<span class="add" onselectstart="return false;" style="-moz-user-select:none;">+</span>
								</span>
							</div>
							<div class="de-btns">
								<a href="##" class="now-buy btn">立即购买</a>
								<a class="add-cart btn">
									<i class="to-cart"></i>
									加入购物车
								</a>
								<a class="collect-btn" href="##" title="点击收藏">
									<i></i><br/>
									收藏
								</a>
							</div>
							<div class=""></div>
						</div> `;
				_this.box.innerHTML = str;
			}
		}
		_this.hover();
		_this.numChange();
		_this.addCart();
	})
}
//小图片mouseover
Show.prototype.hover = function() {
	var _this = this;
	this.middleImg = document.querySelector('.deimg-big>img');
	var smImgs = document.querySelectorAll('.deimg-sm-box>li>img');
	for(var i = 0; i < smImgs.length; i++) {
		smImgs[i].onmouseover = function() {
			var src = this.getAttribute('src');
			_this.middleImg.setAttribute('src',src);
		}
	}
}
Show.prototype.numChange = function() {
	this.addBtn = document.querySelector('.add');
	this.reduceBtn = document.querySelector('.reduce');
	this.numIpt = document.querySelector('#de-numIpt');
	var _this = this;
	var val = this.numIpt.value;
	this.addBtn.onclick = function() {
		_this.numIpt.value =  ++_this.numIpt.value; 
	}
	this.reduceBtn.onclick = function() {
		_this.numIpt.value = _this.numIpt.value == 1 ? 1 : --_this.numIpt.value;		
	}
}
var baseUrl = "http://localhost/work/wangyiyanxuan/cart.html";
Show.prototype.addCart = function() {
	var _this = this;
	var addBtn = document.querySelector('.add-cart');
	addBtn.onclick = function() {
		location.href = baseUrl +"?id=" + _this.id + "&num=" + _this.numIpt.value + "&sort=" + _this.sort;
	}
}
new Show();