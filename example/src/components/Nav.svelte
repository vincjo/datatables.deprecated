<script>
	import { location } from 'svelte-spa-router'
    import { slide, fade } from 'svelte/transition'
</script>

<section>
    <article>
        {#if $location !== '/'}
        <aside transition:fade={{ duration:100 }}>
            <img src="./logo.svg" alt="logo"/>
            <div>
                <h1>svelte<br>simple<br>datatables</h1>
            </div>
        </aside>
        {/if}
    </article>
   
    <h2 class:active={$location === '/'}>
        <a href="#/">home</a>
    </h2>
    <h2 class:active={$location.includes('/demo')}>
        <a href="#/demo">demo</a>
    </h2>
    {#if $location.includes('/demo')}
        <ul transition:slide={{ duration:200}}>
            <li class:active={$location === `/demo`} 				><a href="#/demo">basic</a></li>
            <li class:active={$location === `/demo/pagination`} 	><a href="#/demo/pagination">pagination</a></li>
            <li class:active={$location === `/demo/column-filter`} 	><a href="#/demo/column-filter">column filter</a></li>
            <li class:active={$location === `/demo/i18n`} 			><a href="#/demo/i18n">i18n</a></li>
            <li class:active={$location === `/demo/blocks`} 		><a href="#/demo/blocks">blocks</a></li>
            <li class:active={$location === `/demo/expression`} 	><a href="#/demo/expression">js expression</a></li>
            <li class:active={$location === `/demo/scroll-y`} 		><a href="#/demo/scroll-y">scroll y</a></li>
            <li class:active={$location === `/demo/scroll-x`} 		><a href="#/demo/scroll-x">scroll x</a></li>
            <li class:active={$location === `/demo/responsive`} 	><a href="#/demo/responsive">responsive</a></li>
            <li class:active={$location === `/demo/css`} 			><a href="#/demo/css">css</a></li>
        </ul>
    {/if}
    <h2 class:active={$location.includes('/settings')}>
        <a class:active={$location === '/settings'} href="#/settings">settings</a>
    </h2>
    <h2 class:active={$location.includes('/test')}>
        <a href="#/test">test</a>
    </h2>
    {#if $location.includes('/test')}
        <ul transition:slide={{ duration:200}}>
            <li class:active={$location === `/test`} 				><a href="#/test">Grid layout</a></li>
            <li class:active={$location === `/test/lots-of-data`} 	><a href="#/test/lots-of-data">Lots of data</a></li>
            <li class:active={$location === `/test/multiple-dt`}	><a href="#/test/multiple-dt">Multiple Datatables</a></li>
            <!-- <li class:active={$location === `/test/optional-blocks`}><a href="#/test/optional-blocks">Optional Blocks</a></li> -->
        </ul>
    {/if}
</section>


<style>
    section{position:fixed;top:0;bottom:0;left:0;width:240px;background:#fff;z-index:1;padding:40px 0 0 40px;overflow-y:auto;}

    article{height:88px;}
    aside{display:flex;justify-content:start;margin:0;height:48px;}
	aside h1 {font-size:16px;line-height:15px; text-align:left; font-weight:400; margin: 0;color:#333 }
	aside img {width:48px;margin:0 8px;}

    h2{color:#333;font-weight:200;margin:0;font-size:32px;line-height:40px;transition:all,0.1s;}
    h2:hover{font-weight:600;color:#676778;}
    h2.active{color:#b71540;font-weight:600;}
    h2 a{text-decoration:none;}
    ul{margin:0;list-style-type:none;background:#fff;padding:0 16px 0 0;}
    ul li{display:block;margin:0;background:#fff;transition:all,0.1s;padding:0;font-size:16px;color:#676778;font-weight:400;line-height:24px;}
    ul li:hover{font-weight:bold;color:#38ada9;}
    ul li.active{color:#333;font-weight:bold;}
    /* ul li.active a {background:#fafafa;} */
    ul a{display:block;text-decoration:none;color:inherit;padding:0px 8px;}
</style>