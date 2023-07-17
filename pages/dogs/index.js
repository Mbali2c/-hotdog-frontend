const app = getApp()
const utils = require('../../utils/util')

Page({
  data: {
    pushList: [

    ]
  },
  //事件处理函数
  bindViewTap: function() {
    
  },
  onLoad: function () {
    setInterval(() => {
      this.setData({
        pushList: [
        ]
      })
    }, 5000)
  },

  goToShow: function(e) {
    const id = e.currentTarget.dataset.dogid
    utils.goToShow(id)
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    const page = this
      
    if (typeof this.getTabBar === 'function' &&
    this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }

    wx.request({
      url: `${app.globalData.baseUrl}dogs`,
      method: 'GET',
      header: getApp().globalData.header,
      success(res) {
        const dogs = res.data;

        // Update local data
        const updatedDogs = dogs.map((dog) => {
          return {
            id: dog.id,
            name: dog.name,
            gender: dog.gender,
            image_url: dog.image_urls ? dog.image_urls[0] : '', // Get the first image URL
            neutered: dog.neutered,
            vaccinated: dog.vaccinated,
            // Add more properties: breed and owner
          };
        });
  
        page.setData({
          pushList: updatedDogs, // Set the updated dogs array to pushList
        }, () => {
          console.log("Push List", page.data.pushList)
        });
        
        
        wx.hideToast();
      },
    });
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})
