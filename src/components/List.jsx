import React from 'react';
import Person from './Person'


const List = ({persons, removePerson}) => {
    if (persons.length > 0) {
        return(
        <ul>
          {persons.map((person) => 
          <Person key={person.id} person={person} removePerson={() => removePerson(person.id)} />
          )}
        </ul>
        )
    }
    return (
        <>
            <h2>Empty Book</h2>
        </>
    )
}
export default List