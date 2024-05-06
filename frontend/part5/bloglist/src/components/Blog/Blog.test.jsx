import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container = null

  beforeEach(() => {
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
    container = render(
      <Blog blog={blog} onLike={fn} onDelete={fn} />
    ).container
  })

  test('shows title and author, but not its URL or likes by default.', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Hello World John Wick')

    const blogDetails = container.querySelector('.blog-details')
    expect(blogDetails).toHaveStyle('display: none')
  })

  test('click show button to view its details', async () => {
    const user =  userEvent.setup()
    const showButton = container.querySelector('.show-details')
    await user.click(showButton)
    const blogDetails = container.querySelector('.blog-details')
    expect(blogDetails).toHaveStyle('display: block')
    expect(showButton).toHaveTextContent('hide')
  })
})