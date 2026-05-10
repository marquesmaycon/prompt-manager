import test, { expect } from '@playwright/test'

import { prisma } from '@/lib/prisma'

test('Edição de prompt via UI (sucesso)', async ({ page }) => {
  const now = Date.now()
  const data = { title: `E2E Edit Original ${now}`, content: 'Original Content' }
  const newData = { title: `E2E Edit Updated ${now}`, content: 'Updated Content' }
  const created = await prisma.prompt.create({ data })
  await prisma.$disconnect()

  await page.goto(`/${created.id}`)
  await expect(page.locator('input[name="title"]')).toBeVisible()

  await page.fill('input[name="title"]', newData.title)
  await page.fill('textarea[name="content"]', newData.content)
  await page.locator('button[type=submit]').click()

  await page.waitForSelector('text=Prompt successfully updated.', {
    state: 'visible',
    timeout: 15000,
  })

  await expect(page.getByRole('link', { name: newData.content })).toBeVisible()
  await expect(page.locator('input[name="title"]')).toHaveValue(newData.title)
})
