<script>
import { store } from '../store.js';
import FilterGenre from './FilterGenre.vue';
import AppCard from './AppCard.vue';


export default {
    name: 'AppMain',
    data() {
        return {
            store,
        }
    },
    components: {
        FilterGenre,
        AppCard
    },
    mounted() {
        this.store.fetchMoviesAndTvShow(this.store.urlDiscovery); //initial page 'discovery' ordered by popularity desc.
        this.store.fetchGenres(this.store.urlGenre); //create a list of genre
    }
}

</script>

<template>
    <main>
        <FilterGenre />

        <div v-if="this.store.results.length > 0" class="row py-3 m-0">

            <AppCard />
            <!-- /.col -->

        </div>
        <!-- /.row -->

        <div v-else>
            <h2 class="text-center p-5 fw-semibold">Risultato inesistente</h2>
        </div>
    </main>
</template>

<style lang="scss" scoped>
@use '../assets/sass/partials/variables.scss' as *;

main {
    background-color: $color_primary;

    h2 {
        color: $color_secondary;
    }

    h3 {
        color: $color_lighter;
    }
}
</style>