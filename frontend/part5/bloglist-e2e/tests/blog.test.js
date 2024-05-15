const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await page.goto('/')
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Khanh Chung',
        username: 'khanhchung',
        password: 'khanhchung'
      }
    })
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, 'khanhchung', 'khanhchung')
    })

    test('fails with wrong credentitals', async ({ page }) => {
      await login(page, 'khanhchung', 'wrong password')
      await expect(page.getByText('Username or password is incorrect')).toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page, request }) => {
      await page.goto('/')
      await request.post('/api/testing/reset')
      await request.post('/api/users', {
        data: {
          name: 'Khanh Chung',
          username: 'khanhchung',
          password: 'khanhchung'
        }
      })
      await login(page, 'khanhchung', 'khanhchung')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'A new blog', 'John Smith', 'example.com')
      await expect(page.getByText('A new blog by John Smith', { exact: true })).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'A new blog', 'John Smith', 'example.com')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('0 likes', { exact: true })).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('1 likes')).toBeVisible()
    })

    test.only('only the user who added the blog can delete the blog', async ({ page }) => {
      await createBlog(page, 'A new blog', 'John Smith', 'example.com')
      await page.getByRole('button', { name: 'view' }).click()
      page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('Remove A new blog by John Smith')
        await dialog.accept()
      })
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('A new blog by John Smith', { exact: true })).not.toBeVisible()
    })
  })
})