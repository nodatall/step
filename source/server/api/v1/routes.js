import express from 'express'
import passport from 'passport'
import {
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
  handleLogOut
} from '../../controllers/v1'

const router = express()

router.post( '/could-do/new', handleNewCouldDo )
router.post( '/could-do/edit/:id', handleEditCouldDo )
router.post( '/could-do/delete/:id', handleDeleteCouldDo )

router.get( '/project/:id/could-do', handleGetCouldDosByProjectId )
router.post( '/project/new', handleNewProject )
router.post( '/project/edit/:id', handleEditProject )
router.post( '/project/delete/:id', handleDeleteProject )

router.get( '/user/:id/projects', handleGetProjectsByUserId )
router.get( '/user/:id/logout', handleLogOut )

router.get( '/login', getGoogleOAuthPermissionCode )
router.get( '/google/auth/callback',
  passport.authenticate( 'google', { failureRedirect: '/' } ),
  handleSuccessfulAuthentication
)

router.get( '/', handleSendApp )

export default router
