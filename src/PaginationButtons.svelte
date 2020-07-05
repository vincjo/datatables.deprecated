
<script>
    import {state , options, labels} from './store.js'
    state.updateRowCount()
    $: pageCount = Array.from( Array( Math.ceil($state.rowCount / $options.rowPerPage)).keys() )
    const slice = (arr, page) => {
        if (page < 5) {
            return arr.slice( 0, 5 )
        }
        else if (page > arr.length - 4) {
            return arr.slice( arr.length - 5, arr.length )
        }
        return arr.slice( page - 2, page + 1 )
    }
    $: buttons = slice(pageCount, $state.pageNumber)
</script>

<section>
    <button 
        class="text"
        class:disabled={$state.pageNumber === 1}
        on:click={() => state.setPage($state.pageNumber - 1)}
    >
        {@html $labels.previous}
    </button>
    <button class:active={$state.pageNumber === 1} on:click={() => state.setPage(1)}>
        1
    </button>  
    {#if $state.pageNumber >= 5}
        <button class="ellipse">...</button>
    {/if}

    {#each buttons as n}
        {#if n > 0 && n < pageCount.length - 1}
        <button 
            class:active={$state.pageNumber === n + 1}
            on:click={() => state.setPage(n + 1)}
        >
            {n + 1}
        </button>
        {/if}
    {/each}

    {#if $state.pageNumber <= pageCount.length - 4}
        <button class="ellipse">...</button>
    {/if}

    {#if pageCount.length > 1}
        <button class:active={$state.pageNumber === pageCount.length} on:click={() => state.setPage(pageCount.length)}>
            {pageCount.length}
        </button>
    {/if}

    <button 
        class="text"
        class:disabled={$state.pageNumber === pageCount.length}
        on:click={() => state.setPage($state.pageNumber + 1)}
    >
        {@html $labels.next}
    </button>
</section>

<style>
    section{display:flex;flex-direction:row;justify-content: center;}
    button{height:30px;width:30px;background:#fff;color:#616161;font-size:13px;margin:0;padding:0;transition:all, .2s;border-radius:0;line-height:30px;}
    button:not(.active):hover{background:#e0e0e0;cursor:pointer;}
    button.text{min-width:70px;cursor:pointer;}
    button.ellipse:hover{background:#fff;cursor: default;}
    button.active{background:#eee;}
    button.disabled:hover{background:#fff;cursor: default;}
</style>