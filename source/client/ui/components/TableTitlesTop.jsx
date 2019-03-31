import React from "react";

import "../../css/App.css";
import * as _ from "lodash";

class TableTitlesTop extends React.Component {

  render() {
    const {table, titleEditInputs, onChangeInputTitile, editTitle, addColumn} = this.props;

    return (

      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        {
          table.testCaseNames.map(title => {
            return (
              <th
                key={title.id}
                valign="bottom"
                className="table-title"
                scope="col"
                onClick={(e) => editTitle(e, title, table._id)}
              >
                {
                  _.find(titleEditInputs, {id: title.id}) ?
                    <textarea
                      type="text"
                      autoFocus
                      style={{resize: "none"}}
                      className="cell_input"
                      onChange={(e) => onChangeInputTitile(e, title)}
                      value={_.get(_.find(titleEditInputs, {id: title.id}), "name").toUpperCase()}/> :
                    <p>
                      {
                        title.name && title.name.length > 0 ? title.name.toUpperCase() :
                          <svg
                            style={{
                              width: 30,
                              height: 30,
                            }}
                            viewBox="0 0 24 24">
                            <path
                              fill="#000000"
                              d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"
                            />
                          </svg>
                      }
                    </p>
                }
              </th>
            );
          })
        }
        <th
          valign="bottom"
          className="table-title"
          // onClick={showTextarea}
        >
          {
            // isShownTextarea ?
            //   <textarea
            //     type="text"
            //     autoFocus
            //     style={{resize: "none"}}
            //     className="cell_input"
            //     onChange={onChangeCaseName}
            //     value={testCaseName.toUpperCase()}/> :
              <p>
                <span
                  onClick={addColumn}
                  style={{cursor: "pointer"}}
                >
                  <svg style={{
                    width: 30,
                    height: 30,
                  }} viewBox="0 0 24 24">

                    <path
                      fill="#000000"
                      d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"
                    />

                  </svg>
                </span>
              </p>
          }
        </th>
      </tr>

    );
  }
}

export default TableTitlesTop;
