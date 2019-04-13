import React from "react";

import * as _ from "lodash";

import "../../css/App.css";

class CombinationWrapper extends React.Component {

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
    const {combination, attribute, condition} = this.props;
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
          <input type="text"/>
        </div>
      </div>

    );
  }
}

export default CombinationWrapper;
