//获取全局变量(云环境ID)
const app = getApp();
const cloud_env = app.globalData.cloud_env;

wx.cloud.init()

//console.log(wx.getStorageSync('usern'))
Page({
  data: {
    color: "grey",
  },

  //初始化界面文字
  onReady: function (e) {
    this.setData({
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
      col10: wx.getStorageSync('col10'),
      col11: wx.getStorageSync('col11'),
      col12: wx.getStorageSync('col12'),
      col13: wx.getStorageSync('col13'),
      col14: wx.getStorageSync('col14'),
      col15: wx.getStorageSync('col15'),

      num: wx.getStorageSync('num'),
      name: wx.getStorageSync('name'),
      class: wx.getStorageSync('class'),
      sc: wx.getStorageSync('sc'),
      major: wx.getStorageSync('major'),
      go: wx.getStorageSync('go'),
      index1: wx.getStorageSync('first'),
      index2: wx.getStorageSync('second'),
      index3: wx.getStorageSync('third'),
      index4: wx.getStorageSync('re'),
      index0: wx.getStorageSync('sex'),
    });
  },

  data: {
    col17: '请输入',
    array: ['请选择', '国际商务', '翻译', '日本文化'],
    objectArray: [{
        id: 0,
        name: '请选择'
      }, {
        id: 1,
        name: '国际商务'
      },
      {
        id: 2,
        name: '翻译'
      },
      {
        id: 3,
        name: '日本文化'
      },
    ],

    array2: ['请选择', '是', '否'],
    objectArray2: [{
        id: 0,
        name: '请选择'
      }, {
        id: 1,
        name: '是'
      },
      {
        id: 2,
        name: '否'
      },
    ],

    array0: ['请选择', '男', '女'],
    objectArray0: [{
        id: 0,
        name: '请选择'
      }, {
        id: 1,
        name: '男'
      },
      {
        id: 2,
        name: '女'
      },
    ],
  },

  bindPickerChange0: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index0: e.detail.value
    })
  },
  bindPickerChange1: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  bindPickerChange3: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value
    })
  },
  bindPickerChange4: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index4: e.detail.value
    })
  },

  //提交数据库
  formBindsubmit: function (e) {
    var uploads = '_' + wx.getStorageSync('name') + wx.getStorageSync('class') + wx.getStorageSync('num') + e.detail.value.one + e.detail.value.two + e.detail.value.three + e.detail.value.tiaoji + e.detail.value.s + e.detail.value.m + e.detail.value.g + wx.getStorageSync('pw') + e.detail.value.sexx;
    if (uploads.indexOf(";") != -1) {
      wx.showToast({
        title: '输入信息不得含有英文冒号或半角冒号，请查找并修改后提交',
        icon: 'none',
        duration: 5000
      })
    } else {
      var info = wx.getStorageSync('name') + ';' + wx.getStorageSync('class') + ';' + wx.getStorageSync('num') + ';' + e.detail.value.one + ';' + e.detail.value.two + ';' + e.detail.value.three + ';' + e.detail.value.tiaoji + ';' + e.detail.value.s + ';' + e.detail.value.m + ';' + e.detail.value.g + ';' + wx.getStorageSync('pw') + ';' + e.detail.value.sexx
      const db = wx.cloud.database({
        env: cloud_env
      });
      db.collection('student_data').doc(wx.getStorageSync('num')).update({
        // data 传入需要局部更新的数据
        data: {
          student: info
        },
        success: function (res) {
          console.log(res.data)
        }
      })

      //通过index.js中云函数获取openid上传到数据库
      /*
      db.collection('log').add({
        data: {
          student: wx.getStorageSync('num')
        },
        success: function (res) {
          console.log(res.data)
        }
      })
      */

      //跳转页面
      wx.navigateTo({
        url: '../success/success',
        success: function () {},
        fail: function () {},
        complete: function () {}
      })
    }
  },
})