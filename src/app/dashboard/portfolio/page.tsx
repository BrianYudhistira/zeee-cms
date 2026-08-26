import type { Metadata } from "next";
import { VscEdit } from "react-icons/vsc";

export const metadata: Metadata = {
  title: "Portfolio - Zeee CMS",
  description: "Kelola dan tampilkan portfolio Anda",
};


function DataField({
  label,
  value,
  className = "",
  customValue,
}: {
  label: string;
  value?: string;
  className?: string;
  customValue?: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}
      </span>
      {customValue ? (
        customValue
      ) : (
        <span className="text-base font-medium text-gray-900 dark:text-gray-100">
          {value}
        </span>
      )}
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <div className="h-full w-full px-8 py-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Home Portfolio
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage the main data that will be displayed on your portfolio homepage.
          </p>
        </div>
      </div>

      <div className="w-full max-w-5xl">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4 dark:border-gray-800 dark:bg-gray-800/50">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Home Data
            </h2>
            <button className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200">
              <VscEdit className="text-base" />
              <span>Edit Data</span>
            </button>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-10 md:flex-row">
              <div className="flex flex-shrink-0 flex-col gap-3">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Hero Image / Illustration
                </span>
                <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <img
                    src="/images/web_icon.png"
                    alt="Illustration"
                    className="h-full w-full object-contain p-2"
                  />
                </div>
              </div>

              <div className="flex grow flex-col gap-4">
                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                  <DataField label="Greeting" value="Hello, I'm" />
                  <DataField label="Name" value="Brian Yudhistira" />
                  <DataField
                    label="Passions (Typing Effect)"
                    className="sm:col-span-2"
                    customValue={
                      <div className="mt-1 flex flex-wrap gap-2">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                          Fullstack Developer
                        </span>
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                          Frontend Developer
                        </span>
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
                          Backend Developer
                        </span>
                      </div>
                    }
                  />
                  <DataField
                    label="Description"
                    value="I am a Full-Stack Developer specializing in modern web and mobile technologies. My passion is crafting robust, scalable applications from end-to-end, focusing on seamless user experience and delivering practical value through clean, high-performance code."
                    className="sm:col-span-2 leading-relaxed"
                  />
                </div>

                <div className="h-px w-full bg-gray-100 dark:bg-gray-800" />

                <div>
                  <h3 className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Social Media Links
                  </h3>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-3">
                    <DataField
                      label="LinkedIn"
                      value="linkedin.com/in/brianyudhistira"
                    />
                    <DataField label="Github" value="github.com/brianyudhistira" />
                    <DataField label="Instagram" value="@brianyudhistira" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
