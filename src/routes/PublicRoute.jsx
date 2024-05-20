import { Route,  Navigate } from "react-router-dom"

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    console.log(
        <Route {...rest}
        element= {
            ( isAuthenticated )
            ?  <Navigate to="/" /> 
            :  <Component   /> 
        }
    />
    )

  return (
    <Route {...rest}
        element= {
            ( isAuthenticated )
            ?  <Navigate to="/" /> 
            :  <Component   /> 
        }
    />
  )
}
