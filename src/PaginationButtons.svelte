
<script>
    import { options } from './stores/options.js'
    import { rowCount, pageNumber } from './stores/state.js'
    import { columns } from './stores/columns.js'
    export let ref = ''
    export let classList = ''
    $: pageCount = Array.from( Array( Math.ceil($rowCount / $options.rowPerPage)).keys() )
    const slice = (arr, page) => {
        if (page < 5) {
            return arr.slice( 0, 5 )
        }
        else if (page > arr.length - 4) {
            return arr.slice( arr.length - 5, arr.length )
        }
        return arr.slice( page - 2, page + 1 )
    }
    $: buttons = slice(pageCount, $pageNumber)
    const setPage = (number) => {
        columns.redraw()
        pageNumber.set(number)
    }
</script>

<section class="dt-pagination-buttons {classList}" {ref}>
    <button 
        class="text"
        class:disabled={$pageNumber === 1}
        on:click={() => setPage($pageNumber - 1)}
    >
        {@html $options.labels.previous}
    </button>
    <button class:active={$pageNumber === 1} on:click={() => setPage(1)}>
        1
    </button>  
    {#if pageCount.length > 6 && $pageNumber >= 5}
        <button class="ellipse">...</button>
    {/if}

    {#each buttons as n}
        {#if n > 0 && n < pageCount.length - 1}
        <button 
            class:active={$pageNumber === n + 1}
            on:click={() => setPage(n + 1)}
        >
            {n + 1}
        </button>
        {/if}
    {/each}

    {#if pageCount.length > 6 && $pageNumber <= pageCount.length - 4}
        <button class="ellipse">...</button>
    {/if}

    {#if pageCount.length > 1}
        <button class:active={$pageNumber === pageCount.length} on:click={() => setPage(pageCount.length)}>
            {pageCount.length}
        </button>
    {/if}

    <button 
        class="text"
        class:disabled={$pageNumber === pageCount.length}
        on:click={() => pageNumber.set($pageNumber + 1)}
    >
        {@html $options.labels.next}
    </button>
</section>

<style>
    section{display:flex;flex-direction:row;height:30px;}
    button{outline:none;border:none;height:30px;width:30px;background:inherit;color:#616161;font-size:13px;margin:0;padding:0;transition:all, .2s;border-radius:2px;line-height:30px;}
    button:not(.active):hover{background:#e0e0e0;cursor:pointer;}
    button.text{min-width:70px;cursor:pointer;}
    button.ellipse:hover{background:inherit;cursor: default;}
    button.active{background:#eee;}
    button.disabled:hover{background:inherit;cursor: default;}
</style>
