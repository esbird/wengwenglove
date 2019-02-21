export default function (shareParams, success, cancel= ()=>{}) {
  console.log('shareParams',shareParams)
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。移动端会通过弹窗来提示相关信息。如果分享信息配置不正确的话，可以开了看对应报错信息
    appId: shareParams.appid,
    timestamp: shareParams.timestamp,
    nonceStr: shareParams.noncestr,
    signature: shareParams.sign,
    jsApiList: [ //需要使用的JS接口列表,分享默认这几个，如果有其他的功能比如图片上传之类的，需要添加对应api进来
      'checkJsApi',
      'onMenuShareTimeline', //
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo'
    ]
  });
  window.share_config = {
    "share": {
      // "imgUrl": "http://www.yourwebsite.com/share.png", //分享图，默认当相对路径处理，所以使用绝对路径的的话，“http://”协议前缀必须在。
      // "desc": "你对页面的描述", //摘要,如果分享到朋友圈的话，不显示摘要。
      "title": `${shareParams.nickname} 邀请你助力ta解锁卡片，点击帮助ta脱单`, //分享卡片标题
      "link": shareParams.url2, //分享出去后的链接，这里可以将链接设置为另一个页面。
      "success": success,
      'cancel': cancel
    }
  };
  wx.ready(function () {
    wx.onMenuShareAppMessage(share_config.share); //分享给好友
    wx.onMenuShareTimeline(share_config.share); //分享到朋友圈
    wx.onMenuShareQQ(share_config.share); //分享给手机QQ
  });
}
