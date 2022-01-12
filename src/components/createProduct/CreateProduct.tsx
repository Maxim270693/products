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

        const [errorValue, setErrorValue] = useState('')
        const [errorNumber, setErrorNumber] = useState('')

        const onSubmit = (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()
        }

        const onChangeHandlerName = (event: ChangeEvent<HTMLInputElement>) => {
            setValue(event.currentTarget.value)
            setErrorValue('')
        }
        const onChangeHandlerNumber = (event: ChangeEvent<HTMLInputElement>) => {
            setNumber(event.currentTarget.value)
            setErrorNumber('')
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

        const validateDate = () => {
            if (!value) {
                return setErrorValue("Поле 'название' не может быть пустым")
            }
            if (!number) {
                return setErrorNumber("Поле 'цена' не может быть пустым")
            } else if (number.length < 2) {
                return setErrorNumber('цена не может быть менее 2 сисмволов')
            }
        }

        return (
            <div>
                <h1>Create Product</h1>
                <form className={s.form} onSubmit={onSubmit}>
                    <input type="text"
                           className={s.formItem}
                           value={value}
                           onBlur={validateDate}
                           placeholder='название'
                           onChange={onChangeHandlerName}
                    />
                    <input type="number"
                           className={s.formItem}
                           value={number}
                           onBlur={validateDate}
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
                               if(!errorValue && !errorNumber && value !== '' && number !== '' ) {
                                   addProduct('https://i.pravatar.cc', value, +number, area, '123')
                               }
                           }}/>
                </form>
                <div className={s.errorWrapper}>
                    <span className={errorValue ? s.error : ''}>{errorValue}</span>
                    <span className={errorNumber ? s.error : ''}>{errorNumber}</span>
                </div>
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