export const header = {
    removeOriginalThead: (name) => {
        setTimeout(() => {
            const thead = document.querySelector(`#${name} table thead`)
            const originHeight = thead.getBoundingClientRect().height
            // const tableContainer = document.querySelector('section.datatable .dt-table')
            // const scrollXHeight = tableContainer.offsetHeight - tableContainer.clientHeight
            // - (scrollXHeight > 5 ? scrollXHeight + 10 : 1)
            thead.parentNode.style.marginTop = '-' + (originHeight) + 'px'
            thead.style.visibility = 'hidden'
        }, 50)
    },
    getOrginalTHeadClassList: (name) => {
        return document.querySelector(`#${name} table thead`).classList
    },
}