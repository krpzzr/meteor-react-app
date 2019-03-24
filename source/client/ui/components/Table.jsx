import React from "react";

import * as _ from "lodash";

import "../../css/App.css";
import TableTitlesTop from "./TableTitlesTop";
import TableTitlesLeft from "./TableTitlesLeft";

class Table extends React.Component {

  state = {
    cellEditInputs: [],
    openTables: [],
    cellCreateInputs: [],
    tables: [],
    testCaseName: null,
    isShownTextarea: false
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

  onChangeInputCreateCell = (e, id) => {
    e.stopPropagation();

    let arr = this.state.cellCreateInputs;
    arr.forEach(item => {
      if (item.id === id) {
        item.value = e.target.value;
      }
    });
    this.setState({
      cellCreateInputs: arr,
    });
  };

  editCell = (e, cell, tableID, conditionID) => {
    e.stopPropagation();

    if (this.state.cellCreateInputs.length > 0) {
      alert("Please save or cancel previous changes");
      return;
    }

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

  showTextarea = () => {
    this.setState({
      isShownTextarea: true
    })
  };

  createCell = (e, tableID, conditionID) => {
    e.stopPropagation();

    if (this.state.cellEditInputs.length > 0) {
      alert("Please save or cancel previous changes");
      return;
    }

    if (!_.find(this.state.cellCreateInputs, {conditionID: conditionID})) {
      this.setState(prevState => ({
        cellCreateInputs: [
          ...prevState.cellCreateInputs,
          {
            tableID,
            conditionID,
            value: "",
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

  addColumn = () => {
    this.props.createColumn(this.props.table._id, this.state.testCaseName, this.state.cellCreateInputs);
    console.info("Add column...", this.state.cellCreateInputs);
    this.setState({
      cellCreateInputs: [],
      isShownTextarea: false
    });
  };

  cancelColumnChanges = () => {
    this.setState({
      cellCreateInputs: [],
      isShownTextarea: false
    });
    console.info("Canceled");
  };

  onChangeCaseName = (e) => {
    this.setState({
      testCaseName: e.target.value
    })
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
              testCaseName={this.state.testCaseName}
              isShownTextarea={this.state.isShownTextarea}
            />
            <TableTitlesLeft
              table={table}
              sortCells={this.sortCells}
              onChangeInputCell={this.onChangeInputCell}
              editCell={this.editCell}
              cellEditInputs={this.state.cellEditInputs}
              onChangeInputCreateCell={this.onChangeInputCreateCell}
              cellCreateInputs={this.state.cellCreateInputs}
              createCell={this.createCell}
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

        {
          this.state.cellCreateInputs.length > 0 &&
          <div style={{
            backgroundColor: "#fff",
            paddingBottom: 11,
          }}>
            <button
              className="action_button"
              style={{marginRight: 10}}
              onClick={this.addColumn}
            >
              Add column
            </button>
            <button
              className="action_button"
              style={{marginLeft: 10}}
              onClick={this.cancelColumnChanges}
            >
              Cancel
            </button>
          </div>
        }

      </div>
    );
  }
}

export default Table;

