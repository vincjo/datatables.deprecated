export const header = {
    removeOriginalThead: (id) => {
        setTimeout(() => {
            const thead = document.querySelector(`#${id} table thead:not(.dt-header)`)
            thead.remove()
        }, 50)
    },
    getOrginalTHeadClassList: (id) => {
        return document.querySelector(`#${id} table thead`).classList
    },
}