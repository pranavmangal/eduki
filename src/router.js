import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login';
import Home from './views/Home';
import Coursework from './views/Coursework';
import Events from './views/Events';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '/coursework',
            name: 'Coursework',
            component: Coursework
        },
        {
            path: '/events',
            name: 'Events',
            component: Events
        }
    ]
});
