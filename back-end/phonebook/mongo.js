const mongoose = require('mongoose')

const len = process.argv.length
if (len !== 3 && len !== 5) {
  console.log('Invalid arguments')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://khanhchung:${password}@cluster0.la8qjkr.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (len === 3) {
  Person
    .find({})
    .then(persons => {
      console.log('phonebook:')
      persons.forEach(person =>
        console.log(`${person.name} ${person.number}`)
      )
      mongoose.connection.close()
    })
}

if (len === 5) {
  const person = Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person
    .save()
    .then(savedPerson => {
      console.log(`added ${savedPerson.name} ${savedPerson.number} to phonebook`)
      mongoose.connection.close()
    })
}
