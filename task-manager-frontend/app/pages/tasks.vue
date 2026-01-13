<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useTaskStore } from '../../stores/task.store'
import { useAuthStore } from '../../stores/auth.store'

definePageMeta({
  middleware: 'auth',
})

const taskStore = useTaskStore()
const authStore = useAuthStore()

const newTaskTitle = ref('')
const filter = ref<'all' | 'completed' | 'pending'>('all')
const loading = ref(false)

watchEffect(async () => {
  loading.value = true
  await taskStore.fetchTasks(filter.value)
  loading.value = false
})


const tasks = computed(() => taskStore.tasks)


const addTask = async () => {
  if (!newTaskTitle.value.trim()) return
  await taskStore.addTask(newTaskTitle.value)
  newTaskTitle.value = ''
}


const toggleTask = async (id: number) => {
  await taskStore.toggleTask(id)
}


const deleteTask = async (id: number) => {
  await taskStore.deleteTask(id)
}

const logout = () => {
  authStore.logout()
  navigateTo('/login')
}
</script>

<template>
  <div style="max-width: 600px; margin: 40px auto;">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h2>Tasks</h2>
      <button @click="logout">Logout</button>
    </div>

    <!-- Add task -->
    <div style="margin-top: 20px;">
      <input
        v-model="newTaskTitle"
        placeholder="New task title"
      />
      <button @click="addTask">Add</button>
    </div>

    <!-- Filters -->
    <div style="margin-top: 20px;">
      <button @click="filter = 'all'">All</button>
      <button @click="filter = 'completed'">Completed</button>
      <button @click="filter = 'pending'">Pending</button>
    </div>

    <!-- Task list -->
    <div style="margin-top: 20px;">
      <p v-if="loading">Loading...</p>

      <ul v-else>
        <li v-for="task in tasks" :key="task.id">
          <span
            @click="toggleTask(task.id)"
            style="cursor: pointer;"
          >
            {{ task.completed ? '✅' : '⬜' }} {{ task.title }}
          </span>
          <button @click="deleteTask(task.id)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>
