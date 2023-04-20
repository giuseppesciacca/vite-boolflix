<script>
import { store } from '../store.js';

export default {
    name: 'AppHeader',
    data() {
        return {
            store,
            movie: '',
        }
    },
    methods: {
        searchMovieAndTvShow() {
            //console.log(this.movie);
            this.store.fetchMoviesAndTvShow(this.store.urlBase + this.movie);
            console.log(this.store.results);
        },
    },
}
</script>

<template>
    <header>
        <div class="nav justify-content-between align-items-center">
            <div class="header_left">
                <h1 class="p-3 fw-bold">BoolfliX</h1>
            </div>

            <div class="header_right pe-3">
                <input @keyup.enter="searchMovieAndTvShow()" class="m-3" v-model="movie" type="text" name="" id=""
                    placeholder="Search">
            </div>

        </div>
    </header>
</template>

<style lang="scss" scoped>
header {
    background-color: black;
    height: 90px;

    h1 {
        color: red;
    }
}
</style>