
<script>
    import {state , options} from './store.js'
    import Header from './components/Header.js'
    const header = new Header
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
    const setPage = (number) => {
        header.redraw()
        state.setPage(number)
    }
</script>

<section class="dt-pagination-buttons">
    <button 
        class="text"
        class:disabled={$state.pageNumber === 1}
        on:click={() => setPage($state.pageNumber - 1)}
    >
        {@html $options.labels.previous}
    </button>
    <button class:active={$state.pageNumber === 1} on:click={() => setPage(1)}>
        1
    </button>  
    {#if $state.pageNumber >= 5}
        <button class="ellipse">...</button>
    {/if}

    {#each buttons as n}
        {#if n > 0 && n < pageCount.length - 1}
        <button 
            class:active={$state.pageNumber === n + 1}
            on:click={() => setPage(n + 1)}
        >
            {n + 1}
        </button>
        {/if}
    {/each}

    {#if $state.pageNumber <= pageCount.length - 4}
        <button class="ellipse">...</button>
    {/if}

    {#if pageCount.length > 1}
        <button class:active={$state.pageNumber === pageCount.length} on:click={() => setPage(pageCount.length)}>
            {pageCount.length}
        </button>
    {/if}

    <button 
        class="text"
        class:disabled={$state.pageNumber === pageCount.length}
        on:click={() => setPage($state.pageNumber + 1)}
    >
        {@html $options.labels.next}
    </button>
</section>
