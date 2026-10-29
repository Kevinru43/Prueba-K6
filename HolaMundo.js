import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        {duration: '5s', target:2},
        {duration: '10s', target:5},
        {duration: '5s', target:2},
    ]
}

export default function() {
    http.get('https://blazedemo.com/');
    sleep(1);
}