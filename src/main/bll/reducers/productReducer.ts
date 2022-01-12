import {Dispatch} from "redux";
import {API} from "../../dal/API";

const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_PART_PRODUCTS = 'SET_PART_PRODUCTS';
const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS';
const IS_LOADING = 'IS_LOADING';
const SET_PRODUCT = 'SET_PRODUCT';
const POST_PRODUCT = 'POST_PRODUCT';
const SET_ERROR = 'SET_ERROR';


export type ProductFormType = {
    title: string
    price: number
    description: string
    image: string
    category: string
}

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
    product: ProductType
    productsForm: Array<ProductFormType>
    isLoading: boolean
    error: null | string
}

const initialState = {
    products: [] as Array<ProductType>,
    product: {} as ProductType,
    productsForm: [] as Array<ProductFormType>,
    isLoading: false,
    error: null as string | null,
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
        case SET_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        case POST_PRODUCT:
            return {...state, productsForm: [...state.productsForm, action.payload]}
        case SET_ERROR:
            return {...state, error: action.error}
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
const setProductAC = (payload: ProductType) => ({type: SET_PRODUCT, payload} as const)
const postProductAC = (payload: ProductFormType) => ({type: POST_PRODUCT, payload} as const)
const setErrorAC = (error: string) => ({type: SET_ERROR, error} as const)


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
export const setProductTC = (id: number) => (dispatch: Dispatch) => {
    try {
        dispatch(loadingSpinnerAC(true))
        API.getProductId(id)
            .then(res => res.json())
            .then(json => {
                dispatch(setProductAC(json))
                dispatch(loadingSpinnerAC(false))
            })
    } catch (e) {

    }
}
export const postProductTC = (payload: ProductFormType) => (dispatch: Dispatch) => {
    try {
        dispatch(loadingSpinnerAC(true))
        const {image, title, price, description, category} = payload
        API.postProduct(image, title, price, description, category)
            .then(res => res.json())
            .then(json => {
                dispatch(postProductAC(json))
                dispatch(loadingSpinnerAC(false))
            })
    } catch (e) {

    }
}


type SetProductsActionType = ReturnType<typeof setProductsAC>
type SetPartProductsActionType = ReturnType<typeof setPartProductsAC>
type SetAllProductsActionType = ReturnType<typeof setAllProductsAC>
type loadingSpinnerActionType = ReturnType<typeof loadingSpinnerAC>
type SetProductActionType = ReturnType<typeof setProductAC>
type PostProductActionType = ReturnType<typeof postProductAC>
type SetErrorActionType = ReturnType<typeof setErrorAC>

type ActionTypes = SetProductsActionType | SetAllProductsActionType | SetPartProductsActionType
    | loadingSpinnerActionType | SetProductActionType | PostProductActionType
    | SetErrorActionType