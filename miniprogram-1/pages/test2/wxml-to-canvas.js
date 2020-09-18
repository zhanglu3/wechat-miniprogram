function getWxml(data) {
  const {
    distance,
    duration,
    fuelSaving,
    moneySaving,
    chartPath
  } = data;

  const wxml = `
  <view class="container">
    <view class="data-panel">
      <view class="data-item item-width">
        <text class="info-num item-width">${distance}KM</text>
        <text class="info-tip item-width">累计总里程</text>
      </view>
      <view class="data-item item-width">
        <text class="info-num item-width">${duration}天</text>
        <text class="info-tip item-width">陪伴时长</text>
      </view>
      <view class="data-item item-width">
        <text class="info-num item-width">${fuelSaving}升</text>
        <text class="info-tip item-width">累计节省燃油</text>
      </view>
      <view class="data-item item-width">
        <text class="info-num item-width">${moneySaving}元</text>
        <text class="info-tip item-width">累计节省金钱</text>
      </view>
    </view>
    <text class="title">每日里程</text>
    <image class="chart" src="${chartPath}"></image>
  </view>
  `
  return wxml;
}

const style = {
  container: {
    width: 414,
    height: 1000,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  dataPanel: {
    width: 414,
    height: 82,
    flexDirection: 'row',
  },
  itemWidth: {
    width: 103.5,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  dataItem: {
    height: 82,
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 16,
    paddingBottom: 16,
  },
  infoNum: {
    height: 30,
    fontSize: 20,
    color: '#54585A',
  },
  infoTip: {
    height: 20,
    fontSize: 13,
    color: '#939799',
  },
  title: {
    width: 414,
    height: 44,
    fontSize: 16,
    fontWeight: 600,
    textAlign: 'center',
    verticalAlign: 'middle',
    color: '#54585A',
  },
  chart: {
    width: 414,
    height: 365,
  },
}

module.exports = {
  getWxml,
  style
}
