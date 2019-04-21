import React from "react";

import * as _ from "lodash";

import "../../css/App.css";

import Instances from "./Instances";

class CreateInstance extends React.Component {

  state = {
    value: "",
    isEditing: false,
    isCreating: true,
  };

  onInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  onEditCombination = (instance) => {
    this.setState({
      instanceID: instance.id,
      value: instance.name,
    });
  };

  editCombination = () => {
    this.props.editCombination(
      this.props.tableID,
      this.props.attribute.id,
      this.props.condition.id,
      this.state.instanceID,
      this.state.value,
      [],
    );

    this.setState({
      value: "",
      isEditing: false,
      isCreating: true,
    });
  };

  deleteCombination = (instanceID) => {
    this.props.deleteCombination(
      this.props.tableID,
      this.props.attribute.id,
      this.props.condition.id,
      instanceID,
    );
  };

  createInstance = () => {
    this.props.createInstance(
      this.props.tableID,
      this.props.combination.attributeID,
      this.props.combination.conditionID,
      this.state.value,
    );

    this.setState({
      value: "",
    });
  };

  render() {
    const {tableID, combination, attribute, condition, createInstance, hideCombination} = this.props;
    return (

      <div>
        <button
          className="hide_comb"
          onClick={hideCombination}
        >
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
               xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
               viewBox="0 0 47.971 47.971"
               style={{
                 enableBackground: "new 0 0 47.971 47.971",
                 width: 11,
                 height: 11,
               }}
               xmlSpace="preserve">
            <path
              d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
                              c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
                              C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
                              s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"/>

          </svg>
        </button>
        <div className="comb_title">CREATE INSTANCE</div>

        <div className="comb_input_wrapper">
          <input
            value={this.state.value}
            onChange={this.onInputChange}
            placeholder="NAME"
            type="text"
          />
        </div>

        {
          this.state.isEditing &&
          <button
            className="add_comb_inst"
            onClick={this.editCombination}>Edit instance
          </button>
        }
        {
          this.state.isCreating &&
          <button
            className="add_comb_inst"
            onClick={this.createInstance}>Create instance
          </button>
        }


        <div className="clear"/>

        <div className="instances_wrapper">
          <Instances
            condition={condition}
            onEditCombination={this.onEditCombination}
            deleteCombination={this.deleteCombination}
          />
        </div>
      </div>

    );
  }
}

export default CreateInstance;
