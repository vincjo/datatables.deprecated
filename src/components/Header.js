export default class Header {

    getColumns() {
        const columns = []
        document.querySelectorAll('.datatable table thead th').forEach(th => {
            columns.push({
                html: th.innerHTML,
                key: th.dataset.key,
                sort: null,
                className: '',
                width: th.getBoundingClientRect().width + 'px'
            })
        })
        return columns       
    }

    removeOriginalThead(columnFilter = false) {
        const elem = document.querySelector('.datatable table thead')
        const originHeight = elem.getBoundingClientRect().height
        if (columnFilter) {
            this.height = originHeight + 25
        } else {
            this.height = originHeight
        }
        elem.parentNode.style.marginTop = '-' + originHeight + 'px'
        elem.style.visibility = 'hidden'
    }

    redraw() {
        setTimeout(() => {
            const tbody = document.querySelector('.datatable table tbody tr')
            if (tbody === null) {
                return
            }
            const thead = document.querySelectorAll('.datatable header thead tr')
            thead.forEach(tr => {
                let i = 0
                Array.from(tbody.children).forEach(td => {
                    tr.children[i].style.width = td.getBoundingClientRect().width + 'px' 
                    i++
                })
            })

        }, 15)
    }
    
}