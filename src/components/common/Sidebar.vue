<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="$route.path"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-if= "this.$store.state.user_type ==='creator'">
        <el-menu-item :index="items[1].index" :key="items[1].index">
          <i :class="items[1].icon"></i>
          <span slot="title">{{ items[1].title }}</span>
        </el-menu-item>        
      </template>
      <template v-else>
        <el-menu-item :index="items[0].index" :key="items[0].index">
          <i :class="items[0].icon"></i>
          <span slot="title">{{ items[0].title }}</span>
        </el-menu-item>
      </template>

    </el-menu>
  </div>
</template>

<script>
import bus from "../common/bus";
export default {
  data() {
    return {
      collapse: false,
      icon: [
        "el-icon-setting",
        "el-icon-rank",
        "el-icon-edit-outline",
        "el-icon-document",
        "el-icon-edit",
        "el-icon-tickets",
        "el-icon-edit"
      ],
      items: [
        {
          icon: "el-icon-setting",
          index: "/enterpriseManagement",
          title: "考勤录入"
        },
        {
          icon: "el-icon-edit-outline",
          index: "/staffManagement",
          title: "考勤审核",
        }
      ]
    };
  },
  mounted() {
    // this.init()
  },
  methods: {
    init() {
      // console.log(this.$store.state.pagaList)
      var data = this.$store.state.pagaList;
      // console.log(data)
      if (data !== undefined) {
        for (var i = 0; i < data.length; i++) {
          // console.log(data[i].pageOrder + '+' +data[i].pageName)
          data[i].index = data[i].pageOrder.toString();
          data[i].title = data[i].pageName;
          data[i].subs = data[i].children;
          // 循环数组添加图标
          if (this.icon[i] === undefined) {
            data[i].icon = this.icon[i - 1];
          } else {
            data[i].icon = this.icon[i];
          }
          for (var j = 0; j < data[i].children.length; j++) {
            data[i].children[j].index = data[i].children[j].pageUrl;
            data[i].children[j].title = data[i].children[j].pageName;
          }
        }
        this.items = data;
        // console.log(this.items)
      } else {
        this.$router.push({ path: "/login" });
      }
    }
  },
  // computed: {
  //   onRoutes () {
  //     return this.$route.path.replace('/', '');
  //   }
  // },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 220px;
}
.sidebar > ul {
  height: 100%;
}
.el-submenu .el-menu-item {
  padding: 0 60px !important;
}
.el-menu--collapse {
  width: 56px;
}
</style>
