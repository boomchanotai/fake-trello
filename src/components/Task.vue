<template>
    <div 
        class="fixed top-1/2 left-1/2 bg-white shadow-lg rounded-xl"
        style="transform: translate(-50%, -50%); min-width: 70vw; min-height: 70vh;"
    >
        
        <input 
            type="text"
            class="mt-10 mx-16 font-bold text-xl focus:outline-none"
            v-model="task.name"
            @keyup="editName(e, 'name')"
        >
        <div class="py-5 px-16">
            <textarea 
                rows="10" 
                v-model="task.description"
                class="w-full bg-gray-100 p-4 rounded-lg focus:outline-none resize-none"
                @keyup="editDescription($event, 'description')"
            ></textarea>
        </div>
        <router-link to="/" class="absolute top-7 right-7">
            <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </router-link>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name : 'Task',
    props : {
        id : String
    },
    computed: {
        ...mapGetters(['getTask']),
        task() {
            return this.getTask(this.id);
        }
    },
    methods: {
        editName(e, key) {
            this.$store.commit('UPDATE_TASK', {
                task: this.task,
                key,
                value: e.target.value
            })
        },
        editDescription (e, key) {
            this.$store.commit('UPDATE_TASK', { 
                task: this.task,
                key,
                value : e.target.value
            })
        }
    }
}
</script>
<style>

</style>