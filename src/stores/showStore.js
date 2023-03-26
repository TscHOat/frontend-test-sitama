import { defineStore } from 'pinia'

export const showStore = defineStore({
  id: 'show',
  state: () => ({
    isOpen: false,
    showData: null
  })
})
