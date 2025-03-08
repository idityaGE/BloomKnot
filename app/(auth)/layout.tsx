"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Mount animation control
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get page title based on the current path
  const getPageTitle = () => {
    if (pathname.includes("sign-in")) return "Welcome Back";
    if (pathname.includes("sign-up")) return "Join BloomKnot";
    if (pathname.includes("forgot-password")) return "Recover Account";
    if (pathname.includes("reset-password")) return "New Beginnings";
    if (pathname.includes("mail-verification")) return "Almost There";
    return "Account Access";
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Decorative panel with image for larger screens */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-cream to-white relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute -top-20 right-0 w-96 h-96">
              <Image
                src="/hero-bg.png"
                alt=""
                width={400}
                height={400}
                className="opacity-50"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full  blur-3xl opacity-30" />
          </div>

          {/* Content */}
          <motion.div
            initial={mounted ? { opacity: 0, y: 20 } : false}
            animate={mounted ? { opacity: 1, y: 0 } : false}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="z-10 max-w-md text-center"
          >
            <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
              <div className="rounded-full p-2 bg-gold/10 group-hover:bg-gold/20 transition-colors">
                <HeartHandshake className="h-8 w-8 text-gold" />
              </div>
              <span className="font-semibold text-2xl">BloomKnot</span>
            </Link>

            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Your Dream Wedding
            </h1>
            <p className="text-gray-700 text-lg mb-6">
              Sign in to manage your wedding planning journey, access personalized recommendations, and track your special day.
            </p>

            <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl mb-6">
              <Image
                src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Elegant wedding decoration"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {["Personalized Planning", "Vendor Management", "Guest Lists", "Timeline Tracking", "Budget Tools"].map((item, i) => (
                <motion.span
                  key={item}
                  initial={mounted ? { opacity: 0, y: 10 } : false}
                  animate={mounted ? { opacity: 1, y: 0 } : false}
                  transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }}
                  className="rounded-full px-3 py-1 bg-white shadow-sm border border-gray-200 text-sm"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Auth form container */}
      <motion.div
        initial={mounted ? { opacity: 0 } : false}
        animate={mounted ? { opacity: 1 } : false}
        transition={{ duration: 0.6 }}
        className="flex-1 flex flex-col"
      >
        {/* Mobile logo */}
        <div className="md:hidden p-4 flex justify-center">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="rounded-full p-1.5 bg-gold/10 group-hover:bg-gold/20 transition-colors">
              <HeartHandshake className="h-6 w-6 text-gold" />
            </div>
            <span className="font-semibold text-xl">BloomKnot</span>
          </Link>
        </div>

        {/* Page title - mobile only */}
        <div className="md:hidden text-center mt-4 mb-6 px-4">
          <h1 className="text-2xl font-bold">{getPageTitle()}</h1>
          <div className="mx-auto mt-2 h-0.5 w-16 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
        </div>

        {/* Form area */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="py-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} BloomKnot. All rights reserved.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
