個人情報収集用WeChatミニアプリ（希望コース情報収集）<br />
用于收集个人信息的微信小程序（专业方向填报）
====================
当時私の大学の専攻は日本語で、そして国際ビジネス、翻訳、日本文化という三つのコースに分けられ、学生の志望コースを収集するために、先生から頼んでこのミニアプリを作りました。
ソースコードのアップロードは先生の同意を得ました。
開発言語：html+JavaScript+CSS

小程序开发背景：当时受学校老师委托，希望我能开发一种实现收集学生填报的专业方向、绩点等信息的小程序。由于本人毕业现小程序已不使用，源码公开已经老师同意。
语言：html+JavaScript+CSS

主な機能を説明<br />
小程序主要功能说明
====================

ミニアプリは、ユーザーの登録、パスワードの修正、情報入力、アプロード、サーバーから情報をゲットして修正などの機能が含まれます。
小程序主要实现了用户登录、修改密码、填写信息、上传信息、从服务器获取已填写信息并修改等功能。

1.メインページ：ユーザーがアカウントとパスワードを入力し、ログインします。 <br />
1.登录界面（主页）：首先用户需要输入账号和密码，第一次登录会被提示修改密码。
(ソースコード：pages/index)  
<br />
![image](https://github.com/yumehanabi99/zhuanyefangxiangtianbao/blob/master/%E8%AA%AC%E6%98%8E%E7%94%A8/index.png)  
<br />
<br />
2．自分の情報を入力し、ボタンを押してクラウドサーバーにアップロードします。<br />
2．进入输入信息页面，用户填写信息完毕后下拉至最后点击上传按钮即可上传。
(ソースコード：pages/select)  
<br />
![image](https://github.com/yumehanabi99/zhuanyefangxiangtianbao/blob/master/%E8%AA%AC%E6%98%8E%E7%94%A8/i.png)  
<br />
<br />
3．確認するために、もう一回クラウドサーバーからデータをダウンロードし見せます。  <br />
3．在上传前，会显示确认页面，信息无误即可确认上传。
(ソースコード：pages/success)  
![image](https://github.com/yumehanabi99/zhuanyefangxiangtianbao/blob/master/%E8%AA%AC%E6%98%8E%E7%94%A8/queren.PNG)  
