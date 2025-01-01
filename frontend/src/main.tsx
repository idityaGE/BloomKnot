import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { ThemeProvider } from "@/components/theme/theme-provider"
import './index.css'
import Layout from './Layout.tsx'
import { SignInForm } from './components/auth/Signin-form.tsx';
import { SignUpForm } from './components/auth/Signup-form.tsx';

// Docs : https://reactrouter.com/start/library/routing
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >

        <Route path="auth" element={<div className="flex items-center justify-center h-screen"> <Outlet /> </div>}>
          <Route path="signin" element={<SignInForm />} />
          <Route path="signup" element={<SignUpForm />} />
        </Route>

      </Route>
    </Routes>
  );
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider
      defaultTheme="light"
      storageKey="vite-ui-theme"
    >
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
