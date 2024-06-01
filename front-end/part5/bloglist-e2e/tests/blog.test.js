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

    await request.post('/api/users', {
      data: {
        name: 'Root User',
        username: 'root',
        password: 'root'
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

      await request.post('/api/users', {
        data: {
          name: 'Root User',
          username: 'root',
          password: 'root'
        }
      })

      await login(page, 'khanhchung', 'khanhchung')
      await createBlog(page, 'A new blog', 'John Smith', 'example.com')
    })

    test('a new blog can be created', async ({ page }) => {
      await expect(page.getByText('A new blog by John Smith', { exact: true })).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByText('0 likes', { exact: true })).toBeVisible()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('1 likes')).toBeVisible()
    })

    test('only the user who added the blog can delete the blog', async ({ page }) => {
      await page.getByRole('button', { name: 'view' }).click()
      page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('Remove A new blog by John Smith')
        await dialog.accept()
      })
      await page.getByRole('button', { name: 'remove' }).click()
      await expect(page.getByText('A new blog by John Smith', { exact: true })).not.toBeVisible()
    })

    test('only the user who added the blog sees its delete button', async ({ page }) => {
      await page.getByRole('button', { name: 'logout' }).click()
      await login(page, 'root', 'root')
      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    test.only('the blogs are arranged in the order according to the likes', async ({ page }) => {
      await createBlog(page, 'most liked blog', 'John', 'example.com')
      const locator = page.getByText('most liked blog by John', { exact: true }).locator('..')
      await locator.getByRole('button', { name: 'view' }).click()
      await locator.getByRole('button', { name: 'like' }).click()
      await page.waitForTimeout(1000);
      await expect(page.locator('.blog > span')).toContainText(['most liked blog by John', 'A new blog by John Smith'])
    })
  })
})