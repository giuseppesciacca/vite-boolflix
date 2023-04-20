<script>
import { store } from '../store.js';

export default {
    name: 'AppMain',
    data() {
        return {
            store,
            urlFlag: 'https://flagcdn.com/20x15/',
            urlPathBase: 'https://image.tmdb.org/t/p/w342/',
            urlDiscovery: 'https://api.themoviedb.org/3/discover/movie?api_key=aa7ff67870b167647ae7e4a3d1b611a3&language=it-IT&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate',
        }
    },
    mounted() {
        this.store.fetchMoviesAndTvShow(this.urlDiscovery) //initial page 'discovery' ordered by popularity desc.
    }
}
</script>

<template>
    <main>
        <div v-if="this.store.results.length > 0" class="row py-3 m-0">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 g-3" v-for="result in this.store.results">
                <img v-if="result.poster_path" class="img-fluid card-img" :src="urlPathBase + result.poster_path"
                    :alt="result.title ? result.title : result.name">
                <img v-else class="backdrop_path img-fluid card-img" :src="urlPathBase + result.backdrop_path"
                    :alt="result.title ? result.title : result.name"
                    onerror="this.onerror=null; this.src= 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'">

                <div class="description d-none text-white p-3">
                    <p><strong>Titolo:</strong> {{ result.title ? result.title : result.name }}</p>

                    <p
                        v-if="result.original_title != result.title || result.original_name != result.name && result.original_title || result.original_name">
                        <strong>Titolo Originale:</strong> {{
                            result.original_title ?
                            result.original_title : result.original_name }}
                    </p>

                    <p v-if="result.original_language"><strong>Lingua:</strong> <img
                            :src="this.urlFlag + `${result.original_language == 'en' ? 'gb' : result.original_language && result.original_language == 'ja' ? 'jp' : result.original_language}.png`"
                            :alt="result.original_language"></p>

                    <p v-if="result.vote_average"><strong>Voto:</strong>
                        <!-- se voto > 0, quindi ha almeno una stella piena, cicla per il numero del voto -->
                        <font-awesome-icon style="color: #ffa500;" v-if="Math.ceil(result.vote_average / 2) > 0"
                            :icon="['fas', 'star']" v-for="i in Math.ceil(result.vote_average / 2)" />
                        <!-- se voto < 5, quindi ha almeno una stella vuota, cicla per 5 meno il numero del voto -->
                        <font-awesome-icon style="color: #ffa500;" v-if="Math.ceil(result.vote_average / 2) < 5"
                            :icon="['far', 'star']" v-for="i in (5 - Math.ceil(result.vote_average / 2)) " />
                    </p>

                    <p v-if="result.overview"><strong>Trama:</strong> {{ result.overview }}</p>
                </div>
            </div>
        </div>

        <div v-else>
            <h2 class="text-center p-5 fw-semibold">Risultato inesistente</h2>
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
        }
    }

}
</style>