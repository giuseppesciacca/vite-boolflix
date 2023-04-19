<script>
import { store } from './store.js'

export default {
  data() {
    return {
      store,
      movie: '',
    }
  },
  methods: {
    searchMovie() {
      console.log(this.movie);
      this.store.fetchMovies(this.store.urlBase + this.movie);
    }
  },
  mounted() {
    this.store.fetchMovies(this.store.urlBase);
  },
}
</script>

<template>
  <h1>Looking for '{{ this.movie }}'...</h1>
  <input v-model="movie" type="text" name="" id="" placeholder="Movies">
  <button @click="searchMovie()">Search</button>
  <ol>
    <li class="my-3" v-for="result in this.store.results">
      <ul>
        <li><strong>Title: {{ result.title }}</strong></li>
        <li>Original Title: {{ result.original_title }}</li>
        <li>Language: {{ result.original_language }}</li>
        <li>Vote: {{ result.vote_average }}/10</li>
      </ul>
    </li>
  </ol>
</template>

<style lang="scss"></style>