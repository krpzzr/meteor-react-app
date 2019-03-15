import React from "react";
import {withTracker} from "meteor/react-meteor-data";

// instead of npm jquery we use meteor jquery package; otherwise SUI doesnt see jQuery..
// global var on init
// import $ from "jquery";
import "semantic-ui-css";

// Init collections on server
// import {Scenarios, TestPaths} from "../../data/collections-init";
//
// this.Scenarios = Scenarios;
// this.TestPaths = TestPaths;

// export default class App extends React.Component {
class App extends React.Component {

  state = {
    flattenArray: [],
    tables: [
      {
        id: "table1",
        name: "Table Name 1",
        titles: [
          {
            id: "STRAIGHT THROUGH",
            name: "STRAIGHT THROUGH"
          }
        ],
        systemsBehavior: [
          {
            id: "GIVEN1",
            name: "GIVEN",
            properties: [
              {
                id: "test_designer_id",
                name: "TEST DESIGNER",
                children: [],
                cells: [],
              },
              {
                id: "contact_person_id",
                name: "CONTACT PERSON",
                children: [],
                cells: [
                  {
                    id: "123",
                    titleID: "STRAIGHT THROUGH",
                    name: 'VISA'
                  }
                ],
              },
            ],
          },
          {
            id: "WHEN1",
            name: "WHEN",
            properties: [
              {
                id: "customer_id",
                name: "CUSTOMER",
                cells: [],
                children: [
                  {
                    id: "type_of_user_id",
                    name: "TYPE OF USER",
                    cells: [],
                    children: [
                      {
                        id: "username_id",
                        name: "USERNAME",
                        cells: [],
                        children: [],
                      },
                    ],
                  },
                  {
                    id: "type_of_user_id2",
                    name: "TYPE OF USER2",
                    cells: [],
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: "THEN1",
            name: "THEN",
            properties: [
              {
                id: "acc_be_should_id",
                name: "THE ACCOUNT BALANCE SHOULD BE ${ENDING_BALANCE}",
                cells: [],
                children: [],
              },
              {
                id: "the_card_should_returned_id",
                name: "THE CARD SHOULD BE RETURNED",
                cells: [],
                children: [],
              },
            ],
          },
        ],
        // tableColumns: [
        //   {
        //     id: "colm1",
        //     columnName: "STRAIGHT THROUGH",
        //     columnCells: [
        //       {
        //         id: "contact_person_id",
        //         name: "VISA",
        //       },
        //       {
        //         id: "customer_id",
        //         name: "100",
        //       },
        //       {
        //         id: "acc_be_should_id",
        //         name: "0",
        //       },
        //     ],
        //   },
        // ],
      },
    ],
  };

  renderSubMenu(options) {
    const menuOptions = options.map(option => {
      return (
        <li key={ option.id }>
          {
            option.name
          }
          {
            option.children && option.children.length > 0 && this.renderSubMenu(option.children)
          }
          <div style={{display: 'flex'}}>
            {
              option.cells && option.cells.map(cell => {
                return (
                  <div key={cell.id}>
                    {cell.name}
                  </div>
                )
              })
            }
          </div>
        </li>
      );
    });

    return (
      <ul style={{listStyle: 'none'}}>
        { menuOptions }
      </ul>
    );
  }

  render() {

    console.log(this.state.flattenArray)

    return (
      <div>
        Hello world

        {
          this.state.tables.map(item => {
            return (
              <div key={item.id}>
                <div>
                  {item.name}
                </div>

                <div style={{display: 'flex'}}>
                  <div>
                    {
                      item.systemsBehavior.map(sb => {
                        return (
                          <div style={{display: "flex"}} key={sb.id}>
                            <div style={{
                              marginBottom: 10,
                              marginRight: 25,
                              display: 'flex',
                              alignItems: 'center'
                            }}>{sb.name}</div>
                            {
                              this.renderSubMenu(sb.properties)
                            }
                          </div>
                        );
                      })
                    }
                  </div>
                </div>

              </div>
            );
          })
        }

      </div>
    );
  }
}

export default App;

