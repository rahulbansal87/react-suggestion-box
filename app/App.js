import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import routes from './config/routes';
/*require( 'bootstrap.min.css' ) ;
require(  'styles.css' );*/

ReactDOM.render(
  <Router >{routes}</Router>,
  document.getElementById('app')
)

