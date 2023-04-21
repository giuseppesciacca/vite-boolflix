<script>
import { store } from './store.js';
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';



export default {
  data() {
    return {
      store,
      genreSelected: null,
      urlGenre: 'https://api.themoviedb.org/3/genre/movie/list?api_key=aa7ff67870b167647ae7e4a3d1b611a3',
    }
  },
  components: {
    AppHeader,
    AppMain,
  },
  methods: {
    switchGenre() {
      console.log(this.genreSelected);
    }
  },
  mounted() {
    this.store.fetchGenres(this.urlGenre)
  },
}
</script>

<template>
  <AppHeader />

  <!-- filter by genre -->
  <select @change="switchGenre" v-model="genreSelected" class="ms-5">
    <option disabled>Select Genre</option>
    <option :value="genre.id" v-for="genre in this.store.genres">{{ genre.name }}
    </option>
  </select>

  <AppMain />
</template>

<style lang="scss"></style>