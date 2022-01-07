import {Dispatch} from "redux";
import {API} from "../../dal/API";

const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS';


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
}

const initialState = {
    products: [] as Array<ProductType>
}

export const productsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {...state, products: action.products}
        case SET_ALL_PRODUCTS:
            return {...state, products: action.products}
        default:
            return state
    }
}

// ActionCreators
const setProductsAC = (products: Array<ProductType>) => ({type: SET_PRODUCTS, products} as const)
const setAllProductsAC = (products: Array<ProductType>) => ({
    type: SET_ALL_PRODUCTS,
    products
} as const)


// ThunkCreators
export const setProductsTC = () => (dispatch: Dispatch) => {
    API.getProducts()
        .then(res => res.json())
        .then(json => dispatch(setProductsAC(json)))
}

export const setAllProductsTC = () => (dispatch: Dispatch) => {
    API.getAllProducts()
        .then(res => res.json())
        .then(json => dispatch(setAllProductsAC(json)))
}


type SetProductsActionType = ReturnType<typeof setProductsAC>
type SetAllProductsActionType = ReturnType<typeof setAllProductsAC>

type ActionTypes = SetProductsActionType | SetAllProductsActionType