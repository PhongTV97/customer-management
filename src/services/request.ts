import { CONSTANT } from '@/constants'
import axios from 'axios'

const request = axios.create({
  baseURL: process.env.VITE_APP_API_URL,
  headers: {
    Accept: CONSTANT.APPLICATION_JSON,
    [CONSTANT.CONTENT_TYPE]: CONSTANT.APPLICATION_JSON
  },
  paramsSerializer: { indexes: null }
})

export default request
