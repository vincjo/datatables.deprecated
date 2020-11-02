import { data } from './stores/data.js'
import { options } from './stores/options.js'
import { columns } from './stores/columns.js'
import { global, local } from './stores/filters.js'


export const datatable = {
    setRows: (arr) => {
        arr.forEach( (item) => {
            Object.keys(item).forEach( (k) => {
                if (item[k] === null) {
                    item[k] = ''
                }
            })
        })
        data.set(arr)
        return
    },
    getSize: () => {
        const parent = document.querySelector('main.datatable').parentNode
        const style = getComputedStyle(parent)
        const rect = parent.getBoundingClientRect()
        const getInt = (pxValue) => { return parseFloat(pxValue.replace('px', ''))  } 
        return {
            parentWidth: rect.width,
            parentHeight: rect.height,
            width: (rect.width - getInt(style.paddingLeft) - getInt(style.paddingRight)) / rect.width,
            height: (rect.height - getInt(style.paddingTop) - getInt(style.paddingBottom)) / rect.height,
            top: style.paddingTop,
            right: style.paddingRight,
            bottom: style.paddingBottom,
            left: style.paddingLeft
        }
    },
    resize: () => {
        if ( !document.querySelector('main.datatable') ) return
        const size = datatable.getSize()
        const tableContainer = document.querySelector('main.datatable .dt-table')
        tableContainer.style.height = datatable.getTableContainerHeight(size.parentHeight * size.height) + 'px'
        columns.redraw()
    },
    getTableContainerHeight: (height) => {
        let paginationBlock
        if (options.get().pagination && (options.get().blocks.paginationButtons || options.get().blocks.paginationRowCount)) {
            paginationBlock = true
        }
        const calc = [
            (options.get().blocks.searchInput) ? document.querySelector('.datatable .dt-search').getBoundingClientRect().height : 0,
            (paginationBlock) ? document.querySelector('.datatable .dt-pagination').getBoundingClientRect().height : 0
        ]
        const sum = (a, b) => a + b
        document.querySelector('main.datatable .dt-table').style.height = height - calc.reduce(sum) + 'px'
    },
    addEventScrollX: () => {
        document.querySelector('main.datatable .dt-table').addEventListener('scroll', (e) => {
            document.querySelector('.datatable-thead').style.left = (-1 * e.target.scrollLeft ) + 'px'
        })
    },
    removeFilters: () => {
        global.remove()
        local.remove()
    }
}