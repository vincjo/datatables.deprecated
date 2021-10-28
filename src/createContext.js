import * as filters from './stores/filters.js';
import * as options from './stores/options.js';
import * as state from './stores/state.js';
import * as data from './stores/data.js';
import * as columns from './stores/columns.js';

export function initContext(){
    filters.init_module();
    options.init_module();
    state.init_module();
    data.init_module();
    columns.init_module();
}

