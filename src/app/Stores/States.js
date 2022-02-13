import { writable, readable } from 'svelte/store'


export default class States
{
    create(options, identifier = null) 
    {
        const id = this.createId(identifier)
        const rowsCount = this.createRowsCount()
        return {
            rowsCount: rowsCount,
            id: id,
            pageNumber: this.createPageNumber(id, options, rowsCount),
            datatableWidth: this.createDatatableWidth()

        }
    }

    createPageNumber(id, options, rowsCount)
    {
        const { subscribe, update } = writable(1)
        return {
            subscribe, update,
            set: (number) => update( store => {
                let $rowsPerPage, $rowsCount
                rowsCount.subscribe(store => $rowsCount = store)
                options.subscribe(store => $rowsPerPage = store.rowsPerPage)
    
                if ( number >= 1 && number <= Math.ceil($rowsCount / $rowsPerPage) ) {
                    store = parseInt(number)
                }
                document.querySelector(`#${id.get()} .dt-table`).scrollTop = 0
                return store
            })
        }
    }

    createId(identifier = null)
    {
        const id = identifier ?? 'ssd-' + (Math.random() + 1).toString(36).substring(5)
		const { subscribe } = readable(id)
		return {
			subscribe,
			get: () => { return id }
		}
    }

    createRowsCount()
    {
        return writable(0)
    }

    createDatatableWidth()
    {
        return writable(null)
    }
}