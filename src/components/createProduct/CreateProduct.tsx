import React, {ChangeEvent, FormEvent, useState} from 'react';
import s from './CreateProduct.module.css';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../main/bll/store/store";
import {postProductTC, ProductFormType} from "../../main/bll/reducers/productReducer";

const CreateProduct = () => {
    const dispatch = useDispatch();

    const productsForm = useSelector<RootStateType, Array<ProductFormType>>(state => state.products.productsForm)

    const [value, setValue] = useState('')
    const [number, setNumber] = useState('')
    const [area, setArea] = useState('')

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }

    const onChangeHandlerName = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }
    const onChangeHandlerNumber = (event: ChangeEvent<HTMLInputElement>) => {
        setNumber(event.currentTarget.value)
    }
    const onChangeHandlerArea = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setArea(event.currentTarget.value)
    }

    const addProduct = (image: string, title: string, price: number, description: string, category: string) => {
        dispatch(postProductTC({image, title, price, description, category}))
    }

    return (
        <div>
            <form className={s.form} onSubmit={onSubmit}>
                <label>
                    Название:
                    <input type="text"
                           value={value}
                           onChange={onChangeHandlerName}
                    />
                </label>
                <label>
                    Цена:
                    <input type="number"
                           value={number}
                           onChange={onChangeHandlerNumber}
                    />
                </label>
                <textarea placeholder='описание'
                          value={area}
                          onChange={onChangeHandlerArea}
                />
                <input type="checkbox"/>
                <input type="submit"
                       value='add product'
                       onClick={() => addProduct('https://i.pravatar.cc', value, +number, area, '123')}/>
            </form>
            {productsForm.map(productForm => {
                return <>
                    <div><img style={{width: '200px'}} src={productForm.image} alt="img"/></div>
                    <div>{productForm.title}</div>
                    <br/>
                    <div>{productForm.description}</div>
                    <br/>
                    <h3>{productForm.price}$</h3> <br/>
                </>
            })}
        </div>
    );
};

export default CreateProduct;