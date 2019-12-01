import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login';
import Coursework from './views/Coursework'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        }, 
        {
            path: '/Coursework',
            name: 'Coursework',
            component: Coursework 
        }
    ]
});
