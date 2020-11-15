<script>
    import SearchInput from "../SearchInput.svelte"
    import { options } from '../stores/options.js'
</script>

<section class="dt-search" class:css={$options.css}>
    <SearchInput />
</section>

<style>
    section {
        height: 32px;
    }
    .css{margin-left: 16px;}
</style>
