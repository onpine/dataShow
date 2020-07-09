<template>
  <div id="global">
    <div id="statis">
      <div class="nowconfirm">
        <p>较上日增加：{{globalStatisdata.nowConfirmAdd}}</p>
        <p>
          <strong>{{globalStatisdata.nowConfirm}}</strong>
        </p>
        <p>现有确诊</p>
      </div>
      <div class="confirm">
        <p>较上日增加：{{globalStatisdata.confirmAdd}}</p>
        <p>
          <strong>{{globalStatisdata.confirm}}</strong>
        </p>
        <p>累计确诊</p>
      </div>
      <div class="heal">
        <p>较上日增加：{{globalStatisdata.healAdd}}</p>
        <p>
          <strong>{{globalStatisdata.heal}}</strong>
        </p>
        <p>累计治愈</p>
      </div>
      <div class="dead">
        <p>较上日增加：{{globalStatisdata.deadAdd}}</p>
        <p>
          <strong>{{globalStatisdata.dead}}</strong>
        </p>
        <p>累计病死</p>
      </div>
    </div>
    <div class="echarts">
      <div id="pie"></div>
      <div id="bar1" class="divbar"></div>
      <div id="bar2" class="divbar"></div>
      <div id="bar3" class="divbar"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import divBar from "../components/divBar";
export default {
  data() {
    return {
      globalStatisdata: {}
    };
  },
  components: {
    divBar
  },
  created() {
    //全球状态;

    getGlobalStatis: {
      var _this = this;
      axios
        .get("/api/modules/list?modules=FAutoGlobalStatis", {})
        .then(function(response) {
          // console.log(response);
          const newobj = JSON.parse(
            JSON.stringify(response.data.data.FAutoGlobalStatis)
          );
          console.log(newobj);
          _this.globalStatisdata = JSON.parse(JSON.stringify(newobj));
          // console.log(_this.globalStatisdata.nowConfirm);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    //各大洲比例
    getContinentStatis: {
      var _this = this;
      axios
        .get("/api/modules/list?modules=FAutoContinentStatis", {})
        .then(function(response) {
          // console.log(response.data.data.FAutoContinentStatis);
          // 先化为json字符串，再转化为js对象
          const newobj = JSON.parse(
            JSON.stringify(response.data.data.FAutoContinentStatis)
          );
          //对象长度
          // console.log("长度" + Object.keys(data).length);
          //获取对象最后一个对象end
          const date =
            newobj[Object.keys(newobj)[Object.keys(newobj).length - 1]].date;
          const nowConfirm =
            newobj[Object.keys(newobj)[Object.keys(newobj).length - 1]]
              .nowConfirm;
          const end =
            newobj[Object.keys(newobj)[Object.keys(newobj).length - 1]].statis;
          //js对象转为json数据格式
          const statis = [];
          for (let key in end) {
            var item = { value: end[key], name: key };
            statis.push(item);
          }

          const data = {
            text: "全球现存确诊：",
            date: date,
            nowConfirm: nowConfirm,
            statis: statis
          };
          //   console.log(data);
          _this.pie(data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    //全球每日数据
    getGlobalDailyList: {
      var _this = this;
      axios
        .get("/api/modules/list?modules=FAutoGlobalDailyList", {})
        .then(function(response) {
          // console.log(response.data.data.FAutoGlobalDailyList);
          const newobj = JSON.parse(
            JSON.stringify(response.data.data.FAutoGlobalDailyList)
          );
          const dates = [];
          const confirms = [];
          const deads = [];
          const heals = [];
          const newAddConfirms = [];
          const deadRates = [];
          const healRates = [];

          for (let key in newobj) {
            // console.log(key);
            dates.push(newobj[key].date);
            confirms.push(newobj[key].all.confirm);
            deads.push(newobj[key].all.dead);
            heals.push(newobj[key].all.heal);
            newAddConfirms.push(newobj[key].all.newAddConfirm);
            deadRates.push(newobj[key].all.deadRate);
            healRates.push(newobj[key].all.healRate);
          }
          const data = {
            text1: "全球每日累计：",
            text2: "全球每日新增：",
            text3: "全球治愈率/病死率：",
            date: dates[dates.length - 1],
            dates: dates,
            confirms: confirms,
            deads: deads,
            heals: heals,
            newAddConfirms: newAddConfirms,
            deadRates: deadRates,
            healRates: healRates
          };
          _this.bar(data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  methods: {
    pie(data) {
      // 引入 ECharts 主模块
      var echarts = require("echarts");
      require("echarts/lib/component/legend");
      var myChart1 = echarts.init(document.getElementById("pie"));
      //   myChart1.showLoading();
      myChart1.setOption({
        title: {
          text: data.text + data.nowConfirm,
          subtext: data.date
        },
        series: [
          {
            name: "ContinentStatis",
            type: "pie",
            radius: "30%",
            //   center: ["50%", "50%"],
            //   roseType: "angle",
            data: data.statis,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{b} : {c} ({d}%)"
                },
                labelLine: { show: true }
              }
            }
          }
        ]
      });
    },
    bar(data) {
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
<style scoped>
#global {
  height: calc(100vh - 80px);
  /* background-color: greenyellow; */
  padding-top: 10px;
}
#statis {
  display: flex;
  justify-content: space-between;
  height: 100px;
  width: 80%;
  margin: 0 10% 10px 10%;
  padding: 0;
}
.nowconfirm {
  display: inline-block;
  background-color: rgb(218, 218, 218);
  width: 24%;
  height: 100px;
  border-radius: 20px 0 0 20px;
}
.confirm {
  display: inline-block;
  background-color: rgb(218, 218, 218);
  width: 24%;
  height: 100px;
}
.dead {
  display: inline-block;
  background-color: rgb(218, 218, 218);
  border-radius: 0 20px 20px 0;
  width: 24%;
  height: 100px;
}
.heal {
  display: inline-block;
  background-color: rgb(201, 231, 201);

  width: 24%;
  height: 100px;
}
p {
  line-height: 20px;
  margin: 10px;
  padding: 0;
  color: gray;
  font-size: 12px;
}
p strong {
  color: black;
  font-size: 20px;
}
.echarts {
  width: 80%;
  margin: 0 10%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
#pie {
  flex: 1;
  width: 50%;
  min-width: 50%;
  max-width: 50%;
  height: 275px;
}
#bar1 {
  flex: 1;
  width: 50%;
  min-width: 50%;
  max-width: 50%;
  height: 275px;
}
#bar2 {
  flex: 1;
  width: 50%;
  min-width: 50%;
  max-width: 50%;
  height: 275px;
}
#bar3 {
  flex: 1;
  width: 50%;
  min-width: 50%;
  max-width: 50%;
  height: 275px;
}
</style>
