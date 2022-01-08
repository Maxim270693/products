import {Dispatch} from "redux";
import {API} from "../../dal/API";

const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_PART_PRODUCTS = 'SET_PART_PRODUCTS';
const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS';
const IS_LOADING = 'IS_LOADING';


export type ProductType = {
    category: string
    description: string
    id: number
    image: string
    price: 109.95
    rating: {
        rate: number,
        count: number
    }
    title: string
}

type InitialStateType = {
    products: Array<ProductType>
    isLoading: boolean
}

const initialState = {
    products: [] as Array<ProductType>,
    isLoading: false
}

export const productsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {...state, products: action.products}
        case SET_PART_PRODUCTS:
            return {...state, products: action.products}
        case SET_ALL_PRODUCTS:
            return {...state, products: action.products}
        case IS_LOADING:
            return {...state, isLoading: action.value}
        default:
            return state
    }
}

// ActionCreators
const setProductsAC = (products: Array<ProductType>) => ({type: SET_PRODUCTS, products} as const)
const setPartProductsAC = (products: Array<ProductType>) => ({
    type: SET_PART_PRODUCTS,
    products
} as const)
const setAllProductsAC = (products: Array<ProductType>) => ({
    type: SET_ALL_PRODUCTS,
    products
} as const)
const loadingSpinnerAC = (value: boolean) => ({type: IS_LOADING, value} as const)


// ThunkCreators
export const setProductsTC = () => (dispatch: Dispatch) => {
    try {
        dispatch(loadingSpinnerAC(true))
        API.getProducts()
            .then(res => res.json())
            .then(json => {
                dispatch(setProductsAC(json))
                dispatch(loadingSpinnerAC(false))
            })
    } catch (e) {

    }
}

export const setPartProductsTC = () => (dispatch: Dispatch) => {
    try {
        dispatch(loadingSpinnerAC(true))
        API.getPartProducts()
            .then(res => res.json())
            .then(json => {
                dispatch(setPartProductsAC(json))
                dispatch(loadingSpinnerAC(false))
            })
    } catch (e) {

    }
}

export const setAllProductsTC = () => (dispatch: Dispatch) => {
    try {
        dispatch(loadingSpinnerAC(true))
        API.getAllProducts()
            .then(res => res.json())
            .then(json => {
                dispatch(setAllProductsAC(json))
                dispatch(loadingSpinnerAC(false))
            })
    } catch (e) {

    }
}


type SetProductsActionType = ReturnType<typeof setProductsAC>
type SetPartProductsActionType = ReturnType<typeof setPartProductsAC>
type SetAllProductsActionType = ReturnType<typeof setAllProductsAC>
type loadingSpinnerActionType = ReturnType<typeof loadingSpinnerAC>

type ActionTypes = SetProductsActionType | SetAllProductsActionType | SetPartProductsActionType
    | loadingSpinnerActionType