export default {
  name: "Table Name 1",
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
    },
    {
      id: "5",
      name: "WITHDRAW 10 FROM MASTERCARD",
    },
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
          instances: [
            {
              id: "5555151515g",
              name: "VISA",
              subInstances: [],
            },
            {
              id: "622362",
              name: "MASTERCARD",
              subInstances: [],
            },
          ],
          testCaseValues: [
            {
              id: "622362",
              titleID: "2",
              instanceID: "622362",
            },
            {
              id: "5555151515g",
              titleID: "1",
              instanceID: "5555151515g",
            },
            {
              id: "3g4g3",
              titleID: "3",
              instanceID: null,
            },
            {
              id: "g3g3g3g",
              titleID: "4",
              instanceID: null,
            },
            {
              id: "h34h4h3",
              titleID: "5",
              instanceID: null,
            },
          ],
        },

        {
          id: "contact_person_id",
          name: "CONTACT PERSON",
          subconditions: [],
          instances: [],
          testCaseValues: [
            {
              id: "bdssdbsdb",
              titleID: "1",
              instanceID: null,
            },
            {
              id: "nre9ern",
              titleID: "2",
              instanceID: null,
            },
            {
              id: "lkxcls4",
              titleID: "3",
              instanceID: null,
            },
            {
              id: "dfm-sdf-d6765765",
              titleID: "4",
              instanceID: null,
            },
            {
              id: "dfds-dsbf-5645645",
              titleID: "5",
              instanceID: null,
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
                  instances: [
                    {
                      id: "2jjky9",
                      name: "MASTERCARD PLATINUM",
                      subInstances: [],
                    },
                  ],
                  testCaseValues: [
                    {
                      id: "2jjky9",
                      titleID: "1",
                      instanceID: "2jjky9",
                    },
                    {
                      id: "d;sa-dsad-asd-dsd,",
                      titleID: "2",
                      instanceID: null,
                    },
                    {
                      id: "gld-sgls-dlm666",
                      titleID: "3",
                      instanceID: null,
                    },
                    {
                      id: "ckwkfmwepfmwepfwef75",
                      titleID: "4",
                      instanceID: null,
                    },
                    {
                      id: "dmfklsdfsdfldsfsd-0797",
                      titleID: "5",
                      instanceID: null,
                    },
                  ],
                },
                {
                  id: "type_of_user_id2",
                  name: "PASSWORD",
                  subconditions: [],
                  instances: [
                    {
                      id: "dasmdas-mdas-lmd-asdmas6",
                      name: "TEST1",
                      subInstances: [],
                    },
                    {
                      id: "kwnfkwenflkcmvkler5",
                      name: "TEST2",
                      subInstances: [],
                    },
                  ],
                  testCaseValues: [
                    {
                      id: "dasmdas-mdas-lmd-asdmas6",
                      titleID: "1",
                      instanceID: "dasmdas-mdas-lmd-asdmas6",
                    },
                    {
                      id: "asasd-hrh-d74",
                      titleID: "2",
                      instanceID: null,
                    },
                    {
                      id: "kwnfkwenflkcmvkler5",
                      titleID: "5",
                      instanceID: "kwnfkwenflkcmvkler5",
                    },
                    {
                      id: "sdflsdf-dsfdll-35353",
                      titleID: "3",
                      instanceID: null,
                    },
                    {
                      id: "fsdf-dfldsf-sd9876",
                      titleID: "4",
                      instanceID: null,
                    },
                  ],
                },
              ],
              instances: [
                {
                  id: "tqqt22",
                  name: "MASTERCARD",
                  subInstances: [],
                },
                {
                  id: "reg445645",
                  name: "MIR",
                  subInstances: [],
                },
              ],
              testCaseValues: [
                {
                  id: "tqqt22",
                  titleID: "1",
                  instanceID: "tqqt22",
                },
                {
                  id: "reg445645",
                  titleID: "2",
                  instanceID: "reg445645",
                },
                {
                  id: "dvds-v,dsfd-sfdsf3",
                  titleID: "3",
                  instanceID: null,
                },
                {
                  id: "plekekmvdkmdlks;6",
                  titleID: "4",
                  instanceID: null,
                },
                {
                  id: "cssc-opdmm-e7778",
                  titleID: "5",
                  instanceID: null,
                },
              ],
            },
          ],
          instances: [
            {
              id: "99",
              name: "VISA",
              subInstances: [],
            },
            {
              id: "968t7tt",
              name: "MASTERCARD",
              subInstances: [],
            },
          ],
          testCaseValues: [
            {
              id: "99",
              titleID: "1",
              instanceID: "99",
            },
            {
              id: "968t7tt",
              titleID: "2",
              instanceID: "968t7tt",
            },
            {
              id: "msdasl-ldmsa-l6m6",
              titleID: "3",
              instanceID: null,
            },
            {
              id: "sdfsd44-ssmjww",
              titleID: "4",
              instanceID: null,
            },
            {
              id: "gdfgdfgd-fgfd6463",
              titleID: "5",
              instanceID: null,
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
          instances: [],
          testCaseValues: [
            {
              id: "lmsdlfl-dsfsdf-sd762b",
              titleID: "1",
              instanceID: null,
            },
            {
              id: "ddsgsd-t6llfd-lgzdf",
              titleID: "2",
              instanceID: null,
            },
            {
              id: "dnfldsn6je6lse5-5e",
              titleID: "3",
              instanceID: null,
            },
            {
              id: "mg;sdmgksdmgksld9494949--4i4i4m",
              titleID: "4",
              instanceID: null,
            },
            {
              id: "fdsmfndsmfkldsmf74849454",
              titleID: "5",
              instanceID: null,
            },
          ],
        },
        {
          id: "the_card_should_returned_id",
          name: "THE CARD SHOULD BE RETURNED",
          subconditions: [],
          instances: [
            {
              id: "efkskf-lfdfds-44",
              name: "VISA PLATINUM SUPER PLUS",
              subInstances: [],
            },
          ],
          testCaseValues: [
            {
              id: "fdfndsljfdslf8dsf8ds",
              titleID: "1",
              instanceID: null
            },
            {
              id: "efkskf-lfdfds-44",
              titleID: "3",
              instanceID: "efkskf-lfdfds-44"
            },
            {
              id: "fdsfmdskfmdskf993393",
              titleID: "2",
              instanceID: null
            },
            {
              id: "dsfjsdklflkdsfds-345345",
              titleID: "4",
              instanceID: null
            },
            {
              id: "dfdsfmdsmf-dslfdsf--404404d",
              titleID: "5",
              instanceID: null
            },
          ],
        },
      ],
    },
  ],
};
