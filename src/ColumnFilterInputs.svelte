<script>
    import { context as store } from './app/context.js'
    export let id = 'svelte-simple-datatable'
    const context = store.get(id)

    const columns = context.getColumns()
    const options = context.getOptions()
</script>

<tr>
{#each $columns as column}
    {#if column.key}
        <th class="filter" class:css={$options.css}>
            <input
                type="text"
                placeholder={$options.labels.filter}
                class="browser-default"
                on:input={(e) => columns.filter(column.key, e.target.value)}
            />
        </th>
    {:else}
        <th class="filter"></th>
    {/if}
{/each}
</tr>


<style>
   .css {
        padding: 0;
        margin: 0;
        background-image: none;
        border: 1px solid #fafafa;
    }
    th.filter input {
        margin: 0;
        padding: 0;
        width: 100%;
    }
    .css input {
        background: #fff;
        height: 24px;
        border: none;
        border-bottom: 1px solid #eee;
        text-align: center;
        outline: none;
        border-radius: 0;
        font-size: 14px;
    }
    .css input::placeholder {
        color: #bdbdbd;
        font-style: italic;
        font-size: 13px;
    }
</style>