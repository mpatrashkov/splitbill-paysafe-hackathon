import axios from "axios"

export const splitBillApi = axios.create({
    baseURL: "http://wethebest.asuscomm.com",
})
