import axios, { AxiosError } from 'axios'
import https from 'https'

const httpRequest = (baseURL: string, token?: string) => {
  const accessToken = token ?? ''
  const instance = axios.create({
    baseURL,
    headers: {
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
      'Content-Type': 'application/json',
    },
    timeout: 60000,
    httpsAgent: new https.Agent({ keepAlive: true }),
  })

  instance.interceptors.request.use(
    (config) => {
      const accessToken = token ?? ''
      config.headers.Authorization = accessToken
        ? `Bearer ${accessToken}`
        : ''
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  // Add a response interceptor
  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error: Error | AxiosError) => {
      if (axios.isAxiosError(error)) {
        return Promise.reject(error as AxiosError)
      } else {
        return Promise.reject(error as Error)
      }
    },
  )

  return instance
}

export default httpRequest
