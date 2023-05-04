import React, { FC } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getIsLoggedIn } from '../../store/actionCreators/auth';

interface IProtectedRuteProps {
  path?: string | undefined;
  children?: React.ReactNode;
  component?:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>
    | undefined;
  exact: boolean;
}

const ProtectedRoute: FC<IProtectedRuteProps> = ({
  component: Component,
  children,
  ...rest
}) => {
  const isLoggedIn = useTypedSelector(getIsLoggedIn());
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={props => {
        if (!isLoggedIn) {
          return (
            <Redirect
              to={{
                pathname: '/auth/login',
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

export default ProtectedRoute;
