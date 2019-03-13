// @flow strict
/* eslint-disable no-console */

import {pipe}                                            from "../../utility-belt/fp";
import {make_obj_props_access_safe}                      from "../../utility-belt/objects.js";
import {extract_domain_scenario_testCase_names_from}     from "./common.js";
import {db_set_issueStatus_and_issueId_on_test_case__NP} from "./issue-created.js";

import {appConfig} from "../../../app.config.js";

type Payload = {
  body: {
    changelog: {
      items: ChangeRecords,
    },
    issue: {
      fields: Object,
      key: string,
    },
  },
};

type ChangeRecords = Array<ChangeRecord>;

type ChangeRecord = {
  field: string,
  fieldtype: string,
  fieldId: string,
  from: string,
  fromString: string,
  to: string,
  tostring: string,
};

/**
 * @description: Process Jira issue updated event message
 * @exampleInput: {jira_event_payload}
 * @exampleOutput: true | false
 * @pure: calls impure fn
 */
// null is a type used in tests
export function process_jira_issue_updated_event_message_NP(payload: Payload | null): boolean {
  return pipe(payload).thru(
    validate_payload_format,
    validate_that_changes_are_to_issue_status,
    db_change_issue_status__NP,
  );
}

/**
 * @description: Validates that payload data is of correct format
 * @exampleInput: {payload}
 * @exampleOutput: false | {payload}
 * @pure:
 */
// null is a type used in tests
export function validate_payload_format(payload: Payload | null): Payload | false {
  if (payload === null) {
    return false;
  }
  const safePayloadObj = make_obj_props_access_safe(payload);
  const formatIsOk = safePayloadObj.body.changelog.items.length() > 0;
  if (!formatIsOk) {
    console.log(
      `Jira "issue-updated event message" payload doesnt adhere ttf scheme: \n
      payload.body.changelog.items[>0]`,
    );
    return false;
  }
  return payload;
}

/**
 * @description: Validates that what's changed - is the issue Status field
 * @exampleInput: false | {payload}
 * @exampleOutput: false | {payload}
 * @pure:
 */
export function validate_that_changes_are_to_issue_status(
  payload: Payload | false,
): Payload | false {
  if (payload === false) {
    return false;
  }

  const changeRecordsRef: ChangeRecords = payload.body.changelog.items;

  // prettier-ignore
  const changeRecordIsValid = changeRecordsRef.some(
    (changeRecord) => changeRecord.field     === "status"
                   && changeRecord.fieldtype === "jira"
                   && changeRecord.fieldId   === "status"
  );

  if (!changeRecordIsValid) {
    return false;
  }
  return payload;
}

/**
 * @description: Write status changes in the corresponding issue to db
 * @exampleInput: {payload} | false
 * @exampleOutput: true | false
 * @pure: writes to db; access outside var
 */
export function db_change_issue_status__NP(payload: Payload | false): boolean {
  if (payload === false) {
    return false;
  }

  const issueId = payload.body.issue.key;
  // prettier-ignore
  const changeRecord = payload.body.changelog.items.find(
    (item) => item.field === "status"
           && item.fieldtype === "jira"
           && item.fieldId === "status",
  );
  //$FlowFixMe
  const newStatus = changeRecord.toString;
  const testCasePath = payload.body.issue.fields[appConfig.telescopeProcessFieldId].value;
  const [
    requirementSetName,
    requirementName,
    testCaseName,
  ] = extract_domain_scenario_testCase_names_from(testCasePath);

  const dbRes = db_set_issueStatus_and_issueId_on_test_case__NP(
    requirementSetName,
    requirementName,
    testCaseName,
    issueId,
    newStatus,
  );

  return dbRes === 1 ? true : false;
}
