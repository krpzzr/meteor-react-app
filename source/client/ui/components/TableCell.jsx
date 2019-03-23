import React from "react";

import * as _ from "lodash";

import "../../css/App.css";

class TableCell extends React.Component {

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
    const {condition, table, editCell, onChangeInputCell, cellEditInputs, systemBehaviourName} = this.props;

    return (

      <React.Fragment>

        {
          this.sortCells(condition.teseCaseValues, table.testCaseNames).map(cell => {
            return (
              <td
                key={cell.id}
                className={`cell cell_custom cell_${systemBehaviourName}`}
                onClick={(e) => editCell(e, cell)}>
                {
                  _.find(cellEditInputs, {id: cell.id}) ?
                    <textarea
                      type="text"
                      autoFocus
                      className="cell_input"
                      onChange={(e) => onChangeInputCell(e, cell)}
                      value={_.get(_.find(cellEditInputs, {id: cell.id}), "value")}/> :
                    <p>{(cell.name && cell.name.length > 0) ? cell.name :
                      <span>+</span>}</p>
                }
              </td>
            );
          })
        }
      </React.Fragment>

    );
  }
}

export default TableCell;
