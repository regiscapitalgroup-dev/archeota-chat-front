import { lazy } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom"
import { RootState } from "../../../setup";

export const AuthPage = () => {
    const user = useSelector((state: RootState) => state.auth.user, shallowEqual);
    const { path } = useRouteMatch();
    const Login = lazy(() => import('./features/Login'));
    const Register = lazy(() => import('./features/Register'));
    
    return (
        <Switch>
            { !!user ? (
                <Redirect to={`/assets/chat`}/>
            ) : (
                <>
                    <Route exact path={`${path}/login`} component={Login} />
                    <Route exact path={`${path}/register`} component={Register} />
                    {/* <Route path='*'>
                        <Redirect to={`${path}/login`}/>
                    </Route> */}
                </>
            )}
        </Switch>
    )
}