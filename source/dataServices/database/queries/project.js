import { getRecordById, findAllWhere } from './utilities'

const getProjectById = project_id => getRecordById( 'projects', project_id )

const getProjectsByUserId = user_id => findAllWhere( 'projects', 'user_id', user_id )

export { getProjectById, getProjectsByUserId }
