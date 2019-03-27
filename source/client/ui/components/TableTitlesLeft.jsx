import React from "react";

import * as _ from "lodash";

import "../../css/App.css";
import TableCell from "./TableCell";

class TableTitlesLeft extends React.Component {

  state: {
    result: []
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
          this.toFlatData(item.subconditions, result, curLevel)
        }
        curLevel--
      })
    }
    console.log(result)
    return result;
  };

  render() {
    const {table, cellEditInputs, editCell, onChangeInputCell, cellCreateInputs, onChangeInputCreateCell, createCell} = this.props;
    console.log(this.result);
    return (

      <React.Fragment>

        {
          table.attributes.map(attribute => {
            return (
              <React.Fragment key={attribute.id}>
                <tr>
                  <th className={`cell cell-given_when_then ${attribute.name}-cell`}
                      scope="rowgroup"
                      rowSpan={attribute.conditions.length + 1}>
                    <p className="behaviourName">{attribute.name}</p>
                  </th>
                </tr>
                {

                  this.toFlatData(attribute.conditions).map(condition => {
                    return (
                      <React.Fragment key={condition.id}>

                        {
                          condition.level === 0 &&
                          <tr>
                            <th className={`cell ${attribute.name}-cell-prop`} scope="row"
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
