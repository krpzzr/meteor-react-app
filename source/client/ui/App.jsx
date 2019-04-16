import React from "react";
import {withTracker} from "meteor/react-meteor-data";
import * as _ from "lodash";

import TableWrapper from "./components/TableWrapper";
import NewTable from "./components/NewTable";

import "../css/App.css";

// Init collections on server
import {Tables} from "../../data/collections-init";

this.Tables = Tables;

class App extends React.Component {

  state = {
    tables: [],
    newTableShown: false,
  };

  recursiveChangeCells = (node, data) => {
    node.forEach(cond => {
      if (cond.id === data.conditionID) {

        cond.testCaseValues.forEach(tcv => {
          if (tcv.id === data.cellID) {
            tcv.instanceID = data.instanceID;
          }
        });

      } else if (cond.subconditions && cond.subconditions.length > 0) {

        this.recursiveChangeCells(cond.subconditions, data);

      }
    });
  };

  recursiveCreateCells = (node, id, cells, oldLength) => {
    const ID = function () {
      return "_" + Math.random().toString(36).substr(2, 9);
    };

    node.forEach(cond => {
      cells.forEach(cell => {

        if (!_.find(oldLength, {id: cond.id})) {
          if (cell.conditionID === cond.id) {
            oldLength.push({
              id: cond.id,
            });

            cond.testCaseValues.push({
              id: ID(),
              titleID: id,
              name: cell.value,
            });
          }
        }
        if (cond.subconditions && cond.subconditions.length > 0) {
          this.recursiveCreateCells(cond.subconditions, id, cells, oldLength);
        }

      });

    });
  };

  recursiveCreateEmptyCells = (node, id, oldLength) => {
    const ID = function () {
      return "_" + Math.random().toString(36).substr(2, 9);
    };

    node.forEach(cond => {
      if (!_.find(oldLength, {id: cond.id})) {
        oldLength.push({
          id: cond.id,
        });

        cond.testCaseValues.push({
          id: ID(),
          titleID: id,
          name: "",
        });
      }

      if (cond.subconditions && cond.subconditions.length > 0) {
        this.recursiveCreateEmptyCells(cond.subconditions, id, oldLength);
      }

    });
  };

  updateCells = data => {
    let arr = this.state.tables;
    console.log('updateCells', data);
    arr.forEach(table => {

      if (data.tableID === table._id) {
        table.attributes.forEach(attr => {
          this.recursiveChangeCells(attr.conditions, data);
        });
      }

    });

    this.setState({tables: arr});
  };

  createColumn = (tableID, testCaseName, cells) => {
    const ID = function () {
      return "_" + Math.random().toString(36).substr(2, 9);
    };
    let id = ID();
    let arr = this.state.tables;
    let oldLength = [];

    arr.forEach(table => {
      if (table._id === tableID) {
        table.testCaseNames.push({
          id: id,
          name: "new column title",
        });

        table.attributes.forEach(attr => {
          this.recursiveCreateCells(attr.conditions, id, cells, oldLength);
        });
      }
    });

    arr.forEach(table => {
      if (table._id === tableID) {

        table.attributes.forEach(attr => {
          this.recursiveCreateEmptyCells(attr.conditions, id, oldLength);
        });

      }
    });

    this.setState({
      tables: arr,
    });
  };

  updateTitles = titles => {
    let arr = this.state.tables;

    titles.forEach(title => {

      arr.forEach(table => {

        if (title.tableID === table._id) {
          table.testCaseNames.forEach(i => {
            if (i.id === title.id) {
              i.name = title.name;
            }
          });
        }

      });

    });

    this.setState({tables: arr});
  };

  componentWillReceiveProps(nextProps) {
    const tables = this.props.tables.find({}).fetch();

    this.setState({tables});
  }

  componentDidMount() {
    const tables = this.props.tables.find({}).fetch();

    this.setState({tables});
  }

  createTable = () => {
    this.setState({
      newTableShown: true,
    });
  };

  addTable = (data) => {
    const ID = function () {
      return "_" + Math.random().toString(36).substr(2, 9);
    };
    let table = {};
    let testCaseValuesGiven = [];
    let testCaseValuesWhen = [];
    let testCaseValuesThen = [];

    // table._id = ID();

    table.name = data.tableName;

    table.testCaseNames = [];
    data.tableTitles.forEach(title => {
      let id = ID();
      table.testCaseNames.push({
        id: id,
        name: title.name,
      });
      testCaseValuesGiven.push({
        id: ID(),
        titleID: id,
        name: "",
      });
      testCaseValuesWhen.push({
        id: ID(),
        titleID: id,
        name: "",
      });
      testCaseValuesThen.push({
        id: ID(),
        titleID: id,
        name: "",
      });
    });

    let givenConditions = [];
    data.givenConditions.forEach(condition => {
      givenConditions.push({
        id: ID(),
        name: condition.name,
        subconditions: [],
        testCaseValues: testCaseValuesGiven,
      });
    });

    let whenConditions = [];
    data.whenConditions.forEach(condition => {
      whenConditions.push({
        id: ID(),
        name: condition.name,
        subconditions: [],
        testCaseValues: testCaseValuesWhen,
      });
    });

    let thenConditions = [];
    data.thenConditions.forEach(condition => {
      thenConditions.push({
        id: ID(),
        name: condition.name,
        subconditions: [],
        testCaseValues: testCaseValuesThen,
      });
    });

    table.attributes = [
      {
        id: ID(),
        name: "GIVEN",
        conditions: givenConditions,
      },
      {
        id: ID(),
        name: "WHEN",
        conditions: whenConditions,
      },
      {
        id: ID(),
        name: "THEN",
        conditions: thenConditions,
      },
    ];

    Tables.insert(table);

  };

  hideCreateTableComponent = () => {
    this.setState({newTableShown: false});
  };

  // Create INSTANCE

  recursiveCreateInstance = (node, conditionID, name) => {
    const ID = function () {
      return "_" + Math.random().toString(36).substr(2, 9);
    };

    node.forEach(cond => {
      if (cond.id === conditionID) {

        cond.instances.push({
          id: ID(),
          name,
          subconditions: []
        })

      } else if (cond.subconditions && cond.subconditions.length > 0) {

        this.recursiveCreateInstance(cond.subconditions, conditionID, name);

      }
    });
  };

  createInstance = (tableID, attributeID, conditionID, name) => {
    let arr = this.state.tables;

    arr.forEach(table => {

      if (tableID === table._id) {
        table.attributes.forEach(attr => {
          if (attr.id === attributeID) {
            this.recursiveCreateInstance(attr.conditions, conditionID, name);
          }
        });
      }

    });

    this.setState({tables: arr});
  };

  // Create COMBINATION
  createCombination = () => {

  };

  render() {
    return (
      <div className="container">

        <div className="tables_container">
          <div className="row">
            <div className="topButtons_wrapper">
              <div className="left_wr">
                <button onClick={this.createTable}>
                  <svg style={{
                    width: 24,
                    height: 24,
                  }} viewBox="0 0 24 24">
                    <path fill="#532D7E"
                          d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"/>
                  </svg>
                  NEW TEST AUTOMATIONS TABLE
                </button>
                <button>
                  <svg style={{
                    width: 24,
                    height: 24,
                  }} viewBox="0 0 24 24">
                    <path fill="#532D7E"
                          d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"/>
                  </svg>
                  TEST SHEET
                </button>
              </div>
              <div className="right_wr">
                <button>
                  <svg style={{
                    width: 24,
                    height: 24,
                  }} viewBox="0 0 24 24">
                    <path fill="#532D7E"
                          d="M16.84,2.73C16.45,2.73 16.07,2.88 15.77,3.17L13.65,5.29L18.95,10.6L21.07,8.5C21.67,7.89 21.67,6.94 21.07,6.36L17.9,3.17C17.6,2.88 17.22,2.73 16.84,2.73M12.94,6L4.84,14.11L7.4,14.39L7.58,16.68L9.86,16.85L10.15,19.41L18.25,11.3M4.25,15.04L2.5,21.73L9.2,19.94L8.96,17.78L6.65,17.61L6.47,15.29"/>
                  </svg>
                  EDIT GIVEN-WHEN-THEN
                </button>
                <button>
                  <svg style={{
                    width: 24,
                    height: 24,
                  }} viewBox="0 0 24 24">
                    <path fill="#532D7E"
                          d="M16.84,2.73C16.45,2.73 16.07,2.88 15.77,3.17L13.65,5.29L18.95,10.6L21.07,8.5C21.67,7.89 21.67,6.94 21.07,6.36L17.9,3.17C17.6,2.88 17.22,2.73 16.84,2.73M12.94,6L4.84,14.11L7.4,14.39L7.58,16.68L9.86,16.85L10.15,19.41L18.25,11.3M4.25,15.04L2.5,21.73L9.2,19.94L8.96,17.78L6.65,17.61L6.47,15.29"/>
                  </svg>
                  EDIT COLUMN TITLES
                </button>
              </div>
            </div>
          </div>

          <div className="row">
            <div style={{
              textAlign: "center",
              backgroundColor: "#3B3B39",
            }}>
              <h2 style={{
                fontWeight: 300,
                fontSize: 50,
                color: "#fff",
              }}>Title Name</h2>
            </div>
          </div>

          <div className="row">
            {
              this.state.tables.length > 0 &&
              this.state.tables.map(table => {
                return (
                  <TableWrapper
                    key={table._id}
                    table={table}
                    updateCells={this.updateCells}
                    updateTitles={this.updateTitles}
                    createColumn={this.createColumn}
                    createInstance={this.createInstance}
                  />
                );
              })
            }
            {
              this.state.newTableShown &&
              <NewTable
                addTable={this.addTable}
                hideCreateTableComponent={this.hideCreateTableComponent}
              />
            }

          </div>

        </div>

      </div>
    );
  }
}

export default withTracker(() => {
  Tables.find({}).fetch();
  return {
    // Return tables as React prop
    tables: Tables,
  };

})(App);

