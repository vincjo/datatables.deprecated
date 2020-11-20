import { writable } from 'svelte/store'
import { options } from './options.js'

export const rowCount = writable(0)

const createPageNumber = () => {
	const { subscribe, update } = writable(1)
	return {
		subscribe, update,
		set: (number) => update(store => {
			let $rowsPerPage, $rowCount
			rowCount.subscribe(store => $rowCount = store)
			options.subscribe(store => $rowsPerPage = store.rowsPerPage)
			if ( number >= 1 && number <= Math.ceil($rowCount / $rowsPerPage) ) {
				store = parseInt(number)
			}
			document.querySelector('section.datatable .dt-table').scrollTop = 0
			return store
		})
	}
}
export const pageNumber = createPageNumber()

export const datatableWidth = writable(null)