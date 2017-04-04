import { createRecord, updateRecord, deleteRecord } from './utilities'

const newUser = attributes => createRecord( 'users', attributes )

const editUser = ( user_id, attributes ) => updateRecord( 'users', user_id, attributes )

const deleteUser = user_id => deleteRecord( 'users', user_id )

export { newUser, editUser, deleteUser }
