import React from 'react'
import {
    Switch, Route, HashRouter as Router
} from 'react-router-dom'
import PickGroups from '../pages/pick_groups'
import HomePage from '../pages/HomePage'
import ErrorPage from '../pages/ErrorPage'

const PageRouter = () =>{
    return (
        <Router>
            <Switch>
                <Route component={PickGroups} path='/profile/settings/pick-groups' exact/>
                <Route component={HomePage} path='/' exact/>
                <Route component={ErrorPage}  />
            </Switch>
        </Router>
    )

}

export default PageRouter;