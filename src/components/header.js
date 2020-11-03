import { columns } from '../stores/columns.js'

export const header = {
    getColumns: () => {
        const columnList = []
        let i = 0
        document.querySelectorAll('.datatable table thead th').forEach(th => {
            columnList.push({
                index: i,
                html: th.innerHTML,
                key: header.getKey(th.dataset.key),
                sort: null,
                classList: th.classList,
                minWidth: th.getBoundingClientRect().width + 'px'
            })
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
    removeOriginalThead: () => {
        const table = document.querySelector('.datatable table thead')
        const originHeight = table.getBoundingClientRect().height
        const tableContainer = document.querySelector('main.datatable .dt-table')
        const scrollXHeight = tableContainer.offsetHeight - tableContainer.clientHeight
        table.parentNode.style.marginTop = '-' + (originHeight - (scrollXHeight > 5 ? scrollXHeight + 10 : 1)) + 'px'
        table.style.visibility = 'hidden'
    },
    getOrginalTHeadClassList: () => {
        return document.querySelector('.datatable table thead').classList
    }
}