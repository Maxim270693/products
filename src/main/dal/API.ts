

export const API = {
    getProducts: () => {
        return fetch('https://fakestoreapi.com/products?limit=8')
    },
    getAllProducts: () => {
        return fetch('https://fakestoreapi.com/products')
    }
}