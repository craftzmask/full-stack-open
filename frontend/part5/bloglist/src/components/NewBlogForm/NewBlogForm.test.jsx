import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

test('make a new blog', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  const { container } = render(<NewBlogForm onSubmit={createBlog} />)

  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')
  const createButton = container.querySelector('.create-blog')

  await user.type(titleInput, 'A new blog')
  await user.type(authorInput, 'John Smith')
  await user.type(urlInput, 'johnsmith.com')
  await user.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('A new blog')
})