import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login';
import EventDetails from './views/EventDetails';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/events/:type/:id',
            name: 'EventDetails',
            component: EventDetails,
            props: true
        }
    ]
});
