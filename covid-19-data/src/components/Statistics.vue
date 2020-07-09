<template>
  <div>
    <div id="bar" style="width:100%; height:500px"></div>
    <h1>{{this.$route.query.ContinentStatisArray}}</h1>
    <div id="pie" style="width:500px; height:500px"></div>
  </div>
</template>
<script>
export default {
  //   props: {
  //     ContinentStatisArray
  //   },
  mounted() {
    // console.log(decodeURIComponent(this.$route.query.ContinentStatisArray));
    // 引入 ECharts 主模块
    var echarts = require("echarts");
    // var echarts = require("echarts/lib/echarts");
    // 引入柱状图
    require("echarts/lib/chart/bar");
    //引入折线图
    require("echarts/lib/chart/pie");
    // 引入提示框和标题组件
    require("echarts/lib/component/tooltip");
    require("echarts/lib/component/title");

    // 基于准备好的dom，初始化echarts实例
    // console.log(document.getElementById("bar"));
    var myChart = echarts.init(document.getElementById("bar"));
    // 绘制图表
    myChart.setOption({
      title: {
        text: "某楼盘销售情况",
        subtext: "04/27-05/02"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["意向", "预购", "成交"]
      },
      toolbox: {
        show: true,
        feature: {
          magicType: { show: true, type: ["stack", "tiled"] },
          saveAsImage: { show: true }
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
      },
      yAxis: {
        type: "value"
      },
      //   grid: {
      //     x: 0,
      //     y: 20,
      //     x2: 20,
      //     y2: 20,
      //     borderWidth: 1
      //   },
      series: [
        {
          name: "成交",
          type: "line",
          smooth: true,
          itemStyle: {
            normal: {
              areaStyle: {
                type: "default",
                opacity: 0.1
              }
            }
          },
          data: [10, 12, 21, 54, 260, 830, 710]
        },
        {
          name: "预购",
          type: "line",
          smooth: true,
          itemStyle: {
            normal: {
              areaStyle: {
                type: "default",
                opacity: 0.1
              }
            }
          },
          data: [30, 182, 434, 791, 390, 30, 10]
        },
        {
          name: "意向",
          type: "line",
          smooth: true,
          itemStyle: {
            normal: {
              areaStyle: {
                type: "default",
                opacity: 0.1
              }
            }
          },
          data: [1320, 1132, 601, 234, 120, 90, 20]
        },
        {
          name: "访问来源",
          subtext: "11",
          type: "pie",
          radius: "20%",
          center: ["30%", "30%"],
          roseType: "angle",
          data: [
            { value: 235, name: "视频广告" },
            { value: 274, name: "联盟广告" },
            { value: 310, name: "邮件营销" },
            { value: 335, name: "直接访问" },
            { value: 400, name: "搜索引擎" }
          ]
        }
      ]
    });
    var myChart1 = echarts.init(document.getElementById("pie"));
    myChart1.setOption({
      title: {
        text: "某楼盘销售情况",
        subtext: "04/27-05/02"
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          //   center: ["50%", "50%"],

          roseType: "angle",
          data: this.$route.query.ContinentStatisArray
          //   data: [
          //     { value: 235, name: "视频广告" },
          //     { value: 274, name: "联盟广告" },
          //     { value: 310, name: "邮件营销" },
          //     { value: 335, name: "直接访问" },
          //     { value: 400, name: "搜索引擎" }
          //   ]
        }
      ]
    });
  }
};
</script>


<style scoped>
#bar {
  width: 1000px;
}
#pie {
  width: 100%;
}
</style>