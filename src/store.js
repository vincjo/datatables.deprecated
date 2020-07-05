import { writable, derived } from 'svelte/store'

export const options = writable({
	sortable: true,
	pagination: true,
	rowCount: true,
	search: true,
	rowPerPage: 50,
	columnFilter: false,
})

export const labels = writable({
	search: 'Search...',
	filter: 'Filter',
	noRows: 'No entries to found',
	info: 'Showing {start} to {end} of {rows} entries',
	previous: 'Previous',
	next: 'Next',
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
			if (pageNumber >= 1 && pageNumber <= store.rowCount / rowPerPage) {
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

const createFilters = () => {
	const { subscribe, set, update } = writable({column: [], gloabl: null})
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