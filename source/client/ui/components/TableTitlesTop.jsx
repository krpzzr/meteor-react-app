import React from "react";

import "../../css/App.css";

class TableTitlesTop extends React.Component {

  render() {
    const {item} = this.props;

    return (

      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        {
          item.titles.map(title => {
            return (
              <th valign="bottom" className="table-title" key={title.id}
                  scope="col">
                {
                  title.name && title.name.length > 0 ? title.name :
                    <svg style={{
                      width: 30,
                      height: 30,
                    }} viewBox="0 0 24 24">
                      <path
                        fill="#000000"
                        d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"
                      />
                    </svg>
                }
              </th>
            );
          })
        }
      </tr>

    );
  }
}

export default TableTitlesTop;