<script>
    import { getContext } from 'svelte'
    import SearchInput from "../SearchInput.svelte"
    export let name = 'svelte-simple-datatable'
    
    const options = getContext(name+'options')
</script>

<section class="dt-search" class:css={$options.css}>
    <SearchInput name={name}/>
</section>

<style>
    section {
        height: 32px;
    }
    .css{margin-left: 16px;}
</style>
