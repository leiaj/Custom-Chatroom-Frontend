import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import actionCable from 'actioncable'
import { BrowserRouter as Router } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

const CableApp = {}
CableApp.cable = actionCable.createConsumer(`https://chittychattyfun.herokuapp.com/chat`)

ReactDOM.render(
  <Router>
  <App cableApp={CableApp} />
  </Router>,
  document.getElementById('root'));
registerServiceWorker();
