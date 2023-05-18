import React, {FC} from 'react';
import {FaUserCircle} from "react-icons/fa";
import {NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {getCurrentUserData} from "../../../store/actionCreators/auth";

const UserMenu: FC = () => {
    const userData = useTypedSelector(getCurrentUserData());

    return (
        <NavDropdown
            title={
                <FaUserCircle size={30} style={{color: 'rgb(13,110,253)'}}/>
            }
            id="basic-nav-dropdown"
            className={'position-relative'}
            align={'end'}
        >
            <NavDropdown.Item as={'div'}>
                {userData?.firstName} {userData?.lastName}
            </NavDropdown.Item>
            <NavDropdown.Item as={'div'}>{userData?.email}</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item as={'div'}>
                <Link to="/logout" className={'text-decoration-none d-block'}>
                    Logout
                </Link>
            </NavDropdown.Item>
        </NavDropdown>
    );
};

export default UserMenu;
