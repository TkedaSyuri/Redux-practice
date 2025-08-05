import PropTypes from "prop-types";
import {useDispatch } from "react-redux";
import { removeItem ,increase,decrease} from "../features/cart/CartSlice";


const CartItem = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch()
  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">{price}円</h4>
        <button className="remove-btn" onClick={()=>dispatch(removeItem(id))}>削除</button>
      </div>
      <div>
        <button className="amount-btn" onClick={()=>dispatch(increase(id))}>+</button>
        <p className="amount">{amount}</p>
        <button className="amount-btn" onClick={()=>{
          if(amount === 1 ) {
            dispatch(removeItem(id));
            return;
          }
          dispatch(decrease(id))
        }}>-</button>
      </div>
    </article>
  );
};

CartItem.propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  amount: PropTypes.number.isRequired,
};

export default CartItem;
