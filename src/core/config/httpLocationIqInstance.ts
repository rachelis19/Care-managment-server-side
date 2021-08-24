import axios from 'axios'

export default {
    provide: 'http',
    useValue: axios.create({baseURL: 'https://us1.locationiq.com/v1'})
}