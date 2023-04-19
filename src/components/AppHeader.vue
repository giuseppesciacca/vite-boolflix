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
        searchMovie() {
            //console.log(this.movie);
            this.store.fetchMovies(this.store.urlBase + this.movie);
            console.log(this.store.results);
        },
    },
}
</script>

<template>
    <header>
        <div class="nav justify-content-between align-items-center">
            <div class="header_left">
                <h1 class="p-3 fw-bold">BOOLFLIX</h1>
            </div>

            <div class="header_right pe-3">
                <input @keyup.enter="searchMovie()" class="m-3" v-model="movie" type="text" name="" id=""
                    placeholder="Search">
            </div>

        </div>
    </header>
</template>

<style lang="scss" scoped>
header {
    background-color: black;

    h1 {
        color: red;
    }
}
</style>