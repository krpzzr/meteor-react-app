import React from "react";

import * as _ from "lodash";

import "../../css/App.css";

class CombinationWrapper extends React.Component {

  state = {
    value: ''
  };

  onInputChange = (e) => {
    this.setState({
      value: e.target.value
    });
  };

  currentName = () => {
    const {combination, condition} = this.props;

    if (combination.conditionID === condition.id && combination.type === 'COMBINATION') {
      return 'CREATE COMBINATIONS';
    } else if (combination.conditionID === condition.id && combination.type === 'INSTANCE') {
      return 'CREATE INSTANCE'
    } else {
      return '';
    }
  };

  render() {
    const {tableID, combination, attribute, condition, createInstance, hideCombination} = this.props;
    return (

      <div
        className="comb_wrapper"
        style={{height: (combination.attributeID === attribute.id) ? 392 : 76}}
      >
        <div className="comb_title">
          {
            this.currentName()
          }
        </div>

        <div className="comb_input_wrapper">
          <input
            value={this.state.value}
            onChange={this.onInputChange}
            type="text"
          />
        </div>
        <button onClick={() => createInstance(tableID, combination.attributeID, combination.conditionID, this.state.value)}>Add</button>
        <button onClick={hideCombination}>Hide</button>
      </div>

    );
  }
}

export default CombinationWrapper;
