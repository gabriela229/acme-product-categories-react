import React, {Component} from 'react';
import axios from 'axios';

export default class ProductList extends Component {
  constructor(){
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  deleteProduct(id){
    axios.delete(`/api/products/${id}`);
  }

  onSubmit(event){
    event.preventDefault();
  }
  onClick(event){
    this.deleteProduct(event.target.value);
    this.props.getProducts();
  }
  render (){
    const {products} = this.props;
    const {onSubmit, onClick} = this;
    return (
      <div className="col-sm-6">
        <ul>
        {products.map(product => {
          return (
            <form key={product.id} onSubmit={onSubmit}>
              <li>{product.name}<button onClick={onClick} value={product.id}>Delete</button></li>
            </form>
          );
        })}
        </ul>
      </div>
    );
  }
}
