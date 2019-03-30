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
    const {condition, table, editCell, onChangeInputCell, cellEditInputs, systemBehaviourName, onChangeInputCreateCell, cellCreateInputs, createCell} = this.props;
    return (

      <React.Fragment>

        {
          this.sortCells(condition.testCaseValues, table.testCaseNames).map(cell => {
            return (
              <td
                key={cell.id}
                className={`cell cell_custom cell_${systemBehaviourName}`}
                onClick={(e) => editCell(e, cell, table._id, condition.id)}>
                {
                  _.find(cellEditInputs, {cellID: cell.id}) ?
                    <textarea
                      type="text"
                      autoFocus
                      className="cell_input"
                      onChange={(e) => onChangeInputCell(e, cell)}
                      value={_.get(_.find(cellEditInputs, {cellID: cell.id}), "value")}/> :
                    <p>{(cell.name && cell.name.length > 0) ? cell.name :
                      <span>+</span>}</p>
                }
              </td>
            );
          })
        }
        <td
          className={`cell cell_custom cell_${systemBehaviourName}`}
          onClick={(e) => createCell(e, table._id, condition.id)}
        >
          {
            _.find(cellCreateInputs, {conditionID: condition.id}) ?
              <textarea
                type="text"
                autoFocus
                className="cell_input"
                onChange={(e) => onChangeInputCreateCell(e, condition.id)}
                value={_.get(_.find(cellCreateInputs, {conditionID: condition.id}), "value")}/> :
              <p><span>+</span></p>
          }
        </td>
      </React.Fragment>

    );
  }
}

export default TableCell;
