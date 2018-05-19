//头部公告文字向上滚动轮播
let noticeUl = document.getElementById('scroll-notice');
let aNoticeLi = noticeUl.getElementsByTagName('li');
let newNli = aNoticeLi[0].cloneNode(true);
let noticeBox = document.querySelector('.carousel-notice');
noticeUl.appendChild(newNli);
let indexN = 0;
let nH = aNoticeLi[0].offsetHeight;
let nTimer = null;
noticeBox.onmouseover = function() {
	clearInterval(nTimer);
}
noticeBox.onmouseout = function() {
	autoPlayN();
}
autoPlayN();
function autoPlayN() {
	nTimer = setInterval(function() {
		if(indexN == aNoticeLi.length-1) {
			indexN = 1;
			noticeUl.style.top = 0;
		} else {
			indexN++;
		}
		scrollN();
	},3000)
}
function scrollN() {
	move(noticeUl,{top:-indexN*nH});
}
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
let searchTxt = document.getElementById('search-txt');
let placeText = document.getElementById('place-text');
searchTxt.oninput = function() {
	if(this.value) {
		placeText.style.display = 'none';
	} else {
		placeText.style.display = 'block';
	}
}
searchTxt.onblur = function() {
	if(this.value) {
		placeText.style.display = 'none';
	} else {
		placeText.style.display = 'block';
	}
}

//nav的tab效果
let navItem = document.querySelectorAll('.navtap');
for(let i = 0; i < navItem.length; i++) {
	navItem[i].onmouseover = function() {
		this.children[1].style.display = 'block';
	}
	navItem[i].onmouseout = function() {
		this.children[1].style.display = 'none';
	}
}

