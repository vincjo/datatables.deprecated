export const header = {
    removeOriginalThead: (id) => {
        setTimeout(() => {
            const thead = document.querySelector(`#${id} table thead`)
            const originHeight = thead.getBoundingClientRect().height
            thead.parentNode.style.marginTop = '-' + (originHeight) + 'px'
            thead.style.visibility = 'hidden'
        }, 50)
    },
    getOrginalTHeadClassList: (id) => {
        return document.querySelector(`#${id} table thead`).classList
    },
}