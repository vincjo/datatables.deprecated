import Options  from './Stores/Options.js'
import States   from './Stores/States.js'
import Filters  from './Stores/Filters.js'
import Data     from './Stores/Data.js'
import Columns  from './Stores/Columns.js'
import { context }  from './context.js'


export default class Datatable
{
    constructor(identifier) 
    {
        this.id = identifier
    }

    create() 
    {
        this.options   = new Options().create()
        this.states    = new States().create(this.options, this.id)
        this.filters   = new Filters().create()
        this.data      = new Data().create(this.states, this.filters, this.options)
        this.columns   = new Columns().create(this.data.data, this.states, this.filters, this.options)
        context.add(this)
    }

    get(id)
    {
        return context.get(id)
    }

    getOptions       () { return this?.options                }
    getPageNumber    () { return this?.states.pageNumber      }
    getId            () { return this?.states.id              }
    getRowsCount     () { return this?.states.rowsCount       }
    getDatatableWidth() { return this?.states.datatableWidth  }
    getGlobalFilter  () { return this?.filters.globalFilter   }
    getLocalFilters  () { return this?.filters.localFilters   }
    getData          () { return this?.data.data              }
    getFiltered      () { return this?.data.filtered          }
    getRows          () { return this?.data.rows              }
    getColumns       () { return this?.columns                }

}