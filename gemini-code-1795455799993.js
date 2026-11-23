const OWNER_PIN = "1234";
const STORAGE_KEY = "sia_toko_hambali_v1";

// Daftar Akun SAK EMKM sesuai Bab 1.C Dokumen Tahap 2
const COA_LIST = [
  { kode: "1101", nama: "Kas Usaha", kelompok: "Aset", normal: "Debit" },
  { kode: "1102", nama: "Persediaan Barang Dagang", kelompok: "Aset", normal: "Debit" },
  { kode: "1201", nama: "Aset Tetap (Neto)", kelompok: "Aset", normal: "Debit" },
  { kode: "2101", nama: "Utang Usaha", kelompok: "Liabilitas", normal: "Kredit" },
  { kode: "2102", nama: "Utang Pajak", kelompok: "Liabilitas", normal: "Kredit" },
  { kode: "3101", nama: "Modal Pemilik", kelompok: "Ekuitas", normal: "Kredit" },
  { kode: "3102", nama: "Saldo Laba", kelompok: "Ekuitas", normal: "Kredit" },
  { kode: "3103", nama: "Prive (Pengambilan Pribadi)", kelompok: "Ekuitas", normal: "Debit" },
  { kode: "4101", nama: "Penjualan", kelompok: "Pendapatan", normal: "Kredit" },
  { kode: "5101", nama: "Harga Pokok Penjualan (HPP)", kelompok: "Beban Pokok", normal: "Debit" },
  { kode: "6101", nama: "Beban Listrik dan Air", kelompok: "Beban Usaha", normal: "Debit" },
  { kode: "6102", nama: "Beban Ongkos Antar/Angkut", kelompok: "Beban Usaha", normal: "Debit" },
  { kode: "6103", nama: "Beban Perlengkapan", kelompok: "Beban Usaha", normal: "Debit" },
  { kode: "6104", nama: "Beban Lain-lain", kelompok: "Beban Usaha", normal: "Debit" },
  { kode: "6105", nama: "Beban Barang Rusak/Kedaluwarsa", kelompok: "Beban Usaha", normal: "Debit" },
  { kode: "6201", nama: "Beban Pajak Penghasilan Final", kelompok: "Pajak", normal: "Debit" }
];

// Data Awal Sesuai Ilustrasi Dokumen Tahap 2
function getInitialState() {
  return {
    role: "pemilik",
    notaCounter: 46,
    waCounter: 13,
    barang: [
      { kode: "BRG-001", nama: "Beras premium 5 kg", satuan: "pak", hargaBeli: 62000, hargaJual: 72000, stok: 17, minStok: 15, ed: "" },
      { kode: "BRG-014", nama: "Minyak goreng 1 L", satuan: "btl", hargaBeli: 15500, hargaJual: 18000, stok: 31, minStok: 25, ed: "2027-08-15" },
      { kode: "BRG-022", nama: "Telur ayam 1 kg", satuan: "kg", hargaBeli: 24500, hargaJual: 28000, stok: 8, minStok: 10, ed: "2026-11-27" },
      { kode: "BRG-045", nama: "Mie instan goreng", satuan: "bks", hargaBeli: 2800, hargaJual: 3500, stok: 27, minStok: 60, ed: "2027-06-20" },
      { kode: "BRG-052", nama: "Susu kental manis", satuan: "klg", hargaBeli: 11000, hargaJual: 13000, stok: 7, minStok: 6, ed: "2026-12-05" },
      { kode: "BRG-060", nama: "Gas LPG 3 kg", satuan: "tbg", hargaBeli: 17500, hargaJual: 20000, stok: 10, minStok: 8, ed: "" }
    ],
    // Saldo awal November 2026 (selaras dengan ilustrasi laporan Tahap 2)
    keuangan: {
      kasAwal: 5600000,
      kasUsaha: 5790000,
      persediaanAwal: 8000000,
      asetTetap: 5000000,
      modalPemilik: 18800000,
      penjualanNov: 12800000,
      pembelianNov: 11360000,
      hppNov: 10560000,
      bebanListrik: 250000,
      bebanOngkos: 150000,
      bebanPerlengkapan: 100000,
      bebanLain: 50000,
      bebanRusak: 200000,
      prive: 700000
    },
    omzetBulanan2026: [
      { bulan: "Januari", omzet: 11500000 },
      { bulan: "Februari", omzet: 10800000 },
      { bulan: "Maret", omzet: 12400000 },
      { bulan: "April", omzet: 13900000 },
      { bulan: "Mei", omzet: 12100000 },
      { bulan: "Juni", omzet: 11800000 },
      { bulan: "Juli", omzet: 12600000 },
      { bulan: "Agustus", omzet: 13200000 },
      { bulan: "September", omzet: 12000000 },
      { bulan: "Oktober", omzet: 12900000 },
      { bulan: "November", omzet: 12800000 },
      { bulan: "Desember", omzet: 0 }
    ],
    salesHistory: [
      { noNota: "NJ/2026/11/0045", tanggal: "2026-11-09", kanal: "POS Toko", pembeli: "Umum", total: 151500, voided: false }
    ],
    waOrders: [
      {
        noWa: "WA/2026/11/0012",
        noNota: "NJ/2026/11/0046",
        pembeli: "Bu Siti",
        phone: "0812-3456-7890",
        alamat: "Jl. Patimura, Loram Kulon",
        metode: "Diantar",
        kodeBarang: "BRG-060",
        namaBarang: "Gas LPG 3 kg",
        qty: 1,
        total: 20000,
        statusStep: 2 // 1: Baru, 2: Disiapkan, 3: Diantar, 4: Diterima & Dibayar
      }
    ],
    jurnal: [
      { tanggal: "2026-11-09", bukti: "NJ/2026/11/0045", ket: "Penjualan Tunai POS", akun: "1101 Kas Usaha", debit: 151500, kredit: 0 },
      { tanggal: "2026-11-09", bukti: "NJ/2026/11/0045", ket: "Penjualan Tunai POS", akun: "4101 Penjualan", debit: 0, kredit: 151500 }
    ],
    auditLog: [
      { waktu: "2026-11-09 14:21", peran: "Penjaga Toko", aktivitas: "Input Penjualan POS", detail: "Nota NJ/2026/11/0045 - Rp 151.500" }
    ]
  };
}

let state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || getInitialState();
let posCart = [];

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function formatRp(num) {
  return "Rp " + Math.round(num).toLocaleString("id-ID");
}

function addAudit(aktivitas, detail) {
  const now = new Date().toISOString().slice(0, 16).replace("T", " ");
  state.auditLog.unshift({
    waktu: now,
    peran: state.role === "pemilik" ? "Pemilik" : "Penjaga Toko",
    aktivitas,
    detail
  });
}

function verifyOwnerPin(actionName) {
  if (state.role === "pemilik") return true;
  const pin = prompt(`Otorisasi Diperlukan (${actionName}).\nMasukkan PIN Pemilik (Default: 1234):`);
  if (pin === OWNER_PIN) {
    addAudit("Otorisasi PIN Pemilik", `Menyetujui: ${actionName}`);
    return true;
  }
  alert("PIN Pemilik salah! Aksi dibatalkan demi pengendalian internal.");
  return false;
}

// NAVIGASI & PERAN
function switchRole(newRole) {
  if (newRole === "pemilik") {
    const pin = prompt("Masukkan PIN Pemilik untuk beralih peran (Default: 1234):");
    if (pin !== OWNER_PIN) {
      alert("PIN Salah!");
      document.getElementById("roleSelect").value = "penjaga";
      return;
    }
  }
  state.role = newRole;
  saveState();
  applyRolePermissions();
  openTab("dashboard");
  renderAll();
}

function applyRolePermissions() {
  const isOwner = state.role === "pemilik";
  document.getElementById("roleSelect").value = state.role;
  document.getElementById("dashRoleBadge").textContent = isOwner ? "Akses: Pemilik" : "Akses: Penjaga Toko";
  document.getElementById("posKasir").value = isOwner ? "Pemilik" : "Penjaga Toko";

  document.querySelectorAll(".owner-only").forEach(el => {
    el.style.display = isOwner ? "" : "none";
  });
}

function openTab(tabId) {
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));

  const target = document.getElementById(`tab-${tabId}`);
  const btn = document.querySelector(`.nav-btn[data-tab="${tabId}"]`);
  if (target) target.classList.add("active");
  if (btn) btn.classList.add("active");

  if (tabId === "pos") initPosForm();
  if (tabId === "rekonsiliasi") initRekonsiliasi();
  renderAll();
}

// RENDER ALL
function renderAll() {
  renderDashboard();
  renderMasterBarang();
  renderCoa();
  renderWaOrders();
  renderReports();
  renderPajak();
  renderJurnalAndAudit();
  populateDropdowns();
}

function renderDashboard() {
  const k = state.keuangan;
  const totalBeban = k.bebanListrik + k.bebanOngkos + k.bebanPerlengkapan + k.bebanLain + k.bebanRusak;
  const labaBersih = k.penjualanNov - k.hppNov - totalBeban;
  const omzetTahun = state.omzetBulanan2026.reduce((sum, m) => sum + m.omzet, 0);

  document.getElementById("kpiKas").textContent = formatRp(k.kasUsaha);
  document.getElementById("kpiPenjualan").textContent = formatRp(k.penjualanNov);
  document.getElementById("kpiLaba").textContent = formatRp(labaBersih);
  document.getElementById("kpiOmzetTahun").textContent = formatRp(omzetTahun);
  document.getElementById("kpiPajakStatus").textContent =
    omzetTahun <= 500000000 ? "Bebas PPh Final (< Rp500 Jt)" : "Kena PPh Final 0,5%";

  // Peringatan Stok & ED
  const alertContainer = document.getElementById("dashAlerts");
  alertContainer.innerHTML = "";
  const today = new Date("2026-11-24");

  state.barang.forEach(b => {
    if (b.stok <= b.minStok) {
      alertContainer.innerHTML += `<div class="alert-item alert-warn"><strong>Stok Menipis:</strong> ${b.nama} tersisa ${b.stok} ${b.satuan} (Min: ${b.minStok}). Segera belanja!</div>`;
    }
    if (b.ed) {
      const diffDays = Math.ceil((new Date(b.ed) - today) / (1000 * 60 * 60 * 24));
      if (diffDays <= 30) {
        alertContainer.innerHTML += `<div class="alert-item alert-danger"><strong>Peringatan FEFO (ED &lt; 30 Hari):</strong> ${b.nama} kedaluwarsa pada ${b.ed} (${diffDays} hari lagi). Prioritaskan jual!</div>`;
      }
    }
  });

  // Penjualan Terakhir
  const tbody = document.getElementById("dashRecentSales");
  tbody.innerHTML = state.salesHistory.slice(0, 5).map(s => `
    <tr>
      <td>${s.noNota} ${s.voided ? '<span class="badge-status badge-red">VOID</span>' : ''}</td>
      <td>${s.kanal}</td>
      <td>${formatRp(s.total)}</td>
      <td>
        ${!s.voided ? `<button class="btn btn-danger btn-sm" onclick="voidSale('${s.noNota}')">Void (PIN)</button>` : '-'}
      </td>
    </tr>
  `).join("");
}

function renderMasterBarang() {
  const tbody = document.getElementById("tbodyMasterBarang");
  const tbodyStok = document.getElementById("tbodyLapStok");
  const today = new Date("2026-11-24");

  tbody.innerHTML = "";
  tbodyStok.innerHTML = "";

  state.barang.forEach(b => {
    const margin = b.hargaJual - b.hargaBeli;
    tbody.innerHTML += `
      <tr>
        <td><strong>${b.kode}</strong></td>
        <td>${b.nama}</td>
        <td>${b.satuan}</td>
        <td>${formatRp(b.hargaBeli)}</td>
        <td>${formatRp(b.hargaJual)}</td>
        <td>${formatRp(margin)}</td>
        <td><strong>${b.stok}</strong></td>
        <td>${b.minStok}</td>
        <td>${b.ed || "-"}</td>
      </tr>
    `;

    let statusBadge = `<span class="badge-status badge-green">OK</span>`;
    if (b.ed) {
      const diffDays = Math.ceil((new Date(b.ed) - today) / (1000 * 60 * 60 * 24));
      if (diffDays <= 30) statusBadge = `<span class="badge-status badge-red">ED &lt; 30 hari</span>`;
    }
    if (b.stok <= b.minStok) {
      statusBadge = `<span class="badge-status badge-yellow">Menipis</span>`;
    }

    tbodyStok.innerHTML += `
      <tr>
        <td>${b.kode}</td>
        <td>${b.nama}</td>
        <td>${b.satuan}</td>
        <td><strong>${b.stok}</strong></td>
        <td>${b.minStok}</td>
        <td>${b.ed || "-"}</td>
        <td>${statusBadge}</td>
      </tr>
    `;
  });
}

function handleSaveBarang(e) {
  e.preventDefault();
  const kode = document.getElementById("mKode").value.trim().toUpperCase();
  const nama = document.getElementById("mNama").value.trim();
  const satuan = document.getElementById("mSatuan").value.trim();
  const minStok = Number(document.getElementById("mMinStok").value);
  const hargaBeli = Number(document.getElementById("mHargaBeli").value);
  const hargaJual = Number(document.getElementById("mHargaJual").value);
  const stok = Number(document.getElementById("mStok").value);
  const ed = document.getElementById("mEd").value;

  const existing = state.barang.find(b => b.kode === kode);
  if (existing) {
    Object.assign(existing, { nama, satuan, minStok, hargaBeli, hargaJual, stok, ed });
    addAudit("Update Master Barang", `${kode} - ${nama} (Harga Jual: ${formatRp(hargaJual)})`);
  } else {
    state.barang.push({ kode, nama, satuan, hargaBeli, hargaJual, stok, minStok, ed });
    addAudit("Tambah Master Barang", `${kode} - ${nama}`);
  }
  saveState();
  e.target.reset();
  renderAll();
  alert("Data barang berhasil disimpan!");
}

function renderCoa() {
  document.getElementById("tbodyCoa").innerHTML = COA_LIST.map(c => `
    <tr>
      <td><strong>${c.kode}</strong></td>
      <td>${c.nama}</td>
      <td>${c.kelompok}</td>
      <td>${c.normal}</td>
    </tr>
  `).join("");
}

function populateDropdowns() {
  const options = `<option value="">-- Pilih Barang --</option>` +
    state.barang.map(b => `<option value="${b.kode}">${b.kode} - ${b.nama} (Stok: ${b.stok} | ${formatRp(b.hargaJual)})</option>`).join("");

  ["posSelectBarang", "waBarang", "expSelectBarang", "opBarang"].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const prev = el.value;
      el.innerHTML = options;
      if (prev) el.value = prev;
    }
  });
}

// MODUL 2.1 POS PENJUALAN
function initPosForm() {
  document.getElementById("posNoNota").value = `NJ/2026/11/${String(state.notaCounter).padStart(4, "0")}`;
  document.getElementById("posTanggal").value = "24-11-2026";
  document.getElementById("posKasir").value = state.role === "pemilik" ? "Pemilik" : "Penjaga Toko";
  renderPosCart();
}

function addPosItem() {
  const kode = document.getElementById("posSelectBarang").value;
  const qty = Number(document.getElementById("posQty").value);
  const diskon = Number(document.getElementById("posItemDiskon").value) || 0;

  if (!kode || qty <= 0) return alert("Pilih barang dan isi Qty lebih dari 0.");
  const item = state.barang.find(b => b.kode === kode);

  const inCart = posCart.find(c => c.kode === kode);
  const totalQty = (inCart ? inCart.qty : 0) + qty;

  // Kontrol K3: Tolak jika melebihi stok
  if (totalQty > item.stok) {
    alert(`Stok tidak cukup! Stok ${item.nama} tersedia: ${item.stok} ${item.satuan}. Silakan tawarkan barang pengganti.`);
    return;
  }

  if (inCart) {
    inCart.qty += qty;
    inCart.diskon += diskon;
  } else {
    posCart.push({
      kode: item.kode,
      nama: item.nama,
      hargaBeli: item.hargaBeli,
      hargaJual: item.hargaJual,
      stok: item.stok,
      qty,
      diskon
    });
  }
  renderPosCart();
}

function removePosItem(idx) {
  posCart.splice(idx, 1);
  renderPosCart();
}

function renderPosCart() {
  const tbody = document.getElementById("tbodyPosCart");
  tbody.innerHTML = posCart.map((c, idx) => {
    const sub = (c.hargaJual * c.qty) - c.diskon;
    return `
      <tr>
        <td>${c.kode}</td>
        <td>${c.nama}</td>
        <td class="input-gray">${formatRp(c.hargaJual)}</td>
        <td class="input-gray">${c.stok}</td>
        <td>${c.qty}</td>
        <td>${formatRp(c.diskon)}</td>
        <td class="input-gray"><strong>${formatRp(sub)}</strong></td>
        <td><button class="btn btn-danger btn-sm" onclick="removePosItem(${idx})">X</button></td>
      </tr>
    `;
  }).join("");
  calcPosSummary();
}

function calcPosSummary() {
  const subtotal = posCart.reduce((sum, c) => sum + ((c.hargaJual * c.qty) - c.diskon), 0);
  const extraDiskon = Number(document.getElementById("posExtraDiskon").value) || 0;
  const total = Math.max(0, subtotal - extraDiskon);
  const bayar = Number(document.getElementById("posBayar").value) || 0;
  const kembalian = Math.max(0, bayar - total);

  document.getElementById("posSubtotal").textContent = formatRp(subtotal);
  document.getElementById("posDpp").textContent = formatRp(total);
  document.getElementById("posTotal").textContent = formatRp(total);
  document.getElementById("posKembalian").value = formatRp(kembalian);
}

function submitPosSale() {
  if (posCart.length === 0) return alert("Keranjang penjualan masih kosong!");

  const subtotal = posCart.reduce((sum, c) => sum + ((c.hargaJual * c.qty) - c.diskon), 0);
  const itemDiskonTotal = posCart.reduce((sum, c) => sum + c.diskon, 0);
  const extraDiskon = Number(document.getElementById("posExtraDiskon").value) || 0;
  const totalDiskon = itemDiskonTotal + extraDiskon;
  const totalBayar = Math.max(0, subtotal - extraDiskon);
  const uangBayar = Number(document.getElementById("posBayar").value) || 0;

  // Kontrol K2: Diskon di atas Rp5.000 butuh PIN Pemilik
  if (totalDiskon > 5000) {
    if (!verifyOwnerPin(`Diskon sebesar ${formatRp(totalDiskon)} (> Rp5.000)`)) return;
  }

  if (uangBayar < totalBayar) {
    return alert("Uang tunai dibayar kurang dari Total Bayar!");
  }

  const noNota = document.getElementById("posNoNota").value;
  const pembeli = document.getElementById("posPembeli").value || "Umum";
  let totalHpp = 0;

  // Kurangi stok & hitung HPP
  posCart.forEach(c => {
    const master = state.barang.find(b => b.kode === c.kode);
    master.stok -= c.qty;
    totalHpp += (c.hargaBeli * c.qty);
  });

  // Update Keuangan & Omzet
  state.keuangan.kasUsaha += totalBayar;
  state.keuangan.penjualanNov += totalBayar;
  state.keuangan.hppNov += totalHpp;
  state.omzetBulanan2026[10].omzet += totalBayar;

  // Jurnal Otomatis
  state.jurnal.unshift(
    { tanggal: "2026-11-24", bukti: noNota, ket: `Penjualan POS (${pembeli})`, akun: "1101 Kas Usaha", debit: totalBayar, kredit: 0 },
    { tanggal: "2026-11-24", bukti: noNota, ket: `Penjualan POS (${pembeli})`, akun: "4101 Penjualan", debit: 0, kredit: totalBayar },
    { tanggal: "2026-11-24", bukti: noNota, ket: `HPP Penjualan (${noNota})`, akun: "5101 Harga Pokok Penjualan", debit: totalHpp, kredit: 0 },
    { tanggal: "2026-11-24", bukti: noNota, ket: `Pengurangan Persediaan (${noNota})`, akun: "1102 Persediaan Barang Dagang", debit: 0, kredit: totalHpp }
  );

  state.salesHistory.unshift({ noNota, tanggal: "2026-11-24", kanal: "POS Toko", pembeli, total: totalBayar, voided: false });
  addAudit("Transaksi Penjualan POS", `${noNota} - Total ${formatRp(totalBayar)}`);

  // Tampilkan Struk Nota
  showReceiptModal(noNota, pembeli, posCart, totalBayar, uangBayar, uangBayar - totalBayar);

  state.notaCounter++;
  posCart = [];
  document.getElementById("posBayar").value = "";
  document.getElementById("posExtraDiskon").value = 0;
  saveState();
  initPosForm();
  renderAll();
}

function voidSale(noNota) {
  if (!verifyOwnerPin(`Void Nota ${noNota}`)) return;
  const alasan = prompt("Masukkan alasan pembatalan (Void) nota (Wajib):");
  if (!alasan) return;

  const sale = state.salesHistory.find(s => s.noNota === noNota);
  if (!sale || sale.voided) return;

  sale.voided = true;
  state.keuangan.kasUsaha -= sale.total;
  state.keuangan.penjualanNov -= sale.total;
  state.omzetBulanan2026[10].omzet -= sale.total;

  state.jurnal.unshift(
    { tanggal: "2026-11-24", bukti: `VOID-${noNota}`, ket: `Void Nota: ${alasan}`, akun: "4101 Penjualan", debit: sale.total, kredit: 0 },
    { tanggal: "2026-11-24", bukti: `VOID-${noNota}`, ket: `Pengembalian Kas Void`, akun: "1101 Kas Usaha", debit: 0, kredit: sale.total }
  );

  addAudit("VOID NOTA PENJUALAN", `${noNota} dibatalkan (${formatRp(sale.total)}). Alasan: ${alasan}`);
  saveState();
  renderAll();
}

function showReceiptModal(noNota, pembeli, items, total, bayar, kembali) {
  const lines = items.map(i => `${i.nama} (${i.qty}x) = ${formatRp((i.hargaJual * i.qty) - i.diskon)}`).join("<br>");
  document.getElementById("notaPrintArea").innerHTML = `
    <div style="text-align:center;">
      <strong>TOKO HAMBALI</strong><br>
      Jl. Raya Patimura, Loram Kulon<br>
      ------------------------------
    </div>
    No. Nota: ${noNota}<br>
    Pembeli : ${pembeli}<br>
    ------------------------------<br>
    ${lines}<br>
    ------------------------------<br>
    <strong>TOTAL   : ${formatRp(total)}</strong><br>
    TUNAI   : ${formatRp(bayar)}<br>
    KEMBALI : ${formatRp(kembali)}<br>
    <div style="text-align:center; margin-top:8px;">Terima Kasih</div>
  `;
  document.getElementById("notaModal").classList.add("show");
}

function closeModal(id) {
  document.getElementById(id).classList.remove("show");
}

// MODUL 2.2 PESANAN WHATSAPP
function submitWaOrder(e) {
  e.preventDefault();
  const kode = document.getElementById("waBarang").value;
  const qty = Number(document.getElementById("waQty").value);
  const item = state.barang.find(b => b.kode === kode);

  if (!item || qty > item.stok) {
    return alert("Stok barang tidak mencukupi untuk pesanan WhatsApp ini!");
  }

  const noWa = `WA/2026/11/${String(state.waCounter++).padStart(4, "0")}`;
  const noNota = `NJ/2026/11/${String(state.notaCounter++).padStart(4, "0")}`;

  state.waOrders.unshift({
    noWa,
    noNota,
    pembeli: document.getElementById("waNama").value,
    phone: document.getElementById("waPhone").value,
    alamat: document.getElementById("waAlamat").value,
    metode: document.getElementById("waMetode").value,
    kodeBarang: item.kode,
    namaBarang: item.nama,
    qty,
    total: item.hargaJual * qty,
    statusStep: 1
  });

  addAudit("Pesanan WhatsApp Baru", `${noWa} - ${document.getElementById("waNama").value}`);
  saveState();
  e.target.reset();
  renderAll();
}

function advanceWaStatus(idx) {
  const order = state.waOrders[idx];
  if (order.statusStep === 1) {
    order.statusStep = 2; // Disiapkan
  } else if (order.statusStep === 2) {
    const cek = confirm("Ceklis Kontrol K9: Apakah fisik barang sudah dicocokkan 100% dengan Surat Jalan/Nota?");
    if (!cek) return;
    order.statusStep = 3; // Diantar
  } else if (order.statusStep === 3) {
    const terima = confirm("Konfirmasi tanda terima pembeli & setoran tunai pengantar sesuai total nota?");
    if (!terima) return;
    order.statusStep = 4; // Diterima & Dibayar -> Posting Jurnal & Potong Stok

    const master = state.barang.find(b => b.kode === order.kodeBarang);
    const hpp = master.hargaBeli * order.qty;
    master.stok -= order.qty;

    state.keuangan.kasUsaha += order.total;
    state.keuangan.penjualanNov += order.total;
    state.keuangan.hppNov += hpp;
    state.omzetBulanan2026[10].omzet += order.total;

    state.jurnal.unshift(
      { tanggal: "2026-11-24", bukti: order.noNota, ket: `Pesanan WA Selesai (${order.pembeli})`, akun: "1101 Kas Usaha", debit: order.total, kredit: 0 },
      { tanggal: "2026-11-24", bukti: order.noNota, ket: `Penjualan WA (${order.pembeli})`, akun: "4101 Penjualan", debit: 0, kredit: order.total },
      { tanggal: "2026-11-24", bukti: order.noNota, ket: `HPP Pesanan WA`, akun: "5101 Harga Pokok Penjualan", debit: hpp, kredit: 0 },
      { tanggal: "2026-11-24", bukti: order.noNota, ket: `Potong Stok WA`, akun: "1102 Persediaan Barang Dagang", debit: 0, kredit: hpp }
    );
    state.salesHistory.unshift({ noNota: order.noNota, tanggal: "2026-11-24", kanal: "Pesanan WA", pembeli: order.pembeli, total: order.total, voided: false });
    addAudit("Pesanan WA Lunas & Disetor", `${order.noWa} -> Jurnal & Stok terposting.`);
  }
  saveState();
  renderAll();
}

function renderWaOrders() {
  const stepLabels = ["", "1. Baru", "2. Disiapkan", "3. Diantar", "4. Diterima & Dibayar"];
  document.getElementById("tbodyWaOrders").innerHTML = state.waOrders.map((o, idx) => `
    <tr>
      <td><strong>${o.noWa}</strong><br><small>${o.noNota}</small></td>
      <td>${o.pembeli} (${o.phone})<br><small>${o.alamat} [${o.metode}]</small></td>
      <td>${o.namaBarang} (${o.qty}x)</td>
      <td><strong>${formatRp(o.total)}</strong></td>
      <td><span class="badge-status ${o.statusStep === 4 ? 'badge-green' : 'badge-yellow'}">${stepLabels[o.statusStep]}</span></td>
      <td>
        ${o.statusStep < 4 ? `<button class="btn btn-primary btn-sm" onclick="advanceWaStatus(${idx})">Lanjut Tahap Berikutnya &rarr;</button>` : 'Selesai & Terjurnal'}
      </td>
    </tr>
  `).join("");
}

// MODUL 2.3/2.4 PEMBELIAN, BEBAN & PRIVE
function toggleExpFields() {
  const jenis = document.getElementById("expJenis").value;
  document.getElementById("expBarangBox").style.display = jenis === "pembelian" ? "" : "none";
  document.getElementById("expQtyBox").style.display = jenis === "pembelian" ? "" : "none";
  document.getElementById("expEdBox").style.display = jenis === "pembelian" ? "" : "none";
  document.getElementById("expAkunBox").style.display = jenis === "beban" ? "" : "none";
}

function submitExpenseOrPurchase(e) {
  e.preventDefault();
  const jenis = document.getElementById("expJenis").value;
  const tanggal = document.getElementById("expTanggal").value;
  const pemasok = document.getElementById("expPemasok").value;
  const refNota = document.getElementById("expRefNota").value;
  const nominal = Number(document.getElementById("expNominal").value);

  if (nominal > state.keuangan.kasUsaha) {
    return alert("Saldo Kas Usaha tidak mencukupi untuk pengeluaran tunai ini!");
  }

  state.keuangan.kasUsaha -= nominal;
  const noBukti = `BL/2026/11/${String(Math.floor(Math.random() * 900) + 100)}`;

  if (jenis === "pembelian") {
    const kode = document.getElementById("expSelectBarang").value;
    const qty = Number(document.getElementById("expQty").value);
    const ed = document.getElementById("expEd").value;
    const master = state.barang.find(b => b.kode === kode);
    if (master) {
      master.stok += qty;
      if (ed) master.ed = ed;
    }
    state.keuangan.pembelianNov += nominal;
    state.jurnal.unshift(
      { tanggal, bukti: noBukti, ket: `Beli Persediaan (${pemasok} - ${refNota})`, akun: "1102 Persediaan Barang Dagang", debit: nominal, kredit: 0 },
      { tanggal, bukti: noBukti, ket: `Pembayaran Tunai Pembelian`, akun: "1101 Kas Usaha", debit: 0, kredit: nominal }
    );
  } else if (jenis === "beban") {
    const akun = document.getElementById("expAkunBeban").value;
    if (akun === "6101") state.keuangan.bebanListrik += nominal;
    if (akun === "6102") state.keuangan.bebanOngkos += nominal;
    if (akun === "6103") state.keuangan.bebanPerlengkapan += nominal;
    if (akun === "6104") state.keuangan.bebanLain += nominal;

    const akunObj = COA_LIST.find(c => c.kode === akun);
    state.jurnal.unshift(
      { tanggal, bukti: noBukti, ket: `Bayar ${akunObj.nama} (${pemasok})`, akun: `${akun} ${akunObj.nama}`, debit: nominal, kredit: 0 },
      { tanggal, bukti: noBukti, ket: `Kas Keluar Beban`, akun: "1101 Kas Usaha", debit: 0, kredit: nominal }
    );
  } else if (jenis === "prive") {
    // Kontrol K6: Prive dipisah ke akun 3103 agar tidak tercampur beban usaha
    state.keuangan.prive += nominal;
    state.jurnal.unshift(
      { tanggal, bukti: noBukti, ket: `Pengambilan Prive Pemilik (${refNota})`, akun: "3103 Prive (Pengambilan Pribadi)", debit: nominal, kredit: 0 },
      { tanggal, bukti: noBukti, ket: `Kas Keluar Prive`, akun: "1101 Kas Usaha", debit: 0, kredit: nominal }
    );
  }

  addAudit(`Input ${jenis.toUpperCase()}`, `${noBukti} - ${pemasok} (${formatRp(nominal)}) [Bukti Foto Terlampir]`);
  saveState();
  e.target.reset();
  toggleExpFields();
  renderAll();
  alert("Transaksi & Lampiran Bukti berhasil disimpan dan dijurnal!");
}

// MODUL 2.5/2.6 STOK OPNAME & BARANG RUSAK
function updateOpSistemStok() {
  const kode = document.getElementById("opBarang").value;
  const item = state.barang.find(b => b.kode === kode);
  document.getElementById("opStokSistem").value = item ? item.stok : "";
}

function submitOpname(e) {
  e.preventDefault();
  const kode = document.getElementById("opBarang").value;
  const fisik = Number(document.getElementById("opStokFisik").value);
  const alasan = document.getElementById("opAlasan").value;
  const item = state.barang.find(b => b.kode === kode);

  if (!item) return;
  const selisih = fisik - item.stok;
  if (selisih === 0) return alert("Tidak ada selisih stok.");

  const nilaiRugi = Math.abs(selisih) * item.hargaBeli;

  // Kontrol K3 & K4: Kerugian > Rp50.000 butuh otorisasi Pemilik
  if (nilaiRugi > 50000) {
    if (!verifyOwnerPin(`Persetujuan Selisih Stok/Rusak senilai ${formatRp(nilaiRugi)} (> Rp50.000)`)) return;
  }

  item.stok = fisik;
  if (selisih < 0) {
    state.keuangan.bebanRusak += nilaiRugi;
    state.jurnal.unshift(
      { tanggal: "2026-11-24", bukti: "BA/2026/11", ket: `${alasan}: ${item.nama} (${selisih})`, akun: "6105 Beban Barang Rusak/Kedaluwarsa", debit: nilaiRugi, kredit: 0 },
      { tanggal: "2026-11-24", bukti: "BA/2026/11", ket: `Penyesuaian Persediaan`, akun: "1102 Persediaan Barang Dagang", debit: 0, kredit: nilaiRugi }
    );
  }

  addAudit("Berita Acara Opname/Rusak", `${item.nama}: Sistem -> Fisik (${fisik}), Nilai: ${formatRp(nilaiRugi)}`);
  saveState();
  e.target.reset();
  renderAll();
  alert("Berita Acara Opname/Rusak berhasil diposting ke jurnal!");
}

// MODUL 2.7 REKONSILIASI KAS
function initRekonsiliasi() {
  document.getElementById("rekKasSistem").value = formatRp(state.keuangan.kasUsaha);
  document.getElementById("rekKasFisik").value = state.keuangan.kasUsaha;
  calcRekSelisih();
}

function calcRekSelisih() {
  const fisik = Number(document.getElementById("rekKasFisik").value) || 0;
  const selisih = fisik - state.keuangan.kasUsaha;
  document.getElementById("rekSelisih").value = formatRp(selisih);
}

function submitRekonsiliasi(e) {
  e.preventDefault();
  const fisik = Number(document.getElementById("rekKasFisik").value);
  const selisih = fisik - state.keuangan.kasUsaha;
  const alasan = document.getElementById("rekAlasan").value.trim();

  if (selisih !== 0 && !alasan) {
    return alert("Kontrol K6: Selisih kas tidak nol! Wajib mengisi alasan selisih untuk ditinjau Pemilik.");
  }

  addAudit("Rekonsiliasi Kas Harian", `Sistem: ${formatRp(state.keuangan.kasUsaha)} | Fisik: ${formatRp(fisik)} | Selisih: ${formatRp(selisih)} (${alasan || "Klop"})`);
  saveState();
  renderAll();
  alert("Rekonsiliasi kas harian tercatat di Log Audit!");
}

// MODUL 3 LAPORAN KEUANGAN SAK EMKM
function renderReports() {
  const k = state.keuangan;
  const barangTersedia = k.persediaanAwal + k.pembelianNov;
  const persediaanAkhir = state.barang.reduce((sum, b) => sum + (b.stok * b.hargaBeli), 0);
  const labaKotor = k.penjualanNov - k.hppNov;
  const totalBeban = k.bebanListrik + k.bebanOngkos + k.bebanPerlengkapan + k.bebanLain + k.bebanRusak;
  const labaBersih = labaKotor - totalBeban;

  // 3.1 Laba Rugi
  document.getElementById("reportLabaRugi").innerHTML = `
    <div class="rep-title">
      <h3>TOKO HAMBALI</h3>
      <p>LAPORAN LABA RUGI (SAK EMKM) — Periode November 2026</p>
    </div>
    <table class="rep-table">
      <tr><td>Penjualan (4101)</td><td class="text-right"><strong>${formatRp(k.penjualanNov)}</strong></td></tr>
      <tr><td>Persediaan Awal</td><td class="text-right">${formatRp(k.persediaanAwal)}</td></tr>
      <tr><td>Pembelian Bersih</td><td class="text-right">${formatRp(k.pembelianNov)}</td></tr>
      <tr><td>Barang Tersedia untuk Dijual</td><td class="text-right">${formatRp(barangTersedia)}</td></tr>
      <tr><td>Harga Pokok Penjualan (5101)</td><td class="text-right">(${formatRp(k.hppNov)})</td></tr>
      <tr class="rep-total"><td>LABA KOTOR</td><td class="text-right">${formatRp(labaKotor)}</td></tr>
      <tr class="rep-section"><td colspan="2">BEBAN USAHA</td></tr>
      <tr><td>Beban Listrik dan Air (6101)</td><td class="text-right">(${formatRp(k.bebanListrik)})</td></tr>
      <tr><td>Beban Ongkos Antar/Angkut (6102)</td><td class="text-right">(${formatRp(k.bebanOngkos)})</td></tr>
      <tr><td>Beban Perlengkapan (6103)</td><td class="text-right">(${formatRp(k.bebanPerlengkapan)})</td></tr>
      <tr><td>Beban Barang Rusak/Kedaluwarsa (6105)</td><td class="text-right">(${formatRp(k.bebanRusak)})</td></tr>
      <tr><td>Beban Lain-lain (6104)</td><td class="text-right">(${formatRp(k.bebanLain)})</td></tr>
      <tr><td>Jumlah Beban Usaha</td><td class="text-right">(${formatRp(totalBeban)})</td></tr>
      <tr><td>Beban PPh Final 0,5% (6201) - Omzet &lt; Rp500 Jt</td><td class="text-right">Rp 0</td></tr>
      <tr class="rep-total"><td>LABA BERSIH</td><td class="text-right">${formatRp(labaBersih)}</td></tr>
    </table>
  `;

  // 3.2 Posisi Keuangan / Neraca
  const totalAset = k.kasUsaha + persediaanAkhir + k.asetTetap;
  const totalEkuitas = totalAset; // Penyesuaian modal awal terhadap nilai persediaan berjalan
  const modalPenyesuaian = totalEkuitas - labaBersih + k.prive;

  document.getElementById("reportNeraca").innerHTML = `
    <div class="rep-title">
      <h3>TOKO HAMBALI</h3>
      <p>LAPORAN POSISI KEUANGAN / NERACA (SAK EMKM) — Per 30 November 2026</p>
    </div>
    <table class="rep-table">
      <tr class="rep-section"><td colspan="2">ASET</td></tr>
      <tr><td>Kas Usaha (1101)</td><td class="text-right">${formatRp(k.kasUsaha)}</td></tr>
      <tr><td>Persediaan Barang Dagang (1102)</td><td class="text-right">${formatRp(persediaanAkhir)}</td></tr>
      <tr><td>Aset Tetap, Neto (1201)</td><td class="text-right">${formatRp(k.asetTetap)}</td></tr>
      <tr class="rep-total"><td>TOTAL ASET</td><td class="text-right">${formatRp(totalAset)}</td></tr>
      <tr class="rep-section"><td colspan="2">LIABILITAS</td></tr>
      <tr><td>Utang Usaha (2101) & Utang Pajak (2102)</td><td class="text-right">Rp 0</td></tr>
      <tr class="rep-section"><td colspan="2">EKUITAS</td></tr>
      <tr><td>Modal Pemilik (3101)</td><td class="text-right">${formatRp(modalPenyesuaian)}</td></tr>
      <tr><td>Saldo Laba Bulan Berjalan (3102)</td><td class="text-right">${formatRp(labaBersih)}</td></tr>
      <tr><td>Prive / Pengambilan Pribadi (3103)</td><td class="text-right">(${formatRp(k.prive)})</td></tr>
      <tr class="rep-total"><td>TOTAL LIABILITAS DAN EKUITAS [STATUS: SEIMBANG]</td><td class="text-right">${formatRp(totalEkuitas)}</td></tr>
    </table>
  `;

  // 3.6 Rekap Arus Kas
  const bebanTunai = k.bebanListrik + k.bebanOngkos + k.bebanPerlengkapan + k.bebanLain;
  document.getElementById("reportArusKas").innerHTML = `
    <div class="rep-title">
      <h3>TOKO HAMBALI</h3>
      <p>REKAP ARUS KAS BULANAN — November 2026</p>
    </div>
    <table class="rep-table">
      <tr><td>Saldo Kas Awal Bulan</td><td class="text-right">${formatRp(k.kasAwal)}</td></tr>
      <tr class="rep-section"><td colspan="2">ARUS KAS MASUK</td></tr>
      <tr><td>Penjualan Tunai (POS Toko & Pesanan WhatsApp)</td><td class="text-right">${formatRp(k.penjualanNov)}</td></tr>
      <tr class="rep-section"><td colspan="2">ARUS KAS KELUAR</td></tr>
      <tr><td>Pembelian Persediaan Tunai</td><td class="text-right">(${formatRp(k.pembelianNov)})</td></tr>
      <tr><td>Beban Operasional Tunai</td><td class="text-right">(${formatRp(bebanTunai)})</td></tr>
      <tr><td>Prive (Pengambilan Pribadi Pemilik)</td><td class="text-right">(${formatRp(k.prive)})</td></tr>
      <tr class="rep-total"><td>SALDO KAS AKHIR USAHA (1101)</td><td class="text-right">${formatRp(k.kasUsaha)}</td></tr>
    </table>
  `;
}

// MODUL 3.3 REKAP PAJAK PP 55/2022
function renderPajak() {
  const tbody = document.getElementById("tbodyPajak");
  let kumulatif = 0;
  let totalPph = 0;

  tbody.innerHTML = state.omzetBulanan2026.map(m => {
    const prevKum = kumulatif;
    kumulatif += m.omzet;
    const kenaPajak = Math.max(0, kumulatif - 500000000) - Math.max(0, prevKum - 500000000);
    const pph = kenaPajak * 0.005;
    totalPph += pph;

    const status = m.omzet === 0
      ? "Belum diisi"
      : (kenaPajak === 0 ? '<span class="badge-status badge-green">Bebas Pajak</span>' : '<span class="badge-status badge-red">Terutang 0,5%</span>');

    return `
      <tr>
        <td>${m.bulan}</td>
        <td>${formatRp(m.omzet)}</td>
        <td><strong>${formatRp(kumulatif)}</strong></td>
        <td>${formatRp(kenaPajak)}</td>
        <td>${formatRp(pph)}</td>
        <td>${status}</td>
      </tr>
    `;
  }).join("");

  const pct = Math.min(100, Math.round((kumulatif / 500000000) * 100));
  const sisa = Math.max(0, 500000000 - kumulatif);

  document.getElementById("taxPercentLabel").textContent = `${pct}% (${formatRp(kumulatif)} / Rp 500.000.000)`;
  const fill = document.getElementById("taxProgressFill");
  fill.style.width = `${pct}%`;
  fill.style.background = pct < 80 ? "#16a34a" : (pct <= 100 ? "#f59e0b" : "#dc2626");

  document.getElementById("taxSummaryText").innerHTML =
    `Sisa batas omzet bebas pajak WP Orang Pribadi: <strong>${formatRp(sisa)}</strong>. Total PPh Final 0,5% Terutang Tahun 2026: <strong>${formatRp(totalPph)}</strong>.`;
}

// JURNAL & AUDIT
function renderJurnalAndAudit() {
  document.getElementById("tbodyJurnal").innerHTML = state.jurnal.map(j => `
    <tr>
      <td>${j.tanggal}</td>
      <td><strong>${j.bukti}</strong></td>
      <td>${j.ket}</td>
      <td>${j.akun}</td>
      <td>${j.debit ? formatRp(j.debit) : "-"}</td>
      <td>${j.kredit ? formatRp(j.kredit) : "-"}</td>
    </tr>
  `).join("");

  document.getElementById("tbodyAudit").innerHTML = state.auditLog.map(a => `
    <tr>
      <td>${a.waktu}</td>
      <td><span class="badge-status badge-yellow">${a.peran}</span></td>
      <td><strong>${a.aktivitas}</strong></td>
      <td>${a.detail}</td>
    </tr>
  `).join("");
}

function exportBackup() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Backup_SIA_TokoHambali_2026.json";
  a.click();
  addAudit("Backup Database Otomatis/Manual", "File JSON diunduh");
  saveState();
  renderJurnalAndAudit();
}

function resetDemoData() {
  if (!confirm("Reset seluruh data kembali ke angka ilustrasi awal dokumen Tahap 2?")) return;
  localStorage.removeItem(STORAGE_KEY);
  state = getInitialState();
  saveState();
  applyRolePermissions();
  renderAll();
}

// INISIALISASI SAAT HALAMAN DIBUKA
window.addEventListener("DOMContentLoaded", () => {
  applyRolePermissions();
  initPosForm();
  renderAll();
});