<template>
  <!--插件调试区域01-->
  <div style="width: 100%; height: 100%">
    <div class="chart-top">
      <div style="color: #fff; margin-top: 10px">二氧化碳值</div>
      <div style="color: #5b92ff">Carbon dioxide concentration</div>
    </div>
    <div class="chart-body" :id="'chart_' + id">
    </div>
    <div class="chart-bottom">
      <img class="chart-img" src="http://dev.thingspanel.cn/extensions/formaldehyde/view/组 1 拷贝 2.png" alt="">
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
        carbon: 0
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
      colorStart() {},
      colorEnd() {},
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
        this.chart && this.chart.resize();
      });
      resizeObserver.observe(document.getElementById("chart_" + this.id));
    },
    methods: {
      // 插件调试区域03
      getData() {
        this.carbon = this.latest.carbon
        this.initChart();
      },
      initChart() {
        console.log("---------------------------------初始化图表开始");
        var chartDom = document.getElementById("chart_" + this.id);
        this.chart = echarts.init(chartDom);
        var option;
        option = {
          series: [{
            type: 'gauge',
            min: 0,
            max: 700,
            progress: {
              show: true,
              width: 10
              // color:'#3ECF63'
            },
            itemStyle: {
              color: '#5E94FC'
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
            data: [{
              value: this.carbon,
              name: 'ppm'
            }]
          }]
        };
        //this.chart.clear();
        this.chart.setOption(option);
        console.log("---------------------------------初始化图表完成");
      },
    },
  };
</script>
<!--插件调试区域04-->
<style scoped>
  .chart-top {
    width: 100%;
    height: 10%;
    position: absolute;
    top: 46px;
    left: 22px;
    /* border: 1px solid rgb(187, 46, 46); */
  }

  .chart-body {
    /* margin: 5%; */
    width: 100%;
    height: 90%;
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