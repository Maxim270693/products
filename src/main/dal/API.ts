

export const API = {
    getProducts: () => {
        return fetch('https://fakestoreapi.com/products?limit=8')
    },
    getPartProducts: () => {
        return fetch('https://fakestoreapi.com/products?limit=16')
    },
    getAllProducts: () => {
        return fetch('https://fakestoreapi.com/products')
    }
}