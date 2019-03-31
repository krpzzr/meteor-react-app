export default {
  name: "Table Name 2",
  testCaseNames: [
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
    }
  ],
  attributes: [
    {
      id: "GIVEN1",
      name: "GIVEN",
      conditions: [

        {
          id: "test_designer_id",
          name: "TEST DESIGNER",
          subconditions: [],
          testCaseValues: [
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
          ],
        },

        {
          id: "contact_person_id",
          name: "CONTACT PERSON",
          subconditions: [],
          testCaseValues: [
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
          ],
        },

      ],
    },
    {
      id: "WHEN1",
      name: "WHEN",
      conditions: [

        {
          id: "customer_id",
          children: "type_of_user_id",
          name: "CUSTOMER",
          subconditions: [
            {
              id: "type_of_user_id",
              name: "TYPE OF USER",
              subconditions: [
                {
                  id: "username_id",
                  name: "USERNAME",
                  subconditions: [],
                  testCaseValues: [
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
                  ],
                },
              ],
              testCaseValues: [
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
              ],
            },
            {
              id: "type_of_user_id2",
              name: "TYPE OF USER2",
              subconditions: [],
              testCaseValues: [
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
                  id: "sdflsdf;ds,fdsl;35353",
                  titleID: "3",
                  name: "TEST2",
                },
                {
                  id: "fsdf,sd,fl;dsf,;sd9876",
                  titleID: "4",
                  name: "",
                },
              ],
            },
          ],
          testCaseValues: [
            {
              id: "99",
              titleID: "1",
              name: "VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA VISA cell_customcell_customcell_customcell_customcell_customcell_customcell_customcell_customcell_customcell_customcell_custom",
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
          ],
        },
      ],
    },
    {
      id: "THEN1",
      name: "THEN",
      conditions: [
        {
          id: "acc_be_should_id",
          name: "THE ACCOUNT BALANCE SHOULD BE ${ENDING_BALANCE}",
          subconditions: [],
          testCaseValues: [
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
          ],
        },
        {
          id: "the_card_should_returned_id",
          name: "THE CARD SHOULD BE RETURNED",
          subconditions: [],
          testCaseValues: [
            {
              id: "fdfndsljfdslf8dsf8ds",
              titleID: "1",
              name: "",
            },
            {
              id: "efkskf;lfdfds-44",
              titleID: "3",
              name: "VISA PLATINUM SUPER PLUS",
            },
            {
              id: "fdsfmdskfmdskf993393",
              titleID: "2",
              name: "",
            },
            {
              id: "dsfjsdklflkdsfds-345345",
              titleID: "4",
              name: "",
            },
          ],
        },
      ],
    },
  ],
};
