import axios from 'axios';

let obj={
    get:function (url) {
        return axios.get(url)
    },
    post:function (url,data) {
        return axios.post(url,data)
    }
}
export default obj
