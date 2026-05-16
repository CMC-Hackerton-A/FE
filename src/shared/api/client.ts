import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'http://52.78.63.8:8080',
  timeout: 30_000,
  headers: { 'Content-Type': 'application/json' },
})
