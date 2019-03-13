/* eslint-disable fp/no-mutation,no-console,lines-around-comment */
// @flow strict
import {produce} from "immer";
import {
  db_change_issue_status__NP,
  process_jira_issue_updated_event_message_NP,
  validate_payload_format,
  validate_that_changes_are_to_issue_status,
} from "./issue-updated";

import {ReqSets} from "../../data/collections-init.js";
import {reqSets} from "../../data/fixtures/requirement-sets.js";
import {appConfig} from "../../../app.config.js";

const correctPayload = {
  body: {
    changelog: {
      id: "14027",
      items: [
        {
          field: "resolution",
          fieldId: "resolution",
          fieldtype: "jira",
          from: null,
          fromString: null,
          to: "10000",
          tostring: "Done",
        },
        {
          field: "status",
          fieldtype: "jira",
          fieldId: "status",
          from: "10009",
          fromString: "Champion",
          to: "10000",
          tostring: "Backlog",
        },
      ],
    },
    issue: {
      key: "AUT-999",
      fields: {
        [appConfig.telescopeProcessFieldId]: {
          value: "Telescope - Log in - Manual",
        },
      },
    },
  },
};
const incorrectPayload = null;
const payloadWithChangesNotToStatusField = produce(correctPayload, (draft) => {
  draft.body.changelog.items[1].field = "buka";
  draft.body.changelog.items[1].fieldtype = "kuka";
  draft.body.changelog.items[1].fieldId = "puka";
});
const payloadWithIncorrectFormat = produce(correctPayload, (draft) => {
  // eslint-disable-next-line fp/no-delete
  delete draft.body.changelog.items;
});
const [changeRecord] = correctPayload.body.changelog.items;
const issueId = correctPayload.body.issue.key;

const Name = "testReqSet";
const testReqSetDoc = {
  ...reqSets,
  Name,
};

describe("App can process jira Issue Updated event", () => {
  describe("Fn process_jira_issue_updated_event_message_NP", () => {
    it("returns false for invalid payload", () => {
      const result = process_jira_issue_updated_event_message_NP(incorrectPayload);
      expect(result).toBe(false);
    });

    it("changes issue status in the db", () => {
      // const result = process_jira_issue_updated_event_message_NP(correctPayload);
      // expect(result).toBe(true);
    });

    it("returns true when operations finished sucessfully", () => {
      const result = process_jira_issue_updated_event_message_NP(correctPayload);
      expect(result).toBe(true);
    });
  });

  describe("Fn validate payload format", () => {
    it("returns false for invalid payload", () => {
      const result = validate_payload_format(incorrectPayload);
      expect(result).toBe(false);
    });

    it("prints to console for invalid payload", () => {
      //$FlowFixMe
      // console.log = jest.fn();
      const spy = jest.spyOn(console, "log");
      const errorText = `Jira "issue-updated event message" payload doesnt adhere ttf scheme: \n
      payload.body.changelog.items[>0]`;
      //$FlowFixMe
      validate_payload_format(payloadWithIncorrectFormat);
      // expect(console.log.mock.calls[0][0]).toBe(errorText);
      expect(spy).toHaveBeenCalledWith(errorText);
    });

    it("returns payload for valid payload", () => {
      const result = validate_payload_format(correctPayload);
      expect(result).toBe(correctPayload);
    });
  });

  describe("Fn validate_that_changes_are_to_issue_status", () => {
    it("returns false when payload is invalid", () => {
      const result = validate_that_changes_are_to_issue_status(false);
      expect(result).toBe(false);
    });

    it("returns false when changes_are not to_the_issue_status", () => {
      const result = validate_that_changes_are_to_issue_status(payloadWithChangesNotToStatusField);
      expect(result).toBe(false);
    });

    it("returns payload when changes_are_to_the_issue_status", () => {
      const result = validate_that_changes_are_to_issue_status(correctPayload);
      expect(result).toEqual(correctPayload);
    });
  });

  describe("Fn db_change_issue_status__NP", () => {
    it("returns false when payload is invalid", () => {
      const result = db_change_issue_status__NP(false);
      expect(result).toBe(false);
    });

    it("changes issue status in the db", () => {
      ReqSets.insert(testReqSetDoc);
      console.log(ReqSets.findOne())
      const result = db_change_issue_status__NP(correctPayload);
      const okResult = true;
      expect(result).toBe(okResult);
      const insertedDoc = ReqSets.findOne(testReqSetDoc);
      expect(insertedDoc).toEqual(testReqSetDoc);
    });

    it("returns true if db write is sucessful", () => {
      const result = db_change_issue_status__NP(correctPayload);
      expect(result).toEqual(true);
    });
  });
});
