import { getContext } from 'svelte'
import { data } from './stores/data.js'
import { columns } from './stores/columns.js'
import { datatableWidth, pageNumber } from './stores/state.js'
import { globalFilters, localFilters } from './stores/filters.js'



export default class SimpleDatatable {

    constructor(name) {
        this.context = name
        this.options = getContext(name+'options').get()
    }

    init() {
        this.resize()
        this.addEventScrollX()
        this.getColumns()
        new ResizeObserver((mutations) => {
            this.resize()
        }).observe(document.querySelector(`#${this.context}`).parentElement)
    }

    reset() {
        pageNumber.update(store => store = 1)
        globalFilters.remove()
        localFilters.remove()
        columns.set([])
    }

    setRows(arr) {
        arr.forEach( (item) => {
            Object.keys(item).forEach( (k) => {
                if (item[k] === null) {
                    item[k] = ''
                }
            })
        })
        data.set(arr)
        return
    }

    getSize() {
        const parent = document.querySelector(`#${this.context}`).parentNode
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
    }

    resize() {
        if ( !document.querySelector(`#${this.context}`) ) return
        const size = this.getSize()
        const tableContainer = document.querySelector(`#${this.context} .dt-table`)
        if ( this.options.scrollY ) {
            tableContainer.style.height = this.getTableContainerHeight(size.parentHeight * size.height) + 'px'
            columns.redraw(this.context)
        }
        datatableWidth.set( size.parentWidth * size.width )
        if (size.parentWidth * size.width < document.querySelector(`#${this.context} table`).offsetWidth) {
            tableContainer.style.overflowX = 'auto'
        }
    }

    getTableContainerHeight(height) {
        let paginationBlock
        if (this.options.pagination && (this.options.blocks.paginationButtons || this.options.blocks.paginationRowCount)) {
            paginationBlock = true
        }
        const calc = [
            (this.options.blocks.searchInput) ? document.querySelector(`#${this.context} .dt-search`).getBoundingClientRect().height : 0,
            (paginationBlock) ? document.querySelector(`#${this.context} .dt-pagination`).getBoundingClientRect().height : 0
        ]
        const sum = (a, b) => a + b
        document.querySelector(`#${this.context} .dt-table`).style.height = height - calc.reduce(sum) + 'px'
    }

    addEventScrollX() {
        if ( this.options.scrollY ) {
            document.querySelector(`#${this.context} .dt-table`).addEventListener('scroll', (e) => {
                document.querySelector(`#${this.context} .dt-header`).style.left = (-1 * e.target.scrollLeft) + 'px'
            })
        }
    }

    getColumns() {
        const columnList = []
        let i = 0
        document.querySelectorAll(`#${this.context} table thead th`).forEach(th => {
            columnList.push({
                index: i,
                html: th.innerHTML,
                key: this.getKey(th.dataset.key),
                sort: null,
                classList: th.classList,
                minWidth: th.getBoundingClientRect().width
            })
            th.addEventListener('click', (e) => {
                columns.sort(e.target, this.getKey(th.dataset.key), this.context)
            }, true)
            i++
        })
        columns.set(columnList)
    }

    getKey(key) {
        if (!key)  return 
        if (key && key.indexOf('=>') > 0) {
            return new Function(`'use strict';return (${key})`)()
        }
        return (x) => x[key]
    }
}

