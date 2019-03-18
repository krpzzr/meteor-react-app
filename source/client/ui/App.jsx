import React from "react";
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";

import * as _ from "lodash";

// instead of npm jquery we use meteor jquery package; otherwise SUI doesnt see jQuery..
// global var on init
// import $ from "jquery";
import "semantic-ui-css";
import "../css/App.css";

// Init collections on server
import {Tables} from "../../data/collections-init";

this.Tables = Tables;
// this.TestPaths = TestPaths;

// export default class App extends React.Component {
class App extends React.Component {

  state = {
    cellEditInputs: [],
    openTables: [],
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

  onChangeInputCell = (e, cell) => {
    e.stopPropagation();

    let arr = this.state.cellEditInputs;
    arr.forEach(item => {
      if (item.id === cell.id) {
        item.value = e.target.value;
      }
    });
    this.setState({
      cellEditInputs: arr,
    });
  };

  editCell = (e, cell) => {
    e.stopPropagation();

    if (!_.find(this.state.cellEditInputs, {id: cell.id})) {
      this.setState(prevState => ({
        cellEditInputs: [
          ...prevState.cellEditInputs,
          {
            id: cell.id,
            value: cell.name,
          },
        ],
      }))

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
    this.setState({cellEditInputs: []});
    Meteor.call("updateCells", this.state.cellEditInputs);
    console.info("Saving Changes...", this.state.cellEditInputs);
  };

  cancelChanges = () => {
    this.setState({cellEditInputs: []});
    console.info("Changes Canceled");
  };

  render() {

    return (
      <div className="container">

        <div className="tables_container">
          <div className="row">
            <div className="topButtons_wrapper">
              <div className="left">
                <button>NEW TEST AUTOMATIONS TABLE</button>
                <button>TEST SHEET</button>
              </div>
              <div className="right">
                <button>EDIT GIVEN-WHEN-THEN</button>
                <button>EDIT COLUMN TITLES</button>
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
              this.props.tables.map(item => {
                return (
                  <div key={item.id}>
                    <table>
                      <caption className={_.find(this.state.openTables, {id: item.id}) ? "active" : ""} onClick={(e) => this.onTableDropdown(e, item)}>
                        <span>{item.name}</span>
                      </caption>
                      {
                        _.find(this.state.openTables, {id: item.id}) &&
                        <tbody>

                        <tr>
                          <td>&nbsp;</td>
                          <td>&nbsp;</td>
                          {
                            item.titles.map(title => {
                              return (
                                <th className="table-title" key={title.id}
                                    scope="col">{title.name}</th>
                              );
                            })
                          }
                        </tr>
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
                                          {

                                            this.sortCells(prop.cells, item.titles).map(cell => {
                                              return (
                                                <React.Fragment key={cell.id}>
                                                  <td
                                                    className="cell cell_custom"
                                                    onClick={(e) => this.editCell(e, cell)}>
                                                    {
                                                      _.find(this.state.cellEditInputs, {id: cell.id}) ?
                                                        <textarea
                                                          type="text"
                                                          autoFocus
                                                          className="cell_input"
                                                          onChange={(e) => this.onChangeInputCell(e, cell)}
                                                          value={_.get(_.find(this.state.cellEditInputs, {id: cell.id}), "value")}/> :
                                                        <p>{(cell.name && cell.name.length > 0) ? cell.name : "+"}</p>
                                                    }
                                                  </td>
                                                </React.Fragment>
                                              );
                                            })
                                          }
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
                        </tbody>
                      }
                    </table>

                    {
                      this.state.cellEditInputs.length > 0 &&
                      <div>
                        <button onClick={this.saveCellsChanges}>Save Changes</button>
                        <button onClick={this.cancelChanges}>Cancel Changes</button>
                      </div>
                    }

                  </div>
                );
              })
            }
          </div>

        </div>

      </div>
    );
  }
}

export default withTracker(() => {

  return {
    // Return tables as React prop
    tables: Tables,
  };

})(App);

