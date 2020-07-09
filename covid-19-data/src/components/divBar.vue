<template>
  <div id="bar">
    <p>{{data.datas.text1}}</p>
    <div id="bar1"></div>
    <div id="bar1"></div>
    <div id="bar1"></div>
  </div>
</template>
<script>
export default {
  props: ["data"],
  created() {
    // this.bar(this.data.datas);
    console.log(this.data.key);
    console.log(JSON.stringify(this.data));
    console.log(this.data.datas.text1);
  },
  methods: {
    aa(a) {
      console.log(a);
    },
    bar(data) {
      console.log(data);
      // 引入 ECharts 主模块
      var echarts = require("echarts/lib/echarts");
      // 引入柱状图
      require("echarts/lib/chart/bar");
      //引入折线图
      require("echarts/lib/chart/pie");
      // 引入提示框和标题组件
      require("echarts/lib/component/tooltip");
      require("echarts/lib/component/title");

      // 基于准备好的dom，初始化echarts实例
      // console.log(document.getElementById("bar"));
      //全球每日累计
      var myChart1 = echarts.init(document.getElementById("bar1"));
      //全球每日新增
      var myChart2 = echarts.init(document.getElementById("bar2"));
      //全球治愈率/病死率
      var myChart3 = echarts.init(document.getElementById("bar3"));
      // 绘制图表
      //全球每日累计
      myChart1.setOption({
        title: {
          text: data.text1,
          subtext: data.date
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["累计确诊", "累计病死", "累计治愈"]
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
          data: data.dates
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
            name: "累计确诊",
            type: "line",
            smooth: true,
            stack: "确诊",
            itemStyle: {
              normal: {
                // areaStyle: {
                //   type: "default",
                //   opacity: 0.1
                // }
              }
            },
            data: data.confirms
          },
          {
            name: "累计病死",
            type: "line",
            smooth: true,
            stack: "死亡",
            itemStyle: {
              normal: {
                // areaStyle: {
                //   type: "default",
                //   opacity: 0.1
                // }
              }
            },
            data: data.deads
          },
          {
            name: "累计治愈",
            type: "line",
            smooth: true,
            stack: "治愈",
            itemStyle: {
              normal: {
                // areaStyle: {
                //   type: "default",
                //   opacity: 0.1
                // }
              }
            },
            data: data.heals
          }
        ]
      });
      //全球每日新增
      myChart2.setOption({
        title: {
          text: data.text2,
          subtext: data.date
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["新增确诊"]
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
          data: data.dates
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
            name: "新增确诊",
            type: "line",
            smooth: true,
            stack: "新增确诊",
            itemStyle: {
              normal: {
                areaStyle: {
                  type: "default",
                  opacity: 0.1
                }
              }
            },
            data: data.newAddConfirms
          }
        ]
      });
      //全球治愈率/病死率
      myChart3.setOption({
        title: {
          text: data.text3,
          subtext: data.date
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["治愈率", "病死率"]
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
          data: data.dates
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "病死率",
            type: "line",
            smooth: true,
            stack: "病死率",
            itemStyle: {
              normal: {
                // areaStyle: {
                //   type: "default",
                //   opacity: 0.1
                // }
              }
            },
            data: data.deadRates
          },
          {
            name: "治愈率",
            type: "line",
            smooth: true,
            stack: "治愈率",
            itemStyle: {
              normal: {
                // areaStyle: {
                //   type: "default",
                //   opacity: 0.1
                // }
              }
            },
            data: data.healRates
          }
        ]
      });
    }
  }
};
</script>