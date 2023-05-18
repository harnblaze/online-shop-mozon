import React, {FC} from 'react';
import {Nav} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {getCurrentUserData} from "../../../store/actionCreators/auth";

const AdminPanel: FC = () => {
    const userData = useTypedSelector(getCurrentUserData());
    if (userData?.isAdmin === true)
        return (
            <Nav.Link as={'div'}>
                <Link
                    to="/dashboard"
                    className={'text-decoration-none'}
                    style={{color: 'rgb(13,110,253)'}}
                >
                    Админ панель
                </Link>
            </Nav.Link>
        );
    return <></>
};

export default AdminPanel;
