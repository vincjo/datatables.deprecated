import { writable } from 'svelte/store'

export default class Filters 
{
    create(filterStore) 
    {
        return {
            globalFilter: this.createGlobalFilter(),
            localFilters: this.createLocalFilters(filterStore)
        }
    }
    
    createLocalFilters(filterStore) 
    {
        const { subscribe, update } = filterStore;
        return {
            subscribe, update,
            add: (key, value, index) => update(store => {
                const filter = {key: key, value: value}
                store.splice(index, 1, filter)
                // store = store.filter(item => { return item.key !== key && item.value.length > 0 })
                // store.push(filter)
                return store
            }),
            remove: () => update(store => store = [])
        }
    }

    createGlobalFilter()
    {
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
}
