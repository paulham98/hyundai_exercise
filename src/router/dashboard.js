import Vue from 'vue';
import VueRouter from 'vue-router';
import AdminRobotOverview from "../views/dashboard/AdminRobotOverview.vue"
import Dashboard from "../views/dashboard/Dashboard";
import LineDetail from "../views/dashboard/LineDetail"
import WholeRobotStatus from "../views/dashboard/WholeRobotStatus"
import EChartExercise from "../views/dashboard/EChartExercise"
import AdminMainMap from "../views/dashboard/AdminMainMap";
import AdminLineDetail from "../views/dashboard/AdminLineDetail";
import Intro from "../views/dashboard/Intro";


Vue.use(VueRouter)

const routes = [
    { path: "/external/dashboard/adminMainMap", name: "admin_main_map", component: AdminMainMap},
    { path: "/intro", name: "intro", component: Intro},
    { path: "/adminLineDetail", name: "admin_line_detail", component: AdminLineDetail},
    { path: "/echart/", name: "Echart", component: EChartExercise},
    { path: "/", name: "dashboard", component: Dashboard},
    { path: "/external/dashboard/linedetail/:id", name:"line_detail", component: LineDetail, props: true},
    { path: "/external/dashboard/wholerobotstatus", name:"whole_robot_status", component: WholeRobotStatus},
    { path: "/external/dashboard/adminRobotOverview", name: "admin_robot_overview", component: AdminRobotOverview},
    { path: "/external/dashboard/adminMainMap", name: "admin_main_map", component: AdminMainMap},
    { path: "/external/dashboard/adminLineDetail", name: "admin_line_detail", component: AdminLineDetail},
]

const router = new VueRouter({
    mode: "history",
    routes
})

export default router
