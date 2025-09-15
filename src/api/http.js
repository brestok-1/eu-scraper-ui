import axios from 'axios'

const http = axios.create({
  baseURL: 'https://brestok-eu-scrapper.hf.space',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.response.use(
  r => r,
  err => Promise.reject(err)
)

export default http


