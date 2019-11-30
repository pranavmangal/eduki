import Vue from 'vue';
import Router from 'vue-router';

import Login from './views/Login';
import NewEvent from './views/NewEvent';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/events/new',
            name: 'new-event',
            component: NewEvent
        }
    ]
});
