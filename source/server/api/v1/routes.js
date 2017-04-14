import express from 'express'
import {
  checkForAuthorization,
  handleNewCouldDo,
  handleEditCouldDo,
  handleDeleteCouldDo,
  handleGetCouldDosByProjectId,
  handleNewProject,
  handleEditProject,
  handleDeleteProject,
  handleGetProjectsByUserId,
  handleSendApp,
  getGoogleOAuthPermissionCode,
  handleSuccessfulAuthentication,
  handleLogOut,
  handleGoogleAuthentication,
  handleGetSession
} from '../../controllers/v1'

const router = express()

router.post( '/could-do/new', checkForAuthorization, handleNewCouldDo )
router.post( '/could-do/edit/:id', checkForAuthorization, handleEditCouldDo )
router.post( '/could-do/delete/:id', checkForAuthorization, handleDeleteCouldDo )

router.get( '/project/:id/could-do', checkForAuthorization, handleGetCouldDosByProjectId )
router.post( '/project/new', checkForAuthorization, handleNewProject )
router.post( '/project/edit/:id', checkForAuthorization, handleEditProject )
router.post( '/project/delete/:id', checkForAuthorization, handleDeleteProject )

router.get( '/user/:id/projects', checkForAuthorization, handleGetProjectsByUserId )
router.get( '/user/:id/logout', checkForAuthorization, handleLogOut )

router.get( '/auth/google', getGoogleOAuthPermissionCode )
router.get( '/google/auth/callback', handleGoogleAuthentication, handleSuccessfulAuthentication )

router.get('/session', checkForAuthorization, handleGetSession )

router.get( '/*', handleSendApp )


export default router
