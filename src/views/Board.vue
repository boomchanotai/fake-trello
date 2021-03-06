<template>
    <div>
        <div class="my-5 mx-20">
            <h1 class="text-white font-bold text-2xl mr-10 inline">{{ board.name }}</h1>
            <button 
                class="bg-red-600 text-white text-sm rounded-lg shadow-lg px-4 py-2"
                @click="resetBoard"
            >
                Reset Board
            </button>
        </div>
        <div class="mx-20 flex flex-row items-start">
            <div 
                v-for="(column, $columnIndex) in board.columns" 
                :key="$columnIndex"
                draggable
                @drop="moveTaskOrColumn($event, column.tasks, $columnIndex)"
                @dragover.prevent
                @dragenter.prevent
                @dragstart.self="pickupColumn($event, $columnIndex)"
                class="m-4 py-5 px-8 bg-gray-300 rounded-lg shadow-lg cursor-pointer"
                style="min-width: 350px;"
            >
                <input 
                    type="text" 
                    v-model="column.name"
                    class="font-bold text-lg bg-transparent focus:outline-none"
                    @keyup="editColumnName($event, column)"
                >
                <div class="my-4">
                    <div
                        v-for="(task, $taskIndex) in column.tasks" 
                        :key="$taskIndex"
                        draggable
                        @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
                        class="py-2"
                    ><TaskItem :id="task.id">{{ task.name }}</TaskItem></div>
                    <TaskItem class="py-2">
                        <input 
                            type="text" 
                            class="focus:outline-none bg-gray-100 rounded-lg py-1 px-4" 
                            placeholder="+ New Task"
                            @keyup.enter="createTask($event, column.tasks)"
                        >
                    </TaskItem>
                </div>
            </div>
            <div
                class="m-4 py-5 px-8 bg-gray-300 rounded-lg shadow-lg cursor-pointer"
                style="min-width: 350px;"
            >
                <input 
                    type="text" 
                    class="focus:outline-none bg-gray-200 py-1 px-4 font-bold w-full rounded-lg"
                    placeholder="+ New Column"
                    @keyup.enter="createColumn($event, board.columns)"
                >
            </div>
        </div>

        <Task 
            v-show="isTaskOpenned"
            :id="this.$route.params.id"
        ></Task>
    </div>
</template>

<script>
import Task from '@/components/Task'
import TaskItem from '@/components/TaskItem'
import defaultBoard from '../defaultBoard'

export default {
    name: 'Board',
    components: {
        TaskItem,
        Task
    },
    props: {
        id: String
    },
    computed: {
        board() {
            return this.$store.state.board
        },
        isTaskOpenned() {
            return (this.$route.name === 'task') ? true : false
        }
    },
    methods: {
        resetBoard() {
            localStorage.setItem(
                'board',
                JSON.stringify(defaultBoard)
            )
        },
        createTask(e, tasks) {
            this.$store.commit('CREATE_TASK', { tasks, name: e.target.value })
            e.target.value = ''
        },
        createColumn (e, columns) {
            this.$store.commit('CREATE_COLUMN', { columns, name : e.target.value })
            e.target.value = ''
        },
        pickupTask(e, taskIndex, fromColumnIndex) {
            e.dataTransfer.effectAllowed = 'move'
            e.dataTransfer.dropEffect = 'move'

            e.dataTransfer.setData('task-index', taskIndex)
            e.dataTransfer.setData('from-column-index', fromColumnIndex)
            e.dataTransfer.setData('type', 'task')
        },
        pickupColumn(e, fromColumnIndex) {
            e.dataTransfer.effectAllowed = 'move'
            e.dataTransfer.dropEffect = 'move'

            e.dataTransfer.setData('type', 'column')
            e.dataTransfer.setData('from-column-index', fromColumnIndex)
        },
        moveTaskOrColumn(e, columnTasks, toColumnIndex) {
            const type = e.dataTransfer.getData('type')
            if (type === 'task') {
                this.moveTask(e, columnTasks)
            } else {
                this.moveColumn(e, toColumnIndex)
            }
        },
        moveTask(e, columnTasks){
            const fromColumnIndex = e.dataTransfer.getData('from-column-index')
            const fromTasks = this.board.columns[fromColumnIndex].tasks
            const taskIndex = e.dataTransfer.getData('task-index')

            this.$store.commit('MOVE_TASK', { fromTasks, newColumnTasks : columnTasks, taskIndex })
        },
        moveColumn (e, toColumnIndex) {
            const fromColumnIndex = e.dataTransfer.getData('from-column-index')

            this.$store.commit('MOVE_COLUMN', {
                fromColumnIndex,
                toColumnIndex
            })
        },
        editColumnName (e, column) {
            this.$store.commit('UPDATE_COLUMN_NAME', { column, name : e.target.value })
        }
    }
}
</script>
<style>

</style>