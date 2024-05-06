import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container = null
  const like = vi.fn()
  const remove = vi.fn()

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
    container = render(
      <Blog blog={blog} onLike={like} onDelete={remove} />
    ).container
  })

  test('shows title and author, but not its URL or likes by default.', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Hello World John Wick')

    const blogDetails = container.querySelector('.blog-details')
    expect(blogDetails).toHaveStyle('display: none')
  })

  test('click show button to view its details', async () => {
    const user = userEvent.setup()
    const showButton = container.querySelector('.show-details')
    await user.click(showButton)
    const blogDetails = container.querySelector('.blog-details')
    expect(blogDetails).toHaveStyle('display: block')
    expect(showButton).toHaveTextContent('hide')
  })

  test('like button clicked twice', async () => {
    const user = userEvent.setup()
    const showButton = container.querySelector('.show-details')
    await user.click(showButton)
    const likeButton = container.querySelector('.like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(like.mock.calls).toHaveLength(2)
  })
})