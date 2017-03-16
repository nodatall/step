import { createRecord, updateRecord, deleteRecord } from './utilities'

const newCouldDo = attributes => createRecord( 'could_dos', attributes )

const editCouldDo = ( id, attributes ) => updateRecord( 'could_dos', id, attributes )

const deleteCouldDo = id => deleteRecord( 'could_dos', id )

export { newCouldDo, editCouldDo, deleteCouldDo }
