import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../main/bll/store/store";
import {ProductType, setProductTC} from "../../main/bll/reducers/productReducer";
import s from "./ProductComponent.module.css";
import Spinner from "../spinner/Spinner";

const Product = () => {
    const {id} = useParams<{ id: string }>();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setProductTC(+id!))
    }, [id])

    const product = useSelector<RootStateType, ProductType>(state => state.products.product)
    const isLoading = useSelector<RootStateType, boolean>(state => state.products.isLoading)

    return (
        <div>
            {isLoading
                ? <Spinner/>
                : <>
                    <div className={s.items_item}>
                        <img src={product.image}
                             alt="img"
                        />
                    </div>
                    <h1>{product.title}</h1> <br/>
                    <h2 style={{textAlign: 'center'}}>{product.category}</h2> <br/>
                    <div>{product.description}</div>
                    <br/>
                    <div>{product.title}</div>
                    <br/>
                    <h3>{product.price}$</h3> <br/>
                </>}
        </div>
    );
}

export default Product;