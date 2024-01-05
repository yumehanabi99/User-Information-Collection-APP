var x = null; //存用户信息
var ifexist = 0; //用户是否存在

//获取全局变量(云环境ID)
const app = getApp();
const cloud_env = app.globalData.cloud_env;

//初始化数据库
wx.cloud.init();
const db = wx.cloud.database({
  env: cloud_env
});
const _ = db.command;

// 加密算法引入
var util = require('../../utils/util.js');

//云函数，获取openid
/*
wx.cloud.callFunction({
  name: 'cloud_func',
  data: {
    message: 'helloCloud',
  }
}).then(res => {
  console.log(res.result.openid)
})
*/

//进入管理员页面
/*
function ToAdmin(){
  if(e.detail.value.userName == "ryxyadmin"){
    wx.navigateTo({
      url: '../admin/admin',
      success: function () {},
      fail: function () {},
      complete: function () {}
    })
  }
}
*/

//显示消息框方法
function Mess(text) {
  wx.showToast({
    title: text,
    icon: 'none',
    duration: 3000
  })
}

//跳转页面方法
function TrunTo(page) {
  wx.navigateTo({
    url: '../' + page + '/' + page,
    success: function () {},
    fail: function () {},
    complete: function () {}
  })
}

Page({
  data: {
    loginb: "　登录　",
  },
  formBindsubmit: function (e) {
    var that = this
    wx.setStorageSync('num', e.detail.value.userName)
    //确认用户是否已输入账号密码
    if (e.detail.value.psw != "" && e.detail.value.userName != "") {
      //查数据库，确认用户是否存在
      db.collection("student_data").doc(e.detail.value.userName).get({
        fail(err) {
          Mess('用户名不存在')
        }
      })

      //用户存在则
      db.collection("student_data")
        .doc(e.detail.value.userName)
        .get()
        .then((res) => {
          if (res.data != "null") {
            //console.log(res.data.student)
            that.setData({
              logindis: 'disabled',
              loginb: "登录中"
            })

            x = res.data.student.split(";")

            //初始化新用户数据
            if (res.data.student.split(";").length == 2) {
              var user_info = res.data.student + ";" + res.data._id + ";0;0;0;0;;;;" + util.sha1(res.data._id.substring(4, 10)) + ";0"
              //console.log(user_info)
              x = user_info.split(";")
              db.collection('student_data').doc(res.data._id).update({
                data: {
                  student: user_info
                },
                success: function (res) {
                  //console.log(res.data)
                }
              })
            }

            //该用户存在
            var list = ['name', 'class', 'UNDEF', 'first', 'second', 'third', 're', 'sc', 'major', 'go', 'pw', 'sex']
            for (var i = 0; i < list.length; i++) {
              wx.setStorageSync(list[i], x[i])
            }

            //验证密码
            if (util.sha1(e.detail.value.psw) == x[10] && e.detail.value.userName == x[2]) {
              //console.log('密码正确')
              if (((e.detail.value.userName) + '').substring(4, 10) == e.detail.value.psw) {
                wx.showModal({
                  title: '提示',
                  content: '您的密码为初始密码，是否修改密码',
                  success(res) {
                    if (res.confirm) {
                      that.setData({
                        un: '',
                        ps: ''
                      })
                      TrunTo('pw')
                    } else if (res.cancel) {
                      that.setData({
                        un: '',
                        ps: ''
                      })
                      TrunTo(wx.getStorageSync('toW')) //改
                    }
                  }
                })
              } else {
                that.setData({
                  un: '',
                  ps: ''
                })
                TrunTo(wx.getStorageSync('toW')) //改
              }
            } else {
              that.setData({
                logindis: '',
                loginb: "　登录　"
              })
              Mess('密码错误')
            }
            //console.log(x)
            x = null
            ifexist = 1;
          } else {
            ifexist = 0;
          }
        });
    } else {
      Mess('请输入学号和密码')
    }

    //设置超时
    var times = 0
    var i = setInterval(function () {
      times++
      //console.log('Interval启动')
      if (ifexist == 0) {
        clearInterval(i)
      }
      if (times >= 5) {
        that.setData({
          logindis: '',
          loginb: "　登录　"
        })
        Mess('无法连接网络或该用户不存在')
        clearInterval(i)
      }
      if (ifexist == 1) {
        that.setData({
          logindis: '',
          loginb: "　登录　"
        })
        //console.log('数据加载完毕')
        //console.log('清除Interval')
        clearInterval(i)
        //清除用户信息
        x = null
      } else {
        x = null
      }
    }, 1000)
  },

  pw: function () {
    TrunTo('pw')
    x = null
  },
  rg: function () {
    TrunTo('rg')
    x = null
  }
})