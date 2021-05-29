Page({
  data: {
    parameter: [
      { id: 1, name: '原图'}
      ]
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
  }
})