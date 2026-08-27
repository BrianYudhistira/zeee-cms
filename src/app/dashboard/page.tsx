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
        <div className="mt-6 p-5 rounded-xl shadow-sm transition" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
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