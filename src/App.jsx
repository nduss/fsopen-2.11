import { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form'
import Search from './components/Search'
import List from './components/List'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [flash, setFlash] = useState('')
  const [searchString, setSearchString] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setSearchString(event.target.value)
  }
  
  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const matches = persons.filter(person => person.name === newName)
    console.log(persons.filter(person => person.name === newName))
    if(matches.length == 0){
      personsService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
        })
      flashAlert(newName + ' added to book')
    }
    else{
      const existingPerson = matches[0]
      if(window.confirm(`Update ${personObject.name} with a new number??`)){
        personsService
          .update(existingPerson.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson ))
          })
        flashAlert(`Number updated for ${existingPerson.name}`)
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const removePerson = (id) => {
    console.log(`removing person ${id}`)
    personsService
      .remove(id)
      .then(response => {
        console.log(response)
        const newPersons = persons.filter((person) => person.id !== response.id)
        setPersons(newPersons)
      } 
      )
  }

  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

  const flashAlert = async (warning) => {
    setFlash(warning)
    await sleep(3000)
    setFlash('')
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchString.toLowerCase()) || person.number.includes(searchString))

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <h2>Add A New Person:</h2>
        <Form 
          onSubmit={addPerson} 
          name={{value:newName, onChange:handleNameChange}}
          number={{value:newNumber, onChange:handleNumberChange}}
          flash={flash}  
        />
      </div>
      <h2>Numbers</h2>
      <Search searchString={searchString} onChange={handleSearchChange} />
      <List persons={filteredPersons} removePerson={removePerson} />
    </div>
  )
}

export default App