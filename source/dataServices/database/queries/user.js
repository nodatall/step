import { getRecordById } from './utilities'

const getUserById = user_id => getRecordById( 'users', user_id )

export default getUserById
