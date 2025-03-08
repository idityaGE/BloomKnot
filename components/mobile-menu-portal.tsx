'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface MobileMenuPortalProps {
  children: React.ReactNode
  isOpen: boolean
}

export default function MobileMenuPortal({ children, isOpen }: MobileMenuPortalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Only render on the client side
  if (!mounted || !isOpen) return null

  return createPortal(
    // Updated z-index to be in the middle range - higher than navigation but lower than preloader
    <div className="fixed inset-0 z-[8000] overflow-hidden">{children}</div>,
    document.body
  )
}
