// pages/test2/test2.js
import * as echarts from '../../components/ec-canvas/echarts';
import chartSetting from 'chart-setting';
const { getWxml, style } = require('./wxml-to-canvas.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    distance: 100,
    duration: 32,
    fuelSaving: 6.8,
    moneySaving: 41.36,
    // 图表相关
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.widget = this.selectComponent('.widget');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart');

    //TODO: 获取页面数据
    const xAxisList = ['08-01', '08-02', '08-03', '08-04', '08-05', '08-06', '08-07', '08-08', '08-09', '08-10', '08-11', '08-12', '08-13', '08-14'];
    const dataList = [120, 200, 150, 80, 70, 110, 130, 120, 300, 150, 80, 70, 110, 130];

    this.ecComponent.init((canvas, width, height, dpr) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 手动初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new 像素
      });
      chartSetting.setOption(chart, {
        xAxisList,
        dataList
      });

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },

  renderToCanvas() {
    // 先保存图片到临时的本地文件，然后存入系统相册
    this.ecComponent.canvasToTempFilePath({
      success: res => {
        // const path = wx.getFileSystemManager().saveFileSync(res.tempFilePath);
        // console.log(path);
        const wxml = getWxml({
          chartPath: res.tempFilePath,
          ...this.data
        })

        // 将内容绘制到canvas上
        const p1 = this.widget.renderToCanvas({ wxml, style })
        p1.then((res1) => {
          console.log('container', res1.layoutBox)
          this.container = res1;
          // canvas转化为图片
          const p2 = this.widget.canvasToTempFilePath();
          p2.then(res2 => {
            this.setData({
              src: res2.tempFilePath,
              width: this.container.layoutBox.width,
              height: this.container.layoutBox.height
            });
            this.userAuth(res2.tempFilePath);
          })
        })
      },
      fail: res => console.log(res)
    });
  },

  /**
   * 保存到相册用户权限判断
   */
  userAuth(downloadPath) {
    wx.getSetting({
      success(res) {
        wx.authorize({
          scope: 'scope.writePhotosAlbum',
          success () {
            // 用户已经同意小程序使用该功能，后续调用 wx.对应接口不会弹窗询问
            // 存入系统相册
            wx.saveImageToPhotosAlbum({
              filePath: downloadPath || '',
              success: res => {
                console.log("success", res)
                wx.showToast({
                  title: '保存成功',
                })
              },
              fail: res => {
                wx.showToast({
                  title: '保存失败',
                  icon: 'none'
                })
              }
            })
          },
          fail(err) {
            console.log(err)
            // 判断用户是否已拒绝授权
            if (res.authSetting['scope.writePhotosAlbum'] === false) {
              wx.showModal({
                title: '提示',
                content: '请授权保存到相册',
                success (res) {
                  if (res.confirm) {
                    wx.openSetting();
                  }
                }
              })
            }
          }
        })
      }
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