import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {Badge, Nav} from "react-bootstrap";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {selectCartItemsCount} from "../../../store/actionCreators/cart";

const CartIcon: FC = () => {
    const cartItemCount = useTypedSelector(selectCartItemsCount());

    return (
        <Nav.Link as={'div'} className={'position-relative'}>
            <Link to="/cart">
                <AiOutlineShoppingCart
                    size={30}
                    className={'position-relative'}
                />
                {cartItemCount > 0 && (
                    <Badge
                        bg="primary"
                        className={'position-absolute top-50 start-50'}
                    >
                        {cartItemCount}
                    </Badge>
                )}
            </Link>
        </Nav.Link>
    );
};

export default CartIcon;
