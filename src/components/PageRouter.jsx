import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import ErrorPage from '../pages/ErrorPage'
import HomePage from '../pages/HomePage'
import PickGroups from '../pages/PickGroups'
import MovieInfoPage from '../pages/MovieInfoPage'
import TopPicks from '../pages/TopPicks'
import RateMore from '../pages/RateMore'
import Genres from '../pages/Genres'
import MyRating from '../pages/MyRating'

const PageRouter = () => {
  return (
    <Router>
      <Switch>
        <Route component={PickGroups} path='/profile/settings/pick-groups' exact />
        <Route component={MovieInfoPage} path='/movies/:movieId' exact />
        <Route component={TopPicks} path='/explore/top-picks' exact/>
        <Route component={RateMore} path='/explore/rate-more' exact/>
        <Route component={Genres} path='/explore/genres/:genre' exact/>
        <Route component={MyRating} path='/profile/rates' exact/>
        <Route component={HomePage} path='/' exact />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  )

}

export default PageRouter;