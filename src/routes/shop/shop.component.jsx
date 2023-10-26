import { useContext } from "react";

import { ProductsContext } from "../../contexts/products.context";

const Shop = () => {
    const { products } = useContext(ProductsContext);

    return (
        <div>
            <h1>Shop</h1>
            {
                products.map(({ id, name }) => (
                    <div key={id}>
                        <h3>{name}</h3>
                    </div>
                ))}
        </div>
    )
}

export default Shop