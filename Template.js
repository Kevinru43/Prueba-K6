import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 5,
    duration: '20s',
};


export default function() {
    http.get('https://blazedemo.com/');
    sleep(1);
}