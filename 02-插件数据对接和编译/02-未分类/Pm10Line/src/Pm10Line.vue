<template>
  <div class="chart-all">
      <div class="chart-top">
        <div style="color: #fff">PM10曲线</div>
        <div style="color: #5b92ff">PM10 curve</div>
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
    props: {
      id: {
        type: Number,
        default: 0,
      },
      loading: {
        type: Boolean,
        default: true,
      },
      apiData: {
        type: Object,
      },
      legend: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        // 插件调试区域02
        latest: {},
        fields: [],
        chart: null,
        pm10: [],
        sysTimeData: [],
        flag: 0,
        mytime: null,
      };
    },
    watch: {
      apiData: {
        //document.getElementById('ElementId').removeAttribute("style")
        //style="width: 100%; height: 100%"
        //apiData的数据样例，fields是传感器一段时间内的数据，latest是传感器最新数据
        // {
        //       "device_id": "f1ab2c47-951f-10b8-60c0-c6b33440f189",
        //       "fields": [
        //           {
        //               "hum": 24,
        //               "systime": "2022-01-18 18:59:11",
        //               "temp": 26
        //           },
        //           {
        //               "hum": 24,
        //               "systime": "2022-01-18 18:59:17",
        //               "temp": 26
        //           },
        //           {
        //               "hum": 24,
        //               "systime": "2022-01-18 18:59:41",
        //               "temp": 26
        //           }
        //       ],
        //       "latest": {
        //           "hum": 24,
        //           "systime": "2022-01-18 18:59:41",
        //           "temp": 26
        //       }
        //   }
        // deep: true,
        immediate: true,
        handler(val, oldVal) {
          console.log("---------------------------------接收到apiData");
          console.log("---------------------------------id:" + this.id);
          if (val["fields"]) {
            console.log("---------------------------------fields有值:");
            console.log(
              "---------------------------------device_id:" + val["device_id"]
            );
            this.latest = val["latest"];
            this.fields = val["fields"];
            this.getData();
          } else {
            console.log("---------------------------------fields没有值:");
          }
        },
      },
      colorStart() { },
      colorEnd() { },
      legend(val, oldVal) {
        this.chart.setOption({
          legend: {
            show: val,
          },
        });
      },
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
      // 插件调试区域03
      getData() {
        console.log("---------------------------------进入apiData处理");
        // 最后再刷新数据
        //判断是否是第一次请求来的数据
        if (this.flag == 0) {
          console.log("---------------------------------第一次apiData处理开始");
          this.flag = 1;
          //遍历数据字典，获取曲线数据
          for (var i = 0; i < this.fields.length; i++) {
            var item = this.fields[i];
            var d = new Date(item["systime"]);
            if (d >= this.mytime) {
              this.mytime = d.setMinutes(d.getMinutes() + 1);
              this.pm10.push(item["pm10"]);
              this.sysTimeData.push(item["systime"].slice(11, 16));
            }
          }
          console.log("---------------------------------第一次apiData处理完成");
        } else {
          console.log("---------------------------------apiData后续处理");
          //遍历数据字典，获取曲线数据
          for (var i = 0; i < this.fields.length; i++) {
            var item = this.fields[i];
            var d = new Date(item["systime"]);
            if (d >= this.mytime) {
              console.log(this.mytime);
              this.mytime = d.setMinutes(d.getMinutes() + 1);
              this.pm10.push(item["pm10"]);
              this.sysTimeData.push(item["systime"].slice(11, 16));
            }
          }
        }
        setTimeout(() => {
          this.initChart();
        }, 1000);
      },
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
            left: "7%",
            bottom: "12%",
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
              data:this.sysTimeData,
            },
          ],
          yAxis: [
            {
              type: "value",
              nameTextStyle: {
                color: "#88adf6",
              },
              // min: -20,
              // max: 30,
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
              name: 'pm10',
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
                        color: "#5D94FE", // 0%
                      },
                      {
                        offset: 1,
                        color: "#5D94FE", // 100%
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
              data: this.pm10,
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
    height: 90%;
    /* position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); */
    /* border: 1px solid rgb(111, 189, 139); */
  }

  .chart-top {
    /* text-align:center; */
    width: 100%;
    height: 10%;
    /* border: 1px solid rgb(187, 46, 46); */
  }

  .chart-body {
    margin: 0 auto;
    /* margin: 5%; */
    width: 100%;
    height: 95%;
    /* border: 1px solid rgb(23, 173, 60); */
  }

  .chart-bottom {
    position: relative;
    top: -90%;
    width: 100%;
    height: 90%;
    /* border: 1px solid rgb(155, 211, 25); */
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
    /* border: 1px solid rgb(187, 46, 46); */


  }
</style>