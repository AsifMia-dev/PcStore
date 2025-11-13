import React from 'react'
import { Routes,Route } from 'react-router-dom';


import { allRouters,renderRouterElement } from '../Helper/routerHelper';



const RouteComponent = () => {
  return (
      <Routes>
        {
          allRouters.map((route) =>(
            <Route path = {route.path} element={renderRouterElement(route)} />
          ))
        }
      </Routes> 
  )
}

export default RouteComponent;
