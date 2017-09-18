import React, {Component} from 'react';

export default class Summary extends Component {
  constructor(){
    super();
  }
  // componentWillReceiveProps(nextProps){

  // }
  render(){
    const {products, categories} = this.props;
    const noCatProds = products.filter(product => { return product.categoryId === null; });
    const expensiveProd = products.reduce((acc, currentProd) => {
          if (acc.price > currentProd.price){
            return acc;
          } else {
            return currentProd;
          }
       }, {price: 0});

    const notInStock = products.filter( product => {
      return product.inStock === false;
    });
    return (
      <div className="col-sm-3">
        <div className="panel panel-default">
          <div className="panel-heading">Product Summary</div>
          <div className="panel-body">
            <ul className="list-group">
              <li className="list-group-item">There are {products.length} products.</li>
              <li className="list-group-item">Categories:
                <ul>
                  {categories.map( category => {
                    return (
                      <li key={category.id}>{category.name} has {category.products.length} {category.products.length === 0 || category.products.length > 1 ? 'products' : 'product'}.</li>
                      );
                    })
                  }
                  <li >{noCatProds.length} {noCatProds.length === 0 || noCatProds.length > 1 ? 'products have' : 'product has'} no category.</li>
                </ul>
              </li>
              <li className="list-group-item">The most expensive product is {expensiveProd.name} at {expensiveProd.price}.</li>
              <li className="list-group-item">Products not in stock are {(notInStock.map( product => {
                return product.name;
                })
              ).join(', ')}.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
