const API_URL = "https://script.google.com/macros/s/AKfycbzWmEpLxPb2CXShAWTJlHnTBbEKE73QD9qog_rPPeV-ewQ1PdAWxyhN0CVfmY_kUbKbww/exec";

async function loadSiswa() {
  const res = await fetch(API_URL);
  const data = await res.json();
  const namaSelect = document.getElementById("nama");
  const kelasSelect = document.getElementById("kelas");
  namaSelect.innerHTML = "";
  kelasSelect.innerHTML = "";
  const kelasSet = new Set();

  data.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.nama;
    opt.textContent = s.nama;
    namaSelect.appendChild(opt);
    kelasSet.add(s.kelas);
  });

  kelasSet.forEach(k => {
    const opt = document.createElement("option");
    opt.value = k;
    opt.textContent = k;
    kelasSelect.appendChild(opt);
  });
}

async function simpanData(e) {
  e.preventDefault();
  const data = {
    tanggal: new Date().toISOString().split("T")[0],
    nama: document.getElementById("nama").value,
    kelas: document.getElementById("kelas").value,
    alasan: document.getElementById("alasan").value,
    jam: new Date().toLocaleTimeString("id-ID")
  };
  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data)
  });
  alert("✅ Data berhasil disimpan!");
  document.getElementById("formKeterlambatan").reset();
}

document.addEventListener("DOMContentLoaded", () => {
  loadSiswa();
  document.getElementById("formKeterlambatan").addEventListener("submit", simpanData);
});