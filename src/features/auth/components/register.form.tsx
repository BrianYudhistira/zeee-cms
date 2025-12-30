export default function RegisterForm() {
  return(
    <form className="space-y-4 md:space-y-5">
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
        <label 
          htmlFor="password" 
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 md:mb-2"
        >
          Password
        </label>
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
      <div>
        <label 
          htmlFor="confirm-password" 
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 md:mb-2"
        >
          Confirm Password
        </label>
        <input
          id="confirm-password"
          type="password"
          placeholder="••••••••"
          className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg border border-zinc-300 dark:border-zinc-600 
                    bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white
                    placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                    focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
                    transition-colors"
        />
      </div>

      {/* Terms & Conditions */}
      <div className="flex items-start">
        <input
          id="terms"
          type="checkbox"
          className="w-3.5 h-3.5 md:w-4 md:h-4 mt-0.5 rounded border-zinc-300 dark:border-zinc-600 
                    text-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                    bg-white dark:bg-zinc-700"
        />
        <label 
          htmlFor="terms" 
          className="ml-2 text-xs md:text-sm text-zinc-600 dark:text-zinc-400"
        >
          I agree to the terms and conditions
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
        Create Account
      </button>
    </form>
  )
}