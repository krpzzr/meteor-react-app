import React from "react";

import * as _ from "lodash";

import "../../css/App.css";
import TableCell from "./TableCell";
import CombinationWrapper from "./CombinationWrapper";
import Dropdown from "./Dropdown";

class Table extends React.Component {

  state = {
    subconditionsShown: [],
    combination: {
      isShown: false,
      attributeID: null,
      conditionID: null,
      type: "",
    },
    dropdown: {
      id: null,
      isShown: false,
      data: [],
    },
  };

  sortCells = (condition, titles, arr = []) => {
    titles.map(title => {
      return condition.testCaseValues.map(cell => {

        if (title.id === cell.titleID) {
          arr.push(_.assign({}, cell));
        }

      });
    });

    condition.instances.forEach(instance => {
      arr.forEach(cell => {

        if (instance.id === cell.instanceID) {
          cell.name = instance.name;
        }
      });
    });

    arr.forEach(cell => {
      if (!cell.name) {
        cell.name = "";
      }
    });

    return arr;
  };

  toFlatData = (node, result = [], curLevel = 0) => {
    if (node.length) {
      node.map(item => {
        result.push(_.assign({}, item, {level: curLevel}));
        curLevel++;

        if (item.subconditions && item.subconditions.length > 0) {
          this.toFlatData(item.subconditions, result, curLevel);
        } else if (item.subconditions && item.subconditions.length === 0) {
        }

        curLevel--;
      });
    }

    return result;
  };

  subconditionShow = (e, condition) => {
    e.stopPropagation();

    let include = false;

    this.toFlatData(condition.subconditions).forEach(subcondition => {
      if (this.state.subconditionsShown.includes(subcondition.id)) {
        this.setState(prevState => ({
          subconditionsShown: prevState.subconditionsShown.filter(id => id !== subcondition.id),
        }));

        if (this.state.combination.conditionID === subcondition.id) {
          this.setState({
            combination: {
              isShown: false,
              attributeID: null,
              conditionID: null,
              type: "",
            }
          });
        }

        include = true;
      }
    });

    if (include) {
      return;
    }

    condition.subconditions.forEach(subcondition => {
      this.setState(prevState => ({
        subconditionsShown: [
          ...prevState.subconditionsShown,
          subcondition.id,
        ],
      }));

    });

  };

  showCombinations = (e, attributeID, conditionID, condition) => {
    e.stopPropagation();

    let type = condition.subconditions.length > 0 ? "COMBINATION" : "INSTANCE";

    this.setState({
      combination: {
        isShown: true,
        attributeID,
        conditionID,
        type,
      },
    });
  };

  showDropdown = (e, attribute, condition, cell) => {
    e.stopPropagation();

    this.setState({
      dropdown: {
        id: cell.id,
        isShown: true,
        data: condition.instances,
      },
    });
  };

  hideDropdown = () => {
    this.setState({
      dropdown: {
        id: null,
        isShown: false,
        data: [],
      },
    });
  };

  updateCell = (e, tableID, conditionID, instance, cellID) => {
    e.stopPropagation();

    this.props.updateCell(tableID, conditionID, instance, cellID);
    this.hideDropdown();
  };

  hideCombination = () => {
    this.setState({
      combination: {
        isShown: false,
        attributeID: null,
        conditionID: null,
        type: "",
      },
    });
  };

  render() {
    const {
      table, titleEditInputs, onChangeInputTitile,
      editTitle, addColumn,
    } = this.props;

    const {combination, subconditionsShown} = this.state;

    return (

      <React.Fragment>

        <div
          className={`table_headers ${combination.isShown ? "inst_comb-isOpen" : ""}`}>
          <div className="empty_header-1 header"></div>
          <div className="empty_header-2 header"></div>
          {
            table.testCaseNames.map(title => {
              return (
                <div
                  className="header"
                  key={title.id}
                  title={title.name}
                  onClick={(e) => editTitle(e, title, table._id)}
                >

                  {
                    _.find(titleEditInputs, {id: title.id}) ?
                      <textarea
                        type="text"
                        autoFocus
                        style={{resize: "none"}}
                        className="header_input"
                        onChange={(e) => onChangeInputTitile(e, title)}
                        value={_.get(_.find(titleEditInputs, {id: title.id}), "name").toUpperCase()}/> :
                      <p>{title.name.length > 28 ? `${title.name.substring(0, 28)}...` : `${title.name}`}</p>
                  }
                </div>
              );
            })
          }

          <div className="header">
                <span
                  style={{cursor: "pointer"}}
                  onClick={addColumn}
                >
                  <svg
                    style={{
                      width: 30,
                      height: 30,
                    }}
                    viewBox="0 0 24 24">
                  <path
                    fill="#000000"
                    d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"
                  />
                </svg>
                </span>
          </div>

        </div>

        {
          table.attributes.map(attribute => {
            return (
              <div
                className={`gwt_row ${combination.isShown ? "inst_comb-isOpen" : ""}`}
                style={{
                  minHeight: (combination.isShown && combination.attributeID === attribute.id) ? 392 : 76,
                }}
                key={attribute.id}>
                <div className={`gwt gwt-${attribute.name}`}>
                  <p className="behaviourName">{attribute.name}</p>
                </div>
                <div className="attr-cells_wrapper">

                  {
                    this.toFlatData(attribute.conditions).map(condition => {
                      return (
                        <React.Fragment key={condition.id}>
                          {

                            (condition.level === 0 || subconditionsShown.includes(condition.id)) &&

                            <div
                              className="attr-cells_row"
                              style={{
                                position: combination.isShown && combination.conditionID === condition.id ? "static" : "relative",
                              }}
                            >
                              <div
                                className={`attr attr-${attribute.name}`}
                                onClick={(e) => this.subconditionShow(e, condition)}
                                title={condition.name}
                              >
                                <p style={{paddingLeft: condition.level * 33}}>
                                  {condition.name.length > 111 ? `${condition.name.substring(0, 111)}...` : `${condition.name}`}
                                  {
                                    condition.subconditions.length > 0 &&
                                    <i
                                      className={`condition_arrow ${subconditionsShown.includes(condition.subconditions[0].id) ? "condition_arrow_up" : "condition_arrow_down"}`}
                                    />
                                  }
                                </p>

                                <span
                                  className="open-inst_comb"
                                  onClick={(e) => this.showCombinations(e, attribute.id, condition.id, condition)}
                                >
                                  <svg
                                    style={{
                                      width: 21,
                                      height: 21,
                                    }}
                                    viewBox="0 0 55.25 55.25"
                                  >
                                    <path
                                      d="M52.618,2.631c-3.51-3.508-9.219-3.508-12.729,0L3.827,38.693C3.81,38.71,3.8,38.731,3.785,38.749  c-0.021,0.024-0.039,0.05-0.058,0.076c-0.053,0.074-0.094,0.153-0.125,0.239c-0.009,0.026-0.022,0.049-0.029,0.075  c-0.003,0.01-0.009,0.02-0.012,0.03l-3.535,14.85c-0.016,0.067-0.02,0.135-0.022,0.202C0.004,54.234,0,54.246,0,54.259  c0.001,0.114,0.026,0.225,0.065,0.332c0.009,0.025,0.019,0.047,0.03,0.071c0.049,0.107,0.11,0.21,0.196,0.296  c0.095,0.095,0.207,0.168,0.328,0.218c0.121,0.05,0.25,0.075,0.379,0.075c0.077,0,0.155-0.009,0.231-0.027l14.85-3.535  c0.027-0.006,0.051-0.021,0.077-0.03c0.034-0.011,0.066-0.024,0.099-0.039c0.072-0.033,0.139-0.074,0.201-0.123  c0.024-0.019,0.049-0.033,0.072-0.054c0.008-0.008,0.018-0.012,0.026-0.02l36.063-36.063C56.127,11.85,56.127,6.14,52.618,2.631z   M51.204,4.045c2.488,2.489,2.7,6.397,0.65,9.137l-9.787-9.787C44.808,1.345,48.716,1.557,51.204,4.045z M46.254,18.895l-9.9-9.9  l1.414-1.414l9.9,9.9L46.254,18.895z M4.961,50.288c-0.391-0.391-1.023-0.391-1.414,0L2.79,51.045l2.554-10.728l4.422-0.491  l-0.569,5.122c-0.004,0.038,0.01,0.073,0.01,0.11c0,0.038-0.014,0.072-0.01,0.11c0.004,0.033,0.021,0.06,0.028,0.092  c0.012,0.058,0.029,0.111,0.05,0.165c0.026,0.065,0.057,0.124,0.095,0.181c0.031,0.046,0.062,0.087,0.1,0.127  c0.048,0.051,0.1,0.094,0.157,0.134c0.045,0.031,0.088,0.06,0.138,0.084C9.831,45.982,9.9,46,9.972,46.017  c0.038,0.009,0.069,0.03,0.108,0.035c0.036,0.004,0.072,0.006,0.109,0.006c0,0,0.001,0,0.001,0c0,0,0.001,0,0.001,0h0.001  c0,0,0.001,0,0.001,0c0.036,0,0.073-0.002,0.109-0.006l5.122-0.569l-0.491,4.422L4.204,52.459l0.757-0.757  C5.351,51.312,5.351,50.679,4.961,50.288z M17.511,44.809L39.889,22.43c0.391-0.391,0.391-1.023,0-1.414s-1.023-0.391-1.414,0  L16.097,43.395l-4.773,0.53l0.53-4.773l22.38-22.378c0.391-0.391,0.391-1.023,0-1.414s-1.023-0.391-1.414,0L10.44,37.738  l-3.183,0.354L34.94,10.409l9.9,9.9L17.157,47.992L17.511,44.809z M49.082,16.067l-9.9-9.9l1.415-1.415l9.9,9.9L49.082,16.067z"/>
                                  </svg>
                                </span>
                                {
                                  (combination.isShown && combination.attributeID === attribute.id) &&
                                  (
                                    ((condition.level === 0) && (combination.conditionID === condition.id)) ||
                                    (combination.conditionID === condition.id) ||
                                    (combination.attributeID !== attribute.id)
                                  ) &&
                                  <span className="comb_arrow"/>
                                }
                              </div>


                              {
                                combination.isShown &&
                                (
                                  ((condition.level === 0) && (combination.conditionID === condition.id)) ||
                                  (combination.conditionID === condition.id) ||
                                  (combination.attributeID !== attribute.id)
                                ) &&
                                <CombinationWrapper
                                  tableID={table._id}
                                  combination={combination}
                                  attribute={attribute}
                                  condition={condition}
                                  hideCombination={this.hideCombination}
                                  createInstance={this.props.createInstance}
                                  createCombination={this.props.createCombination}
                                  editCombination={this.props.editCombination}
                                  deleteCombination={this.props.deleteCombination}
                                />
                              }

                              {
                                this.sortCells(condition, table.testCaseNames).map(cell => {
                                  return (
                                    <div
                                      key={cell.id}
                                      className={`cells cells-${attribute.name}`}
                                      onClick={(e) => this.showDropdown(e, attribute, condition, cell)}
                                      title={cell.name}
                                    >
                                      <p>
                                        {(cell.name && cell.name.length > 0) ? (
                                            cell.name.length > 48 ? `${cell.name.substring(0, 48)}...` : `${cell.name}`
                                          ) :
                                          <span>+</span>}
                                      </p>

                                      {
                                        this.state.dropdown.id === cell.id && this.state.dropdown.isShown &&
                                        <Dropdown
                                          updateCell={this.updateCell}
                                          hideDropdown={this.hideDropdown}
                                          cell={cell}
                                          tableID={table._id}
                                          conditionID={condition.id}
                                          dropdown={this.state.dropdown}
                                        />

                                      }
                                    </div>
                                  );
                                })
                              }
                              <div className="cells">
                                <span>+</span>
                              </div>
                            </div>

                          }
                        </React.Fragment>
                      );
                    })
                  }
                </div>
              </div>
            );
          })
        }
      </React.Fragment>

    );
  }
}

export default Table;
