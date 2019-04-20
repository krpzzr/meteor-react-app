import React from "react";

import * as _ from "lodash";

import "../../css/App.css";

import Table from "./Table";

class TableWrapper extends React.Component {

  state = {
    cellEditInputs: [],
    titleEditInputs: [],
    openTables: [],
    cellCreateInputs: [],
    tables: [],
    testCaseName: "",
    isShownTextarea: false,
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

  onChangeInputTitile = (e, title) => {
    e.stopPropagation();

    let arr = this.state.titleEditInputs;
    arr.forEach(item => {
      if (item.id === title.id) {
        item.name = e.target.value;
      }
    });
    this.setState({
      titleEditInputs: arr,
    });
  };

  editTitle = (e, title, tableID) => {
    e.stopPropagation();

    if (this.state.cellCreateInputs.length > 0 || this.state.cellEditInputs.length > 0) {
      alert("Please save or cancel previous changes");
      return;
    }

    if (!_.find(this.state.titleEditInputs, {id: title.id})) {
      this.setState(prevState => ({
        titleEditInputs: [
          ...prevState.titleEditInputs,
          {
            tableID,
            id: title.id,
            name: title.name,
          },
        ],
      }));

    }
  };

  onChangeInputCreateCell = (e, id) => {
    e.stopPropagation();

    let arr = this.state.cellCreateInputs;
    arr.forEach(item => {
      if (item.conditionID === id) {
        item.value = e.target.value;
      }
    });
    this.setState({
      cellCreateInputs: arr,
    });
  };

  updateCell = (tableID, conditionID, instance, cellID) => {
    let updateCell = {
      tableID,
      conditionID,
      instance,
      cellID
    };

    this.props.updateCells(updateCell);
  };

  createCell = (e, tableID, conditionID) => {
    e.stopPropagation();

    if (this.state.cellEditInputs.length > 0 || this.state.titleEditInputs.length > 0) {
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

  saveTitleChanges = () => {
    this.props.updateTitles(this.state.titleEditInputs);

    this.cancelChanges();
  };

  saveCellsChanges = () => {
    this.props.updateCells(this.state.cellEditInputs);

    this.cancelChanges()
  };

  cancelChanges = () => {
    this.setState({
      cellEditInputs: [],
      cellCreateInputs: [],
      titleEditInputs: []
    });
  };

  addColumn = () => {
    this.props.createColumn(this.props.table._id, this.state.testCaseName, this.state.cellCreateInputs);

    this.cancelChanges();
  };

  render() {
    const {table} = this.props;

    return (
      <React.Fragment>
        <div
          className={_.find(this.state.openTables, {id: table.id}) ? "active table_name" : "table_name"}
          onClick={(e) => this.onTableDropdown(e, table)}
        >
          <span>{table.name}</span>
        </div>
        <div style={{overflowX: "auto", backgroundColor: '#fff'}}>
          <div className="table">

          {
              _.find(this.state.openTables, {id: table.id}) &&
              <Table
                table={table}
                onChangeInputTitile={this.onChangeInputTitile}
                titleEditInputs={this.state.titleEditInputs}
                editTitle={this.editTitle}
                addColumn={this.addColumn}
                sortCells={this.sortCells}
                onChangeInputCell={this.onChangeInputCell}
                updateCell={this.updateCell}
                cellEditInputs={this.state.cellEditInputs}
                onChangeInputCreateCell={this.onChangeInputCreateCell}
                cellCreateInputs={this.state.cellCreateInputs}
                createCell={this.createCell}
                createInstance={this.props.createInstance}
                createCombination={this.props.createCombination}
                editCombination={this.props.editCombination}
                deleteCombination={this.props.deleteCombination}
              />

            }
          </div>

        </div>

        {
          this.state.cellEditInputs.length > 0 &&
          <div style={{
            paddingBottom: 11,
            marginTop: 15
          }}>
            <button
              className="action_button"
              style={{marginRight: 10}}
              onClick={this.saveCellsChanges}
            >
              Change Cells
            </button>
            <button
              className="action_button"
              style={{marginLeft: 10}}
              onClick={this.cancelChanges}
            >
              Cancel
            </button>
          </div>
        }

        {
          this.state.titleEditInputs.length > 0 &&
          <div style={{
            paddingBottom: 11,
            marginTop: 15
          }}>
            <button
              className="action_button"
              style={{marginRight: 10}}
              onClick={this.saveTitleChanges}
            >
              Change Titles
            </button>
            <button
              className="action_button"
              style={{marginLeft: 10}}
              onClick={this.cancelChanges}
            >
              Cancel
            </button>
          </div>
        }

        {
          this.state.cellCreateInputs.length > 0 &&
          <div style={{
            paddingBottom: 11,
            marginTop: 15
          }}>
            <button
              className="action_button"
              style={{marginLeft: 10}}
              onClick={this.cancelChanges}
            >
              Cancel
            </button>
          </div>
        }
      </React.Fragment>
    );
  }
}

export default TableWrapper;

