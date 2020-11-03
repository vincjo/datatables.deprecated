import Home from './routes/Home.svelte'
import Demo from './routes/Demo.svelte'
import Pagination from './routes/demo/Pagination.svelte'
import ColumnFilter from './routes/demo/ColumnFilter.svelte'
import Internationalization from './routes/demo/Internationalization.svelte'
import Blocks from './routes/demo/Blocks.svelte'
import Expression from './routes/demo/Expression.svelte'
import ScrollX from './routes/demo/ScrollX.svelte'
import Responsive from './routes/demo/Responsive.svelte'
import Settings from './routes/Settings.svelte'
import NotFound from './routes/NotFound.svelte'

export const routes = {
    '/': Home,
    '/demo': Demo,
    '/demo/pagination': Pagination,
    '/demo/column-filter': ColumnFilter,
    '/demo/i18n': Internationalization,
    '/demo/blocks': Blocks,
    '/demo/expression': Expression,
    '/demo/scroll-x': ScrollX,
    '/demo/responsive': Responsive,
    '/demo/*': NotFound,
    '/settings': Settings,
    '/*': NotFound
}