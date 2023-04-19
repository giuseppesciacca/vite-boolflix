<script>
import { store } from './store.js'

export default {
  data() {
    return {
      store,
      movie: '',
      urlFlag: 'https://flagcdn.com/20x15/'
    }
  },
  methods: {
    searchMovie() {
      //console.log(this.movie);
      this.store.fetchMovies(this.store.urlBaseMovie + this.movie); //recupero i results dei film
      this.store.fetchTvShows(this.store.urlBaseTvShow + this.movie); //recupero i results delle serie
      this.store.results = this.store.results.concat(this.store.resultTvShows); //li unisco
      console.log(this.store.results);
    },
  },
}
</script>

<template>
  <h1 class="m-3">Looking for '{{ this.movie }}'...</h1>

  <input class="m-3" v-model="movie" type="text" name="" id="" placeholder="Movies">
  <button @click="searchMovie()">Search</button>

  <ol>
    <li class="my-3" v-for="result in this.store.results">
      <ul>
        <li><strong>Title: {{ result.title ? result.title : result.name }}</strong></li>
        <li v-if="result.original_title || result.original_name">Original Title: {{ result.original_title ?
          result.original_title : result.original_name }}</li>
        <li>Language: <img
            :src="this.urlFlag + `${result.original_language == 'en' ? 'gb' : result.original_language || result.original_language == 'ja' ? 'jp' : result.original_language}.png`"
            :alt="result.original_language">
        </li>
        <li>Vote: {{ result.vote_average }}/10</li>
      </ul>
    </li>
  </ol>
</template>

<style lang="scss"></style>