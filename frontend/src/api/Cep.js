import axios from 'axios';

export default function searchByCep(cep, setResponse){
    axios.get(`http://127.0.0.1:5000/cep/${cep}`).then(res => {
        setResponse(res.data);
    }).catch(err => {
        console.log(err);
    });
}