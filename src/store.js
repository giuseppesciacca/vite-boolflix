import { reactive } from 'vue'
import axios from 'axios'

export const store = reactive({
    urlBase: 'https://api.themoviedb.org/3/search/multi?api_key=aa7ff67870b167647ae7e4a3d1b611a3&query=',
    results: [],
    fetchMovies(url) {
        axios
            .get(url)
            .then(response => {
                //console.log(response.data);
                console.log(response.data.results);
                this.results = response.data.results;
            }).catch(error => {
                console.error(error.message);
            })
    },
})
