import { expect, test } from '@nuxt/test-utils/playwright'

test('has title', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })
  await expect(page.locator('body')).toContainText('Welcome to the error-finding application for information systems')
});

test('has title 2', async ({ page, goto }) => {
  await goto('/', { waitUntil: 'hydration' })
  await expect(page.locator('body')).toContainText('Welcome to the error-finding application for information systems')
});