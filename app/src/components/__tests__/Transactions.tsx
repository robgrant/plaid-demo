import React from "react";
import renderer from "react-test-renderer";
import { Transactions, query } from "../Transactions";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

describe("Transactions", () => {
  it("renders when transactions are returned", async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query,
          variables: { accessToken: "accessToken", accountID: "accountID" },
        },
        result: {
          data: {
            transactions: [
              {
                id: "wP7AMWDnr4SpEaR9GlyetbBqZWGwkgurzG7Rb",
                name: "Uber 063015 SF**POOL**",
                date: "2020-10-12",
                isoCurrencyCode: "USD",
                amount: 5.4,
              },
              {
                id: "5lQxPvzKqWHwbvVzR8AqSd7NVyP36GiZXvPyD",
                name: "United Airlines",
                date: "2020-10-10",
                isoCurrencyCode: "USD",
                amount: -500,
              },
              {
                id: "JpravMdgo3sdeo6LD3lGfjgM9N7vlptdXArMr",
                name: "McDonald's",
                date: "2020-10-09",
                isoCurrencyCode: "USD",
                amount: 12,
              },
            ],
          },
        },
      },
    ];

    const component = renderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Transactions accessToken="accessToken" accountID="accountID" />
      </MockedProvider>
    );

    expect(component.toJSON()).toMatchSnapshot();

    await renderer.act(() => new Promise((resolve) => setTimeout(resolve, 0)));

    expect(component.toJSON()).toMatchSnapshot();
  });

  it("renders when the account has no transactions", async () => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query,
          variables: { accessToken: "accessToken", accountID: "accountID" },
        },
        result: {
          data: {
            transactions: [],
          },
        },
      },
    ];

    const component = renderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Transactions accessToken="accessToken" accountID="accountID" />
      </MockedProvider>
    );

    expect(component.toJSON()).toMatchSnapshot();

    await renderer.act(() => new Promise((resolve) => setTimeout(resolve, 0)));

    expect(component.toJSON()).toMatchSnapshot();
  });
});
