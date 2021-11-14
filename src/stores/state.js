import { writable, readable } from 'svelte/store'
import { getContext, setContext } from 'svelte'
import { key } from '../key.js'

const createPageNumber = () => {

	const {id, options, rowCount} = getContext(key)
	const { subscribe, update } = writable(1)
	return {
		subscribe, update,
		set: (number, context) => update(store => {
			let $rowsPerPage, $rowCount
			rowCount.subscribe(store => $rowCount = store)
			options.subscribe(store => $rowsPerPage = store.rowsPerPage)

			if ( number >= 1 && number <= Math.ceil($rowCount / $rowsPerPage) ) {
				store = parseInt(number)
			}
			document.querySelector(`#${id.get()} .dt-table`).scrollTop = 0
			return store
		})
	}
}

function getId(){
	const getStore = () => {
		const {subscribe } = readable('ssd-' + (Math.random() + 1).toString(36).substring(5))
		return {
			subscribe,
			get: () => {
				let $store
                id.subscribe(store => $store = store)
                return $store
			}
		}
	}
	const id = getStore()
	return {id}
}

function getRowCount(){
	const rowCount = writable(0)
	return {rowCount}
}

function getState(){
	const pageNumber = createPageNumber();
	const datatableWidth = writable(null);
	return {pageNumber, datatableWidth}

}

export function init_module(){
	let ctx = getContext(key);
	const {id} = getId()
	setContext(key, {...ctx, id});

	ctx = getContext(key);
	const {rowCount} = getRowCount();
	setContext(key, {...ctx, rowCount});

	ctx = getContext(key);
	const {pageNumber, datatableWidth} = getState();
	setContext(key, {...ctx, pageNumber, datatableWidth});

}
