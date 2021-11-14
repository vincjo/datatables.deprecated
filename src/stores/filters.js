import { writable } from 'svelte/store'
import { key } from '../key.js'
import { getContext, setContext } from 'svelte'

const createLocalFilters = () => {
	const { subscribe, update } = writable([])
	return {
		subscribe, update,
		add: (key, value) => update(store => {
			const filter = {key: key, value: value} 
			store = store.filter(item => { return item.key !== key && item.value.length > 0 })
			store.push(filter)
			return store
		}),
		remove: () => update(store => store = [])
	}
}
//export const localFilters = createLocalFilters()

const createGlobalFilters = () => {
	const { subscribe, update } = writable(null)
	return {
		subscribe, 
		set: (value) => update(store => {
			store = (value.length > 0) ? value : null
			return store
		}),
		remove: () => update(store => store = null)
	}
}
//export const globalFilters = createGlobalFilters()

function getFilters() {
	const localFilters = createLocalFilters();
	const globalFilters = createGlobalFilters();
	return {localFilters, globalFilters}
}

export function init_module(){
	const ctx = getContext(key);
	const {localFilters, globalFilters} = getFilters();
	setContext(key, {...ctx, localFilters, globalFilters});
}
