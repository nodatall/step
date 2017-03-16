import { createRecord, updateRecord, deleteRecord } from './utilities'

const newProject = attributes => createRecord( 'projects', attributes )

const editProject = ( project_id, attributes ) => updateRecord( 'projects', project_id, attributes )

const deleteProject = project_id => deleteRecord( 'projects', project_id )

export { newProject, editProject, deleteProject }
