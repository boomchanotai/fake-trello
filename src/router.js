import Vue from 'vue'
import Router from 'vue-router'
import Board from '@/views/Board'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path : '/',
            name: 'board',
            component: Board,
            children: [
                {
                    path: '/task/:id',
                    name: 'task',
                    props: true
                }
            ]
        }
    ]
})