Page({
  data: {
    parameter: [
      { id: 1, name: '原图'}, 
      { id: 2, name: '二值图'}]
      //模拟商品参数数据，如果是线上版本需要自行发起request请求
  },

  onLoad: function (options) {
    let that=this;
    wx.getStorage({//获取本地缓存
      key:"temp_origin",//获取原图缓存
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
    wx.getStorage({//获取本地缓存
      key:"temp_binary",//获取二值图缓存
      success:function(res){
        console.log(res.data)
        that.data.parameter[1].src=res.data;
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
  },
  showresult(){
    wx.showModal({
    title: '图片分割完成！',
    content: '长按细胞图片进行保存',
    success(res) {},
    fail(res) {},
    showCancel: false,
    confirmText: "确定"
  })

  }
})