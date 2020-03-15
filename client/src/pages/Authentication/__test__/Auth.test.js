import React from 'react';
import ReactDOM from 'react-dom';
import AuthPage from '../Auth';
import renderer from 'react-test-renderer';
import { MockedProvider } from '@apollo/react-testing';
import { SIGN_UP } from '../Auth';

const mocks = [
  {
    request: {
      query: SIGN_UP,
      variables: {
        firstName: "Test",
        lastName: "Test",
        email: "test@test.com",
        password: "testPassword",
      }
    },
    result: {
      data: {
        createUser: { id: '1', email: 'test@test.com' },
      },
    },
  },
];

it('renders without error', () => {
  renderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <AuthPage />
    </MockedProvider>,
  );
});