import express from 'express'
import {
  handleNewCouldDo,
  handleEditCouldDo,
  handleDeleteCouldDo
} from '../../controllers/v1/couldDoController'
import {
  handleGetCouldDosByProjectId,
  handleNewProject,
  handleEditProject,
  handleDeleteProject,
  handleGetProjectsByUserId
 } from '../../controllers/v1/projectController'

const router = express()

router.post( '/could-do/new', handleNewCouldDo )
router.post( '/could-do/edit/:id', handleEditCouldDo )
router.post( '/could-do/delete/:id', handleDeleteCouldDo )

router.get( '/project/:id/could-do', handleGetCouldDosByProjectId )
router.post( '/project/new', handleNewProject )
router.post( '/project/edit/:id', handleEditProject )
router.post( '/project/delete/:id', handleDeleteProject )

router.get( '/user/:id/projects', handleGetProjectsByUserId)

export default router
