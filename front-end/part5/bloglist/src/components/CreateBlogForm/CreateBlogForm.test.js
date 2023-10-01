import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'
import userEvent from '@testing-library/user-event'

const blog = {
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
}

test('<CreateBlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const container = render(<CreateBlogForm addBlog={createBlog} />).container

  const title = container.querySelector('input[name="title"]')
  const author = container.querySelector('input[name="author"]')
  const url = container.querySelector('input[name="url"]')
  const createButton = container.querySelector('button[type="submit"]')

  await user.type(title, blog.title)
  await user.type(author, blog.author)
  await user.type(url, blog.url)
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual(blog)
})