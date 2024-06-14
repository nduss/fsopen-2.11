import React from 'react';

const Search = ({searchString, onChange}) => {


    return (
        <div>
        <p>Search:</p>
        <input value={searchString} onChange={onChange} />
      </div>
    )
}
export default Search