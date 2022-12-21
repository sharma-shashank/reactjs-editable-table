import React, { useRef } from 'react';

export default function SearchBar(props) {
  const userInput = useRef();

  const handleChange = () => {
    const text = userInput.current.value;
    props.onUserInput(text);
  }

  return (
      <>
        <input type="text" placeholder="Search..." className='col-md-6' value={props.filterText} ref={userInput} onChange={handleChange}/>
      </>

    );
 }