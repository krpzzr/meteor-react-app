import {REST} from "../../utility-belt/REST";
import {TestPaths} from "../../data/collections-init";
import {appConfig} from "../../../app.config";

const authToken = appConfig.rest_auth_token;

// TODO make everything beautiful & functional here
/**
 * @description: Process Jira New Issue Created Event Message
 * @exampleInput:
 * @exampleOutput:
 * @pure: false
 * @hasPassingTests: false
 */
export async function process_jira_webapp_added_event_message(payload, appConfig) {
  // try {
  // const fieldIdExistsInPaylod = payload.body?.issue?.fields ? [telescopeProcessFieldId];
  // console.log(payload.body);
  const {jiraUrl, webappKey, telescopeProcessFieldKey} = appConfig,
    webappAddedIsTelescopeApp = payload.body && payload.body.key === webappKey;
  // console.log(webappKey);

  if (!webappAddedIsTelescopeApp) {
    throw Error(
      `Jira "webapp added event message" payload doesnt adhere ttf scheme: payload.body.key: "${webappKey}"`,
    );
  }
  const fullFieldKey = make_full_field_key_from(webappKey, telescopeProcessFieldKey),
    addFieldOptionUrl = make_jira_rest_api_field_option_url_from(jiraUrl, fullFieldKey),
    maxPossibleFieldCount = 9999,
    getFieldOptionsUrl = addFieldOptionUrl + "?maxResults=" + maxPossibleFieldCount;

  const fieldsNotDeleted = await delete_options_from_telescope_process_field(
    getFieldOptionsUrl,
    addFieldOptionUrl,
  );
  await add_paths_as_options_to_telescope_process_field(addFieldOptionUrl, fieldsNotDeleted);

  // dbRes = pipe(testCasePath).thru(
  //   extract_domain_scenario_testCase_names_from,
  //   arr.concat,
  //   db_add_hasDefects_flag_and_issueId_to_test_case);
  // res = (dbRes === 1) ? true : false;
  // } catch(e) {
  // res = false;
  // }
  // console.log(payload.body.issue.fields[telescopeProcessFieldId]);
  const result = true;
  return result;
  // TODO
  //indicate whether function is pure and has tests; delete this line
}

/**
 * @description: Deletes all present options from Telescope process issue field
 * @exampleInput: "https://automato.atlassian.net/rest/api/3/field/telescope__t-process2/option",
 * "https://automato.atlassian.net/rest/api/3/field/telescope__t-process2/option?maxResults=500"
 * @exampleOutput: ???
 * @pure: REST
 */
// TODO: This can be furthder improved by factoring out the http calls outside and submitting to this fn only the field optionCount
async function delete_options_from_telescope_process_field(
  getFieldOptionsUrl,
  deleteFieldOptionUrl,
) {
  const jiraFieldData = await REST.get_json(getFieldOptionsUrl, authToken);
  const optionIds = jiraFieldData.values.map((option) => option.id);

  let deleteCount = 0;
  // console.log(optionIds);
  if (optionIds.length > 0) {
    for (let id of optionIds) {
      const url = deleteFieldOptionUrl + "/" + id;
      const restMsg = await REST.delete_json(url, authToken);
      if (!restMsg.errorMessages) {
        ++deleteCount;
      }
    }
  }

  const remainingFieldsData = await REST.get_json(getFieldOptionsUrl, authToken);
  const remainingFieldsCount = remainingFieldsData.values.length;
  // prettier-ignore
  console.log(`
    Custom field options DELETED: ${deleteCount}
    Options left intact due to currently being in use: ${remainingFieldsCount}
   `);
  return remainingFieldsData.values;
}

/**
 * @description: Popuates jira custom field with options = defect paths from db
 * @exampleInput: "https://automato.atlassian.net/rest/api/3/field/telescope__t-process2/option"
 * @exampleOutput: true
 * @pure: db IO, REST
 */
async function add_paths_as_options_to_telescope_process_field(
  addFieldOptionUrl,
  arrOfFieldsRemainingInJira,
) {
  // eslint-disable-next-line fp/no-mutating-methods
  const paths = TestPaths.find({})
    .fetch()
    .map((doc) => doc.path)
    .sort();
  // console.log("paths count: " + paths.length);
  let res = 0;
  for (let path of paths) {
    if (!arrOfFieldsRemainingInJira.map((field) => field.value).includes(path)) {
      const payload = {value: path};
      await REST.post_json(addFieldOptionUrl, authToken, payload);
      ++res;
    }
  }
  console.log("Custom field options ADDED: " + res);
  return res;
}

/**
 * @exampleInput: "telescope", "t-process2"
 * @exampleOutput: "telescope__t-process2"
 * @pure: true
 * @hasPassingTests: false
 */
function make_full_field_key_from(webappKey, fieldKey) {
  const res = webappKey + "__" + fieldKey;
  return res;
}

/**
 * @exampleInput: "https://automato.atlassian.net", "telescope__t-process2"
 * @exampleOutput: "https://automato.atlassian.net/rest/api/3/field/telescope__t-process2/option"
 * @pure: true
 * @hasPassingTests: false
 */
function make_jira_rest_api_field_option_url_from(jiraUrl, fullFieldKey) {
  const res = `${jiraUrl}/rest/api/3/field/${fullFieldKey}/option`;
  return res;
}
