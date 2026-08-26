"use client";

import { useState, useEffect } from "react";
import { ITransaction } from "@/features/keuangan/types/keuangan";

interface TransactionFormProps {
  onSubmit: (transaction: Omit<ITransaction, 'id'>) => void;
  onCancel: () => void;
  data: ITransaction | null;
}

export default function TransactionForm({ onSubmit, onCancel, data }: TransactionFormProps) {
  const [formData, setFormData] = useState<ITransaction>({
    id: 0,
    tanggal: new Date(),
    kategori : "makanan",
    type: "Pengeluaran" as "Pengeluaran" | "Penghasilan" | "Transfer",
    keterangan: "",
    cash: true,
    nominal: null!,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      tanggal: formData.tanggal,
      kategori: formData.kategori,
      type: formData.type,
      keterangan: formData.keterangan,
      cash: formData.cash,
      nominal: formData.nominal,
    });
  };

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      {/* Tanggal */}
      <div>
        <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Tanggal <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="tanggal"
          required
          disabled={!!data}
          value={formData.tanggal.toISOString().split('T')[0]}
          onChange={(e) => setFormData({ ...formData, tanggal: new Date(e.target.value) })}
          className="w-full border border-black/10 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Type */}
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Tipe Transaksi <span className="text-red-500">*</span>
        </label>
        <select
          id="type"
          required
          disabled={!!data}
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as "Pengeluaran" | "Penghasilan" | "Transfer" })}
          className="w-full border border-black/10 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Pengeluaran">Pengeluaran</option>
          <option value="Penghasilan">Penghasilan</option>
          <option value="Transfer">Transfer</option>
        </select>
      </div>

      {/* Kategori */}
      <div>
        <label htmlFor="kategori" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Kategori <span className="text-red-500">*</span>
        </label>
        <select
          id="kategori"
          required
          disabled={!!data}
          value={formData.kategori}
          onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
          className="w-full border border-black/10 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="makanan">Makanan</option>
          <option value="kehidupan sosial">Kehidupan Sosial</option>
          <option value="transportasi">Transportasi</option>
          <option value="kebutuhan harian">Kebutuhan Harian</option>
          <option value="pakaian">Pakaian</option>
          <option value="kecantikan">Kecantikan</option>
          <option value="pendidikan">Pendidikan</option>
          <option value="tabungan">Tabungan</option>
          <option value="lainnya">Lainnya</option>
        </select>
      </div>

      {/* Keterangan */}
      <div>
        <label htmlFor="keterangan" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Keterangan <span className="text-red-500">*</span>
        </label>
        <textarea
          id="keterangan"
          required
          disabled={!!data}
          value={formData.keterangan}
          onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
          placeholder="Detail transaksi..."
          rows={3}
          className="w-full border border-black/10 dark:border-white/10 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Metode */}
      <div>
        <label htmlFor="metode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Metode Pembayaran <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="cash"
              value="true"
              disabled={!!data}
              checked={formData.cash === true}
              onChange={(e) => setFormData({ ...formData, cash: true })}
              className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-900 dark:text-gray-100">Cash</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="cash"
              disabled={!!data}
              value="Bank"
              checked={formData.cash === false}
              onChange={(e) => setFormData({ ...formData, cash: false })}
              className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-900 dark:text-gray-100">Bank</span>
          </label>
        </div>
      </div>

      {/* Nominal */}
      <div>
        <label htmlFor="nominal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Nominal <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm">
            Rp
          </span>
          <input
            type="number"
            id="nominal"
            disabled={!!data}
            required
            min="0"
            value={formData.nominal}
            onChange={(e) => setFormData({ ...formData, nominal: Number(e.target.value) })}
            placeholder="0"
            className="w-full border border-black/10 dark:border-white/10 rounded-lg pl-10 pr-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={!!data}
          className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-black/5 dark:bg-white/5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={!!data}
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Simpan
        </button>
      </div>
    </form>
  );
}