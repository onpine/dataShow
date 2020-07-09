<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{path:'/GlobalStatis'}">全球</router-link>
      <router-link :to="{path:'/CountryStatis',query:{country:'美国'}}">美国</router-link>
      <router-link :to="{path:'/CountryStatis',query:{country:'中国'}}">中国</router-link>
      <router-link :to="{path:'/CountryStatis',query:{country:'韩国'}}">韩国</router-link>
      <router-link :to="{path:'/CountryStatis',query:{country:'日本本土'}}">日本</router-link>
      <router-link :to="{path:'/CountryStatis',query:{country:'土耳其'}}">土耳其</router-link>
      <router-link :to="{path:'/CountryStatis',query:{country:'印度'}}">印度</router-link>
      <router-link :to="{path:'/CountryStatis',query:{country:'澳大利亚'}}">澳大利亚</router-link>
      <router-link :to="{path:'/CountryStatis',query:{country:'英国'}}">英国</router-link>
      <router-link :to="{path:'/CountryStatis',query:{country:'法国'}}">法国</router-link>
      <router-link :to="{path:'/CountryStatis',query:{country:'意大利'}}">意大利</router-link>
      <router-link :to="{path:'/CountryStatis',query:{country:'俄罗斯'}}">俄罗斯</router-link>
    </div>
    <keep-alive>
      <router-view :key="$route.fullPath" />
    </keep-alive>
    <footer class="foot">
      <span>数据来源：腾讯-{{lastUpdateTime}}</span>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
import Statistics from "./components/Statistics";
export default {
  name: "app",
  components: {},
  data() {
    return {
      lastUpdateTime: 0
    };
  },
  created() {
    getGlobalStatis: {
      var _this = this;
      axios
        .get("/api/modules/list?modules=FAutoGlobalStatis", {})
        .then(function(response) {
          // console.log(response);
          const newobj = JSON.parse(
            JSON.stringify(response.data.data.FAutoGlobalStatis)
          );
          _this.lastUpdateTime = newobj.lastUpdateTime;
          console.log(_this.lastUpdateTime);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

#nav {
  // padding: 30px;
  height: 50px;
  width: 100%;
  background-color: rgb(241, 241, 241);
  display: flex;
  justify-content: space-around;

  a {
    font-weight: bold;
    width: 9%;
    // color: #2c3e50;
    color: grey;
    line-height: 50px;
    text-decoration: none;
    border-bottom: 4px solid grey;
    &.router-link-exact-active {
      // color: #42b983;
      color: #2c3e50;
      border-bottom: 4px solid red;
    }
  }
}
.foot {
  height: 20px;
  width: 100%;
  font-size: 12px;
}
.foot span {
  line-height: 20px;
  color: grey;
}
</style>
