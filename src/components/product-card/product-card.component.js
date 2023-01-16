import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';
import '../../routes/category/category.styles.scss'

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
    <div>
      <img src={imageUrl} alt={`${name}`} />
      <div>
        <span>{name}</span>
        <span>{price}</span>
      </div>
      <button
        type='button'
        onClick={addProductToCart}
      >
        Add to card
      </button>
    </div>
  );
};

export default ProductCard;