<script>
import { store } from '../store.js';

export default {
    name: 'AppCard',
    data() {
        return {
            store,
            urlFlag: 'https://flagcdn.com/20x15/',
            urlPathBase: 'https://image.tmdb.org/t/p/w342/',
        }
    },
    methods: {
        /**
         * 
         * @param {String} language 
         * @returns some code language in code country
         */
        returnCodeLanguage(language) {
            if (language == 'en') {
                return 'gb'
            } else if (language == 'ja') {
                return 'jp'
            } else {
                return language
            }
        },
        /**
         * @returns Num max cast at 5
         */
        maxCast() {
            if (store.cast.length >= 5) {
                return 5
            } else {
                return store.cast.length
            }
        },
        /**
         * on mouseleave of the column, cast array is empty
         */
        clearCast() {
            store.cast = [];
        },
        /**
         * 
         * @param {number} genreId 
         */
        convertGenreIds(genreId) {
            //prendo la posizione dell'id del genere per poi ricavarne il nome
            let index = this.store.genres.findIndex((val) => { return val.id == genreId })
            let indexTV = this.store.genreOnlyTvShow.findIndex((val) => { return val.id == genreId })

            if (this.store.genres[index]) {
                let name = this.store.genres[index].name
                return name
            } else if (this.store.genreOnlyTvShow[indexTV]) {
                let name = this.store.genreOnlyTvShow[indexTV].name
                return name
            } else {
                return genreId
            }
        },
        /**
         * 
         * @param {String} mediaType 
         * @param {number} id_movies 
         * @returns function that fetch cast movie or tv 
         */
        fetchCastTvOrMovie(mediaType, id_movies) {
            //console.log(mediaType);
            //console.log(id_movies);
            if (mediaType == "movie") {
                return this.store.fetchCastMovie(id_movies)
            } else {
                return this.store.fetchCastTvShow(id_movies)
            }
        }
    }
}
</script>

<template>
    <!-- Se all'interno dei risultati in pagina sono presenti film con il genere selezionato allora mostrali, altrimenti display: none -->
    <div @mouseenter="fetchCastTvOrMovie(result.title ? 'movie' : 'tv', result.id)" @mouseleave="clearCast()"
        class="col-12 col-sm-6 col-md-4 col-lg-3 g-3" v-for="result in this.store.results"
        :class="(result.genre_ids.includes(this.store.idGenreSelected) || this.store.idGenreSelected == null) ? 'd-block' : 'd-none'">

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
                    :src="`${this.urlFlag + this.returnCodeLanguage(result.original_language)}.png`"
                    :alt="result.original_language">
            </p>

            <p v-if="result.vote_average"><strong>Voto:</strong>
                <!-- se voto > 0, quindi ha almeno una stella piena, cicla per il numero del voto -->
                <font-awesome-icon style="color: #ffa500;" v-if="Math.ceil(result.vote_average / 2) > 0"
                    :icon="['fas', 'star']" v-for="i in Math.ceil(result.vote_average / 2)" />
                <!-- se voto < 5, quindi ha almeno una stella vuota, cicla per 5 meno il numero del voto -->
                <font-awesome-icon style="color: #ffa500;" v-if="Math.ceil(result.vote_average / 2) < 5"
                    :icon="['far', 'star']" v-for="i in (5 - Math.ceil(result.vote_average / 2)) " />
            </p>

            <p v-if="result.overview"><strong>Trama:</strong> {{ result.overview }}</p>

            <p v-if="result.genre_ids.length > 0">Genere:
                <span v-for="genre in result.genre_ids">{{ this.convertGenreIds(genre) + ' ' }} </span>
            </p>

            <p v-if="store.cast.length > 0">Cast:
            <ul>
                <li v-for="n in maxCast()"> {{ store.cast[n - 1].name }} </li>
            </ul>
            </p>
        </div>
    </div>
    <!-- /.col -->
</template>

<style lang="scss" scoped>
@use '../assets/sass/partials/variables.scss' as *;

[class^="col"] {
    height: 550px;
}

.card-img {
    border: 2px solid $color_lighter;
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
    background-color: $color_darker;
    height: 100%;
    border: 2px solid $color_lighter;
    overflow-y: auto;

    p {
        margin: 0.5rem;
    }
}
</style>