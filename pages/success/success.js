//获取全局变量(云环境ID)
const app = getApp();
const cloud_env = app.globalData.cloud_env;

var x //存用户信息

wx.cloud.init();
const db = wx.cloud.database({
  env: cloud_env
});
const _ = db.command;

Page({
  redo(e) {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载onLoad
   */
  onLoad: function (e) {
    var that = this
    //查数据库，获取用户信息
    db.collection("student_data")
      .doc(wx.getStorageSync('num'))
      .get()
      .then((res) => {
        if (res.data != "null") {
          //console.log(res.data.student)
          //该用户存在
          x = res.data.student.split(";")
          wx.setStorageSync('name', x[0])
          wx.setStorageSync('class', x[1])
          wx.setStorageSync('first', x[3])
          wx.setStorageSync('second', x[4])
          wx.setStorageSync('third', x[5])
          wx.setStorageSync('re', x[6])
          wx.setStorageSync('sc', x[7])
          wx.setStorageSync('major', x[8])
          wx.setStorageSync('go', x[9])
          wx.setStorageSync('pw', x[10])
          wx.setStorageSync('sex', x[11])
          //console.log(x)
        }
      });

    var times = 0
    var i = setInterval(function () {
      times++
      if (times >= 10) {
        clearInterval(i)
      }
      var s, a, b, c, d;

      if (x[3] == '1') {
        a = '国际商务'
      }
      if (x[3] == '2') {
        a = '翻译'
      }
      if (x[3] == '3') {
        a = '日本文化'
      }

      if (x[4] == '1') {
        b = '国际商务'
      }
      if (x[4] == '2') {
        b = '翻译'
      }
      if (x[4] == '3') {
        b = '日本文化'
      }

      if (x[5] == '1') {
        c = '国际商务'
      }
      if (x[5] == '2') {
        c = '翻译'
      }
      if (x[5] == '3') {
        c = '日本文化'
      }

      if (x[6] == '1') {
        d = '是'
      }
      if (x[6] == '2') {
        d = '否'
      }

      if (x[11] == '1') {
        s = '男'
      }
      if (x[11] == '2') {
        s = '女'
      }

      if (x != null) {
        //console.log("清除Interval")
        clearInterval(i)
      }

      //获取用户已填写完成得信息
      that.setData({
        name: x[0],
        index0: s,
        class: x[1],
        num: x[2],
        index1: a,
        index2: b,
        index3: c,
        index4: d,
        sc: x[7],
        major: x[8],
        go: x[9],
        info1: '填写完成',
        info2: '您填报的数据如下所示',
      })
      x = null
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  //加载页面文字
  onReady: function () {
    this.setData({
      info1: wx.getStorageSync('col26'),
      info2: wx.getStorageSync('col27'),
      redob: '返回修改',

      col0: wx.getStorageSync('col0'),
      col1: wx.getStorageSync('col1'),
      col2: wx.getStorageSync('col2'),
      col3: wx.getStorageSync('col3'),
      col4: wx.getStorageSync('col4'),
      col5: wx.getStorageSync('col5'),
      col6: wx.getStorageSync('col6'),
      col7: wx.getStorageSync('col7'),
      col8: wx.getStorageSync('col8'),
      col9: wx.getStorageSync('col9'),
    })
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})