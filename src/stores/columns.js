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
		draw: () => {
			setTimeout(() => {
				const tbody = document.querySelector('.datatable table tbody tr')
				if (tbody === null) return
				const thead = document.querySelectorAll('.datatable-thead thead tr')
				const $columns = columns.get()
				thead.forEach(tr => {
					let i = 0
					Array.from(tbody.children).forEach(td => {
						let th = tr.children[i]
						let thW = th.getBoundingClientRect().width
						let tdW = td.getBoundingClientRect().width
						// let columnMinWidth = parseFloat(columns.get()[i].minWidth.replace('px', ''))
						if (tdW > thW) { 
							th.style.minWidth = tdW + 'px'
							th.style.maxWidth = tdW + 'px'
							$columns[i].minWidth = tdW
						}
						else {
							td.style.minWidth = thW + 'px'
							td.style.maxWidth = thW + 'px'
							$columns[i].minWidth = thW
						} 
						i++
					})
				})
			}, 50)	
		},
		redraw: () => {
			setTimeout(() => {
				const tbody = document.querySelector('.datatable table tbody tr')
				if (tbody === null) return
				const thead = document.querySelectorAll('.datatable-thead thead tr')
				thead.forEach(tr => {
					let i = 0
					Array.from(tbody.children).forEach(td => {
						let th = tr.children[i]
						let thW = th.getBoundingClientRect().width
						let tdW = td.getBoundingClientRect().width
						let columnMinWidth = parseFloat(columns.get()[i].minWidth)
						if (tdW > thW || thW > columnMinWidth) { 
							th.style.minWidth = tdW + 'px'
							th.style.maxWidth = tdW + 'px'
						}
						else {
							td.style.minWidth = thW + 'px'
							td.style.maxWidth = thW + 'px'
						} 
						i++
					})
				})
			}, 50)			
		},
	}
}
export const columns = createColumns()