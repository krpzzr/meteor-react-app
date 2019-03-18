import React from "react";

import * as _ from "lodash";

import "../../css/App.css";

class Table extends React.Component {

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
    this.setState({cellEditInputs: []});
    Meteor.call("updateCells", this.state.cellEditInputs);
    console.info("Saving Changes...", this.state.cellEditInputs);
  };

  cancelChanges = () => {
    this.setState({cellEditInputs: []});
    console.info("Changes Canceled");
  };

  count = 1;

  render() {
    const {item} = this.props;

    return (

      <div style={{overflowX: "auto"}}>
        <table>
          <caption className={_.find(this.state.openTables, {id: item.id}) ? "active" : ""}
                   onClick={(e) => this.onTableDropdown(e, item)}>
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
              <th>( + )</th>
            </tr>
            {
              item.systemsBehaviour.map(sb => {
                return (
                  <React.Fragment key={sb.id}>
                    <tr>
                      <th className={`cell cell-given_when_then ${sb.name}-cell`}
                          scope="rowgroup"
                          rowSpan={sb.properties.length + this.count}>
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
                              <td className="cell cell_custom"><p>+</p></td>
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
  }
}

export default Table;

