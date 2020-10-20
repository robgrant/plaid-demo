import React from "react";
import renderer from "react-test-renderer";
import { Accounts, query } from "../Accounts";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

const mocks: MockedResponse[] = [
  {
    request: {
      query,
      variables: { accessToken: "accessToken" },
    },
    result: {
      data: {
        accounts: [
          {
            id: "V3e1vboRKMCLdWa1yMPlsk1jo94AZMuWgqyv8",
            name: "Plaid Checking",
            type: "depository",
            subtype: "checking",
            balances: {
              current: 110,
              isoCurrencyCode: "USD",
            },
          },
          {
            id: "wP7AMWDnr4SpEaR9GlyetbBq7mQWrnfrZERav",
            name: "Plaid Saving",
            type: "depository",
            subtype: "savings",
            balances: {
              current: 210,
              isoCurrencyCode: "USD",
            },
          },
          {
            id: "5lQxPvzKqWHwbvVzR8AqSd7NJ9EylBCZKGyEv",
            name: "Plaid CD",
            type: "depository",
            subtype: "cd",
            balances: {
              current: 1000,
              isoCurrencyCode: "USD",
            },
          },
          {
            id: "JpravMdgo3sdeo6LD3lGfjgMo8eNb3fd6QMGy",
            name: "Plaid Credit Card",
            type: "credit",
            subtype: "credit card",
            balances: {
              current: 410,
              isoCurrencyCode: "USD",
            },
          },
          {
            id: "klKb37XZgVH9QNmB6XMysGjyKdpzo4sW6JD3Q",
            name: "Plaid Money Market",
            type: "depository",
            subtype: "money market",
            balances: {
              current: 43200,
              isoCurrencyCode: "USD",
            },
          },
          {
            id: "lkrWxegM8ws4APq6GWDXs5ZE6aLjK1SZoag5W",
            name: "Plaid IRA",
            type: "investment",
            subtype: "ira",
            balances: {
              current: 320.76,
              isoCurrencyCode: "USD",
            },
          },
          {
            id: "q3dXPL5gnzCearbBW9o1hzaNdX3ZwBCdr6P5G",
            name: "Plaid 401k",
            type: "investment",
            subtype: "401k",
            balances: {
              current: 23631.9805,
              isoCurrencyCode: "USD",
            },
          },
          {
            id: "Kozav1w8gxuaQDkXpxq4s8AMb4q3wxCVpEkjQ",
            name: "Plaid Student Loan",
            type: "loan",
            subtype: "student",
            balances: {
              current: 65262,
              isoCurrencyCode: "USD",
            },
          },
          {
            id: "rxaRkpX8bBUQNz9kGKZwHe5a8ydnNgslJd9XX",
            name: "Plaid Mortgage",
            type: "loan",
            subtype: "mortgage",
            balances: {
              current: 56302.06,
              isoCurrencyCode: "USD",
            },
          },
        ],
      },
    },
  },
];

describe("Accounts", () => {
  it("renders", async () => {
    const component = renderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Accounts accessToken="accessToken" />
      </MockedProvider>
    );

    expect(component.toJSON()).toMatchSnapshot();

    await renderer.act(() => new Promise((resolve) => setTimeout(resolve, 0)));

    expect(component.toJSON()).toMatchSnapshot();
  });
});
