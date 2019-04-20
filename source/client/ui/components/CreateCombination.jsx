import React from "react";

import * as _ from "lodash";

import "../../css/App.css";

import Instances from "./Instances";

class CreateCombination extends React.Component {

  state = {
    value: "",
    availableConditions: [],
    selects: [
      {
        conditionID: "",
        conditionName: "",
        instanceID: "",
        instanceName: "",
        instances: [],
      }
    ],
    instanceID: ""
  };

  componentDidMount() {
    this.setState({availableConditions: [...this.props.condition.subconditions]});
  }

  onEditCombination = (instance) => {
    this.setState({
      instanceID: instance.id,
      selects: instance.subInstances,
      value: instance.name
    });
  };

  editCombination = () => {
    this.props.editCombination(
      this.props.tableID,
      this.props.attribute.id,
      this.props.condition.id,
      this.state.instanceID,
      this.state.value,
      this.state.selects
    )
  };

  onInputChange = (e) => {
    this.setState({value: e.target.value});
  };

  onSelectChange = (e, idx, name) => {
    let selects = [...this.state.selects];
    let availableConditions = [...this.state.availableConditions];

    selects[idx][name] = e.target.value;

    if (name === "conditionID") {
      availableConditions.map(i => {
        if (i.id === e.target.value) {
          selects[idx].conditionName = i.name;
          selects[idx].instanceName = "";
          selects[idx].instanceID = "";
          selects[idx].instances = i.instances;
        }
      });
    }
    if (name === "instanceID") {
      selects[idx].instances.map(instance => {
        if (instance.id === e.target.value) {
          selects[idx].instanceName = instance.name;
        }
      });
    }

    this.setState({
      selects,
    });
  };

  addSelect = () => {
    this.setState(prevState => ({
      selects: [
        ...prevState.selects,
        {
          conditionID: "",
          conditionName: "",
          instanceID: "",
          instanceName: "",
          instances: [],
        }
      ]
    }))
  };

  deleteSelect = (idx) => {
    let selects = [...this.state.selects];

    selects.splice(idx, 1);

    this.setState({
      selects
    })
  };

  render() {
    const {tableID, combination, attribute, condition, hideCombination, createCombination} = this.props;
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
        <div className="comb_title">CREATE COMBINATIONS</div>
        <div className="comb_input_wrapper">

          <input
            value={this.state.value}
            onChange={this.onInputChange}
            placeholder="NAME"
            type="text"
          />
        </div>

        {
          this.state.selects.map((select, idx) => {
            return (
              <div key={idx}>
                {
                  <>
                    <select name="" id=""
                            onChange={(e) => this.onSelectChange(e, idx, "conditionID")}
                            value={select.conditionID}>
                      <option value={select.conditionID}>{select.conditionName}</option>

                      {
                        this.state.availableConditions.map(condition => {
                          if (!_.find(this.state.selects, {conditionID: condition.id})) {
                            return <option key={condition.id}
                                           value={condition.id}>{condition.name}</option>;
                          }
                        })
                      }
                    </select>

                    <select name="" id=""
                            onChange={(e) => this.onSelectChange(e, idx, "instanceID")}
                            value={select.instanceID}>
                      <option value={select.instanceID}>{select.instanceName}</option>

                      {
                        select.instances.map(instance => {
                          if (!_.find(this.state.selects, {instanceID: instance.id})) {
                            return <option key={instance.id}
                                           value={instance.id}>{instance.name}</option>;
                          }
                        })
                      }
                    </select>

                    <button onClick={() => this.deleteSelect(idx)}>Delete</button>
                  </>
                }
              </div>
            );
          })
        }

        <button onClick={this.addSelect}>Create new row</button>


        <button
          className="add_comb_inst"
          onClick={() => createCombination(tableID, combination.attributeID, combination.conditionID, this.state.value, this.state.selects)}>Create
        </button>
        <button
          className="add_comb_inst"
          onClick={this.editCombination}>Edit
        </button>

        <div className="clear"/>

        <div className="instances_wrapper">
          <Instances
            condition={condition}
            onEditCombination={this.onEditCombination}
          />
        </div>
      </div>
    );
  }
}

export default CreateCombination;