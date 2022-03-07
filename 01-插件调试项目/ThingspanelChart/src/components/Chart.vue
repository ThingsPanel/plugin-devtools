<template>
  <div class="chart-all">
    <div class="top-right" style="width: 100%; height: 100%">
      <div class="chart-top">
        <div style="color: #fff; margin-top: 10px">温度曲线</div>
        <div style="color: #5b92ff">temperature</div>
      </div>
      <div class="chart-body" :id="'chart_' + id"></div>
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
      sysTimeData: [1, 2, 3, 4, 5, 6, 7],
      oneData: [1, 2, 3, 4, 5, 6, 7],
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
          text: "曲线图",
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
              backgroundColor: "#6a7985",
            },
          },
        },
        grid: {
          top: "15%",
          right: "2%",
          left: "5%",
          bottom: "10%",
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
            data: this.sysTimeData,
          },
        ],
        yAxis: [
          {
            type: "value",
            nameTextStyle: {
              color: "#88adf6",
            },
            /*min: -40,
                            max: 45,*/
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
            name: "温度",
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
                      color: "#5B92FF", // 0%
                    },
                    {
                      offset: 1,
                      color: "#F85879", // 100%
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
            data: this.oneData,
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
  /* 
  display: flex;
  justify-content: center;
  align-items: center; */
  width: 95%;
  height: 95%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgb(41, 189, 139);
}
.chart-top {
  width: 100%;
  height: 10%;
  
  border: 1px solid rgb(187, 46, 46);
}
.chart-body {
  margin: 5%;
  width: 90%;
  height: 80%;
  border: 1px solid rgb(187, 46, 46);
}
</style>