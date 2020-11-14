<script>
    import { options } from './stores/options.js'
    import { columns } from './stores/columns.js'
    export let index
</script>


<th class="filter">
    <input
        type="text"
        placeholder={$options.labels.filter}
        class="browser-default"
        on:input={(e) => columns.filter($columns[index].key, e.target.value)}
    />
</th>

<style>
   th.filter {
        padding: 0;
        margin: 0;
        background-image: none;
        border: 1px solid #fafafa;
    }
    th.filter input {
        background: #fff;
        padding: 0;
        margin: 0;
        height: 24px;
        width: 100%;
        border: none;
        border-bottom: 1px solid #eee;
        text-align: center;
        outline: none;
        border-radius: 0;
        font-size: 14px;
    }
    th.filter input::placeholder {
        color: #bdbdbd;
        font-style: italic;
        font-size: 13px;
    }
</style>