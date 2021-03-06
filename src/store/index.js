import Vue from 'vue'
import Vuex from 'vuex'

import defaultBoard from '../defaultBoard.js'

import saveBoard from '../services/saveBoard'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
    plugins: [saveBoard],
    state: {
        board : board
    },
    getters: {
        getTask (state) {
            return (id) => {
                for (const column of state.board.columns) {
                    for (const task of column.tasks) {
                        if (task.id === id) {
                            return task;
                        }
                    }
                }
                return "";
            }
        }
    },
    mutations: {
        CREATE_TASK (state, { tasks, name }) {
            tasks.push({
                name,
                id: Math.round(Math.random() * 10000).toString(),
                description : ''
            })
        },
        CREATE_COLUMN (state, { columns, name }) {
            columns.push({
                name,
                tasks : []
            })
        },
        UPDATE_TASK (state, { task, key, value }) {
            task[key] = value
        },
        UPDATE_COLUMN_NAME (state, { column, name }) {
            column['name'] = name
        },
        MOVE_TASK (state, { fromTasks, newColumnTasks, taskIndex }) {
            const taskToMove = fromTasks.splice(taskIndex, 1)[0]
            
            newColumnTasks.push(taskToMove)
        },
        MOVE_COLUMN (state, { fromColumnIndex, toColumnIndex }) {
            const columnList = state.board.columns

            const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
            columnList.splice(toColumnIndex, 0, columnToMove)
        }
    },
    actions: {}
})