import React from 'react';
import {ProductType} from "../../main/bll/reducers/productReducer";
import s from './ProductsComponent.module.css';
import {NavLink} from "react-router-dom";

type PropsType = {
    product: ProductType
}

const ProductsComponent: React.FC<PropsType> = ({product}) => {

    return (
        <div className={s.items}>
            <div className={s.items_item}>
                <NavLink to={'/product/' + product.id}>
                    <img src={product.image}
                         alt="img"
                    />
                </NavLink>
            </div>
            <div>{product.title}</div>
            <div>{product.price}</div>
        </div>
    );
};

export default ProductsComponent;