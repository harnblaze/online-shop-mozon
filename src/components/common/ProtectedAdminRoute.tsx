import React, { FC } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getCurrentUserData } from '../../store/actionCreators/auth';

interface IProtectedAdminRouteProps {
  path?: string | undefined;
  children?: React.ReactNode;
  component?:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>
    | undefined;
  exact: boolean;
}

const IProtectedAdminRoute: FC<IProtectedAdminRouteProps> = ({
  component: Component,
  children,
  ...rest
}) => {
  const userData = useTypedSelector(getCurrentUserData());
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={props => {
        if (userData?.isAdmin === false || userData?.isAdmin === undefined) {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: history.location },
              }}
            />
          );
        }
        return Component !== undefined ? <Component {...props} /> : children;
      }}
    />
  );
};

export default IProtectedAdminRoute;
