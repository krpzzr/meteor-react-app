import React from "react";
import {withTracker} from "meteor/react-meteor-data";
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
    let arr = this.state.cellEditInputs;
    arr.forEach(item => {
      if (item.id === cell.id) item.value = e.target.value;
    });
    this.setState({
      cellEditInputs: arr
    })
  };

  editCell = (cell) => {
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

  saveCellsChanges = () => {
    this.setState({cellEditInputs: []})
    console.info('Save Changes', this.state.cellEditInputs)
  };

  render() {

    return (
      <div>
        {
          this.props.tables.map(item => {
            return (
              <div key={item.id}>
                <table>
                  <caption>{item.name}</caption>
                  <tbody>

                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    {
                      item.titles.map(title => {
                        return (
                          <th key={title.id} scope="col">{title.name}</th>
                        );
                      })
                    }
                  </tr>
                  {
                    item.systemsBehaviour.map(sb => {
                      return (
                        <React.Fragment key={sb.id}>
                          <tr>
                            <th className="cell"
                                scope="rowgroup"
                                rowSpan={sb.properties.length + 1}>
                              <p className="behaviourName">{sb.name}</p>
                            </th>
                          </tr>
                          {
                            sb.properties.map(prop => {
                              return (
                                <tr key={prop.id}>
                                  <th className="cell" scope="row"
                                      style={{paddingLeft: prop.level * 15}}>{prop.name}</th>
                                  {

                                    this.sortCells(prop.cells, item.titles).map(cell => {
                                      return (
                                        <td
                                          className="cell cell_custom"
                                          key={cell.id}
                                          onClick={() => this.editCell(cell)}>
                                          {
                                            _.find(this.state.cellEditInputs, {id: cell.id}) ?
                                              <input
                                                type="text"
                                                onChange={(e) => this.onChangeInputCell(e, cell)}
                                                value={_.get(_.find(this.state.cellEditInputs, {id: cell.id}), "value")}/> :
                                              (cell.name && cell.name.length > 0) ? cell.name : "+"
                                          }
                                        </td>
                                      );
                                    })
                                  }
                                </tr>
                              );
                            })
                          }
                        </React.Fragment>
                      );
                    })
                  }
                  </tbody>
                </table>

                {
                  this.state.cellEditInputs.length > 0 && <button onClick={this.saveCellsChanges}>Save Changes</button>
                }

              </div>
            );
          })
        }

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

