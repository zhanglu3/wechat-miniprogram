// 行驶统计-柱状图配置

function setOption(chart, opts) {
  // 由于后续支持用户自定义查询时间段，所以数据量不定，限制缩放区域默认只展示最多7条数据
  const len = opts.dataList.length;
  const maxIdx = len < 7 ? len - 1 : 6;

  const option = {
    grid: {left: '0', top: '20', right: '0'},
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {color: 'rgba(85, 85, 85, 0.31)'}
      },
      axisTick: {show: false},
      axisLabel: {
        interval: 0
      },
      data: opts.xAxisList
    },
    yAxis: {
        type: 'value',
        position: 'right',
        axisLine: {show: false},
        axisTick: {show: false},
        axisLabel: {
          show: false,
          inside: true,
          margin: 0,
          align: 'right',
          padding: [0, 0, 15, 0],
          color: 'rgba(85, 85, 85, 0.31)',
          formatter: '{value}km'
        },
        splitLine: {
          lineStyle: {color: 'rgba(85, 85, 85, 0.31)'}
        }
    },
    dataZoom: [
      { 
          // 滑动条型数据区域缩放
          type: 'slider',
          show: false,
          xAxisIndex: [0],
          startValue: 0, // 通过限制起始与结束的索引，默认只展示最多7条数据
          endValue: maxIdx,
          zoomLock: false, //锁定区域禁止缩放(只能平移，禁止鼠标滚动缩放)
      },
      {
          // 内置型数据区域缩放
          type: 'inside',
          xAxisIndex: [0],
          startValue: 0,
          endValue: maxIdx,
          zoomLock: false, //锁定区域禁止缩放
      }
    ],
    series: [{
        data: opts.dataList,
        type: 'bar',
        label: {
          show: true,
          position: 'top',
          formatter: '{c}km',
          color: '#939799'
        },
        itemStyle: {
          color: '#00BEBE',
          barBorderRadius: [5, 5, 0, 0]
        },
        barWidth: 8,
        barCategoryGap: '30%'
    }]
  };
  chart.setOption(option);
}

export default {
  setOption
}
