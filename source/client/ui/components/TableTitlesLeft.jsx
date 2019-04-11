import React from "react";

import * as _ from "lodash";

import "../../css/App.css";
import TableCell from "./TableCell";

class TableTitlesLeft extends React.Component {

  state = {
    subconditionsShown: [],
    currentCombinations: [],
  };

  sortCells = (cells, titles) => {
    let arr = [];

    titles.map(title => {
      return cells.map(cell => {

        if (title.id === cell.titleID) {
          arr.push(cell);
        }

      });
    });

    return arr;
  };

  toFlatData = (node, result = [], curLevel = 0) => {
    if (node.length) {
      node.forEach(item => {
        result.push(item);
        item.level = curLevel;
        curLevel++;
        item.last = false;

        if (item.subconditions && item.subconditions.length > 0) {
          item.last = false;
          this.toFlatData(item.subconditions, result, curLevel);
        } else if (item.subconditions && item.subconditions.length === 0) {
          item.last = true;
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

  count = (conditions) => {
    let count = 0;
    this.toFlatData(conditions).forEach(condition => {
      if (this.state.subconditionsShown.includes(condition.id)) {
        count++;
      }
    });

    return count;
  };

  editButtonColor = (attributeName) => {
    if (attributeName === "GIVEN") {
      return "#4F287B";
    }
    if (attributeName === "WHEN") {
      return "#E85755";
    }
    if (attributeName === "THEN") {
      return "#3EB775";
    }
  };

  showCombinations = (e, attributeID, conitionID) => {
    e.stopPropagation();

    this.setState(prevState => ({
      currentCombinations: [
        ...prevState.currentCombinations,
        conitionID,
      ],
    }));
  };

  render() {
    const {
      table, cellEditInputs, editCell, onChangeInputCell, cellCreateInputs,
      onChangeInputCreateCell, createCell, titleEditInputs, onChangeInputTitile,
      editTitle, addColumn,
    } = this.props;

    return (

      <React.Fragment>

        <div className="table">
          <div className="table_headers">
            <div className="empty_header-1 header"></div>
            <div className="empty_header-2 header"></div>
            {/*<div className={"header comb"}></div>*/}
              <div className="header">STRAIGHT THROUGH</div>
          </div>

          <div className="gwt_row">
            <div className="gwt_wrapper">
              <div>GIVEN</div>
            </div>

            <div className="attr-cells_wrapper">
              <div className="attr-cells_row">
                <div className="attr">
                  USERNAME
                </div>

                <div className="comb_inst_wrapper"></div>

                <div className="flex_wrap">
                  <div className="cells">
                    VISA
                  </div>
                </div>

              </div>

              <div className="attr-cells_row">
                <div className="attr">
                  PASSWORD
                </div>

                <div className="comb_inst_wrapper"></div>

                <div className="flex_wrap">
                  <div className="cells">
                    VISA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <tr>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
          {
            this.state.currentCombinations.length > 0 &&
            <td>&nbsp;</td>
          }
          {
            table.testCaseNames.map(title => {
              return (
                <th
                  key={title.id}
                  valign="bottom"
                  className="table-title"
                  scope="col"
                  onClick={(e) => editTitle(e, title, table._id)}
                >
                  {
                    _.find(titleEditInputs, {id: title.id}) ?
                      <textarea
                        type="text"
                        autoFocus
                        style={{resize: "none"}}
                        className="cell_input"
                        onChange={(e) => onChangeInputTitile(e, title)}
                        value={_.get(_.find(titleEditInputs, {id: title.id}), "name").toUpperCase()}/> :
                      <p>
                        {
                          title.name && title.name.length > 0 ? title.name.toUpperCase() :
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
                        }
                      </p>
                  }
                </th>
              );
            })
          }
          <th
            valign="bottom"
            className="table-title"
          >
            {
              <p>
                <span
                  onClick={addColumn}
                  style={{cursor: "pointer"}}
                >
                  <svg style={{
                    width: 30,
                    height: 30,
                  }} viewBox="0 0 24 24">

                    <path
                      fill="#000000"
                      d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"
                    />

                  </svg>
                </span>
              </p>
            }
          </th>
        </tr>

        {
          table.attributes.map(attribute => {
            return (
              <React.Fragment key={attribute.id}>
                <tr>
                  <td className={`cell cell-given_when_then ${attribute.name}-cell`}
                      scope="rowgroup"
                      rowSpan={attribute.conditions.length + 1 + this.count(attribute.conditions)}>
                    <p className="behaviourName">{attribute.name}</p>
                  </td>
                </tr>
                {

                  this.toFlatData(attribute.conditions).map(condition => {
                    return (
                      <React.Fragment key={condition.id}>

                        {
                          (condition.level === 0 || this.state.subconditionsShown.includes(condition.id)) &&
                          <tr>
                            <td
                              onClick={(e) => this.subconditionShow(e, condition)}
                              className={`cell ${attribute.name}-cell-prop`}
                              scope="row"
                              style={{paddingLeft: condition.level * 33}}>
                              <div>
                                {/*<div*/}
                                {/*style={{*/}
                                {/*borderWidth: `0 45px ${this.thElement ? this.thElement.clientHeight : 0}px ${(condition.last ? 0 : condition.level - 1) * 26}px`,*/}
                                {/*borderColor: `#fff ${condition.last ? "#fff" : "transparent"} #fff #fff`*/}
                                {/*}}*/}
                                {/*className={condition.level > 0 ? "triangle" : ""}*/}
                                {/*></div>*/}
                                <p>
                                  {condition.name}
                                  {
                                    condition.subconditions.length > 0 &&
                                    <i
                                      className={`condition_arrow ${this.state.subconditionsShown.includes(condition.subconditions[0].id) ? "condition_arrow_up" : "condition_arrow_down"}`}></i>
                                  }
                                </p>
                                <button
                                  className="edit_button"
                                  onClick={(e) => this.showCombinations(e, attribute.id, condition.id)}
                                >
                                  <svg style={{
                                    width: 24,
                                    height: 24,
                                  }} viewBox="0 0 24 24">
                                    <path fill={this.editButtonColor(attribute.name)}
                                          d="M16.84,2.73C16.45,2.73 16.07,2.88 15.77,3.17L13.65,5.29L18.95,10.6L21.07,8.5C21.67,7.89 21.67,6.94 21.07,6.36L17.9,3.17C17.6,2.88 17.22,2.73 16.84,2.73M12.94,6L4.84,14.11L7.4,14.39L7.58,16.68L9.86,16.85L10.15,19.41L18.25,11.3M4.25,15.04L2.5,21.73L9.2,19.94L8.96,17.78L6.65,17.61L6.47,15.29"/>
                                  </svg>
                                </button>
                              </div>
                            </td>

                            {
                              condition.level === 0 && (attribute.conditions[0].id === condition.id) && this.state.currentCombinations.length > 0 &&
                              <td className={`combination_wrapper`}
                                  scope="rowgroup"
                                  rowSpan={attribute.conditions.length + 1 + this.count(attribute.conditions)}>
                                <div className="combination_create_wrapper">123</div>
                              </td>
                            }

                            <TableCell
                              systemBehaviourName={attribute.name}
                              condition={condition}
                              table={table}
                              cellEditInputs={cellEditInputs}
                              editCell={editCell}
                              onChangeInputCell={onChangeInputCell}
                              cellCreateInputs={cellCreateInputs}
                              onChangeInputCreateCell={onChangeInputCreateCell}
                              createCell={createCell}
                            />
                          </tr>
                        }

                      </React.Fragment>
                    );
                  })
                }
                <tr style={{height: 7}}>
                  <td></td>
                </tr>



              </React.Fragment>
            );
          })
        }

      </React.Fragment>

    );
  }
}

export default TableTitlesLeft;
