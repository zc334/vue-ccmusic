import Vue from 'vue'
import VueRouter from 'vue-router'
//引入组件
import Recommend from 'components/recommend/recommend'
import Singer from 'components/singer/singer'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'

Vue.use(VueRouter)

export default new VueRouter({
    //配置路由
    routes:[
        {
            path: "/recommend",
            component: Recommend
        },
        {
            path: "/singer",
            component: Singer
        },
        {
            path: "/rank",
            component: Rank
        },
        {
            path: "/search",
            component: Search
        },

        {
            path: "/",
            redirect: "/recommend"
        }
    ]
})