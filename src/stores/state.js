import { writable } from 'svelte/store'
//import { options } from './options.js'
import { getContext, setContext } from 'svelte'
import { key } from '../key.js'


//export const rowCount = writable(0)

const createPageNumber = () => {

	const {options, rowCount} = getContext(key)
	const { subscribe, update } = writable(1)
	return {
		subscribe, update,
		set: (number, context) => update(store => {
			let $rowPerPage, $rowCount
			rowCount.subscribe(store => $rowCount = store)
			options.subscribe(store => $rowPerPage = store.rowPerPage)

			if ( number >= 1 && number <= Math.ceil($rowCount / $rowPerPage) ) {
				store = parseInt(number)
			}
			document.querySelector(`#${context} .dt-table`).scrollTop = 0
			return store
		})
	}
}
//export const pageNumber = createPageNumber()

//export const datatableWidth = writable(null)
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
	const {rowCount} = getRowCount();

	setContext(key, {...ctx, rowCount});
	ctx = getContext(key);
	const {pageNumber, datatableWidth} = getState();
	setContext(key, {...ctx, pageNumber, datatableWidth});

}
