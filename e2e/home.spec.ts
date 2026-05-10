import { expect, test } from '@playwright/test'

test('deve carregar página inicial', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Selecione um prompt' })).toBeVisible()
  await expect(
    page.getByText(
      `Escolha um prompt para começar a conversar com o ChatGPT. Você pode escolher entre uma variedade de tópicos e estilos de conversa para personalizar sua experiência.`
    )
  ).toBeVisible()
})
