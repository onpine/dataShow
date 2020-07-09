import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Statistics from '../components/Statistics'
import GlobalStatis from '../components/GlobalStatis'
import CountryStatis from '../components/CountryStatis'

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        redirect: '/GlobalStatis',
    },
    {
        path: "/GlobalStatis",
        name: "GlobalStatis",
        component: GlobalStatis,
    },
    {
        path: "/CountryStatis",
        name: "CountryStatis",
        component: CountryStatis,
        props: (route) => ({
            country: route.query.country,
        })
    },
    // {
    //     path: "/about",
    //     name: "About",
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>
    //         import(/* webpackChunkName: "about" */ "../views/About.vue")
    // }
];

const router = new VueRouter({
    routes
});

export default router;
