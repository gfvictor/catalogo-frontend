import { RouteRecordRaw } from 'vue-router';
import LoginUser from 'pages/LoginUser.vue';
import RegisterUser from 'pages/RegisterUser.vue';

const routes: RouteRecordRaw[] = [

  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', redirect: '/login'},
      {path: 'login', component: LoginUser},
      {path: 'register', component: RegisterUser},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
