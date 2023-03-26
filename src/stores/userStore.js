import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`
const baseBackend = `${import.meta.env.VITE_BACKEND_URL}/sanctum`

export const userStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user'))
  }),
  actions: {
    async login(data) {
      await axios.get(`${baseBackend}/csrf-cookie`)
      const res = await axios.post(`${baseUrl}/login`, data)

      this.user = res

      localStorage.setItem('user', JSON.stringify(res))

      router.push({ path: '/' })
    },
    logout() {
      localStorage.removeItem('user')
      router.push({ path: '/login' })
    }
  }
})
