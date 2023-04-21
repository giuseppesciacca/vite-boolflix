<script>
import { store } from '../store.js';

export default {
    name: 'FilterGenre',
    data() {
        return {
            store
        }
    },
}
</script>

<template>
    <!-- filter by genre -->
    <select v-model="this.store.idGenreSelected" class="ms-5">
        <option selected disabled>Select Genre</option>
        <option :value="null">All</option>
        <option :value="genre.id" v-for="genre in this.store.genres">{{ genre.name }}
        </option>
    </select>
</template>

<style lang="scss" scoped></style>