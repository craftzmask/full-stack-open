const Header = (props) => {
  return <h1>{props.course.name}</h1>
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part 
        key={part.id}
        part={part.name}
        exercises={part.exercises} />
      )}
    </>
  )
}

const Part = (props) => {
  return <p>{props.part} {props.exercises}</p>
}

const Total = ({ sum }) => {
  return (
    <p><strong>total of {sum} exercises</strong></p>
  )
}

const Course = ({ course }) => {
  let sum = course.parts
    .reduce((sum, part) => sum + part.exercises, 0)

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App