const Person = ({ person }) => (
  <div key={person.id}>{person.name} {person.number}</div>
)

const PersonList = ({ persons }) => (
  <div>
    {persons.map(p => <Person key={p.id} person={p} />)}
  </div>
)

export default PersonList