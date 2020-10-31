import { writable, derived } from 'svelte/store'
import { options } from './options.js'
import { pageNumber, rowCount } from './state.js'
import { global, local } from './filters.js'


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

export const filtered = derived(
	[data, global, local],
    ([$data, $global, $local]) => {
		if ($global) {
			$data = $data.filter( item => {
				return Object.keys(item).some( k => {
					return item[k].toString().toLowerCase().indexOf($global.toString().toLowerCase()) > -1
				})
			})
		}
		if ($local.length > 0) {
			$local.forEach(filter => {
				return $data = $data.filter( item => item[filter.key].toString().toLowerCase().indexOf(filter.value.toString().toLowerCase()) > -1)
			})
		}
		rowCount.set($data.length)
		return $data
	} 	
)

export const rows = derived(
	[filtered, options, pageNumber],
    ([$filtered, $options, $pageNumber]) => {
		if (!$options.pagination) {
			return $filtered
		}
		return $filtered.slice( ($pageNumber - 1) * $options.rowPerPage, $pageNumber * $options.rowPerPage) 
	} 
)