import {
  Switch, Route, HashRouter as Router
} from 'react-router-dom'
import 'antd/dist/antd.css';
import PageLayout from './components/PageLayout'

function App() {
  return (
    <Router>
      <Switch>
        <Route component={PageLayout} />
      </Switch>
    </Router>
  );
}

export default App;
