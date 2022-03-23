<template>
  <div class="chart-all">
      <div class="chart-top">
        <div style="color: #fff">PM2.5曲线</div>
        <div style="color: #5b92ff">PM2.5curve</div>
      </div>
      <div class="chart-body" :id="'chart_' + id">
      </div>
      <div class="chart-bottom">
        <!-- <img class="chart-img" src="../assets/greenLoop.png" alt=""> -->
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
          title: {
            show: false,
            text: '曲线图',
            textStyle: {
              align: "center",
              verticalAlign: "middle",
            },
            top: 10,
            left: "10",
          },
          legend: {
            show: true,
            top: 10,
            textStyle: {
              color: "#fff",
            },
            // data: [],
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#41D061",
              },
            },
          },
          grid: {
            top: "15%",
            right: "5%",
            left: "5%",
            bottom: "20%",
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              axisLabel: {
                color: "#88adf6",
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#0f2486",
                },
              },
              axisTick: {
                show: true,
              },
              splitLine: {
                show: false,
                lineStyle: {
                  color: "#0f2486",
                },
              },
              data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
            },
          ],
          yAxis: [
            {
              type: "value",
              nameTextStyle: {
                color: "#88adf6",
              },
              
              axisLabel: {
                formatter: "{value}",
                textStyle: {
                  color: "#88adf6",
                },
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#0f2486",
                },
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: false,
              },
            },
          ],
          series: [
            {
              name: 'PM2.5',
              type: "line",
              smooth: true,
              stack: "",
              symbol: "emptyCircle",
              symbolSize: 6,
              itemStyle: {
                normal: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#41D061", // 0%
                      },
                      {
                        offset: 1,
                        color: "#41D061", // 100%
                      },
                    ],
                  },
                  lineStyle: {
                    width: 2,
                  },
                },
              },
              markPoint: {
                itemStyle: {
                  normal: {
                    color: "#fff",
                  },
                },
              },
              data: [-10, 1, -10, 20, 10, 15, 1],
            },
          ],
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
    /* max-width: 384px; */
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
    margin: 0 auto;
    /* margin: 5%; */
    width: 95%;
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