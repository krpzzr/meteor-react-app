import React from "react";

import * as _ from "lodash";

import "../../css/App.css";

import Instances from "./Instances";

class CreateCombination extends React.Component {

  state = {
    value: "",
    conditionRows: [],
    currentConditionRow: "",
    currentConditionInstances: [],
    currentConditionInstance: "",
    choosenInstances: [],
    choosedIdentificatiors: [],
    refresh: false,
  };

  componentDidMount() {
    this.toFlatData();
    console.log("componentDidMount");
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {

    if (this.state.currentConditionRow !== prevState.currentConditionRow) {
      return this.state.currentConditionRow
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      // this.toFlatData(this.props.condition.subconditions);
      console.log('this.state.conditionRows', this.state.conditionRows)
      this.state.conditionRows.map(r => {
        if (r.id === this.state.currentConditionRow) {
          this.setState({
            currentConditionInstances: [...r.instances]
          });
          // r.subconditions.map(sub => {
          //   this.setState(prevState => ({
          //     currentConditionInstances: [
          //       ...prevState.currentConditionInstances,
          //       ...sub.instances
          //     ]
          //   }))
          // })
        }
      });
    }
  }

  toFlatData = () => {
    this.setState(prevState => ({
      conditionRows: [...this.props.condition.subconditions]
    }))
    // if (node.length) {
    //   node.map(item => {
    //
    //     this.setState(prevState => ({
    //       conditionRows: [
    //         ...prevState.conditionRows,
    //         _.assign({}, item, {level: curLevel}),
    //       ],
    //     }), () => {
    //       curLevel++;
    //
    //       if (item.subconditions && item.subconditions.length > 0) {
    //         this.toFlatData(item.subconditions, curLevel);
    //       }
    //
    //       curLevel--;
    //     });
    //   });
    // }
  };

  onInputChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  onConditionSelectChange = e => this.setState({
    currentConditionRow: e.target.value
  });

  onInstanceSelectChange = e => {
    let value = e.target.value;

    this.setState(prevState => ({
      currentConditionInstance: value,
      choosenInstances: [
        ...prevState.choosenInstances,
        value
      ]
    }));
  };

  render() {
    const {tableID, combination, attribute, condition, hideCombination, createCombination} = this.props;
    console.log("currentConditionInstances", this.state.currentConditionInstances);
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

        <label htmlFor="choose_row">Choose condition</label>
        <select
          name="choose_row"
          id="choose_row"
          onChange={this.onConditionSelectChange}
          value={this.state.currentConditionRow}
        >
          <>
            <option defaultValue>Choose condition</option>
            {
              this.state.conditionRows.map(row => {
                return (
                  <option
                    key={row.id}
                    value={row.id}
                  >
                    {row.name}
                  </option>
                );
              })
            }
          </>
        </select>

        <label htmlFor="choose_instance">Choose instance</label>
        <select
          name="choose_instance"
          id="choose_instance"
          onChange={this.onInstanceSelectChange}
          value={this.state.currentConditionInstance}
        >
          <>
            <option defaultValue>Choose instance</option>
            {
              this.state.currentConditionInstances.map(instance => {
                console.log('AAAA', instance)
                return (
                  <option
                    key={instance.id}
                    value={instance.id}
                  >
                    {instance.name}
                  </option>
                );
              })
            }
          </>
        </select>

        <button>+</button>

        <button
          className="add_comb_inst"
          onClick={() => createCombination(tableID, combination.attributeID, combination.conditionID, "COMBINATION 1", [
            {
              conditionID: "username_id",
              instanceID: "2jjky9",
            },
            {
              conditionID: "type_of_user_id2",
              instanceID: "dasmdas-mdas-lmd-asdmas6",
            },
          ])}>Create
        </button>

        <div className="clear"/>

        <div className="instances_wrapper">
          <Instances
            condition={condition}
          />
        </div>
      </div>
    );
  }
}

export default CreateCombination;
