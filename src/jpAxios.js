import axios from "axios";

export const jpAxios = axios.create({
    baseURL:'https://jsonplaceholder.typicode.com',
    headers: {
        Authorization:'Bearer 3klaksdopqk203klk',
        "Content-Type":"application/json"
    },
    timeout:6000,
    timeoutErrorMessage:"Nothing comes from server"
}) 

