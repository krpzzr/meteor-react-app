import React from "react";

import * as _ from "lodash";

import "../../css/App.css";

import CreateCombination from './CreateCombination';
import CreateInstance from './CreateInstance';
import Instances from "./Instances";

class CombinationWrapper extends React.Component {

  state = {
    value: "",
  };

  onInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  currentName = () => {
    const {combination, condition} = this.props;

    if (combination.conditionID === condition.id && combination.type === "COMBINATION") {
      return "CREATE COMBINATIONS";
    } else if (combination.conditionID === condition.id && combination.type === "INSTANCE") {
      return "CREATE INSTANCE";
    } else {
      return "";
    }
  };

  render() {
    const {tableID, combination, attribute, condition, createInstance, hideCombination, createCombination} = this.props;
    return (

      <div
        className={`comb_wrapper ${attribute.name}-comb ${(combination.attributeID === attribute.id) ? 'comb_active' : ''}`}
      >
        {
          combination.attributeID === attribute.id ?
            <>
              {
                combination.type === "COMBINATION" ?
                  <CreateCombination
                    tableID={tableID}
                    combination={combination}
                    attribute={attribute}
                    condition={condition}
                    hideCombination={hideCombination}
                    createCombination={createCombination}
                  /> :
                  <CreateInstance
                    tableID={tableID}
                    combination={combination}
                    attribute={attribute}
                    condition={condition}
                    createInstance={createInstance}
                    hideCombination={hideCombination}
                  />
              }
            </> :
            <div className="comb_opacity">
              <Instances
                condition={condition}
              />
            </div>
        }
      </div>

    );
  }
}

export default CombinationWrapper;
