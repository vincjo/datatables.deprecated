<script>
    import { options } from './stores/options.js'
    import { columns } from './stores/columns.js'
    export let index
</script>


<th class="filter" class:css={$options.css}>
    <input
        type="text"
        placeholder={$options.labels.filter}
        class="browser-default"
        on:input={(e) => columns.filter($columns[index].key, e.target.value)}
    />
</th>

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