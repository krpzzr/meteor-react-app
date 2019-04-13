import React from "react";

import * as _ from "lodash";

import "../../css/App.css";

class CombinationWrapper extends React.Component {

  render() {
    const {combination, attribute, condition} = this.props;
    return (

      <div
        className="comb_wrapper"
        style={{height: (combination.attributeID === attribute.id) ? 392 : 76}}
      >123</div>

    );
  }
}

export default CombinationWrapper;
