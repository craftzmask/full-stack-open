import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('', () => {
  const blog = {
    title: 'Hello World',
    author: 'John Wick',
    likes: 10,
    url: 'example.com',
    user: {
      username: 'mikeswit',
      name: 'Mike Swit',
    }
  }

  const fn = vi.fn()
  const { container } = render(<Blog blog={blog} onLike={fn} onDelete={fn} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Hello World John Wick')

  const blogDetails = container.querySelector('.blog-details')
  expect(blogDetails).toHaveStyle('display: none')
})