import { writable, derived } from 'svelte/store'

export const options = writable({
	sortable: true,
	pagination: true,
	rowPerPage: 50,
	columnFilter: false,
	labels: {
		search: 'Search...',
		filter: 'Filter',
		noRows: 'No entries to found',
		info: 'Showing {start} to {end} of {rows} entries',
		previous: 'Previous',
		next: 'Next',
	},
	blocks: {
		searchInput: true, 
		paginationButtons: true,
		paginationRowCount: true,
	}
})

const createState = () => {
	const { subscribe, set, update } = writable({
		rowCount: null,
		pageNumber: 1,
		filtered: null
	})
	return {
		subscribe, set,
		updateRowCount: () => update(store => {
			let count
			filtered.subscribe(rows => count = rows.length)
			store.rowCount = count
			return store
		}),
		setPage: (pageNumber) => update(store => {
			let rowPerPage
			options.subscribe(store => rowPerPage = store.rowPerPage)
			if ( pageNumber >= 1 && pageNumber <= Math.ceil(store.rowCount / rowPerPage) ) {
				store.pageNumber = parseInt(pageNumber)
			}
			return store
		})
	}
}
export const state = createState()

const createData = () => {
	const { subscribe, set, update } = writable([])
	return {
		subscribe, set,
		sortAsc: (key) => update(store => {
			try {
				store.sort( (a, b) => b[key].localeCompare(a[key]) )
			} catch (e) {
				return store.sort( (a, b) => parseFloat(b[key]) - parseFloat(a[key]))
			}
			return store.sort( (a, b) => b[key].localeCompare(a[key]) )
			
		}),
		sortDesc: (key) => update(store => {
			try {
				store.sort( (a, b) => a[key].localeCompare(b[key]) )
			} catch (e) {
				return store.sort( (a, b) => parseFloat(a[key]) - parseFloat(b[key]))
			}
			return store.sort( (a, b) => a[key].localeCompare(b[key]) )
		}),
	}
}
export const data = createData()

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
				const thead = document.querySelectorAll('.datatable header thead tr')
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
		setVisible: (index, visible) => {
			if ( !Array.isArray(index) ) {
				index = [index]
			}
			let $columns = columns.get()
			index.forEach(i => {
				$columns[i].visible = !$columns[i].visible
				columns.update(store => store = $columns)
				if (visible) {
					document.querySelectorAll(`.datatable tbody tr td:nth-child(${i +1})`).forEach(cell => {
						cell.classList.remove('hidden')
					})
				}
				else {
					document.querySelectorAll(`.datatable tbody tr td:nth-child(${i +1}), .datatable table thead th:nth-child(${i +1})`).forEach(cell => {
						cell.classList.add('hidden')
					})
				}

			})
			columns.redraw()
		},
		hide: () => {
			console.log('hide()')
			columns.get().filter(column => column.visible === false).map(column => {
				document.querySelectorAll(
					`.datatable tbody tr td:nth-child(${column.index +1})`
				).forEach(cell => {
					cell.classList.add('hidden')
				})				
			})
		}
	}
}
export const columns = createColumns()

const createFilters = () => {
	const { subscribe, set, update } = writable({column: [], global: null})
	return {
		subscribe, set,
		setColumnFilter: (key, value) => update(store => {
			const filter = {key: key, value: value} 
			store.column = store.column.filter(item => { return item.key !== key && item.value.length > 0 })
			store.column.push(filter)
			return store
		}),
		setGlobal: (value) => update(store => {
			store.global = (value.length > 0) ? value : null
			return store
		})
	}
}
export const filters = createFilters()

export const filtered = derived(
	[data, filters],
    ([$data, $filters]) => {
		if ($filters.global) {
			$data = $data.filter( item => {
				return Object.keys(item).some( k => {
					return item[k].toString().toLowerCase().indexOf($filters.global.toString().toLowerCase()) > -1
				})
			})
		}
		if ($filters.column.length > 0) {
			$filters.column.forEach(filter => {
				return $data = $data.filter( item => item[filter.key].toString().toLowerCase().indexOf(filter.value.toString().toLowerCase()) > -1)
			})
		}
		return $data
	} 	
)

export const rows = derived(
	[filtered, options, state],
    ([$filtered, $options, $state]) => {
		if (!$options.pagination) {
			return $filtered
		}
		return $filtered.slice( ($state.pageNumber - 1) * $options.rowPerPage, $state.pageNumber * $options.rowPerPage) 
	} 
)