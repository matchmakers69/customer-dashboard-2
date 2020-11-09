import React, { useEffect } from 'react';

const Bomb = () => {
  useEffect(() => {
    throw new Error('Boom!');
  });

  return <p>Boom!</p>;
};

export default Bomb;
