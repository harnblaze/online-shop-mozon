import React, {FC} from 'react';
import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

const Logo: FC = () => {
    return (
        <Navbar.Brand as={'div'}>
            <Link
                to="/"
                className={'text-decoration-none'}
                style={{color: 'rgb(13,110,253)'}}
            >
                MOZON
            </Link>
        </Navbar.Brand>
    );
};

export default Logo;
