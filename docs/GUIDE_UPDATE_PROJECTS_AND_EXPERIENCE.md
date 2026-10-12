# Panduan Mengupdate Data Project & Experience

> Bagian Experience dan tautan menunya saat ini disembunyikan karena Rio telah mengonfirmasi bahwa data contoh bukan pengalamannya. Data pengalaman contoh dan asetnya sudah dihapus; array `EXPERIENCES` kini kosong. Berkas `src/data/experiences.ts` dan komponennya tetap tersedia. Setelah data pengalaman asli diisi, aktifkan kembali `ExperienceSection` di `src/app/page.tsx` dan tautan `/#experience` di menu.

Dokumentasi lengkap ini dibuat untuk memandu Anda mengupdate, menambah, atau menghapus data **Projects** dan **Experiences** di portofolio Anda kapan pun Anda siap.

---

## 📁 Daftar Lokasi Berkas & Aset

| Komponen | Berkas Data (TypeScript) | Folder Aset Gambar |
| :--- | :--- | :--- |
| **Experience** | [`src/data/experiences.ts`](../src/data/experiences.ts) | `public/images/experiences/` |
| **Projects** | [`src/data/projects.ts`](../src/data/projects.ts) | `public/images/projects/[project-id]/` |
| **Export Index** | [`src/data/index.ts`](../src/data/index.ts) | *(Menggabungkan seluruh export data)* |

---

## 💼 BAGIAN 1: Mengupdate & Menambah Experience

Data Experience ditampilkan di section **Experience (#experience)** dengan format **Pinned Horizontal Scroll**.

### 1. Struktur Objek Experience (`ExperienceItem`)
Setiap entri pengalaman memiliki properti berikut:

```typescript
export interface ExperienceItem {
  databaseId: string;    // ID unik (bisa gunakan string acak atau UUID)
  id: string;            // Slug unik (contoh: "tokopedia", "meta-ai")
  role: string;          // Jabatan/Peran (contoh: "Machine Learning Engineer")
  company: string;       // Nama Perusahaan/Instansi (contoh: "PT. Maju Bersama")
  type: string;          // Tipe pekerjaan: "Work" | "Intern" | "Freelance" | "Organization"
  period: string;        // Rentang waktu (contoh: "Jan 2025 — Present" atau "Aug 2024 — Dec 2024")
  duration: string;      // Durasi total (contoh: "1 yr 2 mos" atau "6 months")
  summary: string;       // Deskripsi ringkas 1-2 kalimat tentang tanggung jawab utama Anda
  highlights: string[];  // 3-4 poin pencapaian atau fokus kerja (muncul di kartu)
  image: string;         // Lokasi gambar di folder public (contoh: "/images/experiences/nama-perusahaan.webp")
  imageAlt: string;      // Deskripsi aksesibilitas gambar
  monogram: string;      // 2-3 huruf inisial perusahaan (contoh: "KRA", "GJK", "ML")
  status: string;        // "active"
  startDate: string;     // Format ISO Date (contoh: "2025-01-01T00:00:00.000Z")
  endDate: string;       // Format ISO Date (atau tanggal saat ini jika masih aktif)
  isCurrent: boolean;    // true jika pekerjaan saat ini, false jika sudah selesai
  updatedAt: string;     // Format ISO Date update terakhir
}
```

### 2. Template Siap Pakai untuk Menambah Experience Baru
Buka [`src/data/experiences.ts`](../src/data/experiences.ts), lalu tambahkan objek berikut ke dalam array `EXPERIENCES`:

```typescript
{
  databaseId: "exp-" + Date.now(),
  id: "nama-perusahaan-slug",
  role: "Machine Learning Engineer",
  company: "Nama Perusahaan Anda",
  type: "Work",
  period: "Jan 2025 — Present",
  duration: "1 year",
  summary:
    "Membangun pipeline machine learning end-to-end dan arsitektur backend untuk melayani inferensi model AI skala produksi.",
  highlights: [
    "Fine-tuning model LLM & integrasi vector search",
    "Optimasi latensi API backend hingga 45%",
    "Otomasi CI/CD & deployment container Docker",
    "Kolaborasi lintas tim engineering & data",
  ],
  image: "/images/experiences/nama-perusahaan.webp",
  imageAlt: "Rio with the engineering team at Company Name",
  monogram: "NPC", // 2-3 huruf inisial
  status: "active",
  startDate: "2025-01-01T00:00:00.000Z",
  endDate: "2026-01-01T00:00:00.000Z",
  isCurrent: true,
  updatedAt: new Date().toISOString(),
},
```

> **Tips Gambar Experience:**
> - Simpan gambar di `public/images/experiences/nama-perusahaan.webp`.
> - Rasio gambar yang disarankan adalah **4:3** atau **16:9** (resolusi ~800x600px atau 1200x800px).
> - Jika tidak ada foto dokumentasi kerja, Anda bisa menggunakan screenshot produk yang Anda buat di perusahaan tersebut atau logo kantor.

---

## 🚀 BAGIAN 2: Mengupdate & Menambah Project

Data proyek muncul di dua tempat:
1. **Homepage (#projects):** Menampilkan tiga proyek AI dengan `featured: true` sebagai sorotan utama. Kelompok **Swift / iOS (#ios-projects)** menampilkan galeri Slate, BrandLens, dan Personal Money Tracker. Kelompok **Flutter & Web** menampilkan Rantang, termasuk aplikasi seller Android/iOS.
2. **Projects Archive (/projects):** Menampilkan seluruh proyek dengan filter **All projects**, **Applied AI**, **Swift / iOS**, dan **Flutter & Web**. Setiap kartu memiliki galeri dan studi kasus yang dapat dibuka.

### 1. Susunan proyek saat ini

| Urutan | Proyek | Kategori | Featured |
| --- | --- | --- | --- |
| 01 | Strata PDA | `ai` | Ya |
| 02 | Streamly | `ai` | Ya |
| 03 | Market Intelligence / Signalroom | `ai` | Ya |
| 04 | Rantang | `fullstack` | Tidak |
| 05 | Slate | `ios` | Tidak |
| 06 | BrandLens | `ios` | Tidak |
| 07 | Personal Money Tracker | `ios` | Tidak |

Materi diambil dari `../[project-id]/porto_documentation/`. Aset yang dipilih disalin dan dikompresi ke `public/images/projects/[project-id]/`, sehingga situs tidak bergantung pada keberadaan direktori proyek di server deployment. Screenshot Streamly dipangkas pada area aplikasi untuk membuang margin desktop kosong; isi antarmuka tetap dipertahankan.

Slate dan BrandLens memakai Swift/UIKit; Personal Money Tracker memakai Swift/SwiftUI. Rantang memakai Flutter/Dart untuk Android dan iOS, serta Next.js untuk web. Implementasi mobile Rantang dikonfirmasi di `../rantang/development/apps/mobile/`; galeri yang tersedia di dokumentasi saat ini tetap screenshot web, termasuk layar web responsif.

### 2. Struktur data dan cara menambah proyek

Gunakan tipe `ProjectItem` dan `ProjectImage` di `src/data/projects.ts` sebagai sumber struktur terbaru. Salin salah satu entri, lalu sesuaikan:

- `id`, `databaseId`, dan `number`: identitas unik serta urutan proyek; urutan array menentukan urutan tampilan.
- `name`, `tagline`, `role`, dan `status`: judul, proposisi produk, kontribusi Anda, serta tahap pengembangan sebenarnya.
- `category`: `ai`, `fullstack`, atau `ios`. Label tampilan diatur di `PROJECT_CATEGORIES`.
- `featured`: hanya tiga proyek AI utama saat ini memakai `true`.
- `summary` dan `highlights`: ringkasan serta sorotan teknis yang tampil langsung pada kartu.
- `problem`, `contributions`, `engineeringDecision`, `impactSummary`, dan `scope`: isi studi kasus, termasuk konteks demo dan batas verifikasi.
- `impactStats`: nilai dan label yang lengkap; UI tidak menambahkan tanda `+` atau `%` otomatis. Gunakan ukuran/fakta yang didukung dokumentasi, bukan angka dampak yang belum diukur.
- `techStack`: teknologi yang dipakai implementasi saat ini.
- `images`: galeri dengan tepat satu `isCover: true`, `id` unik, `src`, `alt`, `label`, dan `description`. Tambahkan `format: "portrait"` untuk screenshot mobile.
- `link.githubUrl`: isi hanya jika repositori publik diketahui. Gunakan `null` bila belum tersedia; hindari URL localhost pada portofolio publik.
- `updatedAt`: waktu pembaruan isi.

Tautan `/projects#[id]` membuka kartu proyek tertentu. Kontribusi dan keputusan teknis tampil pada disclosure **Explore the case study**. Galeri bersama di `src/components/projects/ProjectGallery.tsx` menyediakan navigasi screenshot, caption, serta tautan gambar ukuran penuh.

---

## 🖼️ BAGIAN 3: Mengatur Gambar & Screenshot Proyek

### 1. Struktur Folder Aset yang Direkomendasikan
Buat subfolder khusus untuk setiap proyek di dalam folder `public/images/projects/`:

```text
public/
  images/
    experiences/
      perusahaan-a.webp
      perusahaan-b.webp
    projects/
      ai-financial-rag/       <-- nama folder sama dengan id proyek
        cover.webp            <-- gambar utama / cover
        dashboard.webp        <-- slide gambar 2
        mobile.webp           <-- slide gambar 3
```

### 2. Standar Gambar yang Disarankan:
- **Format:** `.webp` (sangat direkomendasikan untuk loading super cepat) atau `.png`.
- **Rasio Aspek:** Pertahankan rasio screenshot asli. Galeri memakai `object-contain` agar layar tidak terpotong; screenshot mobile memakai `format: "portrait"`.
- **Kompresi:** Usahakan ukuran per file di bawah **300 KB** agar animasi browser tetap berjalan 60 FPS tanpa jeda rendering.
- **Tampilan di Browser:** Mockup layar web penuh atau tangkapan layar bersih tanpa border berlebih.

---

## 🔍 BAGIAN 4: Cara Memvalidasi & Mengetes Perubahan

Setelah Anda mengedit berkas data atau menambahkan gambar:

1. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
2. **Cek Tampilan di Browser:**
   - Bagian Experience tetap tersembunyi sampai data asli diisi dan komponennya diaktifkan kembali.
   - Buka `http://localhost:3000/#projects` untuk melihat proyek featured di Homepage.
   - Buka `http://localhost:3000/#ios-projects` untuk melihat kelompok tiga proyek Swift.
   - Buka `http://localhost:3000/projects` untuk memastikan filter kategori (*All projects, Applied AI, Swift / iOS, Flutter & Web*) dan galeri arsip proyek berfungsi normal.
3. **Validasi sebelum deploy:**
   ```bash
   npm run lint
   npm run typecheck
   npm run build
   ```
   Build memvalidasi kompilasi dan rendering rute. Tetap periksa galeri, filter, studi kasus, dan tampilan mobile sebelum deployment.
