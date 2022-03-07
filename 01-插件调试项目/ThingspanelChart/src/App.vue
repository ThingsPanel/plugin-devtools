<template>
  <div id="nav">
    <div class="layout">
      <grid-layout
        :layout.sync="layout"
        :col-num="colNum"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :vertical-compact="verticalCompact"
        :margin="[10, 10]"
        :use-css-transforms="false"
        class="hoverStyle"
      >
        <grid-item
          v-for="item in layout"
          :key="item.i"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          style="border: 1px solid #fff"
        >
           <Chart></Chart>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>
<script>
import VueGridLayout from "vue-grid-layout";
import Chart from "./components/FormaldehydeValue.vue";
export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    Chart
  },
  data() {
    return {
      layout: [
        {
          x: 4,
          y: 0,
          w: 2,
          h: 5,
          i: "2",
        },
      ],
      verticalCompact: true,
      colNum: 12, //栅格数
      id: "1",
      myChart: null,
    };
  },
  computed: {
    cfg() {
      let cfg = Object.assign({}, config);
      cfg.cellW = Math.floor(this.containerWidth / cfg.col);
      cfg.cellH = cfg.cellW; // 1:1
      return cfg;
    },
  },
};
</script>
<style scoped>
.layout {
  background: #2D3D88;
  height: 800px;
}

.hoverStyle {
  border: 0px solid #999;
}

.img {
  width: 90%;
  height: auto;
  padding: 5%;
  left: 0px;
}

/* #nav {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .box1,
  .box2,
  .box3,
  .box4 {
    width: 400px;
    height: 300px;
    border: 1px solid #000;
  } */
</style>