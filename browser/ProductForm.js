import React, {Component} from 'react';
import axios from 'axios';

export default class ProductFrom extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      price: '',
      inStock: true,
      categoryId: 0
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

  }
  onSubmit(event){
    const {name, price, inStock, categoryId} = this.state;
    event.preventDefault();
    axios.post('/api/products/', {name, price, inStock, categoryId})
    .then(() => {
      this.props.getProducts();
      this.setState({
        name: '',
        price: '',
        inStock: true,
        categoryId: 0
    });
    });
  }
  onChange(event){
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({[name]: value});
  }
  render() {
    const {onSubmit, onChange} = this;
    const {name, price, inStock, categoryId} = this.state;
    const {categories} = this.props;
    return (
      <div className="col-sm-3">
        <div className="panel panel-default">
          <div className="panel-heading">Add a Product</div>
          <div className="panel-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="">Name</label>
                <input className="form-control" name="name" type="text" onChange={onChange} data-value={name} value={name} />
              </div>
              <div className="form-group">
                <label htmlFor="">Price</label>
                <input className="form-control" name="price" type="text" onChange={onChange} data-value={price} value={price} />
              </div>
              <div className="form-group">
                <label htmlFor="">In Stock</label>
                <input className="form-control" name="inStock" type="checkbox" onChange={onChange} checked={inStock} />
              </div>
              <div className="form-group">
                <label htmlFor="">Category</label>
                <select value={categoryId} className="form-control" name="categoryId" type="text" onChange={onChange} >
                  <option>--none--</option>
                  {categories.map( category => {
                    return (
                      <option key={category.id} data-value={category} value={category.id}>{category.name}</option>
                    );
                  })}
                </select>
              </div>
            <button className="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>

    );
  }


}
