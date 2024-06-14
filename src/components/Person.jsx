import React from 'react';

const Person = ({id, person, removePerson}) => {


    return (
        <li key={id}>
            {person.name} - {person.number}
            <button onClick={() => {if(window.confirm(`Delete ${person.name}?`)){removePerson(person.id)};}}>
                Delete
            </button>
        </li>
    )
}
export default Person