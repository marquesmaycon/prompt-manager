import { expect, test } from '@playwright/test'

import { prisma } from '@/lib/prisma'

test('Deleção de prompt via UI (sucesso)', async ({ page }) => {
  const title = `E2E Deletable Prompt ${Date.now()}`
  const content = 'content'
  await prisma.prompt.create({ data: { title, content } })
  await prisma.$disconnect()

  await page.goto('/')

  const list = page.getByRole('navigation')
  await expect(list).toBeVisible()
  const heading = page.getByRole('link', { name: title })
  await expect(heading).toBeVisible({ timeout: 15000 })

  const promptItem = page.getByRole('listitem').filter({ hasText: title })
  await expect(promptItem).toBeVisible()

  await promptItem.getByRole('button', { name: /Delete prompt/i }).click()

  await page.getByRole('button', { name: /Delete Forever/i }).click()

  await expect(page.getByText('Prompt successfully deleted.')).toBeVisible()
  await expect(page.getByRole('link', { name: title })).toHaveCount(0)
})
