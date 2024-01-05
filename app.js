//文本显示
var AllText = null
//云环境ID
var cloud_env = 'yume-hanabi-6g7yg15na02fded6'

App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: cloud_env,
        traceUser: true,
      })

      const db = wx.cloud.database({
        env: cloud_env
      });

      // 登录后跳转到指定界面
      const _ = db.command;
      db.collection("info").doc("page").get().then((res) => {
        //console.log(res.data.text)
        wx.setStorageSync('toW', res.data.text)
      });

      //获取显示文本
      db.collection("info").doc("load").get().then((res) => {
        //console.log(res.data.text)
        AllText = res.data.text.split(";")
        //console.log(AllText)
        for (var i = 0; i < AllText.length; i++) {
          wx.setStorageSync('col' + i, AllText[i])
        }
      });
    }
  }
})

App({
  globalData: {
    cloud_env: cloud_env
  }
})