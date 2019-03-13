// noinspection MagicNumberJS
export default {
  Name: "TestSheet2",
  Domain: "SAP",
  TestCases: [
    {
      Name: "STRAIGHT THROUGH",
      Values: ["", "VISA", 100, "", 100, 0, ""],
    },
    {
      Name: "WITHDRAW 100 FROM MASTERCARD",
      Values: ["", "MASTERCARD", 100, "", 100, 0, ""],
    },
    {
      Name: "WITHDRAW 70",
      Values: ["", "VISA", 70, "", 70, 30, ""]
    },
    {
      Name: "WITHDRAW 30 FROM MASTERCARD",
      Values: ["", "MASTERCARD", 30, "", 30, 70, ""]
    },
    {
      Name: "WITHDRAW 10 FROM MASTERCARD",
      Values: ["", "MASTERCARD", 10, "", 10, 90, ""]
    }
  ],
  Attributes: [
    {
      Name: "GIVEN",
      BusinessRelevant: "yes",
      Conditions: [
        "WE HAVE A VALID ACCOUNT WITH A STARTING AMOUNT OF 100",
        "AND WE INTRODUCE A CARD ${CARD_TYPE}"
      ]
    },
    {
      Name: "WHEN",
      BusinessRelevant: "yes",
      Conditions: [
        "THE ACCOUND HOLDER REQUESTS ${AMOUNT}",
        "AND THE MONEY IS BOOKED FROM YOUR ACCOUNT",
        "AND THE ATM SHOULD DISPENSE ${AMOUNT}"
      ]
    },
    {
      Name: "THEN",
      BusinessRelevant: "result",
      Conditions: [
        "THE ACCOUNT BALANCE SHOULD BE ${ENDING_BALANCE}",
        "AND THE CARD SHOULD BE RETURNED"
      ]
    }
  ]
};
