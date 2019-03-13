// @flow strict

export type RequirementSet = {|
  _id: string,
  Description: string,
  Name: string,
  Requirements: Array<{|
    Name: string,
    // eslint-disable-next-line
    TestCases: Array<
      | {|
          IsTemplate: false,
          Name: string,
          TestCaseDesign: null,
          TestSteps: Array<{|Name: string, TestStepValues: Array<empty>|}>,
          UniqueId: string,
          IssueId?: string,
          IssueStatus?: string,
        |}
      | {|
          IsTemplate: true,
          Name: string,
          TestCaseDesign: Array<{|
            Attributes: Array<{|Name: string, Value: string|}>,
            Name: string,
          |}>,
          TestSteps: Array<{|
            Name: string,
            TestStepValues: Array<{|
              ActionMode: string,
              DataType: string,
              Name: string,
              Value: string,
            |}>,
          |}>,
          UniqueId: string,
          IssueId?: string,
          IssueStatus?: string,
        |}
      | {|
          IsTemplate: false,
          Name: string,
          TestCaseDesign: null,
          TestSteps: Array<{|
            Name: string,
            TestStepValues: Array<{|
              ActionMode: string,
              DataType: string,
              Name: string,
              Value: string,
            |}>,
          |}>,
          UniqueId: string,
          IssueId?: string,
          IssueStatus?: string,
        |},
    >,
    UniqueId: string,
  |}>,
|};
