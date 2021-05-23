Page({
  data: {
    parameter: [
      { id: 1, name: '原图' ,src:"cloud://cloud1-1gc9t63z101935b3.636c-cloud1-1gc9t63z101935b3-1305472261/2.png"}, 
      { id: 2, name: '二值图' ,src:"cloud://cloud1-1gc9t63z101935b3.636c-cloud1-1gc9t63z101935b3-1305472261/origin.png"}]
      //模拟商品参数数据，如果是线上版本需要自行发起request请求
  },

  onLoad: function (options) {
     this.data.parameter[0].checked = true;
    this.setData({
      parameter: this.data.parameter,
    })//默认parameter数组的第一个对象是选中的
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