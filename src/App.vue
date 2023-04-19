<script>
import { store } from './store.js'

export default {
  data() {
    return {
      store,
      movie: '',
      urlFlag: 'https://flagcdn.com/20x15/',
      urlPathBase: 'https://image.tmdb.org/t/p/w342/'
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
        <h1 class="p-3">BOOLFLIX</h1>
      </div>

      <div class="header_right pe-3">
        <input @keyup.enter="searchMovie()" class="m-3" v-model="movie" type="text" name="" id="" placeholder="Search">
      </div>

    </div>
  </header>

  <main>
    <ol class="text-white">
      <li class="py-3" v-for="result in this.store.results">
        <ul>
          <li><strong>Title: {{ result.title ? result.title : result.name }}</strong></li>
          <li v-if="result.poster_path">
            <img :src="urlPathBase + result.poster_path" :alt="result.title ? result.title : result.name">
          </li>

          <li v-if="result.original_title || result.original_name">Original Title: {{ result.original_title ?
            result.original_title : result.original_name }}
          </li>

          <li v-if="result.original_language">Language: <img
              :src="this.urlFlag + `${result.original_language == 'en' ? 'gb' : result.original_language || result.original_language == 'ja' ? 'jp' : result.original_language}.png`"
              :alt="result.original_language">
          </li>


          <li v-if="Math.ceil(result.vote_average / 2) == 0">Vote:
            <i class="fa-regular fa-star" v-for="i in 5"></i>
          </li>

          <li v-else-if="Math.ceil((result.vote_average) / 2) == 1">Vote:
            <i class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star" v-for="i in 4"></i>
          </li>

          <li v-else-if="Math.ceil((result.vote_average) / 2) == 2">Vote:
            <i v-for="i in 2" class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star" v-for="i in 3"></i>
          </li>

          <li v-else-if="Math.ceil((result.vote_average) / 2) == 3">Vote:
            <i v-for="i in 3" class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star" v-for="i in 2"></i>
          </li>

          <li v-else-if="Math.ceil((result.vote_average) / 2) == 4">Vote:
            <i v-for="i in 4" class="fa-solid fa-star"></i>
            <i class="fa-regular fa-star"></i>
          </li>

          <li v-else-if="Math.ceil((result.vote_average) / 2) == 5">Vote:
            <i v-for="i in 5" class="fa-solid fa-star"></i>
          </li>

          <li v-else>Vote: {{ Math.ceil(result.vote_average / 2) }}/5</li>

        </ul>
      </li>
    </ol>

  </main>
</template>

<style lang="scss">
header {
  background-color: black;

  h1 {
    color: red;
  }
}

main {
  background-color: #434343;

  i {
    color: orange;
  }
}
</style>