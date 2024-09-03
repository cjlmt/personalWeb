import axios from 'axios'

const request = axios.create({
  //请求的基础路径
  // baseURL: 'http://localhost:4000/api',
  baseURL: 'http://139.159.234.145:4000/api',
  // 除了这里要变，image那里也要变
  timeout: 5000
})

export default request
