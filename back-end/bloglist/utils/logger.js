const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

const err = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.err(...params)
  }
}

module.exports = {
  info, err
}