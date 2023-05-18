import React, {FC} from 'react';
import {Container, Navbar} from 'react-bootstrap';
import {useTypedSelector} from '../../../hooks/useTypedSelector';
import {getIsLoggedIn,} from '../../../store/actionCreators/auth';
import Logo from "./Logo";
import CartIcon from "./CartIcon";
import UserMenu from "./UserMenu";
import AdminPanel from "./AdminPanel";
import AuthLink from "./AuthLink";

const Index: FC = () => {
    const isAuth = useTypedSelector(getIsLoggedIn());


    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Logo/>
                <AdminPanel/>
                <div className={'d-flex gap-2'}>
                    <CartIcon/>
                    {isAuth ? (
                        <UserMenu/>
                    ) : (
                        <AuthLink/>
                    )}
                </div>
            </Container>
        </Navbar>
    );
};

export default Index;
