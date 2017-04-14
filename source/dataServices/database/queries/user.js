import { getRecordById } from './utilities'

const getUserById = user_id => getRecordById( 'users', 'id', user_id )

const getUserByOAuthID = oauth_ID => getRecordById( 'users', 'oauth_ID', oauth_ID )

export { getUserById, getUserByOAuthID }
