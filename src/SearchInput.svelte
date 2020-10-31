<script>
    import { options } from './stores/options.js'
    import { pageNumber } from './stores/state.js'
    import { columns } from './stores/columns.js'
    import { global } from './stores/filters.js'
    export let ref = ''
    export let classList = ''
    const search = (value) => {
        pageNumber.set(1)
        global.set(value)
        columns.redraw()
    }
</script>

<input 
    class="dt-search-input {classList}" 
    type="text" 
    placeholder="{$options.labels.search}" 
    on:input={(e) => search(e.target.value)} 
    {ref}
/>

<style>
    input{border:1px solid #e0e0e0;outline:none;padding:2px 10px;margin:0;height:24px;background:transparent;border-radius:3px;transition:all, 0.5s}
</style>