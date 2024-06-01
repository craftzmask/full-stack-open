const Header = ({ course }) => <h3>{course.name}</h3>

const Content = ({ parts }) => (
  <>
    {parts.map(part => <Part 
        key={part.id}
        part={part.name}
        exercises={part.exercises} />
    )}
  </>
)

const Part = ({ part, exercises }) => <p>{part} {exercises}</p>

const Total = ({ sum }) => (
  <p>
    <strong>total of {sum} exercises</strong>
  </p>
)

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

export default Course