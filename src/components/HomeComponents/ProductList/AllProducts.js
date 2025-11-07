
const fetchProducts = async () => {
    try {
        // const response = await fetch('https://fakestoreapi.com/products');
        const response = await fetch('http://localhost:3000/Products');
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching products:', error);
    }
};

export default fetchProducts;
