export interface ITransaction {
  id: number;
  tanggal: Date; // format: DD/MM/YYYY
  kategori: string;
  type: "Pengeluaran" | "Penghasilan" | "Transfer";
  keterangan: string;
  cash: true | false;
  nominal: number;
}

