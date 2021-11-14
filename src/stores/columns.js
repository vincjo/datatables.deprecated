import { writable } from 'svelte/store'
import { getContext, setContext } from 'svelte';
import { key } from '../key.js';


const getColumns = () => {
	const {id ,options, data, pageNumber, localFilters} = getContext(key);

	const createColumns = () => {
		
		const { subscribe, set, update } = writable([])
		return {
			subscribe, set, update,
			get: () => {
				let $columns
				columns.subscribe(store => $columns = store)
				return $columns
			},
			sort: (element, key, context) => {
				if (options.get().sortable !== true || typeof key === 'undefined') {
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
					pageNumber.set(1, context)
				} else {
					Array.from(element.parentNode.children).forEach((item) =>
						item.classList.remove('desc', 'asc')
					)
					element.classList.add('asc')
					data.sortAsc(key)
					pageNumber.set(1, context)
				}
				columns.redraw(context)
			},
			filter: (key, value, context) => {
				pageNumber.set(1, context)
				localFilters.add(key, value)
				columns.redraw(context)
			},
			draw: () => {
				setTimeout(() => {
					const tbody = document.querySelector(`#${id.get()} table tbody tr`)
					if (tbody === null) return
					const thead = document.querySelectorAll(`#${id.get()} .dt-header thead tr`)
					const $columns = columns.get()

					const th = thead[0].children[0]
					const td = Array.from(tbody.children)[0]

					thead.forEach(tr => {
						let i = 0
						Array.from(tbody.children).forEach(td => {
							let th = tr.children[i]
							let thW = th.getBoundingClientRect().width
							let tdW = td.getBoundingClientRect().width
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
				if ( options.get().scrollY === false ) return
				
				setTimeout(() => {
					const tbody = document.querySelector(`#${id.get()} table tbody tr`)
					if (tbody === null) return
					const thead = document.querySelectorAll(`#${id.get()} .dt-header thead tr`)
					const $columns = columns.get()
					thead.forEach(tr => {
						let i = 0
						Array.from(tbody.children).forEach(td => {
							let th = tr.children[i]
							let thW = th.getBoundingClientRect().width
							let tdW = td.getBoundingClientRect().width
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
		}
	}	

	const columns = createColumns();
	return columns
}

export const init_module = () => {
	const ctx = getContext(key);
	const columns = getColumns();

	setContext(key, {...ctx, columns});
}
