import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        {duration: '5s', target: 3},
        {duration: '3s', target: 2},
        {duration: '2s', target: 1},
        {duration: '1s', target: 0},
    ]
};


export default function() {
    const respuesta = http.get('https://blazedemo.com/');
    check(respuesta, { 'La pagina se cargo correctamente: status 200': (r) => r.status == 200})
    sleep(1);
}