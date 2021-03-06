<template>
    <router-link v-if="id" :to="'/task/' + id" class="bg-gray-200 py-2 px-4 rounded-lg shadow-lg w-full">
        <slot></slot>
    </router-link>
    <div v-else><slot></slot></div>
</template>

<script>
export default {
    name : 'TaskItem',
    props: {
        id : String
    }
}
</script>
