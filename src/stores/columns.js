import { writable } from 'svelte/store'

const createColumns = () => {
	const { subscribe, set, update } = writable([])
	return {
		subscribe, set, update,
		get: () => {
			let $columns
			columns.subscribe(store => $columns = store)
			return $columns
		},
		redraw: () => {
			setTimeout(() => {
				const tbody = document.querySelector('.datatable table tbody tr')
				if (tbody === null) return
				const thead = document.querySelectorAll('.datatable-thead thead tr')
				thead.forEach(tr => {
					let i = 0
					Array.from(tbody.children).forEach(td => {
						const width = td.getBoundingClientRect().width + 'px' 
						tr.children[i].style.minWidth = width
						tr.children[i].style.maxWidth = width
						i++
					})
				})
			}, 50)			
		},
	}
}
export const columns = createColumns()