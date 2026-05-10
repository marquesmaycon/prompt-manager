import { PromptListItem, type PromptListItemProps } from '@/components/prompts/prompt-list-item'
import { render, screen } from '@/lib/test-utils'

const makeSut = ({ prompt }: PromptListItemProps) => {
  return render(<PromptListItem prompt={prompt} />)
}

describe('PromptCard', () => {
  const prompt = { id: '1', title: 'title 01', content: 'content 01' }

  it('deveria renderizar o link com href corretamente', () => {
    makeSut({ prompt })
    const link = screen.getByRole('link')

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', `/${prompt.id}`)
  })
})
