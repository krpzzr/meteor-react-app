//@flow

// curl --request GET \
//   --url 'https://automato.atlassian.net/rest/api/3/application-properties' \
//   --user "kat100500@outlook.com:w6JGW006OafNBX1ERgSl" \
//   --header 'Accept: application/json'

// Steps to create Authorization header
// !but you don't need it if you run the code in console while being logged in to your jira project
// https://developer.atlassian.com/cloud/jira/platform/jira-rest-api-basic-authentication/
// Get your jira user api token
// api_token="uNc69Df9UudNKwEB3Eb36F34"
// username = "kat100500@outlook.com"
// Make a string of them
// kat100500@outlook.com:uNc69Df9UudNKwEB3Eb36F34
// base64 encode:
// a2F0MTAwNTAwQG91dGxvb2suY29tOnVOYzY5RGY5VXVkTkt3RUIzRWIzNkYzNA==

import fetch from "node-fetch";

export const REST = {get_json, post_json, delete_json};

type url = string;
type authToken = string;
type payload = Object;
type printResponse = boolean;

function get_json(url: url, authToken: authToken, printResponse: printResponse) {
  return send_http_request(url, "GET", authToken, "application/json", false, printResponse);
}

function post_json(url: url, authToken: authToken, payload: payload, printResponse: printResponse) {
  return send_http_request(url, "POST", authToken, "application/json", payload, printResponse);
}

function delete_json(url: url, authToken: authToken, printResponse: printResponse) {
  return send_http_request(url, "DELETE", authToken, "application/json", false, printResponse);
}

/*
async function send_http_request(
  url: string,
  method: "GET" | "POST" | "DELETE",
  authToken: string,
  contentType: string,
  payload?: {},
  printResponse: boolean) {
*/
async function send_http_request(
  url: url,
  method: "GET" | "POST" | "DELETE",
  authToken: authToken,
  contentType: "application/json" | "application/xml",
  payload: Object | false,
  printResponse: boolean,
) {
  const options = {
    method: method,
    // mode: "no-cors",
    headers: {
      Authorization: "Basic " + authToken,
      Accept: contentType,
      "Content-Type": contentType,
    },
  };
  const body = payload ? JSON.stringify(payload) : false;
  const optionsWithBody = Object.assign({}, options, {body});
  const response = payload ? await fetch(url, optionsWithBody) : await fetch(url, options);
  const statusCodeOk = 200;
  const statusCodeOkNoContent = 204;

  // Use immediatelly invoked fn here to set const result through branching conditions
  // response.json() returns a Promise - thus the 'await' for it to resolve
  const result = await (function() {
    if (response.status === statusCodeOkNoContent) {
      return response.status;
    }
    return contentType === "application/json" ? response.json() : "need to parse xml";
  })();

  if (
    printResponse
    || (response.status !== statusCodeOk && response.status !== statusCodeOkNoContent)
  ) {
    console.log(method + " status: " + response.status);
    console.log(JSON.stringify(result, null, 2));
  }
  return result;
}
