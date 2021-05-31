Page({
  data: {
    parameter: [
      { id: 1, name: '原图' ,src:"https://636c-cloud1-1gc9t63z101935b3-1305472261.tcb.qcloud.la/2.png?sign=f35c48f9e6bdbc021472d4f280050b4e&t=1622193619"}],
    image_date: ''
  },
  
  onLoad: function (options) {
    let that=this;
    wx.getStorage({//获取本地缓存
      key:"temp_origin",
      success:function(res){
        console.log(res.data)
        that.data.parameter[0].src=res.data;
        that.data.parameter[0].checked = true;
        that.setData({
          parameter: that.data.parameter,
        })//默认parameter数组的第一个对象是选中的
        console.log(that.data.parameter[0])
      }
    })
  },
  
   // 参数点击响应事件
  parameterTap:function(e){//e是获取e.currentTarget.dataset.id所以是必备的，跟前端的data-id获取的方式差不多
    var that=this
    var this_checked = e.currentTarget.dataset.id
    var parameterList = this.data.parameter//获取Json数组
    for (var i = 0; i < parameterList.length;i++){
      if (parameterList[i].id == this_checked){
        parameterList[i].checked = true;//当前点击的位置为true即选中
      }
      else{
        parameterList[i].checked = false;//其他的位置为false
      }
    }
    that.setData({
      parameter: parameterList
    })
  },

  mytest:async function(){
    var that=this 
    wx.request({
      url: 'http://127.0.0.1:8080/',
      method:'POST',
      data:{
        filepath:this.data.parameter[0].src
      },
      header:{
        'content-type':'application/json'
      },
      success: function (res) {
        // console.log(res.data)
        var base64Data=wx.arrayBufferToBase64(wx.base64ToArrayBuffer(res.data))
        const base64ImgUrl = "data:image/png;base64," + base64Data
        console.log(base64ImgUrl)
        that.setData({
           image_date:base64ImgUrl
        })
      }
    })
  },
  giveup(){
    wx.showModal({
      title: '提示',
      content: '确定放弃操作图片？图片不会保存。',
      success (res) {
        if (res.confirm) {
          wx.redirectTo({
          url: '../indexPage/indexPage',
          success: function(res){},
          fail: function() {},
          complete: function() {}
        })
        } else if (res.cancel) {
        }
      }
    })
  }
})