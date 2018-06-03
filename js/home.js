//头部公告文字向上滚动轮播
function Carousel() {
	this.noticeUl = document.getElementById('scroll-notice');
	this.aNoticeLi = this.noticeUl.getElementsByTagName('li');
	let newNli = this.aNoticeLi[0].cloneNode(true);
	this.noticeBox = document.querySelector('.carousel-notice');
	this.noticeUl.appendChild(newNli);
	this.indexN = 0;
	this.nH = this.aNoticeLi[0].offsetHeight;
	this.nTimer = null;
	this.init();
}
Carousel.prototype.init = function() {
	this.hover();
	this.autoPlay();
}
Carousel.prototype.autoPlay = function() {
	var _this = this;
	this.nTimer = setInterval(function() {
		if(_this.indexN == _this.aNoticeLi.length-1) {
			_this.indexN = 1;
			_this.noticeUl.style.top = 0;
		} else {
			_this.indexN++;
		}
		_this.scroll();
	},3000)
}
Carousel.prototype.scroll = function() {
	move(this.noticeUl,{top:-this.indexN*this.nH});
}
Carousel.prototype.hover = function() {
	var _this = this;
	this.noticeBox.onmouseover = function() {
		clearInterval(_this.nTimer);
	}
	this.noticeBox.onmouseout = function() {
		_this.autoPlay();
	}
}
new Carousel();
function getStyle(obj,attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj,false)[attr];
	}
}
function move(obj,json,fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		for(let attr in json) {
			let iCur = 0;
			if(attr == 'opacity') {
				iCur = parseInt(getStyle(obj,attr)*100);
			} else {
				iCur = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - iCur)/8;
			speed = (speed > 0) ? Math.ceil(speed) : Math.floor(speed);
			var flag = true;
			if(iCur != json[attr]) {
				flag = false;
			}
			if(attr == 'opacity') {
				obj.style.opacity = (iCur + speed)/100;
				obj.style.filter = 'alpha(opacity:'+iCur+speed+')';
			} else {
				obj.style[attr] = iCur + speed + 'px';
			}
		}
		if(flag) {
			clearInterval(obj.timer);
			fn && fn();
		}
	},30)
}

//搜索框oninput事件在元素值发生变化是立即触发,onchange 在元素失去焦点时触发

function Searchipt() {
	this.searchTxt = document.getElementById('search-txt');
	this.placeText = document.getElementById('place-text');
	this.oninput();
	this.onblur();
}
Searchipt.prototype.oninput = function() {
	var _this = this;
	this.searchTxt.oninput = function() {
		if(this.value) {
			_this.placeText.style.display = 'none';
		} else {
			_this.placeText.style.display = 'block';
		}
	}
}
Searchipt.prototype.onblur = function() {
	var _this = this;
	this.searchTxt.onblur = function() {
		if(this.value) {
			_this.placeText.style.display = 'none';
		} else {
			_this.placeText.style.display = 'block';
		}
	}
}
new Searchipt();

//nav的tab效果
function Tabnav() {
	this.navItem = document.querySelectorAll('.navtap');
	var _this = this;
	for(let i = 0; i < this.navItem.length; i++) {
		this.hover(_this.navItem[i]);
	}
}
Tabnav.prototype.hover = function(navItem) {
	navItem.onmouseover = function() {
		this.children[1].style.display = 'block';
	}
	navItem.onmouseout = function() {
		this.children[1].style.display = 'none';
	}
}
new Tabnav();

//banner淡入淡出轮播

function Fade() {
	this.bannerBox = document.getElementById('banner-box');
	this.aImg = document.getElementById('banner').getElementsByTagName('li');
	this.aDot = document.getElementById('dot').getElementsByTagName('li');
	this.aArrow = document.getElementById('arrow').getElementsByTagName('a');
	this.timer = null;
	this.iNow = 0;
	this.next = 0;
	this.init();
}
Fade.prototype.init = function() {
	this.autoPlay();
	this.hover();
	this.tab();
	this.prev();
	this.nextImg();
}
Fade.prototype.nextImg = function() {
	var _this = this;
	this.aArrow[1].onclick = function() {
		if(_this.next == _this.aImg.length - 1) {
			_this.next = 0;
		} else {
			_this.next++;
		}
		_this.toImg();
	}
}
Fade.prototype.prev = function() {
	var _this = this;
	this.aArrow[0].onclick = function() {
		if(_this.next == 0) {
			_this.next = _this.aImg.length - 1;
		} else {
			_this.next --;
		}
		_this.toImg();
	}
}
Fade.prototype.tab = function() {
	var _this = this;
	for(var i = 0; i < this.aDot.length; i++) {
		this.aDot[i].index = i;
		this.aDot[i].onmouseover = function() {
			for(var j = 0; j < _this.aDot.length; j++) {
				_this.aDot[j].className = '';
				move(_this.aImg[j],{opacity:0});
			}
			this.className = 'active';
			move(_this.aImg[this.index],{opacity:100});
			_this.next = this.index;
			_this.iNow = _this.next;
		}
	}
}
Fade.prototype.hover = function() {
	var _this = this;
	this.bannerBox.onmouseover = function() {
		clearInterval(_this.timer);
	}
	this.bannerBox.onmouseout = function() {
		_this.autoPlay();
	}
}
Fade.prototype.autoPlay = function() {
	var _this = this;
	this.timer = setInterval(function() {
		if(_this.next == _this.aImg.length - 1) {
			_this.next = 0;
		} else {
			_this.next++;
		}
		_this.toImg();
	},2000)
}
Fade.prototype.toImg = function() {
	move(this.aImg[this.iNow],{opacity:0});
	move(this.aImg[this.next],{opacity:100});
	this.iNow = this.next;
	for(var i = 0; i < this.aDot.length; i++) {
		this.aDot[i].className = '';
	}
	this.aDot[this.next].className = 'active';
}
new Fade();

//新品首发处动态加载数据
function NewproList() {
	this.list = document.getElementById('newcon-list');
	this.str = '';
	this.index = 0;
	this.arrows = document.getElementById('new-arrow').getElementsByTagName('a');
	this.init();
}
NewproList.prototype.init = function() {
	var _this = this;
	this.promise();
	this.p1.then(function(data) {
		_this.loadImg(data);
		_this.hover();
		_this.arrows[0].onclick = function() {
			_this.prev();
		}
		_this.arrows[1].onclick = function() {
			_this.next();
		}
	});
}
NewproList.prototype.promise = function() {
	this.p1 = new Promise(function(resolve,reject){
		ajax('get','./json/product.json',{},function(datas) {
			var datas = JSON.parse(datas);
			for(var key in datas) {
				if(key == "newProduce") {
					var data = datas[key];
					resolve(data);
				}
			}
		})
	});
}
var baseUrl = "http://localhost/yanxuan1/details.html";
NewproList.prototype.loadImg = function(data) {
	var _this = this;
	for(var i = 0; i < data.length; i++) {
		this.str += '<li class="newcon-item">\
									<div class="newcon-img">\
										<a href="'+ baseUrl +'?id='+data[i].id+'&sort=newProduce'+'">\
											<img src="'+data[i].img+'" data-img="'+data[i].hoverImg+'" data-origin="'+data[i].img+'">\
										</a>\
									</div>\
									<div class="newcon-txt">\
										<a href="'+baseUrl +'?id='+data[i].id+'&sort="newProduce"'+'">'+data[i].title+'</a>\
										<p class="price">'+data[i].price+'</p>\
									</div>\
								</li>'
	}
	this.list.innerHTML = this.str;
	this.item =  document.querySelectorAll('.newcon-item');
	this.iW = this.item[0].offsetWidth + 10;
	this.list.style.width = this.iW * this.item.length + 'px';
}

NewproList.prototype.hover = function() {
	var _this = this;
	for(var i = 0; i < this.item.length; i++) {
		this.item[i].index = i;
		this.item[i].onmouseover = function() {
			var img = _this.item[this.index].children[0].children[0].children[0];
			var src = img.getAttribute('data-img');
			img.src = src;
		}
		this.item[i].onmouseout = function() {
			var img = _this.item[this.index].children[0].children[0].children[0];
			var src = img.getAttribute('data-origin');
			img.src = src;
		}
	}	
}
//点击上一个箭头
NewproList.prototype.prev = function() {
	if(this.index == 0) {
			this.index = 0;
	}else {
		this.index--;
	}
	var _this = this;
	move(this.list,{left:-1090*_this.index});
}

NewproList.prototype.next = function() {
	if(this.index == this.item.length/4 - 1) {
		this.index = this.item.length/4 - 1;
	} else {
		this.index++;
	}
	var _this = this;
	move(this.list,{left:-1090*_this.index});
}
new NewproList();


//通过ajax请求json数据，写人气推荐里的内容
function Recom() {
	// this.recomWrap = document.getElementById('recom-wrap');
	this.list1 = document.getElementById('recom-list1');
	this.list2 = document.getElementById('recom-list2');
	this.recoml1 = document.getElementById('recom-l1');
	this.recoml2 = document.getElementById('recom-l2');
	this.tabBtns = document.getElementById('recom-tab').getElementsByTagName('a');
	this.recomItems = document.querySelectorAll('.recom-item ');
	this.init();
}
Recom.prototype.init = function() {
	var _this = this;
	this.xml1 = new XMLHttpRequest();
	this.xml1.open("get","json/recom1.json",true);
	this.xml1.send();
	this.xml1.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			_this.data1 = JSON.parse(this.responseText);
			_this.appenditem1();			
		}
	}
	this.xml2 = new XMLHttpRequest();
	this.xml2.open("get","json/recom2.json",true);
	this.xml2.send();
	this.xml2.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200) {
			_this.data2 = JSON.parse(this.responseText);
			_this.appenditem2();
		}
	}
	this.tap();
}
Recom.prototype.appenditem1 = function() {
	var lstr = '<div class="recom-top">\
			 					<a href="'+baseUrl +'?id='+this.data1[0].id+'&sort=recom1'+'">\
			 						<img src="'+this.data1[0].img+'">\
			 					</a>\
			 				</div>\
			 				<div class="recom-bottom">\
			 					<span>限时购</span>\
			 					<a href="'+baseUrl +'?id='+this.data1[0].id+'&sort=recom1'+'">'+this.data1[0].title+'</a>\
			 					<p class="price">'+this.data1[0].price+'</p>\
			 				</div>';
	this.recoml1.innerHTML = lstr;
	var str = '';
	for(var i = 1; i < 7; i++) {
		str += '<li class="recom-sm">\
		 						<div class="recom-sm-top">\
		 							<a href="'+baseUrl +'?id='+this.data1[i].id+'&sort=recom1'+'">\
		 								<img src="'+this.data1[i].img+'">\
		 							</a>\
		 						</div>\
		 						<div class="recom-sm-bot">\
		 							<span>限时购</span>\
		 							<a href="'+baseUrl +'?id='+this.data1[i].id+'&sort=recom1'+'">'+this.data1[i].title+'</a>\
		 							<p class="price">'+this.data1[i].price+'</p>\
		 						</div>\
		 					</li>';
	}
	this.list1.innerHTML = str;
}
Recom.prototype.appenditem2 = function() {
	var lstr = '<div class="recom-top">\
			 					<a href="##">\
			 						<img src="'+this.data2[0].img+'">\
			 					</a>\
			 				</div>\
			 				<div class="recom-bottom">\
			 					<span>限时购</span>\
			 					<a href="##">'+this.data2[0].title+'</a>\
			 					<p class="price">'+this.data2[0].price+'</p>\
			 				</div>';
	this.recoml2.innerHTML = lstr;
	var str = '';
	for(var i = 1; i < 7; i++) {
		str += '<li class="recom-sm">\
		 						<div class="recom-sm-top">\
		 							<a href="##">\
		 								<img src="'+this.data2[i].img+'">\
		 							</a>\
		 						</div>\
		 						<div class="recom-sm-bot">\
		 							<span>限时购</span>\
		 							<a href="##">'+this.data2[i].title+'</a>\
		 							<p class="price">'+this.data2[i].price+'</p>\
		 						</div>\
		 					</li>';
	}
	this.list2.innerHTML = str;
}
Recom.prototype.tap = function() {
	var _this = this;
	for(var i = 0; i < this.tabBtns.length; i++) {
		this.tabBtns[i].index = i;
		this.tabBtns[i].onclick = function() {
			for(var j = 0; j < _this.tabBtns.length; j++) {
				_this.tabBtns[j].className = '';
				_this.recomItems[j].style.display = 'none';
			}
			this.className = 'on';
			_this.recomItems[this.index].style.display = 'block';
		}
	}
}
new Recom(); 

//限时购加载动态数据
function Limite() {
	this.list = document.getElementById('limit-con-inner');
	this.init();
}
Limite.prototype.init = function() {
	var _this = this;
	this.promise();
	this.p1.then(function(data) {
		var str = '';
		for(var i = 0; i < data.length; i++) {
			str += `<div class="limit-item">
						<div class="limit-img-box">
							<a href="${baseUrl}?id=${data[i].id}&sort=limit">
								<img src="${data[i].img}">
							</a>
						</div>
						<div class="limit-txt">
							<h3 class="limit-tit">
								<a href="${baseUrl}?id=${data[i].id}&sort=limit">${data[i].title}</a>
							</h3>
							<p class="limit-des">${data[i].sub_tit}</p>
							<div class="progress-box">
								<p class="progress-bar">
									<span class="progress-bar-inner"></span>
								</p>
								<p class="limit-rest-num">${data[i].num}</p>
							</div>
							<p class="limit-price-box">
								<span class="limit-price">
									<span>限时价</span>
									<span class="price-sign">￥</span>
									<span class="limit-price-txt">${data[i].limitP}</span>
								</span>
								<span class="origin-box">
									<span class="origin-des">原价</span>
									<span class="origin-price">${data[i].originP}</span>
								</span>
							</p>
							<a class="buy-btn" href="${baseUrl}?id=${data[i].id}&sort=limit">立即购买</a>
						</div>
					</div>`;
		}
		_this.list.innerHTML = str;
	})
}
Limite.prototype.promise = function() {
	this.p1 = new Promise(function(resolve,reject){
		ajax('get','json/limit.json',{},function(data) {
			var data = JSON.parse(data);
			resolve(data);
		})
	});
}
new Limite();

//限时购倒计时
function CountD() {
	this.limitH = document.querySelector('.limit-h');
	this.limitM = document.querySelector('.limit-m');
	this.limitS = document.querySelector('.limit-s');
	this.init();
}
CountD.prototype.init = function() {
	var _this = this;
	var timer = setInterval(function() {
		var obj = _this.date();
		//当倒计时为0时关闭定时器
		if(obj.d <= 0 && parseInt(obj.h) <= 0 && parseInt(obj.m) <= 0 && parseInt(obj.s) <= 0) {
			clearInterval(timer);
		}
	},1000);
}
CountD.prototype.insertZ = function(n) {
	return n >= 10 ? n : '0' + n;
}
CountD.prototype.count = function(s) {
	var obj = {};
	obj.d = Math.floor(s/(60*60*24));
	obj.h = this.insertZ(Math.floor(s%(60*60*24)/(60*60)));
	obj.m = this.insertZ(Math.floor(s%(60*60*24)%(60*60)/60));
	obj.s = this.insertZ(Math.floor(s%(60*60*24)%(60*60)%60));
	return obj;
}
CountD.prototype.date = function() {
	var tNow = new Date().getTime();
	var tFuture = new Date('2018-11-10 22:22:37').getTime();
	var subS = (tFuture - tNow)/1000;
	var obj = this.count(subS);
	this.limitH.innerHTML = obj.h;
	this.limitM.innerHTML = obj.m;
	this.limitS.innerHTML = obj.s;
	return obj;
}
new CountD();

//居家ajax加载动态数据

function Living() {
	this.box = document.getElementById('living-box');
	this.init();

}
Living.prototype.init = function() {
	this.promise();
	var _this = this;
	this.p1.then(function(data) {
		var str = '';
		for (var i = 0; i < data.length; i++) {
			str += `<div class="living-item">
								<div class="living-img">
									<a href="##">
										<img src="${data[i].img}">
									</a>
								</div>
								<div class="living-txt">
									<p class="living-flag">
									</p>
									<p class="living-tit">
										<a href="##">${data[i].title}</a>
									</p>
									<p class="living-price">${data[i].price}</p>
								</div>
							</div>`;
		}
		_this.box.innerHTML = str;
		//商品是否有标志
		var aFlag = document.querySelectorAll('.living-flag');
		for (var i = 0; i < data.length; i++) {
			for(var key in data[i]) {
				if(key == 'limit') {
					var span = document.createElement('span');
					span.className = 'limit';
					span.innerHTML = data[i].limit;
					aFlag[i].appendChild(span);
				}
				if(key == 'hot') {
					var span = document.createElement('span');
					span.className = 'hot';
					span.innerHTML = data[i].hot;
					aFlag[i].appendChild(span);
				}
			}
		}
	})
}
Living.prototype.promise = function() {
	this.p1 = new Promise(function(resolve,reject) {
		ajax('get','json/living.json',{},function(data) {
			var data = JSON.parse(data);
			resolve(data);
		});
	});
}
new Living();

//服装ajax加载动态数据
function Clothes() {
	this.box = document.getElementById('clothes-box');
	this.init();
}
Clothes.prototype.init = function() {
	this.promise();
	var _this = this;
	this.p1.then(function(data) {
		var str = '';
		for (var i = 0; i < data.length; i++) {
			str += `<div class="clothes-item">
								<div class="living-item">
									<div class="living-img">
										<a href="##">
											<img src="${data[i].img}">
										</a>
									</div>
									<div class="living-txt">
										<p class="living-flag close-flag">
										</p>
										<p class="living-tit">
											<a href="##">${data[i].title}</a>
										</p>
										<p class="living-price">${data[i].price}</p>
									</div>
								</div>
							</div>`;
		}
		_this.box.innerHTML = str;
		var flags = document.querySelectorAll('.close-flag');
		for(var i = 0; i < data.length; i++) {
			for(var key in data[i]) {
				if(key == 'limit') {
					var span = document.createElement('span');
					span.className = 'limit';
					span.innerHTML = data[i].limit;
					flags[i].appendChild(span);
				}
				if(key == 'new') {
					var span = document.createElement('span');
					span.className = 'new';
					span.innerHTML = data[i].new;
					flags[i].appendChild(span);
				}
				if(key == 'hot') {
					var span = document.createElement('span');
					span.className = 'hot';
					span.innerHTML = data[i].hot;
					flags[i].appendChild(span);
				}
			}
		}
	})
}
Clothes.prototype.promise = function() {
	this.p1 = new Promise(function(resolve,reject) {
		ajax('get','json/close.json',{},function(data) {
			var data = JSON.parse(data);
			resolve(data);
		})
	})
}
new Clothes();

//大家说 轮播图
function Comments() {
	this.box = document.getElementById('comments-con');
	this.list = document.getElementById('comments-list');
	this.aArrow = document.getElementById('comments-btn').getElementsByTagName('a');
	this.index = 0;
	this.timer = null;
	this.init();
}
Comments.prototype.init = function() {
	var _this = this;
	this.promise();
	this.p1.then(function(data) {
		var str = '';
		for(var i = 0; i < data.length; i++) {
			str += `<li class="comments-item">
								<div class="comments-img">
									<a href="##">
										<img src="${data[i].img}">
									</a>
								</div>
								<div class="comments-txt">
									<p class="user">
										${data[i].user}<span class="comment-time">${data[i].time}</span>
									</p>
									<p class="comments-subtit">
										<span class="subtit1">${data[i].title}</span>
										<span class="comments-price">${data[i].price}</span>
									</p>
									<p class="comments-des">
										${data[i].des}
									</p>
								</div>
							</li>`;
		}
		_this.list.innerHTML = str;
		var commentsItems = document.querySelectorAll('.comments-item');
		var newLi1 = commentsItems[0].cloneNode(true);
		var newLi2 = commentsItems[1].cloneNode(true);
		var newLi3 = commentsItems[2].cloneNode(true);
		_this.list.appendChild(newLi1);
		_this.list.appendChild(newLi2);
		_this.list.appendChild(newLi3);
		_this.iW = commentsItems[0].offsetWidth;
		_this.list.style.width = (_this.iW + 10) * commentsItems.length + 'px';
		_this.moveW = _this.iW + 10;
		_this.len = commentsItems.length;
		_this.autoPlay();
		_this.hover();
		_this.prev();
		_this.next();
	})
}
Comments.prototype.promise = function() {
	this.p1 = new Promise(function(resolve,reject) {
		ajax('get','json/comments.json',{},function(data) {
			var data = JSON.parse(data);
			resolve(data);
		})
	})
}
Comments.prototype.prev = function() {
	var _this = this;
	this.aArrow[0].onclick = function() {
		if(_this.index == 0) {
			_this.index = _this.len - 4;
			_this.list.style.left = - _this.moveW * (_this.index + 1) + 'px';
		} else {
			_this.index --;
		}
		_this.toImg();
	}
}
Comments.prototype.next = function() {
	var _this = this;
	this.aArrow[1].onclick = function() {
		if(_this.index == _this.len - 3) {
			_this.index = 1;
			_this.list.style.left = 0 + 'px';
		} else {
			_this.index++;
		}
		_this.toImg();
	}
}
Comments.prototype.hover = function() {
	var _this = this;
	this.box.onmouseover = function() {
		clearInterval(_this.timer);
	}
	this.box.onmouseout = function() {
		_this.autoPlay();
	}
}
Comments.prototype.autoPlay = function() {
	var _this = this;
	this.timer = setInterval(function() {
		if(_this.index == _this.len - 3) {
			_this.index = 1;
			_this.list.style.left = 0 + 'px';
		} else {
			_this.index ++;
		}
		_this.toImg();
	},2000)
}
Comments.prototype.toImg = function() {
	move(this.list,{left:-this.index * this.moveW});
}
new Comments();

//右侧固定导航实现fixed定位
function Fixed() {
	this.fixBox = document.getElementById('fixed-tool');
	this.backTop = document.getElementById('back-top');
	this.iTop = 300;
	this.fixBox.style.top = this.iTop + 'px';
	this.init();
}
Fixed.prototype.init = function() {
	var _this = this;
	window.addEventListener('scroll',function() {
		var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
		_this.fixBox.style.top = _this.iTop + scrollT + 'px';
		if(scrollT > 400) {
			_this.backTop.style.display = 'block';
		} else {
			_this.backTop.style.display = 'none';
		}
	});
	this.click();
}
Fixed.prototype.click = function() {
	this.backTop.onclick = function() {
		document.documentElement.scrollTop = document.body.scrollTop = 0;
	}
}
new Fixed();
//全局函数 页面滚动始终垂直居中
function verticalCenter(ele) {
	var clientH = document.documentElement.clientHeight;
	var iT = (clientH - ele.offsetHeight)/2;
	ele.style.top = iT + 'px';
	window.onscroll = function() {
		var scrollH = document.documentElement.scrollTop || document.body.scrollTop;
		ele.style.top = iT + scrollH + 'px';
	}
}
//注册页面
function Register() {
	this.closeBtn = document.getElementById('reg-close-btn');
	this.cover = document.getElementById('cover');
	this.box = document.getElementById('register-box');
	this.registerBtn = document.getElementById('register');
	this.clearBtn = document.querySelectorAll('.clear-icon');
	this.info = document.getElementById('register-info');
	this.phoneNum = document.getElementById('register-num');
	this.init();
}
Register.prototype.init = function() {
	this.show();
	this.close();
	this.clear();
	this.validatePhone();
}
//点击注册显示表单
Register.prototype.show = function() {
	var _this = this;
	this.registerBtn.onclick = function() {
		_this.cover.style.display = 'block';
		_this.box.style.display = 'block';
		//注册盒子的垂直居中
		verticalCenter(_this.box);
	}
}

//手机号格式验证
Register.prototype.validatePhone = function() {
	var regPhone = /^1[345678]\d{9}$/;
	var _this = this;
	this.phoneNum.onblur = function() {
		if(this.value) {
			if(!regPhone.test(this.value)) {
				_this.info.style.display = 'block';
				_this.info.innerText = '手机号格式错误';
				this.className = 'red-border';
			}
		} else {
			_this.info.style.display = 'none';
			this.className = '';
		}
	}
	this.phoneNum.onfocus = function() {
		_this.info.style.display = 'none';
		this.className = '';
	}
}
	//清除输入框
Register.prototype.clear = function() {
	var _this = this;
	for(var i = 0; i < this.clearBtn.length; i++) {
		this.clearBtn[i].onclick = function() {
			var ipt = this.previousElementSibling;
			ipt.value = '';
			_this.info.style.display = 'none';
			ipt.className = '';
		}
	}
}
//关闭注册页面
Register.prototype.close = function() {
	var _this = this;
	this.closeBtn.onclick = function() {
		_this.cover.style.display = 'none';
		_this.box.style.display = 'none';
	}
}
new Register();

//login
function Login() {
	this.box = document.getElementById('login-box');
	this.loginBtn = document.getElementById('login');
	this.cover = document.getElementById('cover');
	this.closeBtn = document.getElementById('login-close-btn');
	this.clearBtn = document.querySelectorAll('.clear-icon');
	this.phoneNum = document.getElementById('login-num');
	this.info = document.getElementById('login-info');
	this.init();
}
Login.prototype.init = function() {
	this.show();
	this.close();
	this.clear();
	this.validatePhone();
}
Login.prototype.show = function() {
	var _this = this;
	this.loginBtn.onclick = function() {
		_this.cover.style.display = 'block';
		_this.box.style.display = 'block';
		verticalCenter(_this.box);
	}
}
Login.prototype.close = function() {
	var _this = this;
	this.closeBtn.onclick = function() {
		_this.cover.style.display = 'none';
		_this.box.style.display = 'none';
	}
}
Login.prototype.clear = function() {
	var _this = this;
	for(var i = 0; i < this.clearBtn.length; i++) {
		this.clearBtn[i].onclick = function() {
			var ipt = this.previousElementSibling;
			ipt.value = '';
			_this.info.style.display = 'none';
			ipt.className = '';
		}
	}
}
Login.prototype.validatePhone = function() {
	var regPhone = /^1[345678]\d{9}$/;
	var _this = this;
	this.phoneNum.onblur = function() {
		if(this.value) {
			if(!regPhone.test(this.value)) {
				_this.info.style.display = 'block';
				_this.info.innerText = '手机号格式错误';
				this.className = 'red-border';
			}
		} else {
			_this.info.style.display = 'none';
			this.className = '';
		}
	}
	this.phoneNum.onfocus = function() {
		_this.info.style.display = 'none';
		this.className = '';
	}
}
new Login();

//页面滚动时固定导航的显示与隐藏
function Fixednav() {
	this.searchInner = document.querySelector('.search-inner');
	this.header = document.getElementById('header');
	this.searchBtn = document.getElementById('search-btn');
	this.searchHide = document.getElementById('search-hide');
	this.more = document.getElementById('search-more');
	this.navHide = document.querySelectorAll('.nav-hide');
	this.searchTap = document.getElementById('search-tap');
	this.init();
}
Fixednav.prototype.init = function() {
	this.toggle();
	this.show();
}
Fixednav.prototype.show = function() {
	var _this = this;
	window.addEventListener('scroll',function() {
		var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
		if(scrollT > 200) {
			_this.header.className = 'header fixednav';
			_this.searchHide.style.display = 'none';
		} else {
			_this.header.className = 'header';
			_this.searchHide.style.display = 'inline-block';
		}
	});
}
Fixednav.prototype.toggle = function() {
	var _this = this;
	this.searchBtn.onclick = function() {
		if(_this.searchHide.style.display != 'inline-block') {
			_this.searchTap.style.display = 'block';
		}
		if(_this.header.className == 'header fixednav') {			
			_this.searchHide.style.display = 'inline-block';
			for(var i = 0; i < _this.navHide.length; i++) {
				_this.navHide[i].style.display = 'none';
			}
		}
	}
	this.more.onclick = function() {
		_this.searchHide.style.display = 'none';
		for(var i = 0; i < _this.navHide.length; i++) {
			_this.navHide[i].style.display = 'block';
		}
	}
	this.searchHide.onmouseout = function() {
		_this.searchTap.style.display = 'none';
	}
}
new Fixednav();