<script>
import { store } from '../store.js';

export default {
    name: 'AppMain',
    data() {
        return {
            store,
            urlFlag: 'https://flagcdn.com/20x15/',
            urlPathBase: 'https://image.tmdb.org/t/p/w342/',
        }
    },
    mounted() {
        this.store.fetchMoviesAndTvShow(' https://api.themoviedb.org/3/discover/movie?api_key=aa7ff67870b167647ae7e4a3d1b611a3&language=it-IT&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate') //initial page with a as search
    }
}
</script>

<template>
    <main>
        <div v-if="this.store.results.length > 0" class="row py-3 m-0">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 g-3" v-for="result in this.store.results">
                <img class="img-fluid card-img" :src="urlPathBase + result.poster_path" s
                    onerror="this.onerror=null; this.src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'"
                    :alt="result.title ? result.title : result.name">

                <div class="description d-none text-white p-3">
                    <p><strong>Titolo:</strong> {{ result.title ? result.title : result.name }}</p>

                    <p
                        v-if="result.original_title != result.title || result.original_name != result.name && result.original_title || result.original_name">
                        <strong>Titolo Originale:</strong> {{
                            result.original_title ?
                            result.original_title : result.original_name }}
                    </p>

                    <p v-if="result.original_language" class=""><strong>Lingua:</strong> <img
                            :src="this.urlFlag + `${result.original_language == 'en' ? 'gb' : result.original_language || result.original_language == 'ja' ? 'jp' : result.original_language}.png`"
                            :alt="result.original_language"></p>

                    <div v-if="result.vote_average">
                        <p v-if="Math.ceil(result.vote_average / 2) == 0"><strong>Voto:</strong>
                            <i class="fa-regular fa-star" v-for="i in 5"></i>
                        </p>

                        <p v-else-if="Math.ceil((result.vote_average) / 2) == 1"><strong>Voto:</strong>
                            <font-awesome-icon :icon="['fas', 'star']" />
                            <font-awesome-icon :icon="['far', 'star']" v-for="i in 4" />
                        </p>

                        <p v-else-if="Math.ceil((result.vote_average) / 2) == 2"><strong>Voto:</strong>
                            <font-awesome-icon v-for="i in 2" :icon="['fas', 'star']" />
                            <font-awesome-icon v-for="i in 3" :icon="['far', 'star']" />
                        </p>

                        <p v-else-if="Math.ceil((result.vote_average) / 2) == 3"><strong>Voto:</strong>
                            <font-awesome-icon v-for="i in 3" :icon="['fas', 'star']" />
                            <font-awesome-icon v-for="i in 2" :icon="['far', 'star']" />
                        </p>

                        <p v-else-if="Math.ceil((result.vote_average) / 2) == 4"><strong>Voto:</strong>
                            <font-awesome-icon v-for="i in 4" :icon="['fas', 'star']" />
                            <font-awesome-icon :icon="['far', 'star']" />
                        </p>

                        <p v-else-if="Math.ceil((result.vote_average) / 2) == 5"><strong>Voto:</strong>
                            <font-awesome-icon v-for="i in 5" :icon="['fas', 'star']" />
                        </p>

                        <p v-else><strong>Voto:</strong> {{ Math.ceil(result.vote_average / 2) }}/5</p>
                    </div>
                    <!-- /VOTI -->

                    <p v-if="result.overview"><strong>Trama:</strong> {{ result.overview }}</p>
                </div>
            </div>
        </div>

        <div v-else>
            <h2 class="text-center p-5 fw-1">Risultato inesistente</h2>
        </div>
    </main>
</template>

<style lang="scss" scoped>
main {
    background-color: #434343;

    h2 {
        color: red;
    }

    [class^="col"] {
        height: 550px;
    }

    .card-img {
        border: 2px solid white;
        height: 100%;
        object-fit: cover;
    }

    .card-img:hover,
    [class^="col"]:hover .card-img {
        display: none;
        z-index: 1;
    }

    .card-img:hover+.description,
    [class^="col"]:hover .description {
        display: block !important;
    }

    .description {
        background-color: black;
        height: 100%;
        border: 2px solid white;
        overflow-y: auto;

        p {
            margin: 0.5rem;

            .fa-star {
                color: orange;
            }
        }
    }

}
</style>