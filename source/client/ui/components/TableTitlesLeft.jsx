import React from "react";

import * as _ from "lodash";

import "../../css/App.css";
import TableCell from "./TableCell";

class TableTitlesLeft extends React.Component {

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

  render() {
    const {item, cellEditInputs, editCell, onChangeInputCell} = this.props;

    return (

      <React.Fragment>

        {
          item.systemsBehaviour.map(sb => {
            return (
              <React.Fragment key={sb.id}>
                <tr>
                  <th className={`cell cell-given_when_then ${sb.name}-cell`}
                      scope="rowgroup"
                      rowSpan={sb.properties.length + 1}>
                    <p className="behaviourName">{sb.name}</p>
                  </th>
                </tr>
                {
                  sb.properties.map(prop => {
                    return (
                      <React.Fragment key={prop.id}>
                        <tr>
                          <th className={`cell ${sb.name}-cell-prop`} scope="row"
                              style={{paddingLeft: prop.level * 33}}>
                            <p>{prop.name}</p>
                          </th>
                          <TableCell
                            systemBehaviourName={sb.name}
                            prop={prop}
                            item={item}
                            cellEditInputs={cellEditInputs}
                            editCell={editCell}
                            onChangeInputCell={onChangeInputCell}
                          />
                        </tr>
                      </React.Fragment>
                    );
                  })
                }
                <tr style={{height: 10}}>
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
