import React, {Component} from 'react';
import axios from 'axios';

export default class ProductList extends Component {
  constructor(){
    super();
    this.state = {
      products: [],
      errorMsg: '',
      edited: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
  }

  deleteProduct(id){
    axios.delete(`/api/products/${id}`)
    .then( () => {
      this.props.getProducts();
    });
  }
  updateProduct(id, product){
    axios.put(`api/products/${id}`, product)
    .then( () => {
      this.props.getProducts();
      this.props.getCategories();
    })
    .catch(error => {
      const errorMsg = error.response.data.errors[0].message;
      this.setState({errorMsg});
    });
  }
  onSubmit(event){
    event.preventDefault();
  }
  componentWillMount(){
    const products = this.props.products;
    this.setState({products});
  }
  componentWillReceiveProps(nextProps){
    const products = nextProps.products;
    this.setState({products});
  }
  onClick(event){
    event.preventDefault();
    const target = event.target;
    const products = this.state.products;
    event.target.name === 'delete' ? this.deleteProduct(target.value) : this.updateProduct(target.value, products[target.value - 1]);
  }
  onChange(event){
    const target = event.target;
    const products = this.state.products;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const changeProducts = products.map( product => {
      if (product.id === target.id * 1){
        target.name === 'price' || target.name === 'categoryId' ? product[target.name] = value * 1 : product[target.name] = value;
      }
      return product;
    });
    this.setState({products: changeProducts, edited: true});
  }
  render (){
    const {categories} = this.props;
    const {products, errorMsg, edited} = this.state;
    const {onSubmit, onClick, onChange} = this;
    return (
      <div className="col-sm-6">
        <div>
        {products.map(product => {
          return (
            <div key={product.id} className="col-sm-4">
              <div className="panel panel-default">
                <div className="panel-body">
                  <form onSubmit={onSubmit}>
                    {errorMsg.length > 0 ? <div className="alert alert-danger">{errorMsg}</div> : <div />}
                    <div className="form-group">
                      <label htmlFor="">Name</label>
                      <input id={product.id} className="form-control" name="name" type="text" onChange={onChange} data-value={product.name} value={product.name} />
                    </div>
                     <div className="form-group">
                      <label htmlFor="">Price</label>
                      <input id={product.id} className="form-control" name="price" type="number" onChange={onChange} value={product.price} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">In Stock</label>
                      <input id={product.id} className="form-control" name="inStock" type="checkbox" onChange={onChange} checked={product.inStock} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Category</label>
                      <select id={product.id} value={product.categoryId || 0} className="form-control" name="categoryId" type="number" onChange={onChange} >
                        <option value="0">--none--</option>
                        {categories.map( category => {
                          return (
                            <option key={category.id} data-value={category} value={category.id}>{category.name}</option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-group">
                      <button disabled={!edited} name="save" className="btn btn-primary btn-block" onClick={onClick} value={product.id} >Save</button>
                      <button name="delete" className="btn btn-danger btn-block" onClick={onClick} value={product.id}>Delete</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    );
  }
}
