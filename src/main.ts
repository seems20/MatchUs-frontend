import { createApp } from 'vue'
import App from './App.vue'
import  {Icon,Button, NavBar,Tabbar,TabbarItem,Toast} from "vant";

// @ts-ignore
import * as VueRouter from 'vue-router';
import routes from "./config/router";
import Vant from 'vant';
import 'vant/lib/index.css';

const app = createApp(App);
app.use(Button);
app.use(NavBar);
app.use(Icon);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Toast);
app.use(Vant);

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})

app.use(router)


app.mount('#app')