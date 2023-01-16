import { writable } from 'svelte/store'
import { context } from '../context.js'

export default class Columns 
{
    create(data, states, filters, options)
    {
		const id = states.id
		this.id = id.get()
		const pageNumber = states.pageNumber
		const localFilters = filters.localFilters
        const { subscribe, set, update } = writable([])
		return {
			subscribe, set, update,
			get: (self) => {
				let $columns
				self.subscribe(store => $columns = store)
				return $columns
			},
			sort: (element, key) => {
				if (options.get(options).sortable !== true || typeof key === 'undefined') {
					return
				}
				if (
					element.classList.contains('sortable') &&
					element.classList.contains('asc')
				) {
					Array.from(element.parentNode.children).forEach((item) =>
						item.classList.remove('asc', 'desc')
					)
					element.classList.add('desc')
					data.sortDesc(key)
					pageNumber.set(1)
				} else {
					Array.from(element.parentNode.children).forEach((item) =>
						item.classList.remove('desc', 'asc')
					)
					element.classList.add('asc')
					data.sortAsc(key)
					pageNumber.set(1)
				}
			},
			filter: (key, value) => {
				pageNumber.set(1)
				localFilters.add(key, value)
			},
		}
    }

	get(id)
	{
		return context.get(id).getColumns()
	}

	getData(id) 
	{
		const columns =  context.get(id).getColumns()
		return context.get(id).getColumns().get(columns)
	}
}
