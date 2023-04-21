<script>
import { store } from '../store.js';

export default {
    name: 'FilterGenre',
    data() {
        return {
            store
        }
    },
    mounted() {
        this.store.fetchGenres(this.store.urlGenre);
    },

}
</script>

<template>
    <!-- filter by genre -->
    <select @change="this.store.switchGenre" v-model="this.store.idGenreSelected" class="ms-5">
        <option disabled selected>Select Genre</option>
        <option :value="genre.id" v-for="genre in this.store.genres">{{ genre.name }}
        </option>
    </select>
</template>

<style lang="scss" scoped></style>