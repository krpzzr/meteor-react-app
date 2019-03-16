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
            id: "1",
            name: "STRAIGHT THROUGH",
          },
          {
            id: "2",
            name: "WITHDRAW 100 FROM MASTERCARD",
          },
          {
            id: "3",
            name: "WITHDRAW 70",
          },
          {
            id: "4",
            name: "WITHDRAW 30 FROM MASTERCARD",
          },
          {
            id: "5",
            name: "WITHDRAW 10 FROM MASTERCARD",
          }
        ],
        systemsBehaviour: [
          {
            id: "GIVEN1",
            name: "GIVEN",
            properties: [

              {
                id: "test_designer_id",
                level: 0,
                parend: null,
                name: "TEST DESIGNER",
                cells: [
                  {
                    id: "122121",
                    titleID: "1",
                    name: "VISA",
                  },
                  {
                    id: "622362",
                    titleID: "2",
                    name: "MASTERCARD",
                  },
                  {
                    id: "3g4g3",
                    titleID: "3",
                    name: "",
                  },
                  {
                    id: "g3g3g3g",
                    titleID: "4",
                    name: "",
                  },
                  {
                    id: "h34h4h3",
                    titleID: "5",
                    name: "",
                  }
                ],
              },

              {
                id: "contact_person_id",
                level: 0,
                parent: null,
                name: "CONTACT PERSON",
                cells: [
                  {
                    id: "bdssdbsdb",
                    titleID: "1",
                    name: "",
                  },
                  {
                    id: "nre9ern",
                    titleID: "2",
                    name: "",
                  },
                  {
                    id: "lkxcls4",
                    titleID: "3",
                    name: "",
                  },
                  {
                    id: "dfm;sdfl;sd;6765765",
                    titleID: "4",
                    name: "",
                  },
                  {
                    id: "dfds.f.ds/f,.5645645",
                    titleID: "5",
                    name: "",
                  },
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
                level: 0,
                parent: null,
                name: "CUSTOMER",
                cells: [
                  {
                    id: "99",
                    titleID: "1",
                    name: "VISA",
                  },
                  {
                    id: "968t7tt",
                    titleID: "2",
                    name: "MASTERCARD",
                  },
                  {
                    id: "msdasl;dmsa;l6m6",
                    titleID: "3",
                    name: "",
                  },
                  {
                    id: "sdfsd44,,ww",
                    titleID: "4",
                    name: "",
                  },
                  {
                    id: "gdfgdf,g'df,gfd6463",
                    titleID: "5",
                    name: "",
                  }
                ],
              },

              {
                id: "type_of_user_id",
                level: 1,
                parent: "customer_id",
                name: "TYPE OF USER",
                cells: [
                  {
                    id: "tqqt22",
                    titleID: "1",
                    name: "MASTERCARD",
                  },
                  {
                    id: "reg445645",
                    titleID: "2",
                    name: "MIR",
                  },
                  {
                    id: "d;v,.ds;v,ds;fds;fdsf3",
                    titleID: "3",
                    name: "",
                  },
                  {
                    id: "plekekmvdkmdlks;6",
                    titleID: "4",
                    name: "",
                  },
                  {
                    id: "c,'sc,scopdmme7778",
                    titleID: "5",
                    name: "",
                  }
                ],
              },

              {
                id: "username_id",
                level: 2,
                parent: "type_of_user_id",
                name: "USERNAME",
                cells: [
                  {
                    id: "2jjky9",
                    titleID: "1",
                    name: "MASTERCARD PLATINUM",
                  },
                  {
                    id: "d;sa',d;sad;'asd,a'sd,",
                    titleID: "2",
                    name: "",
                  },
                  {
                    id: "g;lds;glsdl;m666",
                    titleID: "3",
                    name: "",
                  },
                  {
                    id: "ckwkfmwepfmwepfwef75",
                    titleID: "4",
                    name: "",
                  },
                  {
                    id: "dmfklsdfsdfldsfsd;0797",
                    titleID: "5",
                    name: "",
                  }
                ],
              },

              {
                id: "type_of_user_id2",
                level: 1,
                parent: "customer_id",
                name: "TYPE OF USER2",
                cells: [
                  {
                    id: "dasmdas;lmdas;lmd;asdmas6",
                    titleID: "1",
                    name: "TEST1",
                  },
                  {
                    id: "as,,f,g,,74",
                    titleID: "2",
                    name: "",
                  },
                  {
                    id: "kwnfkwenflkcmvkler5",
                    titleID: "5",
                    name: "TEST2",
                  },
                  {
                    id: "sdflsdf;ds,fdsl;35353",
                    titleID: "3",
                    name: "",
                  },
                  {
                    id: "fsdf,sd,fl;dsf,;sd9876",
                    titleID: "4",
                    name: "",
                  }
                ]
              },

            ],
          },
          {
            id: "THEN1",
            name: "THEN",
            properties: [
              {
                id: "acc_be_should_id",
                parent: null,
                level: 0,
                name: "THE ACCOUNT BALANCE SHOULD BE ${ENDING_BALANCE}",
                cells: [
                  {
                    id: "lmsdl,fl;d,sf,sdf;sd,762b",
                    titleID: "1",
                    name: "",
                  },
                  {
                    id: "ddsgsdt6llfdlg;,df",
                    titleID: "2",
                    name: "",
                  },
                  {
                    id: "dnfldsn6je6lse5-5e",
                    titleID: "3",
                    name: "",
                  },
                  {
                    id: "mg;sdmgksdmgksld9494949--4i4i4m",
                    titleID: "4",
                    name: "",
                  },
                  {
                    id: "fdsmfndsmfkldsmf74849454",
                    titleID: "5",
                    name: "",
                  }
                ]
              },
              {
                id: "the_card_should_returned_id",
                parent: null,
                level: 0,
                name: "THE CARD SHOULD BE RETURNED",
                cells: [
                  {
                    id: "fdfndsljfdslf8dsf8ds",
                    titleID: "1",
                    name: "",
                  },
                  {
                    id: "fdsfmdskfmdskf993393",
                    titleID: "2",
                    name: "",
                  },
                  {
                    id: "efkskf;lfdfds-44",
                    titleID: "3",
                    name: "",
                  },
                  {
                    id: "dsfjsdklflkdsfds-345345",
                    titleID: "4",
                    name: "",
                  },
                  {
                    id: "dfdsfmdsmf;dslfdsf--404404d",
                    titleID: "5",
                    name: "",
                  }
                ]
              },
            ],
          },
        ],
      },
    ],
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
          this.state.tables.map(item => {
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

export default App;

