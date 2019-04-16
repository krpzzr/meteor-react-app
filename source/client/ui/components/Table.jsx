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
      if (!cell.name) cell.name = '';
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
      table, cellEditInputs, onChangeInputCell, cellCreateInputs,
      onChangeInputCreateCell, createCell, titleEditInputs, onChangeInputTitile,
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
                                  <svg style={{
                                    width: 24,
                                    height: 24,
                                  }} viewBox="0 0 24 24">
                                    <path
                                      d="M16.84,2.73C16.45,2.73 16.07,2.88 15.77,3.17L13.65,5.29L18.95,10.6L21.07,8.5C21.67,7.89 21.67,6.94 21.07,6.36L17.9,3.17C17.6,2.88 17.22,2.73 16.84,2.73M12.94,6L4.84,14.11L7.4,14.39L7.58,16.68L9.86,16.85L10.15,19.41L18.25,11.3M4.25,15.04L2.5,21.73L9.2,19.94L8.96,17.78L6.65,17.61L6.47,15.29"/>
                                  </svg>
                                </span>
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
