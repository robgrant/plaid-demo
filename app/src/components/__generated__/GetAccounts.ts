/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAccounts
// ====================================================

export interface GetAccounts_accounts_balances {
  __typename: "Balances";
  current: number;
  isoCurrencyCode: string | null;
}

export interface GetAccounts_accounts {
  __typename: "Account";
  id: string;
  name: string;
  type: string;
  subtype: string;
  balances: GetAccounts_accounts_balances;
}

export interface GetAccounts {
  accounts: GetAccounts_accounts[];
}

export interface GetAccountsVariables {
  accessToken: string;
}
