import {ReqSets} from "../../data/collections-init";
import {produce} from "immer";
import {extract_domain_scenario_testCase_names_from} from "./common.js";

/**
 * @description: Process Jira New Issue Created Event Message
 * @exampleInput: {jira_event_payload}, "customfield_10052"
 * @exampleOutput: true
 * @pure: calls impure function
 * @hasPassingTests: false
 */
export function process_jira_new_issue_created_event_message(payload, telescopeProcessFieldId) {
  // try {
  // const fieldIdExistsInPaylod = payload.body?.issue?.fields ? [telescopeProcessFieldId];
  // prettier-ignore
  const fieldIdExistsInPaylod
     = payload.body
    && payload.body.issue
    && payload.body.issue.fields
    && payload.body.issue.fields[telescopeProcessFieldId]
    && payload.body.issue.fields[telescopeProcessFieldId].value;
  if (!fieldIdExistsInPaylod) {
    throw Error(
      `Jira "new issue event message" payload doesnt adhere ttf scheme: body.issue.fields.${telescopeProcessFieldId}.value`,
    );
  }
  const testCasePath = payload.body.issue.fields[telescopeProcessFieldId].value;
  const testCaseAddress = extract_domain_scenario_testCase_names_from(testCasePath);
  const issueId = payload.body.issue.key;
  const issueStatus = payload.body.issue.fields.status.name;
  const dataForDb = [...testCaseAddress, issueId, issueStatus];
  const dbRes = db_add_hasDefects_flag_and_issueId_to_test_case_IO(dataForDb);
  const res = dbRes === 1 ? true : false;

  return res;
}

/**
 * @description: Write to the test case that it has defects and which issue in jira reports the defect
 * @exampleInput: ["SAP", "TestSheet2", "STRAIGHT THROUGH", "AUT-256", "Backlog"]
 * @exampleOutput: 1
 * @pure: writes to db
 * @hasPassingTests: false
 */
function db_add_hasDefects_flag_and_issueId_to_test_case_IO(data) {
  const [requirementSetName, requirementName, testCaseName, issueId, issueStatus] = data;
  const result = db_set_issueStatus_and_issueId_on_test_case__NP(
    requirementSetName,
    requirementName,
    testCaseName,
    issueId,
    issueStatus,
  );
  return result;
}

export function db_set_issueStatus_and_issueId_on_test_case__NP(
  requirementSetName,
  requirementName,
  testCaseName,
  issueId,
  issueStatus,
) {
  const doc = ReqSets.findOne({
    Name: requirementSetName,
    // Requirements: {$elemMatch: {Name: requirementName}},
  });

  const newDoc = produce(doc, (draft) => {
    // prettier-ignore
    const allTestCases = draft.Requirements
      // Find requirement with needed name
      .filter((requirement) => requirement.Name === requirementName)[0]
      .TestCases;
    // Find test case with needed name
    const testCaseObjRef = allTestCases.filter((testCase) => testCase.Name === testCaseName)[0];
    if (testCaseObjRef) {
      testCaseObjRef.IssueId = issueId;
      testCaseObjRef.IssueStatus = issueStatus;

      // If issue relates not to test case but to a test case template
    } else {
      // prettier-ignore
      const testCaseDesignItemRef = allTestCases
        // Find all test case templates
        .filter((testCase) => testCase.IsTemplate)
        // Find the test case whose TestCaseDesign contains needed name
        .find((testCase) => testCase.TestCaseDesign
          .some((design) => design.Name === testCaseName))
        // Find TestCaseDesign item with needed name
        .TestCaseDesign.find((design) => design.Name === testCaseName);

      testCaseDesignItemRef.IssueId = issueId;
      testCaseDesignItemRef.IssueStatus = issueStatus;
    }

    return draft;
  });

  const result = ReqSets.update({Name: requirementSetName}, newDoc);
  return result;
}
