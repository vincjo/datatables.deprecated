import { context } from './context.js'

export default class Component 
{
    constructor( id = 'svelte-simple-datatable' )
    {
        this.context = context.get(id)
        this.id = id
    }
    init() 
    {
        this.setColumns()
        this.resize()
        this.addEventScrollX()
        new ResizeObserver((mutations) => {
            this.resize()
        }).observe(document.querySelector(`#${this.id}`).parentElement)
    }

    reset () 
    {
        this.context.getPageNumber().update(store => store = 1)
        this.context.getGlobalFilter().remove()
        this.context.getLocalFilters().remove()
        this.context.getColumns().set([])
    }

    setRows(data)
    {
        for ( const item of data ) {

            for ( const key of Object.keys(item) ) {
                if (item[key] === null) {
                    item[key] = ''
                }
            }

        }
        this.context.getData().set(data)
        return
    }

    getSize()
    {
        const parent = document.querySelector(`#${this.id}`).parentNode
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

    resize()
    {
        if ( !document.querySelector(`#${this.id}`) ) return
        const size = this.getSize()
        const tableContainer = document.querySelector(`#${this.id} .dt-table`)
        if ( this.getOptions().scrollY ) {
            tableContainer.style.height = this.setTableContainerHeight(size.parentHeight * size.height) + 'px'
            this.context.getColumns().redraw()
        }
        this.context.getDatatableWidth().set( size.parentWidth * size.width )
        if (size.parentWidth * size.width < document.querySelector(`#${this.id} table`).offsetWidth) {
            tableContainer.style.overflowX = 'auto'
        }
    }

    setTableContainerHeight(height) 
    {
        let paginationBlock
        if (this.getOptions().pagination && (this.getOptions().blocks.paginationButtons || this.getOptions().blocks.paginationRowCount)) {
            paginationBlock = true
        }
        const calc = [
            (this.getOptions().blocks.searchInput) ? document.querySelector(`#${this.id} .dt-search`).getBoundingClientRect().height : 0,
            (paginationBlock) ? document.querySelector(`#${this.id} .dt-pagination`).getBoundingClientRect().height : 0
        ]
        const sum = (a, b) => a + b
        document.querySelector(`#${this.id} .dt-table`).style.height = height - calc.reduce(sum) + 'px'
    }

    addEventScrollX()
    {
        if ( this.getOptions().scrollY ) {
            document.querySelector(`#${this.id} .dt-table`).addEventListener('scroll', (e) => {
                document.querySelector(`#${this.id} .dt-header`).style.left = (-1 * e.target.scrollLeft) + 'px'
            })
        }
    }

    setColumns() {
        setTimeout( () => {
            const columnList = []
            let i = 0
            document.querySelectorAll(`#${this.id} table thead th`).forEach(th => {
                columnList.push({
                    index: i,
                    html: th.innerHTML,
                    key: this.getKey(th.dataset.key),
                    sort: null,
                    classList: th.classList,
                    minWidth: th.getBoundingClientRect().width
                })
                th.addEventListener('click', (e) => {
                    this.context.getColumns().sort(e.target, this.getKey(th.dataset.key))
                }, true)
                i++
            })
            this.context.getColumns().set(columnList)
        }, 25)
    }

    getKey(key) 
    {
        if (!key)  return 
        if (key && key.indexOf('=>') > 0) {
            return new Function(`'use strict';return (${key})`)()
        }
        return (x) => x[key]
    }

    getOptions() 
    {
        return this.context.getOptions().get(this.context.getOptions())
    }
}