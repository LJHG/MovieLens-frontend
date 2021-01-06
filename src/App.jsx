import logo from './logo.svg';
import {
  Switch, Route, HashRouter as Router
} from 'react-router-dom'
import PickGroups from './pages/pick_groups'
import 'antd/dist/antd.css';
import PageLayout from './components/PageLayout'

function App() {
  return (
    <PageLayout/>
  );
}

export default App;
