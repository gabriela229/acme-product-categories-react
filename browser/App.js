import React, {Component} from 'react';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import Summary from './Summary';
import axios from 'axios';


export default class App extends Component {
  constructor(){
    super();
    this.state = {
      products: [],
      categories: []
    };
    this.getProducts = this.getProducts.bind(this);
    this.getCategories = this.getCategories.bind(this);
  }
  getProducts(){
    axios.get('/api/products')
    .then(res => res.data)
    .then( products => {
      this.setState({products});
    });
  }
  getCategories(){
    axios.get('/api/categories')
    .then(res => res.data)
    .then( categories => {
      this.setState({categories});
    });
  }
  componentDidMount(){
    this.getProducts();
    this.getCategories();
  }
  render() {
    const {products, categories} = this.state;
    const {getProducts, getCategories} = this;
    return (
      <div className="container">
        <h1>Acme Product/Categories React</h1>
        <div className="row">
          <ProductList products={products} getProducts={getProducts} categories={categories} getCategories={getCategories} />
          <ProductForm getProducts={getProducts} getCategories={getCategories} categories={categories} />
          <Summary products={products} getProducts={getProducts} categories={categories} />
        </div>
      </div>
    );
  }
}
