
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
        pageNumber.set(number)
        columns.redraw()
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

    {#if pageCount.length > 6 && $pageNumber <= pageCount.length - 3}
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
        on:click={() => setPage($pageNumber + 1)}
    >
        {@html $options.labels.next}
    </button>
</section>

<style>
    section{display:flex;flex-direction:row;height:32px;margin-right:16px;}
    button{height:32px;width:32px;background:inherit;color:#616161;font-size:13px;margin:0;padding:0;transition:all, .2s;line-height:32px;border:1px solid #e0e0e0;border-right:none;outline:none;}
    button:first-child{border-radius:4px 0 0 4px;}
    button:last-child{border-right:1px solid #e0e0e0;border-radius:0 4px 4px 0;}
    button:not(.active):hover{background:#eee;cursor:pointer;}
    button.text{min-width:70px;cursor:pointer;}
    button.ellipse:hover{background:inherit;cursor: default;}
    button.active{background:#eee;font-weight:bold;}
    button.disabled:hover{background:inherit;cursor: default;}
    /* button.disabled{color:#9e9e9e;} */
</style>
