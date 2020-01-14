import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Home:React.FC<{ initial?: number }> = ({ initial = 0 }) => {
  // since we pass a number here, clicks is going to be a number.
  // setClicks is a function that accepts either a number or a function returning
  // a number
  const [clicks, setClicks] = useState(initial);
  return (
    <>
      <p>
      Clicks:
        {' '}
        {clicks}
      </p>
      <button type="button" onClick={() => setClicks(clicks + 1)}>+</button>
      <button type="button" onClick={() => setClicks(clicks - 1)}>-</button>
    </>
  );
};

Home.propTypes = {
  initial: PropTypes.number,
};

Home.defaultProps = {
  initial: 0,
};

export default Home;
