const Person = ({ person, onRemove }) => (
  <div key={person.id}>
    {person.name} {person.number}
    <button onClick={() => onRemove(person)}>delete</button>
  </div>
)

const PersonList = ({ persons, onRemove }) => (
  <div>
    {persons.map(p => <Person key={p.id} person={p} onRemove={onRemove} />)}
  </div>
)

export default PersonList