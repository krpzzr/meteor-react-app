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
