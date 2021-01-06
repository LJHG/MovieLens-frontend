import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import ErrorPage from '../pages/ErrorPage'
import HomePage from '../pages/HomePage'
import PickGroups from '../pages/PickGroups'

const PageRouter = () => {
  return (
    <Router>
      <Switch>
        <Route component={PickGroups} path='/profile/settings/pick-groups' exact />
        <Route component={HomePage} path='/' exact />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  )

}

export default PageRouter;