import React from 'react';

import RouteComponent from './route/RouteComponent';

import { PrimeReactProvider } from 'primereact/api';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const App = () => {
  return (
    <PrimeReactProvider>
      <RouteComponent />
    </PrimeReactProvider>
  );
};

export default App;
