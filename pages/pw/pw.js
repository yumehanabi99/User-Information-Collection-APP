var x;
var ifexist = 0;

//获取全局变量(云环境ID)
const app = getApp();
const cloud_env = app.globalData.cloud_env;

wx.cloud.init();
const db = wx.cloud.database({
  env: cloud_env
});
const _ = db.command;

var util = require('../../utils/util.js'); // 加密算法引入

function Mess(text) {
  wx.showToast({
    title: text,
    icon: 'none',
    duration: 3000
  })
}

Page({
  data: {
    col4: '学号',
    col17: '请输入',
    col38: '原密码',
    col39: '新密码',
    col40: '确认密码',
    col41: '密码不限制长度及字符组合',
    col42: '请妥善保管个人密码',
    col43: '提交'
  },

  formBindsubmit: function (e) {
    x = null
    if (e.detail.value.psw != "" && e.detail.value.userName != "" && e.detail.value.newpsw != "" && e.detail.value.cnewpsw != "" && e.detail.value.newpsw == e.detail.value.cnewpsw) {
      db.collection("student_data").doc(e.detail.value.userName).get({
        fail(err) {
          Mess('用户名不存在')
        }
      })

      db.collection("student_data")
        .doc(e.detail.value.userName)
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
            var s1 = e.detail.value.cnewpsw
            if (s1.indexOf(";") == -1) {
              ifexist = 1;
            } else {
              Mess('错误：不得含有英文半角冒号')
            }
            if (x[10] != util.sha1(e.detail.value.psw)) {
              Mess('原密码不正确，请检查！')
            }
          } else {
            //不可达代码
            ifexist = 0;
          }
        });
    } else {
      if (e.detail.value.newpsw != e.detail.value.cnewpsw) {
        Mess('错误：新密码与确认密码不一致')
      }
      if (e.detail.value.psw == "" || e.detail.value.userName == "" || e.detail.value.newpsw == "" || e.detail.value.cnewpsw == "") {
        Mess('错误：信息未填写完整')
      }
    }

    setTimeout(function () {
      if (ifexist == 1) {
        if (util.sha1(e.detail.value.psw) == x[10] && e.detail.value.userName == x[2]) {
          x[10] = util.sha1(e.detail.value.cnewpsw)
          //console.log("提交上传" + x)
          db.collection('student_data').doc(x[2]).update({
            data: {
              student: x[0] + ';' + x[1] + ';' + x[2] + ';' + x[3] + ';' + x[4] + ';' + x[5] + ';' + x[6] + ';' + x[7] + ';' + x[8] + ';' + x[9] + ';' + x[10] + ';' + x[11]
            },
            success: function (res) {
              Mess('修改成功，请返回登录')
              ifexist = 0
            },
            fail: function (res) {
              Mess('密码修改失败')
              ifexist = 0
            }
          })
        }
      }
    }, 1000);
  }
})