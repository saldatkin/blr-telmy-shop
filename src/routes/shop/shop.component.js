import { useContext } from 'react';
import ProductCard from '../../components/product-card/product-card.component';
import { ProductContext } from '../../contexts/products.context';

import './shop.styles.scss';


const Shop = () => {   
    const { products } = useContext(ProductContext);

    return(
        <div className='products'>
            {products.map((product) => (
                <ProductCard key={product.id}  product={product} />
            )
            )}
        </div>
    )
}

export default Shop;