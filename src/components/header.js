export const header = {
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
    },
}