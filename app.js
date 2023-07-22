App({
  onLaunch() {
    const logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    const app = this
    wx.login({
      success: res => {
        // console.log(app.globalData.headers)
        wx.request ({
          // url: 'http://localhost:3000/api/v1/login',
          url: `${app.globalData.baseUrl}login`,
          method: 'POST',
          data: { code: res.code }, // pass code in request body
          success(loginRes) {
            console.log(loginRes)
            app.globalData.owner = loginRes.data.owner
            app.globalData.header = loginRes.data.headers
            console.log(123,loginRes.data.headers) // { data: { headers: { "X-USER-TOKEN": <User Token> }, user: <User Object> }, ... }
            console.log("owner",loginRes.data.owner)
          },

          fail(loginErr){
            console.error({loginErr})
          }
        })
      }
    }),

    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });

    this.loadCustomFont();
  },
    // Load custom font
    
  loadCustomFont: function () {
    wx.loadFontFace({
      family: "Quicksand",
      global: true,
      source: 'url("/pages/index/Quicksand-bold.ttf")',
      desc: {
        style: "normal",
        weight: "bold"
      },
      complete: (msg) => {
        // console.log(msg)
      }
    });
  
    wx.loadFontFace({
      family: "Quicksand",
      global: true,
      source: 'url("/pages/index/Quicksand-regular.ttf")',
      desc: {
        style: "normal",
        weight: "normal"
      },
      complete: (msg) => {
        // console.log(msg)
      }
    });

    wx.loadFontFace({
      family: "Quicksand",
      global: true,
      source: 'url("/pages/index/Quicksand-light.ttf")',
      desc: {
        style: "normal",
        weight: "light"
      },
      complete: (msg) => {
        // console.log(msg)
      }
    });
  },
  
  globalData: {
    userInfo: null,
    owner: null,
    header: {},
    baseUrl: 'http://localhost:3000/api/v1/'
  }
})
