//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUser:function(e){
    console.log(e);
  }
  ,getUserInfo: function(e) {
    wx.request({
      url: 'http://160a3b09.nat123.cc/getCardSign',

      success:function(res){
        console.log(res.data);
        var data = res.data;
        wx.addCard({
          cardList: [{
            cardId: data.cardId,
            cardExt: JSON.stringify({
              "timestamp": data.timestamp,
              "api_ticket": data.ticket,
              "nonce_str": data.nonce_str,
              "signature": data.signature
            })
          }],
          success: function (res) {
            console.log(res);
          }, complete:function(res){
            console.log(res);
          }
        })
      }
    })
    
  }
})
