const AuthLayout = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      {children}
    </div>
  );
}

export default AuthLayout;