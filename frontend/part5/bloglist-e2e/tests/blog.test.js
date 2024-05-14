const { test, expect, beforeEach, afterEach, describe } = require('@playwright/test')

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
      await page.getByTestId('username').fill('khanhchung')
      await page.getByTestId('password').fill('khanhchung')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Khanh Chung logged in')).toBeVisible()
    })

    test('fails with wrong credentitals', async ({ page }) => {
      await page.getByTestId('username').fill('khanhchung')
      await page.getByTestId('password').fill('wrong password ')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Username or password is incorrect')).toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('khanhchung')
      await page.getByTestId('password').fill('khanhchung')
      await page.getByRole('button', { name: 'login' }).click()
      await expect(page.getByText('Khanh Chung logged in')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByTestId('title').fill('A new blog')
      await page.getByTestId('author').fill('John Smith')
      await page.getByTestId('url').fill('example.com')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText('A new blog by John Smith', { exact: true })).toBeVisible()
    })
  })
})