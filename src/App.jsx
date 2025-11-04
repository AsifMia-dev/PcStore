import React from 'react';

import RouteComponent from './route/RouteComponent';

import { PrimeReactProvider } from 'primereact/api';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <PrimeReactProvider>
      <AuthProvider>
        <RouteComponent />
      </AuthProvider>
    </PrimeReactProvider>
  );
};

export default App;
