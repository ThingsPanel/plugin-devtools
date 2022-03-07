<template>
  <div class="chart-all">
      <div class="chart-top">
        <div style="color: #fff">甲醛浓度</div>
        <div style="color: #5b92ff">formaldehyde</div>
      </div>
      <div class="chart-body" :id="'chart_' + id">
      </div>
      <div class="chart-bottom">
        <img class="chart-img" src="../assets/greenLoop.png" alt="">
      </div>
  </div>
</template>
<script>
  import * as echarts from "echarts";
  export default {
    data() {
      return {
        id: "1",
        chart: null,
      };
    },
    mounted() {
      this.initChart();
      const resizeObserver = new ResizeObserver((entries) => {
        //回调,重置图表大小
        this.chart && this.chart.resize();
      });
      resizeObserver.observe(document.getElementById("chart_" + this.id));
    },
    methods: {
      initChart() {
        console.log("---------------------------------初始化图表开始");
        var chartDom = document.getElementById("chart_" + this.id);
        this.chart = echarts.init(chartDom);
        var option;
        //option为数据模板
        option = {
          series: [
            {
              type: 'gauge',
              min: 0,
              max: 0.1,
              progress: {
                show: true,
                width: 10
                // color:'#3ECF63'
              },
              itemStyle: {
                color: '#3ECF63'
              },
              pointer: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  width: 10
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                length: 15,
                lineStyle: {
                  width: 0,
                  // color: '#999'
                }
              },
              axisLabel: {
                distance: 25,
                color: '#999',
                fontSize: 0
              },
              // anchor: {
              //   show: false,
              //   showAbove: false,
              //   size: 25,
              //   itemStyle: {
              //     borderWidth: 10
              //   }
              // },
              title: {
                show: true,
                fontSize: 15,
                color: '#5B92FF',
                offsetCenter: [0, '15%'],
              },
              detail: {
                valueAnimation: true,
                width: '80%',
                lineHeight: 40,
                borderRadius: 8,
                offsetCenter: [0, '-10%'],
                fontSize: 40,
                fontWeight: 'bolder',
                formatter: '{value}',
                color: '#fff'
              },
              data: [
                {
                  value: 0.023,
                  name: 'mg/m3'
                }
              ]
            }
          ]
        };
        //this.chart.clear();
        this.chart.setOption(option);
        // window.addEventListener("resize", () => {
        //   this.chart.resize();
        // });
        console.log("---------------------------------初始化图表完成");
      },
      /**
       * 重置图表大小
       */
      resizeChart() {
        /* eslint-disable no-unused-expressions */
        this.chart && this.chart.resize();
      },
    },
  };
</script>
<style scoped>
  .chart-all {
    max-width: 384px;
    width: 100%;
    height: 95%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid rgb(111, 189, 139);
  }

  .chart-top {
    text-align:center;
    width: 100%;
    height: 10%;
    border: 1px solid rgb(187, 46, 46);
  }

  .chart-body {
    /* margin: 5%; */
    width: 100%;
    height: 90%;
    border: 1px solid rgb(23, 173, 60);
  }

  .chart-bottom {
    position: relative;
    top: -90%;
    width: 100%;
    height: 90%;
    border: 1px solid rgb(155, 211, 25);
  }

  .chart-img {
    max-width: 60%;
    max-height: 60%;
    /* width: 100%; */
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    /* padding-bottom: 9%; */

    /* margin-top: -165px; */
    border: 1px solid rgb(187, 46, 46);


  }
</style>