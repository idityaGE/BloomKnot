"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { HeartHandshake, Menu, X, ChevronRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import AuthButtons from "./auth-btn"
import MobileMenuPortal from "./mobile-menu-portal"

const navigation = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  // { name: "Testimonials", href: "/testimonials" },
  // { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  return (
    // Changed from absolute to fixed positioning and lowered z-index
    <header className="fixed top-0 w-full z-40 transition-all duration-300 backdrop-filter bg-background/80 backdrop-blur-md shadow-sm py-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8" aria-label="Global">
        <div className="flex flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
            <div className="rounded-full p-1.5 transition-colors bg-gold/10 group-hover:bg-gold/20">
              <HeartHandshake className="h-6 w-6 transition-colors text-gold" />
            </div>
            <span className="font-semibold text-xl transition-colors text-foreground">
              BloomKnot
            </span>
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium py-2 px-1 border-b-2 border-transparent transition-colors hover:border-gold text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <AuthButtons />
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile menu - rendered through portal */}
      <MobileMenuPortal isOpen={mobileMenuOpen}>
        <AnimatePresence mode="wait">
          {mobileMenuOpen && (
            <>
              {/* Background overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm"
                aria-hidden="true"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Menu panel */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{
                  type: "spring",
                  damping: 30,
                  stiffness: 300,
                  mass: 0.8
                }}
                className="fixed inset-y-0 right-0 w-full max-w-sm bg-background overflow-y-auto px-6 py-6 shadow-xl"
              >
                <div className="flex items-center justify-between mb-8">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <Link
                      href="/"
                      className="-m-1.5 p-1.5 flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="bg-gold/10 rounded-full p-1.5">
                        <HeartHandshake className="h-6 w-6 text-gold" />
                      </div>
                      <span className="font-semibold text-xl">BloomKnot</span>
                    </Link>
                  </motion.div>
                  <motion.button
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </motion.button>
                </div>

                <div className="mt-6 flow-root">
                  <div className="-my-6 divide-y divide-gray-200">
                    <div className="space-y-2 py-6">
                      {navigation.map((item, i) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{
                            delay: 0.1 + i * 0.1,
                            duration: 0.4,
                            exit: { duration: 0.2 }
                          }}
                          whileHover={{ x: 5 }}
                        >
                          <Link
                            href={item.href}
                            className="group -mx-3 flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium hover:bg-cream"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span>{item.name}</span>
                            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gold transition-colors" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                    <motion.div
                      className="py-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        delay: 0.3 + navigation.length * 0.1,
                        duration: 0.4
                      }}
                    >
                      <div className="flex flex-col gap-3">
                        <AuthButtons isMobile />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </MobileMenuPortal>
    </header>
  )
}
