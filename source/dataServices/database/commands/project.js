import { createRecord, updateRecordWithUserID, updateOrderWithUserId, deleteRecordWithUserID } from './utilities'

const newProject = attributes => createRecord( 'projects', attributes )

const editProject = ( project_id, user_id, attributes ) => updateRecordWithUserID( 'projects', project_id, user_id, attributes )

const orderProjects = ( user_id, attributes ) => updateOrderWithUserId( 'projects', user_id, attributes )

const deleteProject = ( project_id, user_id ) => deleteRecordWithUserID( 'projects', project_id, user_id )

export { newProject, editProject, orderProjects, deleteProject }
