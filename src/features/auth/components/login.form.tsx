export default function LoginForm() {
  return(
    <form className="space-y-4 md:space-y-6">
      {/* Email Input */}
      <div>
        <label 
          htmlFor="email" 
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 md:mb-2"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg border border-zinc-300 dark:border-zinc-600 
                    bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white
                    placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                    focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
                    transition-colors"
        />
      </div>

      {/* Password Input */}
      <div>
        <div className="flex items-center justify-between mb-1.5 md:mb-2">
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Password
          </label>
          <a 
            href="#" 
            className="text-xs md:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            Forgot?
          </a>
        </div>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg border border-zinc-300 dark:border-zinc-600 
                    bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white
                    placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                    focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
                    transition-colors"
        />
      </div>

      {/* Remember Me */}
      <div className="flex items-center">
        <input
          id="remember"
          type="checkbox"
          className="w-3.5 h-3.5 md:w-4 md:h-4 rounded border-zinc-300 dark:border-zinc-600 
                    text-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                    bg-white dark:bg-zinc-700"
        />
        <label 
          htmlFor="remember" 
          className="ml-2 text-xs md:text-sm text-zinc-600 dark:text-zinc-400"
        >
          Remember me for 30 days
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                  text-white font-semibold py-2.5 md:py-3 px-4 text-sm md:text-base rounded-lg
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  dark:focus:ring-offset-zinc-800"
      >
        Sign In
      </button>
    </form>
  )
}