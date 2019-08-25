import Taro, { Component } from "@tarojs/taro";
import * as echarts from "./ec-canvas/echarts";
import {array} from "prop-types";

function setChartData(chart, data) {

    let dataArr=[];
    let legendArr=[];
    let arr = Object.keys(data);
    let steps=['6千步以下','6~8千步','8千~1万步','1~1.5万步','1.5万步以上'];
    for (let i = 1; i <= arr.length; i++) {
      let a = {
          "value": data[i].num,
          "name": steps[i-1],
      };
      let b = data[i].desc;
      legendArr.push(b);
      dataArr = dataArr.concat(a)
    }
  let option = {
    color:['#f14864','#1890ff','#2fc25b','#facd13','#fa3df3'],
    series : [
      {
        name: '访问来源',
        type: 'pie',
        center : ['48%','52%'],
        radius : ['0.1%','55%'],
        data: dataArr,
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: true,
            position: 'outside',
            formatter: '{c}天',
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '20',
              fontWeight: 'bold'
            }
          },
        },
        labelLine: {
          normal: {
            show: true,
            length:12,
            length2:1,
          }
        }
        // itemStyle: {
        //   emphasis: {
        //     shadowBlur: 10,
        //     shadowOffsetX: 0,
        //     shadowColor: 'rgba(0, 0, 0, 0.5)'
        //   }
        // }
      }
    ]
  };
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
