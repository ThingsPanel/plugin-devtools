<template>
  <div class="top-right" style="width:100%; height:100%">
    <div class="text-muted">
      <div style="color: #fff;">湿度曲线</div>
      <div style="color: #5b92ff">temperature</div>
    </div>
    <div class="echarts" style="width:100%; height:100%">
      <div
        :id="'chart_' + id"
        ref="chart"
        class="chart_equheight width-100"
        :auto-resize="true"
         style="width:100%; height:100%"
      >
      </div>
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
      latest: {},
      fields: [],
      oneData: [],
      twoData: [],
      threeData: [],
      keyOne: "",
      keyTwo: "",
      keyThree: "",
      sysTimeData: [],
      chart: null,
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
    const resizeObserver = new ResizeObserver((entries) => {
      //回调,重置图表大小
      this.resizeChart();
      //this.$chart.resize();
    });
    resizeObserver.observe(document.getElementById("chart_" + this.id));
  },
  methods: {
    getData() {
      console.log("---------------------------------进入apiData处理");
      // 最后再刷新数据
      //判断是否是第一次请求来的数据
      if (this.flag == 0) {
        console.log("---------------------------------第一次apiData处理开始");
        this.flag = 1;
        //获取数据中前两个key
        for (var i in this.fields) {
          if (Object.keys(i).length > 2) {
            let keys = Object.keys(this.fields[i]);
            var j = 0;
            if (keys[j] != "systime") {
              this.keyOne = keys[j];
              j = j + 1;
            } else {
              j = j + 1;
              this.keyOne = keys[j];
              j = j + 1;
            }
            if (keys[j] != "systime") {
              this.keyTwo = keys[j];
              j = j + 1;
            } else {
              j = j + 1;
              this.keyTwo = keys[j];
              j = j + 1;
            }
            if (keys[j] != "systime") {
              this.keyThree = keys[j];
              j = j + 1;
            } else {
              j = j + 1;
              this.keyThree = keys[j];
              j = j + 1;
            }
            this.mytime = new Date(this.fields[i].systime);
            break;
          }
        }
        //遍历数据字典，获取曲线数据
        for (var i = 0; i < this.fields.length; i++) {
          var item = this.fields[i];
          var d = new Date(item["systime"]);
          if (d >= this.mytime) {
            this.mytime = d.setMinutes(d.getMinutes() + 2);
            this.oneData.push(item[this.keyOne]);
            this.twoData.push(item[this.keyTwo]);
            this.threeData.push(item[this.keyThree]);
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
            this.mytime = d.setMinutes(d.getMinutes() + 2);
            this.oneData.push(item[this.keyOne]);
            this.twoData.push(item[this.keyTwo]);
            this.threeData.push(item[this.keyThree]);
            this.sysTimeData.push(item["systime"].slice(11, 16));
          }
        }
      }
      setTimeout(() => {
        this.initChart();
      }, 1000);
    },
    /**
     * init chart
     */
    initChart() {
      console.log("---------------------------------初始化图表开始");
      // let _this = this;
      // if (this.fields.length <= 0) {
      //   return;
      // }

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
            data:[1,2,3,4,5,6,7,8],
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
            name: '温度',
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
            data:[25,24,36,32,29,33,26,34],
          },
        ],
      };
      this.chart.clear();
      this.chart.setOption(option);
      // window.addEventListener("resize", () => {
      //   this.chart.resize();
      // });
      console.log("---------------------------------初始化图表完成");
    },
    /**
     * resize chart
     */
    resizeChart() {
      /* eslint-disable no-unused-expressions */
      this.chart && this.chart.resize();
    },
  },
};
</script>

<style scoped>

.text-muted{
  position:absolute;
  top:46px;
  left:22px;
}


</style>
