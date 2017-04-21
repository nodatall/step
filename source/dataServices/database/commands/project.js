import { createRecord, updateRecordWithUserID, deleteRecordWithUserID } from './utilities'

const newProject = attributes => createRecord( 'projects', attributes )

const editProject = ( project_id, user_id, attributes ) => updateRecordWithUserID( 'projects', project_id, user_id, attributes )

const deleteProject = ( project_id, user_id ) => deleteRecordWithUserID( 'projects', project_id, user_id )

export { newProject, editProject, deleteProject }
