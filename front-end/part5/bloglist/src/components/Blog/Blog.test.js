import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog  from './Blog'

const user = {
  username: 'root',
  name: 'root'
}

const blog = {
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  user
}

describe('<Blog />', () => {
  let container = null

  beforeEach(() => {
    container = render(<Blog blog={blog} user={user} />).container
  })

  test('only render title and author by default', () => {
    const blogDiv = container.querySelector('.blog')
    expect(blogDiv).toHaveTextContent(`${blog.title} ${blog.author}`)

    expect(blogDiv).not.toHaveTextContent(blog.url)
    expect(blogDiv).not.toHaveTextContent(blog.likes)
  })

  test('url and likes are not displayed by default', () => {
    const div = container.querySelector('.blogDetails')
    expect(div).toBeNull()
  })

  // eslint-disable-next-line quotes
  test("click button to show blog's details", async () => {
    const user = userEvent.setup()
    const viewButton = container.querySelector('.toggleButton')
    await user.click(viewButton)

    const div = container.querySelector('.blogDetails')
    expect(div).toBeDefined()
    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent(blog.likes)
  })

})