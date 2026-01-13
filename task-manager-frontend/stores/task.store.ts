import { defineStore } from 'pinia'
import { ref } from 'vue'
import useApi from '../composables/useApi'

interface Task {
  id: number
  title: string
  completed: boolean
}

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([])
  const api = useApi()

  async function fetchTasks(filter: 'all' | 'completed' | 'pending' = 'all') {
    try {
      const res = await api.get('/tasks', { params: { filter } })
      tasks.value = res.data.data
    } catch (err: any) {
      console.error('Failed to fetch tasks:', err.response?.data?.message || err.message)
    }
  }

  async function addTask(title: string) {
    try {
      const res = await api.post('/tasks', { title })
      tasks.value.push(res.data.data)
    } catch (err: any) {
      console.error('Failed to add task:', err.response?.data?.message || err.message)
    }
  }

  async function toggleTask(id: number) {
    try {
      const res = await api.patch(`/tasks/${id}`)
      const index = tasks.value.findIndex(t => t.id === id)
      if (index !== -1) tasks.value[index] = res.data.data
    } catch (err: any) {
      console.error('Failed to toggle task:', err.response?.data?.message || err.message)
    }
  }

  async function deleteTask(id: number) {
    try {
      await api.delete(`/tasks/${id}`)
      tasks.value = tasks.value.filter(t => t.id !== id)
    } catch (err: any) {
      console.error('Failed to delete task:', err.response?.data?.message || err.message)
    }
  }

  return {
    tasks,
    fetchTasks,
    addTask,
    toggleTask,
    deleteTask,
  }
})
