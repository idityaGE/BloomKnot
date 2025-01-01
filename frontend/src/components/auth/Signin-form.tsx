export const SigninForm = () => {
  return (
    <div id="webcrumbs">
      <div className="w-[400px] bg-white shadow-xl rounded-lg p-8 min-h-[600px] flex flex-col items-center justify-center relative">  <div className="absolute top-[-45px] w-[90px] h-[90px] bg-neutral-100 rounded-full flex items-center justify-center shadow">
        <img
          src="https://tools-api.webcrumbs.org/image-placeholder/60/60/avatars/1"
          alt="Avatar"
          className="w-[60px] h-[60px] rounded-full object-contain"
        />
      </div>
        <h1 className="font-title text-3xl text-neutral-950 mb-4 mt-6">Welcome Back</h1>
        <p className="text-neutral-700 text-center mb-6">Please enter your login credentials to access your account.</p>
        <form className="flex flex-col w-full gap-6">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-neutral-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="border border-neutral-300 rounded-full p-3 focus:outline-primary-500"
              placeholder="yourname@example.com"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-neutral-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border border-neutral-300 rounded-full p-3 focus:outline-primary-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="bg-[#B8860B] text-primary-50 font-semibold rounded-lg py-3 w-full mt-4 shadow hover:shadow-lg hover:bg-primary-600 transition"
          >
            Login
          </button>
        </form>
        <a href="#" className="text-primary-500 mt-4 underline text-sm">
          Forgot Password?
        </a>
        <div className="flex items-center justify-center gap-4 w-full mt-6">
          <span className="text-neutral-500 text-sm">or login with</span>
          <div className="flex gap-2">
            <button className="p-3 w-[40px] h-[40px] bg-neutral-100 rounded-full flex items-center justify-center shadow hover:shadow-lg">
              <i className="fa-brands fa-facebook text-neutral-500"></i>
            </button>
            <button className="p-3 w-[40px] h-[40px] bg-neutral-100 rounded-full flex items-center justify-center shadow hover:shadow-lg">
              <i className="fa-brands fa-google text-neutral-500"></i>
            </button>
            <button className="p-3 w-[40px] h-[40px] bg-neutral-100 rounded-full flex items-center justify-center shadow hover:shadow-lg">
              <i className="fa-brands fa-apple text-neutral-500"></i>
            </button>
          </div>
        </div>
        <p className="text-neutral-700 mt-6 text-sm">
          New user?{" "}
          <a href="#" className="text-primary-500 underline font-semibold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}