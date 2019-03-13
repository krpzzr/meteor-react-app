// @flow strict
/* eslint-disable max-len */

export const reqSets = {
  _id: "39ea99f8-29a1-574a-f65a-6703a604e13f",
  Description: "",
  Name: "Telescope",
  Requirements: [
    {
      Name: "Log in",
      TestCases: [
        {
          IsTemplate: false,
          Name: "Hardcoded values",
          TestCaseDesign: null,
          TestSteps: [
            {
              Name: "PRECONDITION",
              TestStepValues: [
                {
                  ActionMode: "Input",
                  DataType: "String",
                  Name: "username",
                  Value: "john doe",
                },
                {
                  ActionMode: "Input",
                  DataType: "Password",
                  Name: "password",
                  Value:
                    "21489a0b-c163-4a62-b61e-501090c9506aMgAxADQAOAA5AGEAMABiAC0AYwAxADYAMwAtADQAYQA2ADIALQBiADYAMQBlAC0ANQAwADEAMAA5ADAAYwA5ADUAMAA2AGEADYNuIQe8Xbt85uevX+hL/g==",
                },
                {
                  ActionMode: "Input",
                  DataType: "String",
                  Name: "Login",
                  Value: "{Click}",
                },
              ],
            },
          ],
          UniqueId: "39ea9a0e-9a4c-12b9-a5d1-13a5e1467d61",
        },
        {
          IsTemplate: true,
          Name: "Automated tpl",
          TestCaseDesign: [
            {
              Name: "User 1",
              Attributes: [
                {
                  Name: "Username",
                  Value: "Liza",
                },
                {
                  Name: "Pwd",
                  Value: "some pwd",
                },
                {
                  Name: "Additional info",
                  Value: "it's a girl?",
                },
              ],
            },
          ],
          TestSteps: [
            {
              Name: "Given",
              TestStepValues: [
                {
                  ActionMode: "Input",
                  DataType: "String",
                  Name: "username",
                  Value: "{XL[Username]}",
                },
                {
                  ActionMode: "Input",
                  DataType: "Password",
                  Name: "password",
                  Value:
                    "21489a0b-c163-4a62-b61e-501090c9506aMgAxADQAOAA5AGEAMABiAC0AYwAxADYAMwAtADQAYQA2ADIALQBiADYAMQBlAC0ANQAwADEAMAA5ADAAYwA5ADUAMAA2AGEADYNuIQe8Xbt85uevX+hL/g==",
                },
                {
                  ActionMode: "Input",
                  DataType: "String",
                  Name: "Login",
                  Value: "{Click}",
                },
              ],
            },
          ],
          UniqueId: "39ea9a17-3414-6312-416d-46014daf348f",
        },
        {
          IsTemplate: false,
          Name: "Manual",
          TestCaseDesign: null,
          TestSteps: [
            {
              Name: "Open browser",
              TestStepValues: [],
            },
            {
              Name: "Enter username",
              TestStepValues: [],
            },
            {
              Name: "Enter pwd",
              TestStepValues: [],
            },
          ],
          UniqueId: "39ea99f9-111a-813a-130a-cde964a804fa",
        },
      ],
      UniqueId: "39ea99f8-9253-7128-678a-5b04a386d709",
    },
  ],
};
