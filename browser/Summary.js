import React, {Component} from 'react';

export default class Summary extends Component {
  constructor(){
    super();
  }
  render(){
    return (
      <div className="col-sm-3">
        <div className="panel panel-default">
          <div className="panel-heading">Product Summary</div>
          <div className="panel-body">
            <ul className="list-group">
              <li className="list-item">Test</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
