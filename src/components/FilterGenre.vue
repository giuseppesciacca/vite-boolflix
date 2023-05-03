<script>
import { store } from '../store.js';

export default {
    name: 'FilterGenre',
    data() {
        return {
            store,
        }
    },
}
</script>

<template>
    <!-- filter by genre -->
    <select v-model="this.store.idGenreSelected" class="ms-5">
        <option selected disabled>Seleziona Genere</option>
        <option :value="null">Tutti</option>
        <option :value="genre.id" v-for="genre in this.store.genres">{{ genre.name }}
        </option>
        <option :value="genre.id" v-for="genre in this.store.genreOnlyTvShow">{{ genre.name }}</option>
    </select>
</template>

<style lang="scss" scoped></style>