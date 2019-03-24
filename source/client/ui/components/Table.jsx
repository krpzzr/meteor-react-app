import React from "react";

import * as _ from "lodash";

import "../../css/App.css";
import TableTitlesTop from "./TableTitlesTop";
import TableTitlesLeft from "./TableTitlesLeft";

import {Tables} from "../../../data/collections-init";

class Table extends React.Component {

  state = {
    cellEditInputs: [],
    openTables: [],
    tables: []
  };

  onChangeInputCell = (e, cell) => {
    e.stopPropagation();

    let arr = this.state.cellEditInputs;
    arr.forEach(item => {
      if (item.cellID === cell.id) {
        item.value = e.target.value;
      }
    });
    this.setState({
      cellEditInputs: arr,
    });
  };

  editCell = (e, cell, tableID, conditionID) => {
    e.stopPropagation();

    if (!_.find(this.state.cellEditInputs, {cellID: cell.id})) {
      this.setState(prevState => ({
        cellEditInputs: [
          ...prevState.cellEditInputs,
          {
            tableID,
            conditionID,
            cellID: cell.id,
            titleID: cell.titleID,
            value: cell.name,
          },
        ],
      }));

    }
  };

  onTableDropdown = (e, table) => {
    e.stopPropagation();

    if (!_.find(this.state.openTables, {id: table.id})) {

      this.setState(prevState => ({
        openTables: [
          ...prevState.openTables,
          {
            id: table.id,
          },
        ],
      }));

    } else {
      this.setState(prevState => ({
        openTables: prevState.openTables.filter(item => {
          return item.id !== table.id;
        }),
      }));

    }

  };

  saveCellsChanges = () => {
    this.props.updateCells(this.state.cellEditInputs);
    console.info("Saving Changes...", this.state.cellEditInputs);
    this.setState({cellEditInputs: []});
  };

  cancelChanges = () => {
    this.setState({cellEditInputs: []});
    console.info("Changes Canceled");
  };

  count = 1;

  render() {
    const {table} = this.props;

    return (

      <div style={{overflowX: "auto"}}>
        <table>
          <caption className={_.find(this.state.openTables, {id: table.id}) ? "active" : ""}
                   onClick={(e) => this.onTableDropdown(e, table)}>
            <span>{table.name}</span>
          </caption>
          {
            _.find(this.state.openTables, {id: table.id}) &&
            <tbody>

            <TableTitlesTop
              table={table}
              onChangeInputCell={this.onChangeInputCell}
              editCell={this.editCell}
              cellEditInputs={this.state.cellEditInputs}
            />
            <TableTitlesLeft
              table={table}
              sortCells={this.sortCells}
              onChangeInputCell={this.onChangeInputCell}
              editCell={this.editCell}
              cellEditInputs={this.state.cellEditInputs}
            />

            </tbody>
          }
        </table>

        {
          this.state.cellEditInputs.length > 0 &&
          <div style={{
            backgroundColor: "#fff",
            paddingBottom: 11,
          }}>
            <button
              className="action_button"
              style={{marginRight: 10}}
              onClick={this.saveCellsChanges}
            >
              Save Changes
            </button>
            <button
              className="action_button"
              style={{marginLeft: 10}}
              onClick={this.cancelChanges}
            >
              Cancel Changes
            </button>
          </div>
        }

      </div>
    );
  }
}

export default Table;

