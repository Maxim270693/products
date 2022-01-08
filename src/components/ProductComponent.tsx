import React from 'react';
import {ProductType} from "../main/bll/reducers/productReducer";

type PropsType = {
    product: ProductType
}

const ProductComponent: React.FC<PropsType> = ({product}) => {

    return (
        <div>
            <div><img style={{width: '80px'}} src={product.image} alt="img"/></div>
            <div>{product.title}</div>
            <div>{product.price}</div>
        </div>
    );
};

export default ProductComponent;