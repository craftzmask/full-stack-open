import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog  from './Blog'

test('only render title and author by default', () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  }

  const { container } = render(<Blog blog={blog} />)

  const blogDiv = container.querySelector('.blog')
  expect(blogDiv).toHaveTextContent(`${blog.title} ${blog.author}`)

  expect(blogDiv).not.toHaveTextContent(blog.url)
  expect(blogDiv).not.toHaveTextContent(blog.likes)
})