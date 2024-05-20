import { Route,  Navigate } from "react-router-dom"

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
  return (
    <Route { ...rest }
        element={ (props) => (
            ( isAuthenticated )
                ? ( <Component { ...props } /> )
                : ( <Navigate to="/login" /> )
        )}
        
    />
  )
}
