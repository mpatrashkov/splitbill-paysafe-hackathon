import axios from "axios"
import { splitBillBaseUrl } from "../config"

export const splitBillApi = axios.create({
    baseURL: splitBillBaseUrl,
})
