import axios from "axios"

let Axios = axios.create({
    baseURL: "http://localhost:5001/",
    headers: {
        "Content-type":"application/json"
    }
});

export default Axios;