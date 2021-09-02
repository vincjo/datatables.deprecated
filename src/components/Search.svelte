<script>
    import SearchInput from "../SearchInput.svelte"
    import { options } from "../stores/options.js"
    export let name = 'svelte-simple-datatable'
</script>

<section class="dt-search" class:css={options.css}>
    <SearchInput name="{name}"/>
</section>

<style>
    section {
        height: 32px;
    }
    .css{margin-left: 16px;}
</style>
