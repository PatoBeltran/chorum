import '!style!css!bootstrap/dist/css/bootstrap.css';
import '!style!css!./css/main.css';

import React from 'react';
import App from './components/App.jsx';
import Parse from 'parse';

main();

function main() {
  if(process.env.NODE_ENV === 'production') {
    React.render(<App />, document.getElementById('app'));
  }
  if(process.env.NODE_ENV !== 'production') {
    const app = document.createElement('div');

    document.body.appendChild(app);

    React.render(<App />, app);
  }
}
