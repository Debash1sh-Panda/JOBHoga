import React from 'react';

function Button({ name, onClick }) {
  return (
    <button
      className=" px-6 py-2 font-semibold rounded-md text-white bg-gradient-to-r from-black to-red-500 hover:from-gray-600 hover:to-red-400 hover:text-black"
      onClick={onClick}
    >
      {name}
    </button>
  );
}

export default Button;
