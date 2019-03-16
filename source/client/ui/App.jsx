import React from "react";
import {withTracker} from "meteor/react-meteor-data";

// instead of npm jquery we use meteor jquery package; otherwise SUI doesnt see jQuery..
// global var on init
// import $ from "jquery";
import "semantic-ui-css";

// Init collections on server
import { Tables } from "../../data/collections-init";
this.Tables = Tables;
// this.TestPaths = TestPaths;

// export default class App extends React.Component {
class App extends React.Component {

  state = {
    flattenArray: []
  };

  sortCells = (cells, titles) => {
    let arr = [];

    titles.map(title => {
      return cells.map(cell => {

        if (title.id === cell.titleID) arr.push(cell)

      })
    });

    return arr;
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
                          <th key={title.id} scope="col">{ title.name }</th>
                        )
                      })
                    }
                  </tr>
                  {
                    item.systemsBehaviour.map(sb => {
                      return (
                        <React.Fragment key={sb.id}>
                          <tr>
                            <th scope="rowgroup" rowSpan={sb.properties.length + 1}>{sb.name}</th>
                          </tr>
                          {
                            sb.properties.map(prop => {
                              return (
                                <tr key={prop.id}>
                                  <th scope="row" style={{paddingLeft: prop.level * 15}}>{prop.name}</th>
                                  {

                                    this.sortCells(prop.cells, item.titles).map(cell => {
                                      return (
                                        <td key={cell.id}>{cell.name}</td>
                                      )
                                    })
                                  }
                                </tr>
                              )
                            })
                          }
                        </React.Fragment>
                      )
                    })
                  }
                  </tbody>
                </table>

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

