"use client";

import { groupTransactionsByDate, formatCurrency, calculateBalance } from "@/shared/utils/dateHelpers";
import React, { useState } from "react";
import { ITransaction } from "@/features/keuangan/types/keuangan";
import Modal from "@/shared/components/ui/modal";
import { FaPlus } from "react-icons/fa";
import TransactionForm from "@/shared/components/ui/form.comp";

export default function KeuanganPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<ITransaction | null>(null);
  const [transactions, setTransactions] = useState<ITransaction[]>([
    { id: 1, tanggal: new Date("2026-01-01"), kategori: "Operasional", type: "Pengeluaran", keterangan: "Pembelian alat tulis kantor", cash: true, nominal: 250000 },
    { id: 2, tanggal: new Date("2026-01-02"), kategori: "Pendapatan", type: "Penghasilan", keterangan: "Penjualan produk digital", cash: false, nominal: 5000000 },
    { id: 3, tanggal: new Date("2026-01-01"), kategori: "Transport", type: "Pengeluaran", keterangan: "Bensin dan tol perjalanan dinas", cash: true, nominal: 150000 },
    { id: 4, tanggal: new Date("2026-01-01"), kategori: "Pendapatan", type: "Penghasilan", keterangan: "Pembayaran klien proyek website", cash: false, nominal: 15000000 },
    { id: 5, tanggal: new Date("2025-12-31"), kategori: "Utilitas", type: "Transfer", keterangan: "Tagihan listrik & internet bulan Desember", cash: false, nominal: 800000 },
  ]);

  const groupedData = groupTransactionsByDate(transactions);
  const totalBalance = calculateBalance(transactions);
  
  // Calculate total income and expenses
  const totalIncome = transactions
    .filter(t => t.type === "Penghasilan")
    .reduce((sum, t) => sum + t.nominal, 0);
  
  const totalExpense = transactions
    .filter(t => t.type === "Pengeluaran")
    .reduce((sum, t) => sum + t.nominal, 0);

  const handleAddTransaction = (newTransaction: Omit<ITransaction, 'id'>) => {
    const newId = transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1;
    setTransactions([...transactions, { ...newTransaction, id: newId }]);
    setIsModalOpen(false);
  };

  return (
    <div className="p-3 md:p-6 overflow-x-hidden">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Keuangan</h1>
      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-2">
          <label htmlFor="sum-filter" className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
            Periode:
          </label>
          <select
            id="sum-filter"
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1.5 md:py-2 text-xs md:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Semua Waktu</option>
            <option value="1">Hari Ini</option>
            <option value="2">Minggu Ini</option>
            <option value="3">Bulan Ini</option>
            <option value="4">Tahun Ini</option>
          </select>
        </div>
      </div>
      
      <section className="mb-4 md:mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-black/10 dark:border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10 dark:divide-white/10">
            <div className="p-3 md:p-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] md:text-xs font-medium text-gray-600 dark:text-gray-400">Saldo Saat Ini</p>
                <p className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">{formatCurrency(totalBalance)}</p>
              </div>
            </div>
            <div className="p-3 md:p-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] md:text-xs font-medium text-gray-600 dark:text-gray-400">Total Pendapatan</p>
                <p className="text-lg md:text-xl font-semibold text-green-600 dark:text-green-400">{formatCurrency(totalIncome)}</p>
              </div>
            </div>
            <div className="p-3 md:p-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] md:text-xs font-medium text-gray-600 dark:text-gray-400">Total Pengeluaran</p>
                <p className="text-lg md:text-xl font-semibold text-red-600 dark:text-red-400">{formatCurrency(totalExpense)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <div className="mb-4">
          {/* Filters Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-3">
            <div className="flex items-center gap-2 md:gap-3">
              {/* Date Filter */}
              <div className="flex items-center gap-2 md:gap-3">
                <label htmlFor="date-start">Tanggal</label>
                <input
                  type="date"
                  id="date-start"
                  placeholder="mm/dd/yyyy"
                  className="text-xs md:text-sm text-gray-900 dark:text-gray-100 focus:outline-none w-24 md:w-32 bg-white dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-600 px-2 py-3"
                />
                <label htmlFor="date-end"> -x </label>
                <input
                  type="date"
                  id="date-end"
                  placeholder="mm/dd/yyyy"
                  className="text-xs md:text-sm text-gray-900 dark:text-gray-100 focus:outline-none w-24 md:w-32 bg-white dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-600 px-2 py-3"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                id="category-filter"
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-2 md:px-3 py-2 text-xs md:text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Semua Kategori</option>
                <option value="operasional">Operasional</option>
                <option value="pendapatan">Pendapatan</option>
                <option value="transport">Transport</option>
              </select>
              <button
                className="bg-blue-600 hover:bg-blue-700 rounded-lg text-white px-4 py-2 md:py-2.5 text-xs md:text-sm font-medium transition flex items-center justify-center gap-2 whitespace-nowrap"
                onClick={() => { setIsModalOpen(true); setData(null); }}
              >
                <FaPlus className="text-xs md:text-sm" />
                Tambah
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto">
          <table className="w-max min-w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-2 md:px-4 py-2 md:py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  No.
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  Tanggal
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  Kategori
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  Type
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  Keterangan
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  Tunai/Bank
                </th>
                <th className="px-2 md:px-4 py-2 md:py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  Nominal
                </th>
              </tr>
            </thead>
            <tbody>
              {groupedData.map((group, groupIndex) => (
                <React.Fragment key={group.date}>
                  {/* Date Separator */}
                  <tr key={`separator-${groupIndex}`}>
                    <td colSpan={7} className="bg-gray-50 dark:bg-gray-900/30 px-2 md:px-4 py-2 md:py-2.5 border-y border-gray-200 dark:border-gray-700">
                      <div className="flex justify-center gap-2">
                        <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                          {group.displayDate}
                        </span>
                      </div>
                    </td>
                  </tr>
                  
                  {group.transactions.map((transaction, index) => (
                    <tr 
                      key={transaction.id} 
                      className="hover:bg-gray-50 dark:hover:bg-gray-900/20 border-b border-gray-200 dark:border-gray-700 last:border-b-0 cursor-pointer" 
                      onClick={() => { setData(transaction); setIsModalOpen(true); }}
                    >
                      <td className="px-2 md:px-4 py-2.5 md:py-3.5 text-center text-xs md:text-sm text-gray-900 dark:text-gray-100">{index + 1}</td>
                      <td className="px-2 md:px-4 py-2.5 md:py-3.5 text-center text-xs md:text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
                        {transaction.tanggal.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </td>
                      <td className="px-2 md:px-4 py-2.5 md:py-3.5 text-xs md:text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">{transaction.kategori}</td>
                      <td className="px-2 md:px-4 py-2.5 md:py-3.5 text-center">
                        <span className={`inline-flex px-1.5 md:px-2.5 py-0.5 md:py-1 text-xs font-medium rounded-md whitespace-nowrap ${
                          transaction.type === "Pengeluaran"
                            ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                            : transaction.type === "Penghasilan"
                            ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-2 md:px-4 py-2.5 md:py-3.5 text-xs md:text-sm text-gray-600 dark:text-gray-400"><span className="line-clamp-2">{transaction.keterangan}</span></td>
                      <td className="px-2 md:px-4 py-2.5 md:py-3.5 text-center text-xs md:text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
                        {transaction.cash ? "Cash" : "Bank"}
                      </td>
                      <td className={`px-2 md:px-4 py-2.5 md:py-3.5 text-xs md:text-sm text-right font-semibold whitespace-nowrap ${
                        transaction.type === "Pengeluaran"
                          ? "text-red-600 dark:text-red-400"
                          : transaction.type === "Penghasilan"
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`}>
                        {formatCurrency(transaction.nominal)}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 dark:bg-gray-900/50 border-t-2 border-gray-200 dark:border-gray-700">
              <tr>
                <td colSpan={6} className="px-2 md:px-4 py-3 md:py-4 text-xs md:text-sm font-semibold text-right text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  Saldo Keseluruhan:
                </td>
                <td className={`px-2 md:px-4 py-3 md:py-4 text-xs md:text-sm font-bold text-right whitespace-nowrap ${
                  totalBalance >= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}>
                  {formatCurrency(totalBalance)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
      {isModalOpen && (
        <>
          <Modal
            onClose={() => setIsModalOpen(false)}
            title={data ? "Detail Transaksi" : "Tambah Transaksi"}
          >
            <TransactionForm
              data={data}
              onSubmit={handleAddTransaction}
              onCancel={() => setIsModalOpen(false)}
            />
          </Modal>
        </>
      )}
    </div>
  );
}