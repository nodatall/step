import React from 'react'
import axios from 'axios'
import componentErrorHandler from '../utilities/componentErrorHandler'
import GlobalStateComponent from '../reusable/ParentClasses/GlobalStateComponent'
import RowList from '../reusable/Row/RowList'
import globalState from '../utilities/globalState'

export default class ProjectListContainer extends GlobalStateComponent {
  componentDidMount() {
    axios.get( `${__HOST__}/user/${this.state.userId}/projects` ) //eslint-disable-line
      .then( body => globalState.set({ projects: body.data }) )
      .catch( componentErrorHandler( 'ProjectListContainer' ) )
  }

  render() {
    return <RowList items={ this.state.projects } type='project' />
  }
}
