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
    check(respuesta, { 'Validando texto de la pagina: OK': (r) => r.body.includes('Welcome to the Simple Travel Agency!')}),
    check(respuesta, { 'Validando subtítulo: OK': (r) => r.body.includes('The is a sample site you can test with BlazeMeter!')}),
    check(respuesta, { 'Validando tamaño': (r) => r.body.length < 11300})

    console.log("Tipos de respuesta")
    console.log("Response Url" + String(respuesta.request.url))
    console.log("Response método de respuesta" + String(respuesta.request.method))
    console.log("Response método de status" + String(respuesta.status))
    console.log("Response método de status_text" + String(respuesta.status_text))
    console.log("Response método de Http Sending" + String(respuesta.timings.sending))
    console.log("Response método de Http Waiting" + String(respuesta.timings.waiting))
    console.log("Response método de Http Receiving" + String(respuesta.timings.receiving))

    sleep(1);
}