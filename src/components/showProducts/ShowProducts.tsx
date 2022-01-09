import React, {useEffect} from 'react';
import {
    ProductType,
    setAllProductsTC,
    setPartProductsTC,
    setProductsTC
} from "../../main/bll/reducers/productReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../main/bll/store/store";
import ProductsComponent from "../products/ProductsComponent";
import Spinner from "../spinner/Spinner";
import s from './ShowProducts.module.css'

const ShowProducts = () => {
    const dispatch = useDispatch()

    const products = useSelector<RootStateType, Array<ProductType>>(state => state.products.products)
    const isLoading = useSelector<RootStateType, boolean>(state => state.products.isLoading)

    useEffect(() => {
        dispatch(setProductsTC())
    }, [])

    return (
        <div>
            <h1 className={s.title}>Products</h1>
            {isLoading ? (<Spinner/>)
                : (<div className={s.items}>
                    {
                        products?.map(product => <ProductsComponent product={product} key={product.id}/>)
                    }
                   <div>
                       <button onClick={() => {}}>add 8 products</button>
                       <button onClick={() => dispatch(setPartProductsTC())}>add 16 products</button>
                       <button onClick={() => dispatch(setAllProductsTC())}>all products</button>
                   </div>
                </div>)
            }
        </div>
    );
};

export default ShowProducts;