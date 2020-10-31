import { writable } from 'svelte/store'

const createLocal = () => {
	const { subscribe, update } = writable([])
	return {
		subscribe,
		add: (key, value) => update(store => {
			const filter = {key: key, value: value} 
			store = store.filter(item => { return item.key !== key && item.value.length > 0 })
			store.push(filter)
			return store
		}),
	}
}
export const local = createLocal()

const createGlobal = () => {
	const { subscribe, update } = writable(null)
	return {
		subscribe,
		set: (value) => update(store => {
			store = (value.length > 0) ? value : null
			return store
		})
	}
}
export const global = createGlobal()