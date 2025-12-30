import { AuthProps } from "../types/auth";

export default function AuthCard({title, subtitle, children}: AuthProps) {
  return (
    <div className="flex min-h-screen items-center py-10 justify-center bg-zinc-50 dark:bg-zinc-900 font-sans transition-colors px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-zinc-800 rounded-xl md:rounded-2xl shadow-xl dark:shadow-2xl p-6 md:p-8 transition-colors">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-1.5 md:mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400">
                {subtitle}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}