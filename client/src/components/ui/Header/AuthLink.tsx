import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {Nav} from "react-bootstrap";

const AuthLink: FC = () => {
    return (
        <Nav.Link as={'div'}>
            <Link
                to="/auth/register"
                className={'text-decoration-none'}
                style={{color: 'rgb(13,110,253)'}}
            >
                Вход/Регистрация
            </Link>
        </Nav.Link>
    );
};

export default AuthLink;
