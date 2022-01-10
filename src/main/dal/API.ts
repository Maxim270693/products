export const API = {
    getProducts: () => {
        return fetch('https://fakestoreapi.com/products?limit=8')
    },
    getPartProducts: () => {
        return fetch('https://fakestoreapi.com/products?limit=16')
    },
    getAllProducts: () => {
        return fetch('https://fakestoreapi.com/products')
    },
    getProductId: (productId: number) => {
        return fetch(`https://fakestoreapi.com/products/${productId}`)
    },
    postProduct: (image: string, title: string, price: number, description: string, category: string) => {
        return fetch('https://fakestoreapi.com/products', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    title,
                    price,
                    description,
                    image,
                    category
                }
            )
        })
    }
}