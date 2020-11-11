<script>
  import { options } from "./stores/options.js";
  import { datatable } from "./datatable.js";
  import Search from "./components/Search.svelte";
  import Pagination from "./components/Pagination.svelte";
  import Header from "./components/Header.svelte";
  import { onMount, onDestroy } from "svelte";
  export let data = [];
  export let settings = {};
  $: {
    datatable.setRows(data);
    options.update(settings);
  }
  onMount(() => {
    datatable.addEventScrollX();
    datatable.resize();
    new ResizeObserver((mutations) => {
      datatable.resize();
    }).observe(document.querySelector("main.datatable").parentElement);
  });
  onDestroy(() => datatable.reset());
</script>

<section class="datatable">
  {#if $options.blocks.searchInput === true}
    <Search />
  {/if}
  <section class="dt-table">
    <Header />
    <table>
      <slot />
    </table>
  </section>
  {#if $options.blocks.paginationRowCount === true || $options.blocks.paginationButtons === true}
    <Pagination />
  {/if}
</section>

<style>
  .datatable {
    position: relative;
    background: #fff;
  }
  .datatable * {
    box-sizing: border-box;
  }
  section {
    position: relative;
    overflow: auto;
    width: 100%;
    background: inherit;
    border-bottom: 1px solid #e0e0e0;
    scrollbar-width: thin;
  }
  section::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  section::-webkit-scrollbar-track {
    background: #f5f5f5;
  }
  section::-webkit-scrollbar-thumb {
    background: #c2c2c2;
  }
  section::-webkit-scrollbar-thumb:hover {
    background: #9e9e9e;
  }
  section::-webkit-scrollbar-track-piece:start {
    top: 40px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    overflow: hidden;
    margin-bottom: 6px;
  }
</style>
