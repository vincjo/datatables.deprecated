import { data } from './stores/data.js'
import { options } from './stores/options.js'
import { columns } from './stores/columns.js'
import { datatableWidth, pageNumber } from './stores/state.js'
import { globalFilters, localFilters } from './stores/filters.js'


export const datatable = {
    init: () => {
        datatable.resize()
        datatable.addEventScrollX()
        datatable.getColumns()
        new ResizeObserver((mutations) => {
            datatable.resize()
        }).observe(document.querySelector('section.datatable').parentElement)
    },
    reset: () => {
        pageNumber.update(store => store = 1)
        globalFilters.remove()
        localFilters.remove()
        columns.set([])
    },
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
        const parent = document.querySelector('section.datatable').parentNode
        const style = getComputedStyle(parent)
        const rect = parent.getBoundingClientRect()
        const getNumber = (pxValue) => { return parseFloat(pxValue.replace('px', ''))  } 
        return {
            parentWidth: rect.width,
            parentHeight: rect.height,
            width: (rect.width - getNumber(style.paddingLeft) - getNumber(style.paddingRight) - getNumber(style.borderLeftWidth) - getNumber(style.borderRightWidth)) / rect.width,
            height: (rect.height - getNumber(style.paddingTop) - getNumber(style.paddingBottom) - getNumber(style.borderTopWidth) - getNumber(style.borderBottomWidth)) / rect.height,
            top: style.paddingTop,
            right: style.paddingRight,
            bottom: style.paddingBottom,
            left: style.paddingLeft
        }
    },
    resize: () => {
        if ( !document.querySelector('section.datatable') ) return
        const size = datatable.getSize()
        const tableContainer = document.querySelector('section.datatable .dt-table')
        if ( options.get().scrollY ) {
            tableContainer.style.height = datatable.getTableContainerHeight(size.parentHeight * size.height) + 'px'
            columns.redraw()
        }
        datatableWidth.set( size.parentWidth * size.width )
        if (size.parentWidth * size.width < document.querySelector('section.datatable table').offsetWidth) {
            tableContainer.style.overflowX = 'auto'
        }
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
        document.querySelector('section.datatable .dt-table').style.height = height - calc.reduce(sum) + 'px'
    },
    addEventScrollX: () => {
        if ( options.get().scrollY ) {
            document.querySelector('section.datatable .dt-table').addEventListener('scroll', (e) => {
                document.querySelector('.dt-header').style.left = (-1 * e.target.scrollLeft) + 'px'
            })
        }
    },
    getColumns: () => {
        const columnList = []
        let i = 0
        document.querySelectorAll('.datatable table thead th').forEach(th => {
            columnList.push({
                index: i,
                html: th.innerHTML,
                key: datatable.getKey(th.dataset.key),
                sort: null,
                classList: th.classList,
                minWidth: th.getBoundingClientRect().width
            })
            th.addEventListener('click', (e) => {
                columns.sort(e.target, datatable.getKey(th.dataset.key))
            }, true)
            i++
        })
        columns.set(columnList)
    },
    getKey: (key) => {
        if (!key)  return 
        if (key && key.indexOf('=>') > 0) {
            return new Function(`'use strict';return (${key})`)()
        }
        return (x) => x[key]
    },
}

