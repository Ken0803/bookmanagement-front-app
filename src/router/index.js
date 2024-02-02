import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import BookList from '../pages/book/BookList.vue';
import BookDetail from '../pages/book/BookDetail.vue';

const routes = [
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/books', component: BookList },
  {
    path: '/book/:id',
    name: 'BookDetails',
    component: BookDetail,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
