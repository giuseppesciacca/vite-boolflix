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
            this.movie = '';
        },
    },
}
</script>

<template>
    <header>
        <div class="nav justify-content-between align-items-center">
            <div class="header_left d-flex ">
                <img @click="store.fetchMoviesAndTvShow(store.urlDiscovery)" class="ps-5 d-none d-sm-block" height="90"
                    src="../assets/img/Netflix-logo-big.png" alt="">
                <img @click="store.fetchMoviesAndTvShow(store.urlDiscovery)" class="ps-3 d-sm-none" height="70"
                    src="../assets/img/Netflix-logo-small.png" alt="">
                <ul class="navbar m-0">
                    <li class="nav-item active" @click="store.fetchMoviesAndTvShow(store.urlDiscovery)">
                        <a class="px-3 d-none d-xl-block" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="px-3 d-none d-xl-block" href="#">Serie TV</a>
                    </li>
                    <li class="nav-item">
                        <a class="px-3 d-none d-xl-block" href="#">Film</a>
                    </li>
                    <li class="nav-item">
                        <a class="px-3 d-none d-xl-block" href="#">Originali</a>
                    </li>
                    <li class="nav-item">
                        <a class="px-3 d-none d-xl-block" href="#">Aggiunti di recente</a>
                    </li>
                    <li class="nav-item">
                        <a class="px-3 d-none d-xl-block" href="#">La mia lista</a>
                    </li>
                </ul>
            </div>

            <div class="header_right pe-3 pe-sm-5">
                <input @keyup.enter="searchMovieAndTvShow()" class="m-3" v-model="movie" type="text" name="" id=""
                    placeholder="Cerca tra i film e le serie TV">
            </div>

        </div>
    </header>
</template>

<style lang="scss" scoped>
@use '../assets/sass/partials/variables.scss' as *;

header {
    background-color: $color_primary;
    height: 90px;

    img {
        cursor: pointer;
    }

    ul {
        list-style: none;

        a {
            color: $color_text;
            text-decoration: none;
        }

        a:hover {
            color: $color_lighter
        }
    }

    .active a {

        color: $color_lighter;
        font-weight: bold;
    }
}
</style>