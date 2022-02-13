import { writable } from 'svelte/store'

const createContext = () => {
    const { subscribe, set, update } = writable({})
    return {
        subscribe, set, update,
        index: () => {
            let $context
            context.subscribe(store => $context = store)
            return $context
        },
        add: (stores) => {
            const id = stores.getId().get()
            const newContext = { [id]: stores  }
            context.set({ ...context.index(),  ...newContext })
            return newContext[id]
        },
        get: (id) => {
            return context.index()[id] 
        }
    }
}

export const context = createContext()

export const rows = writable([])