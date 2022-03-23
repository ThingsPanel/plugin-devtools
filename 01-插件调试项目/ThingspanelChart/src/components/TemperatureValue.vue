<template>
  <!-- <div class="chart-all"> -->
  <div style="width: 100%; height: 100%">
    <div class="chart-top">
      <br>
      <div style="color:#fff;">实时温度</div>
      <div style="color:#5B92FF">temperature</div>
    </div>
    <div class="chart-body">
      <div class="chart-title">
        <countTo :startVal='startVal' :endVal='endVal' :duration='duration'></countTo>
        <!-- <div class="chart-temperature">36</div> -->
        <div class="chart-describe" style="text-align: center;">当前温度 &#176;C</div>
      </div>
      <img class="chart-img1" src="../assets/5.png" alt="">
      <img class="chart-img" src="../assets/2.png" alt="">
    </div>
    <div class="chart-bottom">
      <div class="ordie">
        <div>
          <img class="chart-img2" src="../assets/4.png" alt="">
          
        </div>
        <div class="info">
          <div>当前温度偏高，请调试温度！</div>
          <!-- <div style="color: #5B92FF;font-size: 12px;margin-top: 5px;">The current temperature is too high. Adjust the temperature</div>          -->
        </div>
      </div>
    </div>

  </div>
  <!-- </div> -->
</template>
<script>
  import * as echarts from "echarts";
  import countTo from 'vue-count-to';
  export default {
    components: { countTo },
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
        latest: {},
        fields: [],
        chart: null,
        formaldehyde: 0,
        // 需要滚动的时间
        duration: 5000,
        // 初始值
        startVal: 0,
        // 最终值
        endVal: 36
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
      getData() {
        this.formaldehyde = this.latest.formaldehyde
        this.initChart();
        // setTimeout(() => {
        //   this.initChart();
        // }, 1000);
      },
      initChart() {
        console.log("---------------------------------初始化图表开始");
        var chartDom = document.getElementById("chart_" + this.id);
        this.chart = echarts.init(chartDom);
        var option;
        //option为数据模板
        option = {
          series: [{
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
            data: [{
              value: this.formaldehyde,
              name: 'mg/m3'
            }]
          }]
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
  .chart-top {
    width: 100%;
    height: 10%;
    
    /* position: absolute;
    top: 20px;
    left: 22px; */
    border: 1px solid rgb(187, 46, 46);
  }

  .chart-body {
    /* margin: 5%; */
    width: 100%;
    height: 57%;
    border: 1px solid rgb(34, 24, 26);
    text-align: center;
  }

  .chart-title {
   
    font-size: 60px;
    width: 100%;
    height: 57%;
    font-weight: bold;
    color: #fff;
    position: absolute;
    top: -20%;
    left: 0;
    bottom: 0;
    right: 0;
    
    margin: auto;
    /* border: 1px solid rgb(23, 105, 173); */
    z-index: 10;
  }
  .chart-temperature{
    /* border: 1px solid rgb(1, 14, 24); */
    /* margin-top: 25%; */
    max-width: 80%;
    max-height: 80%;
    /* width: 100%; */
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    /* border: 1px solid rgb(233, 53, 8); */
    
  }
  .chart-describe {
    margin-top: -10px;
    font-size: 10px;
    color: #fff;
    font-weight: 400;
    /* width: 100%;
    height: 90%; */
    text-align: center;
    z-index: 1;
    /* border: 1px solid rgb(23, 173, 115); */

  }

  .chart-bottom {
    position: relative;
    top: 5%;
    width: 100%;
    height: 20%;
    /* border: 1px solid rgb(233, 53, 8); */
  }
  .chart-img {
    max-width: 80%;
    max-height: 80%;
    /* width: 100%; */
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    /* border: 1px solid rgb(233, 53, 8); */
  }
  .chart-img1 {
    max-width: 60%;
    max-height: 60%;
    /* width: 100%; */
    position: absolute;
    top: 15%;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    /* padding-bottom: 9%; */

    /* margin-top: -165px; */
  }
  .ordie{
	display:flex;
	align-items:center;
	padding:2px;
	max-width:90%;
  height:65%;
	margin:auto;
	background-color:#1B2554;
	border-radius:50px;
 
	}
  .chart-img2 {
    max-width: 100%;
    max-height: 100%;
    
  }
	.ordie .info{
	margin-left:8px;
  margin-top: 0px;
  line-height: 15px;
	}
	.info div:nth-child(1){
	color:#fff;
	}
</style>