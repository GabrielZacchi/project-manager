import axios from "axios";
import { login } from "./Auth";

export const postUser = (data, setMessage, navigate) => {
    axios.post(
        `http://127.0.0.1:5000/users/`,
        {
            name: data.get('name'),
            username: data.get('username'),
            password: data.get('password')
        }).then(res => {
            login(data, setMessage, navigate);
        }).catch(err => {
            setMessage(err.response.data);
        });
}