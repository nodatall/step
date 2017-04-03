import express from 'express'
import passport from 'passport'
import {
  getOAuthPermissionCode,
  handleSuccessfulAuthentication,
  handleLogOut
} from '../../controllers/v1/passportController'
import {
  handleNewCouldDo,
  handleEditCouldDo,
  handleDeleteCouldDo,
  handleGetCouldDosByProjectId,
  handleNewProject,
  handleEditProject,
  handleDeleteProject,
  handleGetProjectsByUserId
} from '../../controllers/v1'
import handleSendApp from '../../controllers/v1/appController'

const router = express()

router.get('/login', getOAuthPermissionCode )
router.get( '/google/auth/callback',
  passport.authenticate( 'google', { failureRedirect: '/' } ),
  handleSuccessfulAuthentication
)
router.post( '/could-do/new', handleNewCouldDo )
router.post( '/could-do/edit/:id', handleEditCouldDo )
router.post( '/could-do/delete/:id', handleDeleteCouldDo )

router.get( '/project/:id/could-do', handleGetCouldDosByProjectId )
router.post( '/project/new', handleNewProject )
router.post( '/project/edit/:id', handleEditProject )
router.post( '/project/delete/:id', handleDeleteProject )

router.get( '/user/:id/projects', handleGetProjectsByUserId )

router.get( '/', handleSendApp )
router.get( '/user/:id/logout', handleLogOut )

export default router
