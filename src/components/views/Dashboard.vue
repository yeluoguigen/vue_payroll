<template>
  <div class="dash">
    <!-- <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:252px;">
          <div class="user-info">
            <img src="static/images/img.jpg" class="user-avator" alt>
            <div class="user-info-cont">
              <div class="user-info-name">{{this.$store.state.user_id}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>-->
  </div>
</template>

<script>
// import Schart from 'vue-schart';
import bus from "../common/bus";
export default {
  name: "dashboard",
  data() {
    return {
      name: sessionStorage.getItem("user_id"),
      user_type:sessionStorage.getItem("user_type")
    };
  },
  computed: {
    role() {
      return this.user_type === "creator" ? "审核者" : "录入者";
    }
  },
  created() {
    // this.handleListener()
    // this.changeDate()
    this.init();
  },
  activated() {
    // this.handleListener()
  },
  deactivated() {
    window.removeEventListener("resize", this.renderChart);
    bus.$off("collapse", this.handleBus);
  },
  methods: {
    init() {
      console.log(this.$store.state.TOKEN);
    },
    // changeDate() {
    //   const now = new Date().getTime();
    //   this.data.forEach((item, index) => {
    //     const date = new Date(now - (6 - index) * 86400000);
    //     item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    //   })
    // },
    // handleListener() {
    //   bus.$on('collapse', this.handleBus);
    //   // 调用renderChart方法对图表进行重新渲染
    //   window.addEventListener('resize', this.renderChart)
    // },
    handleBus(msg) {
      setTimeout(() => {
        this.renderChart();
      }, 300);
    },
    renderChart() {
      this.$refs.bar.renderChart();
      this.$refs.line.renderChart();
    }
  }
};
</script>


<style scoped>
.dash {
  width: 100%;
  height: 100%;
  background: url(/static/images/bg.jpg) no-repeat;
  background-size: cover;
}
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(138, 193, 250);
}

.grid-con-1 .grid-num {
  color: rgb(148, 194, 243);
}

.grid-con-2 .grid-con-icon {
  background: rgb(173, 245, 182);
}

.grid-con-2 .grid-num {
  color: rgb(178, 211, 247);
}

.grid-con-3 .grid-con-icon {
  background: rgb(247, 150, 133);
}

.grid-con-3 .grid-num {
  color: rgb(248, 177, 165);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}

.schart {
  width: 100%;
  height: 300px;
}
</style>
