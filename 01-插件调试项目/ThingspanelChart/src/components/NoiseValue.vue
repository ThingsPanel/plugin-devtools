<template>
  <!-- <div class="chart-all"> -->
    <div class="top-right" style="width: 100%; height: 100%">
      <div class="chart-top">
        <div style="color: #fff; margin-top: 10px">温度曲线</div>
        <div style="color: #5b92ff">temperature</div>
      </div>
      <div class="chart-body" :id="'chart_' + id">
      </div>
      <div class="chart-bottom">
        <!-- <div class="chart-box">
          <img class="chart-img" src="../assets/组 1 拷贝@2x.png" alt="">
        </div> -->
        <!-- <img class="chart-img" src="../assets/组 1 拷贝@2x.png" alt=""> -->
      </div>
      <!-- <div class="box" style="border: 1px solid #000;width: 20px;height: 20px;border-radius: 50px;"></div> -->
    </div>
  <!-- </div> -->
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
  graphic: {
    elements: [
      {
        type: 'group',
        left: 'center',
        top: 'center',
        children: new Array(20).fill(0).map((val, i) => ({
          type: 'rect',
          x: i * 10,
          shape: {
            x: 0,
            y: -40,
            width: 5,
            height: 80
          },
          style: {
            fill: '#f7b033'
          },
          keyframeAnimation: {
            duration: 1000,
            delay: i * 100,
            loop: true,
            keyframes: [
              {
                percent: 0.5,
                scaleY: 0.3,
                easing: 'cubicIn'
              },
              {
                percent: 1,
                scaleY: 1,
                easing: 'cubicOut'
              }
            ]
          }
        }))
      }
    ]
  }
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
<style>
  .chart-all {
    max-width: 384px;
    width: 95%;
    height: 95%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* border: 1px solid rgb(41, 189, 139); */
  }

  /* .chart-top {
    width: 100%;
    height: 10%;
    border: 1px solid rgb(187, 46, 46);
  } */

  .chart-body {
    /* margin: 5%; */
    width: 100%;
    height: 90%;
    border: 0px solid rgb(23, 173, 60);
  }

  .chart-bottom {
    position: relative;
    top: -90%;
    width: 100%;
    height: 90%;
    border: 0px solid rgb(155, 211, 25);
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
    border: 0px solid rgb(187, 46, 46);


  }
</style>