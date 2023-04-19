import { reactive } from 'vue'
import axios from 'axios'

export const store = reactive({
    urlBaseMovie: 'https://api.themoviedb.org/3/search/movie?api_key=aa7ff67870b167647ae7e4a3d1b611a3&query=',
    urlBaseTvShow: 'https://api.themoviedb.org/3/search/tv?api_key=aa7ff67870b167647ae7e4a3d1b611a3&query=',
    results: [],
    resultTvShows: [],
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
    fetchTvShows(url) {
        axios
            .get(url)
            .then(response => {
                //console.log(response.data);
                console.log(response.data.results);
                this.resultTvShows = response.data.results;
            }).catch(error => {
                console.error(error.message);
            })
    }
})
