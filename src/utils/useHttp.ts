import axios from "axios"
import { stringify } from "qs"

export const useHttp = () => {
  const get = (url: string, queryObject?: any) => {
    return axios.get(`${url}?${stringify(queryObject)}`)
  }
  const post = (url, body) => {
    return axios({
      url,
      method: "POST",
      headers: {
        "content-type": "text/plain",
      },
      data: body,
    })
  }
  return { get, post }
}
