import axios from 'axios'

import { SERVER } from '../config/Constance'

const cancelToken = axios.CancelToken
const source = cancelToken.source()
const baseRequest = async (method, path, payload) => {
    try {
        const response = axios({
            url: path,
            method,
            baseURL: SERVER,
            data: payload,
            timeout: 5000,
            timeoutErrorMessage: 'Fail',
            cancelToken: source.token,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response
    }catch(err){
        if (axios.isCancel(err)){
            console.log("Request Canceled "+ err);
        }
        else{

        }
    }
}

export const get = (path, payload) => baseRequest('get', path, payload)
export const post = (path, payload) => baseRequest('post', path, payload)
export const put = (path, payload) => baseRequest('put', path, payload)
export const del = (path, payload) => baseRequest('delete', path, payload)