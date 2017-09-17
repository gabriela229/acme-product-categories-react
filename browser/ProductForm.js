import React, {Component} from 'react';
import axios from 'axios';

export default class ProductFrom extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      price: '',
      inStock: true
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

  }
  onSubmit(event){
    const {name, price, inStock} = this.state;
    event.preventDefault();
    axios.post('/api/products/', {name, price, inStock})
    .then(res => {
      this.props.getProducts();
      this.setState({
        name: '',
        price: '',
        inStock: true
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
    const {name, price, inStock} = this.state;
    const {categories} = this.props;
    return (
      <div className="col-sm-3">
        <div className="panel panel-default">
          <div className="panel-heading">Add a Product</div>
          <div className="panel-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="">Name</label>
                <input className="form-control" name="name" type="text" onChange={onChange} value={name} />
              </div>
              <div className="form-group">
                <label htmlFor="">Price</label>
                <input className="form-control" name="price" type="text" onChange={onChange} value={price} />
              </div>
              <div className="form-group">
                <label htmlFor="">In Stock</label>
                <input className="form-control" name="inStock" type="checkbox" onChange={onChange} checked={inStock} />
              </div>
              <div className="form-group">
                <label htmlFor="">Category</label>
                <select className="form-control" name="categoryId" type="text" onChange={onChange} >
                  <option>--none--</option>
                  {categories.map( category => {
                    return (
                      <option key={category.id} value={category.id}>{category.name}</option>
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
