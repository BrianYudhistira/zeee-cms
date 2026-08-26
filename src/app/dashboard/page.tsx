import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Zeee CMS",
  description: "Dashboard overview and analytics",
};

export default function LoginForm() {
  return(
    <>
      <h1 className="text-3xl font-bold mb-2">Beranda</h1>
      <div>
        <div className="mt-6 p-4 border border-gray-300 rounded-lg shadow-sm bg-white dark:bg-gray-700 hover:shadow-md transition">
          <div className="mb-4 flex justify-between items-center">
            <div className="flex items-center justify-between mb-4">
              <p>Kunjungan</p>
            </div>
          </div>
          <div>

          </div>
          <h2 className="text-xl font-semibold mb-2">Ringkasan Portfolio</h2>
          <p>Detail ringkasan portfolio akan ditampilkan di sini.</p>
        </div>
      </div>
    </>
  )
}