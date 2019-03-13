// noinspection MagicNumberJS
export default {
  Name: "TestSheet3",
  Domain: "SAP",
  TestCases: [
    {
      Name: "STRAIGHT THROUGH",
      Values: ["", "DATA 1", "10,000", 3, "TYPE 1", "Z", "TODAY", 100, "PROPERTY", "NONE",
               "[CLICK]",
               "OK"]
    },
    {
      Name: "INBUSINESS CLIENT",
      Values: ["", "DATA 2", "10,000", 3, "TYPE 1", "Z", "TODAY", 80, "PROPERTY", "NONE", "[CLICK]",
               "OK"]
    },
    {
      Name: "5,000",
      Values: ["", "DATA 3", "5,000", 3, "TYPE 2", "Z", "YESTERDAY", 68, "PROPERTY", "NONE",
               "[CLICK]",
               "OK"]
    },
    {
      Name: "20,000",
      Values: ["", "DATA 4", "20,000", 3, "TYPE 1", "Z", "TODAY", 50, "PROPERTY", "NONE", "[CLICK]",
               "OK"],
    },
    {
      Name: "40,000",
      Values: ["", "DATA 5", "40,000", 3, "TYPE 2", "Z", "YESTERDAY", 30, "PROPERTY", "NONE",
               "[CLICK]",
               "OK"]
    },
    {
      Name: "10,000",
      Values: ["", "DATA 6", "10,000", 1, "TYPE 1", "Z", "TODAY", 100, "PROPERTY", "NONE",
               "[CLICK]",
               "OK"]
    }
  ],
  Attributes: [
    {
      Name: "ADMINISTRATION",
      BusinessRelevant: "no",
      Conditions: ["",]
    },
    {
      Name: "PRECONDITION",
      BusinessRelevant: "yes",
      Conditions: [
        "CUSTOMER DATA",
        "AMOUNT",
        "DURATION",
        {
          Name: "INTEREST",
          Subconditions: [
            {
              Name: "TYPE",
              Subconditions: ["INSTANCES", "CLASS", "MODIFIED"]
            },
            "PERCENT"]
        }
      ]
    },
    {
      Name: "PROCESS",
      BusinessRelevant: "yes",
      Conditions: [
        {
          Name: "CREDIT MASTER DATA",
          Subconditions: ["SECURITY 1", "SECURITY 2", "SAVE"]
        }
      ]
    },
    {
      Name: "VERIFICATION",
      BusinessRelevant: "result",
      Conditions: [
        "CREDIT STATUS",
      ]
    }
  ]
};
