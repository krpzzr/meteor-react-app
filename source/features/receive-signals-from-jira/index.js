import {register_server_http_response_route}          from "../../network/register-http-response-route";
import {process_jira_webapp_added_event_message}      from "../../network/jira-event-routes/webapp-added";
import {process_jira_new_issue_created_event_message} from "../../network/jira-event-routes/issue-created";
import {process_jira_issue_updated_event_message_NP}  from "../../network/jira-event-routes/issue-updated.js";

import {appConfig} from "../../../app.config";

// Jira webhooks will send requests ttf addresses:
register_server_http_response_route(
  "/jira-webapp-added",
  process_jira_webapp_added_event_message,
  appConfig,
);
register_server_http_response_route(
  "/jira-issue-created",
  process_jira_new_issue_created_event_message,
  appConfig.telescopeProcessFieldId,
);
register_server_http_response_route(
  "/jira-issue-updated",
  process_jira_issue_updated_event_message_NP,
  appConfig.telescopeProcessFieldId,
);
