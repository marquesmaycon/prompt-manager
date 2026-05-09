'use client'

import { CheckIcon, CopyIcon } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '../ui/button'

export type CopyButtonProps = {
  content?: string
}

export const CopyButton = ({ content }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false)
  const timerRef = useRef<NodeJS.Timeout>(null)

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const handleCopy = async () => {
    const text = content?.trim()

    if (!text) return

    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)

      clearTimer()
      timerRef.current = setTimeout(() => setIsCopied(false), 2000)
    } catch (error: unknown) {
      toast.error(`Erro ao copiar o texto: ${(error as Error).message}`)
    }
  }

  useEffect(() => () => clearTimer(), [])

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="disabled:opacity-50"
      disabled={!content?.trim()}
      onClick={handleCopy}
    >
      {isCopied ? <CheckIcon className="h-4 w-4 text-green-400" /> : <CopyIcon className="h- w-4" />}
      <span>{isCopied ? 'Copied' : 'Copy'}</span>
    </Button>
  )
}
