import Taro, { Component } from "@tarojs/taro";
import * as echarts from "./ec-canvas/echarts";

function setChartData(chart, data) {
  var dataAxis = ['一', '二', '三', '四', '五'];
  data = [220, 182, 191, 234, 290];


  var option = {
    backgroundColor: '#2bba89',
    grid:{
      left:0,
      top:0,
      right:0,
      bottom:0,
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        inside: true,
        textStyle: {
          color: '#fff'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: 'black',
          width: 1,
          type: 'solid'
        }
      },
      z: 10
    },
    yAxis: {
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine:{
        show:false
      }
    },

    series: [
      { // For shadow
        type: 'bar',
        itemStyle: {
          normal: {color: 'rgba(0,0,0,0.05)'}
        },
        barGap:'-100%',
        barCategoryGap:'40%',
        animation: false
      },
      {
        type: 'bar',
        itemStyle: {
          normal: {
            barBorderRadius: [32,32,0,0],
            color: new echarts.graphic.LinearGradient(
                0, 0, 1, 0,
                [
                  {offset: 0, color: '#62deb4'},
                  {offset: 1, color: '#94ffdc'}

                ]
            )
          }
        },
        data: data
      }
    ]
  }
  if (data && data.dimensions && data.measures) {
    option.xAxis[0].data = data.dimensions.data
    option.series = data.measures.map(item => {
      return {
        ...item,
        type:'bar',
      }
    })
  }
  chart.setOption(option);
}

export default class PieChart extends Component {
  config = {
    usingComponents: {
      "ec-canvas": "./ec-canvas/ec-canvas"
    }
  };

  constructor(props) {
    super(props);
  }

  state = {
    ec: {
      lazyLoad: true
    }
  };

  refresh(data) {
    this.Chart.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setChartData(chart, data);
      return chart;
    });
  }

  refChart = node => (this.Chart = node);

  render() {
    return (
      <ec-canvas
        ref={this.refChart}
        canvas-id="mychart-area"
        ec={this.state.ec}
      />
    );
  }
}
