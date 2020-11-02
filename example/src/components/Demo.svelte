<script>
    // import { board } from 'app/store.js'
    import { fade } from 'svelte/transition'
    import { Highlight, HighlightSvelte } from 'svelte-highlight'
    import { json } from 'svelte-highlight/languages'
    export let data
    export let code
    let current = 'result' 
</script>

<div in:fade>
    <ul>
        <li class:active={current === 'result'} on:click={() => current = 'result'}>Result</li>
        <li class:active={current === 'code'}   on:click={() => current = 'code'  }>Code</li>
        <li class:active={current === 'data'}   on:click={() => current = 'data'  }>Data</li>
    </ul>
    <section class:code={current === 'code' || current === 'data'} class:table={current === 'result'}>
        {#if current === 'result'}
            <div class="table z-depth-2" in:fade={{ duration:200 }} >
                <slot></slot>
            </div>
        {:else if current === 'code'}
            <div class="code">
                <HighlightSvelte {code}/>
            </div>
        {:else}
            <div class="code">
                <Highlight code={data} language={json}/>
            </div>
        {/if}
    </section>
</div>

<style>
    div{height:inherit;}
    ul{list-style-type:none;padding:0;margin:0;display:flex;margin-bottom:8px;}
    li{display:block;font-size:16px;color:#676778;line-height:32px;padding:8px 0 0 0;margin:0 24px 0 16px;font-weight:bold;border-bottom:2px solid transprent;transition:color, 0.1s;cursor:pointer;}
    li.active{color:#ff3e00;border-bottom:2px solid #ff3e00;}
    section{height:inherit;background:#fff;position:relative;overflow:auto;height:480px;background:var(--hljs);border-radius:8px;}
    section::-webkit-scrollbar {width:8px;height:8px;}
    section::-webkit-scrollbar-track {background:#eee;}
    section::-webkit-scrollbar-thumb {background:#9e9e9e;}
    section::-webkit-scrollbar-track-piece:start {top:40px;}
    section.table{background:#eee;padding:0 10%;border-radius:8px;height:488px;}
    div.table{background:#fff;padding:8px 0;border:1px solid #eee;height:432px;border-radius:8px;margin-top:24px}
    div.code{padding:0 16px;}
</style>