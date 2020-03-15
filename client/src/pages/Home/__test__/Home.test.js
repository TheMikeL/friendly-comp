import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from '../Home';

import { render } from '@testing-library/react';

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<HomePage/>, div);
});