import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import './index.css'
import Layout from './Layout.tsx'
import { SigninForm } from './components/auth/signin-form.tsx';
import { SignupForm } from './components/auth/signup-form.tsx';

// Docs : https://reactrouter.com/start/library/routing
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >

        <Route path="auth" element={<div className="flex items-center justify-center h-screen"> <Outlet /> </div>}>
          <Route path="signin" element={<SigninForm />} />
          <Route path="signup" element={<SignupForm />} />
        </Route>
        
      </Route>
    </Routes>
  );
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StrictMode>,
)
