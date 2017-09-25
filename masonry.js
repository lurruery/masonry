/**
 * Created by lurruery on 21/09/17.
 * 轻量级瀑布流插件, 目前只支持img...
 */

(function( global, factory ) {

  var version = '1.0.0';
  var heightArr = [];    //全局数组,用来存放数组高度信息

  //构建构造函数对象
  var Masonry = function(selectorElem, opt) {
    this.selectorElem = selectorElem;
    this.elemWidth = opt.elemWidth;
    this.marginWidth = opt.marginWidth || 25;              //间距
    this.itemSelector = opt.itemSelector;
    this.beforImgLoading = opt.beforImgLoading || function(){};      //图片加载前的回调
    this.LoadComplete = opt.LoadComplete || function(){};            //图片加载完成后的回调
  }

  Masonry.prototype = {
    constructor: Masonry,
    selector:function(agrs) {
      this.elements = [];
      switch (agrs.charAt(0)) {
        case '#':
          // id选择器
          this.elements.push(document.getElementById(agrs.substring(1)));
          break;
        case '.':
          // class 选择器
          this.elements = document.getElementsByClassName(agrs.substring(1));
          break;
        default :
          // 标签
          this.elements = document.getElementsByTagName(agrs);
          break;
      }
      return this.elements;
    },

    //设置元素属性
    setAttr:function(elem, attr) {
      var str = '';
      for(var key in attr) {
        str = str + key + ':' + attr[key] + ';';
      }
      return elem.setAttribute('style', str);
    },

    //判断图片是否全部加载完成;
    imgLoadComplete:function(imgArr, callback){
      var _this =  this;
      var img = [];
      var flag = 0;
      var imgTotal = imgArr.length;
      var tag = false;
      for(var i = 0 ; i < imgTotal ; i++) {
        img[i] = new Image()
        img[i].src = imgArr[i]
        img[i].onload = function(){
          flag++
          if( flag === imgTotal ){
            if(typeof _this.LoadComplete === 'function') {
              _this.LoadComplete();
            }
            callback();
            tag = true;
          }
        }
      }
      if(tag === false){
        if(typeof _this.beforImgLoading === 'function') {
          _this.beforImgLoading();
        }
      }
    },

    //计算当前数组中,最小的数及其索引值
    minNum:function(arr){
      var min = arr[0];
      var index = 0;
      for (var i = 1; i < arr.length; i++){
        if (arr[i] < min){
          min = arr[i];
          index = i;
        }
      }
      return {
        min:min,
        index:index,
      };
    },

    init:function() {
      var _this = this;
      var elem = _this.selector(_this.itemSelector);
      var length = elem.length;
      var outWidth = _this.selector(_this.selectorElem)[0].clientWidth;                     //外层容器宽度
      var num = parseInt(outWidth / (_this.elemWidth + _this.marginWidth));                 //每行存放个数
      var imgArr = [];
      var top = 0;
      var index = 0;
      var curArr = []; //当前数组
      for(var i = 0; i < length; i++) {
        var $img = elem[i].children[0].children[0].src;
        imgArr.push($img);
      }

      this.imgLoadComplete(imgArr, function(){
        _this.setAttr(_this.selector(_this.selectorElem)[0], {
          position:'relative'
        })
        for(var i = 0; i < length; i++) {
          if(typeof elem[i].children !== undefined) {
            var $elem = elem[i].children;
            heightArr.push(elem[i].clientHeight);
            if(i < num) {
              curArr.push(elem[i].clientHeight);
              index = i;
            } else {
              top = _this.minNum(curArr).min;
              index = _this.minNum(curArr).index;
              curArr[index] = top + _this.marginWidth + heightArr[i];
            }
            _this.setAttr(elem[i], {
              position:'absolute',
              top:curArr[index] - elem[i].clientHeight + 'px',
              left:(_this.elemWidth + _this.marginWidth) * (index % num) +'px'
            });
          }
        }
      })
    }
  }

  if ( typeof window !== 'undefined' ) {
    window.masonry = Masonry;
  }
  return Masonry;
})(window);
