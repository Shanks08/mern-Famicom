import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { Store } from '../Store';

export default function Product({ product }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };

  return (
    <Card className={'align-self-center'}>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link
          to={`/product/${product.slug}`}
          className="product-name-homescreen"
        >
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>
          <Link
            to={`/product/${product.slug}`}
            className="product-price-homescreen"
          >
            <strong>₹{' ' + product.price}</strong>
          </Link>
        </Card.Text>
        {product.countInStock === 0 ? (
          <Button variant={'info'} disabled>
            <strong>Out of Stock</strong>
          </Button>
        ) : (
          <Button variant={'primary'} onClick={() => addToCartHandler(product)}>
            <strong>Add to Cart</strong>
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
