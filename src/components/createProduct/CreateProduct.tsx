import React, {ChangeEvent, FormEvent, useState} from 'react';
import s from './CreateProduct.module.css';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../main/bll/store/store";
import {postProductTC, ProductFormType} from "../../main/bll/reducers/productReducer";
import Spinner from "../spinner/Spinner";

const CreateProduct = () => {
        const dispatch = useDispatch();

        const productsForm = useSelector<RootStateType, Array<ProductFormType>>(state => state.products.productsForm)
        const isLoading = useSelector<RootStateType, boolean>(state => state.products.isLoading)

        const [value, setValue] = useState('')
        const [number, setNumber] = useState('')
        const [area, setArea] = useState('')
        const [date, setDate] = useState('')

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
            getCurrentDate()
        }

        function getCurrentDate(separator = '') {
            let newDate = new Date()
            let date = newDate.getDate();
            let month = newDate.getMonth() + 1;
            let year = newDate.getFullYear();

            return setDate(`${year}.${separator}${month < 10 ? `0${month}` : `${month}`}.${separator}${date}`)
        }

        return (
            <div>
                <h1>Create Product</h1>
                <form className={s.form} onSubmit={onSubmit}>
                    <input type="text"
                           className={s.formItem}
                           value={value}
                           placeholder='название'
                           onChange={onChangeHandlerName}
                    />
                    <input type="number"
                           className={s.formItem}
                           value={number}
                           placeholder='цена'
                           onChange={onChangeHandlerNumber}
                    />
                    <textarea placeholder='описание'
                              className={s.formItem}
                              value={area}
                              onChange={onChangeHandlerArea}
                    />
                    <input type="submit"
                           value='add product'
                           className={s.btn}
                           onClick={() => {
                               addProduct('https://i.pravatar.cc', value, +number, area, '123')
                           }}/>
                </form>
                {isLoading
                    ? <Spinner/>
                    : <>
                        {productsForm.map(productForm => <div className={s.productWrapper}>
                                <div><img style={{width: '200px'}} src={productForm.image} alt="img"/>
                                </div>
                                <h3>{productForm.title}</h3>
                                <div>{productForm.description}</div>
                                <h4>{productForm.price}$</h4>
                                <br/>
                                {date}
                            </div>
                        )}
                    </>}
            </div>
        );
    }
;

export default CreateProduct;