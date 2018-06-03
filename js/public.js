//ajax封装
function ajax(method, url, json, succCb, errCb) {
    //创建一个ajax对象
    var xml = new XMLHttpRequest() || new ActiveXObject("Microsoft,XMLHTTP");
    //处理用户向服务器请求的数据 
    var str = "";
    for (var key in json) {
        str += "&" + key + "=" + json[key];
    }
    str = str.slice(1);
    //如何用户的请求是一个get请求的话
    if (method == "get") {
        url = url + "?" + str;
        xml.open("get", url, true);
        xml.send();
    } else {
        xml.open("post", url, true);
        //设置请求头
        xml.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        //post的请求数据要放在send里面
        xml.send(str)
    }
    xml.onreadystatechange = function() {
        if (xml.readyState == 4 && xml.status == 200) {
            succCb && succCb(xml.responseText)
        } else {
            errCb && errCb(xml.status)
        }
    }
}


function getStyle(obj, attr) {
  if (obj.currentStyle) {
      return getStyle = function() {
          return obj.currentStyle[attr];
      }
  } else {
      return getStyle = function() {
          return getComputedStyle(obj, false)[attr];
      }
  }
  return getStyle(obj, attr);
}
