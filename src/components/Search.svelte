<script>
    import { options } from '../store.js'
    import SearchInput from '../SearchInput.svelte'
</script>

<section class="dt-search">
{#if $options.search === true}
    <SearchInput/>
{/if}
</section>
