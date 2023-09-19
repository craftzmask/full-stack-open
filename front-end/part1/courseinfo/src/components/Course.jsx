const Header = ({ course }) => (
  <h1>{course}</h1>
)

const Part = ({ name, exercises }) => (
  <p>{name} {exercises}</p>
)

const Content = ({ parts }) => (
  <>
    {parts.map(part => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
  </>
)

const Total = ({ parts }) => (
  <p>
    <strong>
      total of {parts.reduce((total, part) => total + part.exercises, 0)} exercises
    </strong>
  </p>
)

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course