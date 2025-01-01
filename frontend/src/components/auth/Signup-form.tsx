

export const SignupForm = () => {
  return (
    <div id="webcrumbs">
      <div className="w-[500px] bg-white text-neutral-950 rounded-lg shadow-md p-6">  <h1 className="text-3xl font-title text-center mb-2">Sign Up</h1>
        <p className="text-sm text-yellow-700 text-center mb-8">Join Us in Crafting Unforgettable Moments</p>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <div className="flex items-center bg-white rounded-md px-2 py-2 border border-neutral-300">
                <span className="material-symbols-outlined text-neutral-400">person</span>
                <input
                  type="text"
                  placeholder="Alaska"
                  className="bg-transparent flex-1 focus:outline-none text-neutral-950 px-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <div className="flex items-center bg-white rounded-md px-2 py-2 border border-neutral-300">
                <span className="material-symbols-outlined text-neutral-400">person</span>
                <input
                  type="text"
                  placeholder="Young"
                  className="bg-transparent flex-1 focus:outline-none text-neutral-950 px-2"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <div className="flex items-center bg-white rounded-md px-2 py-2 border border-neutral-300">
              <span className="material-symbols-outlined text-neutral-400">account_circle</span>
              <input
                type="text"
                placeholder="alaska2104"
                className="bg-transparent flex-1 focus:outline-none text-neutral-950 px-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="flex items-center bg-white rounded-md px-2 py-2 border border-yellow-500">
              <span className="material-symbols-outlined text-neutral-400">mail</span>
              <input
                type="email"
                placeholder="alaskayoung"
                className="bg-transparent flex-1 focus:outline-none text-neutral-950 px-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="flex items-center bg-white rounded-md px-2 py-2 border border-neutral-300">
              <span className="material-symbols-outlined text-neutral-400">lock</span>
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent flex-1 focus:outline-none text-neutral-950 px-2"
              />
              <span className="material-symbols-outlined text-neutral-400">visibility_off</span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">Minimum length is 8 characters.</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <div className="flex items-center bg-white rounded-md px-2 py-2 border border-neutral-300">
              <span className="material-symbols-outlined text-neutral-400">lock</span>
              <input
                type="password"
                placeholder="Confirm Password"
                className="bg-transparent flex-1 focus:outline-none text-neutral-950 px-2"
              />
              <span className="material-symbols-outlined text-neutral-400">visibility_off</span>
            </div>
          </div>
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-neutral-900 font-medium py-2 rounded-md">
            Sign Up
          </button>
          <p className="text-xs text-neutral-500 text-center mt-4">
            By creating an account, you agree to the{' '}
            <a href="#" className="text-neutral-950 underline">
              Terms of Service
            </a>
            . We'll occasionally send you account-related emails.
          </p>
          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <a href="#" className="text-yellow-500 underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

