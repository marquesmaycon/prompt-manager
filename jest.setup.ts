import '@testing-library/jest-dom'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    onchange: null,
    dispatchEvent: jest.fn(),
  }),
})

jest.mock('next/navigation', () => ({ useRouter: () => ({ refresh: jest.fn() }) }))

jest.mock('next/cache', () => ({ revalidatePath: jest.fn() }))
