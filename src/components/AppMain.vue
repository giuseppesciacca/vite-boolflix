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
}
</script>

<template>
    <main>
        <div class="row py-3 m-0">
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 g-3" v-for="result in this.store.results">
                <img class="img-fluid card-img" :src="urlPathBase + result.poster_path"
                    :alt="result.title ? result.title : result.name">


                <div class="d-none description text-white p-3">
                    <p><strong>Title:</strong> {{ result.title ? result.title : result.name }}</p>
                    <p v-if="result.original_title || result.original_name"><strong>Original Title:</strong> {{
                        result.original_title ?
                        result.original_title : result.original_name }}</p>

                    <p v-if="result.original_language" class=""><strong>Language:</strong> <img
                            :src="this.urlFlag + `${result.original_language == 'en' ? 'gb' : result.original_language || result.original_language == 'ja' ? 'jp' : result.original_language}.png`"
                            :alt="result.original_language"></p>

                    <!-- VOTI -->
                    <p v-if="Math.ceil(result.vote_average / 2) == 0"><strong>Vote:</strong>
                        <i class="fa-regular fa-star" v-for="i in 5"></i>
                    </p>

                    <p v-else-if="Math.ceil((result.vote_average) / 2) == 1"><strong>Vote:</strong>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star" v-for="i in 4"></i>
                    </p>

                    <p v-else-if="Math.ceil((result.vote_average) / 2) == 2"><strong>Vote:</strong>
                        <i v-for="i in 2" class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star" v-for="i in 3"></i>
                    </p>

                    <p v-else-if="Math.ceil((result.vote_average) / 2) == 3"><strong>Vote:</strong>
                        <i v-for="i in 3" class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star" v-for="i in 2"></i>
                    </p>

                    <p v-else-if="Math.ceil((result.vote_average) / 2) == 4"><strong>Vote:</strong>
                        <i v-for="i in 4" class="fa-solid fa-star"></i>
                        <i class="fa-regular fa-star"></i>
                    </p>

                    <p v-else-if="Math.ceil((result.vote_average) / 2) == 5"><strong>Vote:</strong>
                        <i v-for="i in 5" class="fa-solid fa-star"></i>
                    </p>

                    <p v-else><strong>Vote:</strong> {{ Math.ceil(result.vote_average / 2) }}/5</p>
                    <!-- /VOTI -->

                    <p><strong>Overview:</strong> {{ result.overview }}</p>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
main {
    background-color: #434343;

    .fa-star {
        color: orange;
    }

    .description {
        background-color: black;
        height: 100%;
        border: 2px solid white;

        p {
            margin: 0.5rem;
        }
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
}
</style>