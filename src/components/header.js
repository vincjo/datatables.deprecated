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
                minWidth: th.getBoundingClientRect().width
            })
            i++
        })
        columns.set(columnList)
        columns.draw()
    },
    getKey: (key) => {
        if (!key)  return 
        if (key && key.indexOf('=>') > 0) {
            return new Function(`'use strict';return (${key})`)()
        }
        return (x) => x[key]
    },
    removeOriginalThead: () => {
        setTimeout(() => {
            const thead = document.querySelector('.datatable table thead')
            const originHeight = thead.getBoundingClientRect().height
            // const tableContainer = document.querySelector('section.datatable .dt-table')
            // const scrollXHeight = tableContainer.offsetHeight - tableContainer.clientHeight
            // - (scrollXHeight > 5 ? scrollXHeight + 10 : 1)
            thead.parentNode.style.marginTop = '-' + (originHeight) + 'px'
            thead.style.visibility = 'hidden'
        }, 50)
    },
    getOrginalTHeadClassList: () => {
        return document.querySelector('.datatable table thead').classList
    }
}