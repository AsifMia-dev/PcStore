
const fetchProducts = async () => {
    try {
        // const response = await fetch('https://fakestoreapi.com/products');
        const response = await fetch('http://localhost:3000/Products');
        const data = await response.json();
        const keys = Object.keys(data);
        const values = keys.map( key => data[key]).flat();

        const productMap = {};
        values.forEach((product) => {
            productMap[product.id] = product;
        });
        return productMap;
    }
    catch (error) {
        console.error('Error fetching products:', error);
    }
};

export default fetchProducts;
