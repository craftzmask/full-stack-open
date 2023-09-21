const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.err(...params)
}

module.exports = {
  info, error
}