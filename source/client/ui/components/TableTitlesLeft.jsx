import React from "react";

import * as _ from "lodash";

import "../../css/App.css";
import TableCell from "./TableCell";

class TableTitlesLeft extends React.Component {

  state = {
    subconditionsShown: [],
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

        if (item.subconditions && item.subconditions.length > 0) {
          this.toFlatData(item.subconditions, result, curLevel);
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
          subcondition.id
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

  render() {
    const {table, cellEditInputs, editCell, onChangeInputCell, cellCreateInputs, onChangeInputCreateCell, createCell} = this.props;

    return (

      <React.Fragment>

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
                            <th
                              onClick={(e) => this.subconditionShow(e, condition)}
                              className={`cell ${attribute.name}-cell-prop`}
                              scope="row"
                              style={{paddingLeft: condition.level * 33}}>
                              <p>{condition.name}</p>
                            </th>
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
