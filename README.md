## Description
轻量级javascript 瀑布流插件, 不依赖任何插件

### 调用方式

```java 
  new masonry('.grid',{
    elemWidth: 410,                   /* 外层元素宽度 */
    marginWidth: 25,                  /* 子元素间距 默认25 */
    itemSelector: '.grid-item',       /* 子元素class */
    beforImgLoading:function() {      /* 图片加载前的回调 */
     consolo.log('图片正在加载中...');
    },
    LoadComplete:function(){          /* 图片加载后的回调 */
      console.log('图片加载完成!');
    }
  }).init();
```


-- EOF --
