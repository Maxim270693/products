import React, {useEffect} from 'react';
import {ProductType, setAllProductsTC, setProductsTC} from "../main/bll/reducers/productReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../main/bll/store/store";
import ProductComponent from "./ProductComponent";

const ShowProducts = () => {
    const dispatch = useDispatch()

    const products = useSelector<RootStateType, Array<ProductType>>(state => state.products.products)

    useEffect(() => {
        dispatch(setProductsTC())
    }, [])

    return (
        <div>
            <h1>Products</h1>
            {
                products?.map(product => <ProductComponent product={product} key={product.id}/>)
            }
            <button onClick={() => {}}>add 8 products</button>
            <button onClick={() => {}}>add 16 products</button>
            <button onClick={() => dispatch(setAllProductsTC())}>all products</button>
        </div>
    );
}

export default ShowProducts;