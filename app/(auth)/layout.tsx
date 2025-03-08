"use client";

import { motion } from "framer-motion";
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
    <div className="h-screen flex overflow-hidden">
      {/* Right side - Auth form container */}
      <motion.div
        initial={mounted ? { opacity: 0 } : false}
        animate={mounted ? { opacity: 1 } : false}
        transition={{ duration: 0.6 }}
        className="flex-1 flex flex-col"
      >
        {/* Mobile logo */}
        <div className="md:hidden p-4 flex justify-center pt-20">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="rounded-full p-1.5 bg-gold/10 group-hover:bg-gold/20 transition-colors">
              <HeartHandshake className="h-6 w-6 text-gold" />
            </div>
            <span className="font-semibold text-xl">BloomKnot</span>
          </Link>
        </div>

        {/* Page title - mobile only */}
        <div className="md:hidden text-center mt-2 mb-1 px-4">
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
