# Panduan Mengupdate Data Project & Experience

Dokumentasi lengkap ini dibuat untuk memandu Anda mengupdate, menambah, atau menghapus data **Projects** dan **Experiences** di portofolio Anda kapan pun Anda siap.

---

## 📁 Daftar Lokasi Berkas & Aset

| Komponen | Berkas Data (TypeScript) | Folder Aset Gambar |
| :--- | :--- | :--- |
| **Experience** | [`src/data/experiences.ts`](file:///Users/rio/Documents/RIO/Pemrograman/my_product/my-portofolio/src/data/experiences.ts) | `public/images/experiences/` |
| **Projects** | [`src/data/projects.ts`](file:///Users/rio/Documents/RIO/Pemrograman/my_product/my-portofolio/src/data/projects.ts) | `public/images/projects/[project-id]/` |
| **Export Index** | [`src/data/index.ts`](file:///Users/rio/Documents/RIO/Pemrograman/my_product/my-portofolio/src/data/index.ts) | *(Menggabungkan seluruh export data)* |

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
Buka [`src/data/experiences.ts`](file:///Users/rio/Documents/RIO/Pemrograman/my_product/my-portofolio/src/data/experiences.ts), lalu tambahkan objek berikut ke dalam array `EXPERIENCES`:

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

Data Project muncul di dua tempat:
1. **Homepage (#projects):** Menampilkan proyek-proyek unggulan yang memiliki nilai `featured: true`.
2. **Projects Archive (/projects):** Menampilkan **seluruh** proyek dengan filter kategori (*All*, *Frontend*, *Backend*, *Fullstack*).

### 1. Struktur Objek Project (`ProjectItem`)
Struktur data di [`src/data/projects.ts`](file:///Users/rio/Documents/RIO/Pemrograman/my_product/my-portofolio/src/data/projects.ts):

```typescript
export interface ProjectItem {
  databaseId: string;
  id: string;               // Slug unik (contoh: "ai-rag-agent", "pos-backend")
  number: string;           // Nomor urut (contoh: "01", "02", "03")
  name: string;             // Nama Proyek (contoh: "Intelligent Document RAG Pipeline")
  role: string;             // Peran Anda (contoh: "AI Engineer", "Backend Developer")
  category: "frontend" | "backend" | "fullstack"; // Kategori filter di /projects
  featured: boolean;        // true = tampil di Homepage, false = hanya di arsip /projects
  status: string;           // "active"
  experienceId?: string;    // (Opsional) Menghubungkan ke id Experience di atas
  experienceLabel?: string; // (Opsional) Label perusahaan (contoh: "PT. Maju Bersama")
  summary: string;          // Deskripsi lengkap proyek (1 paragraf ringkas)
  contributions: string[];  // Poin-poin kontribusi Anda (tampil di /projects)
  highlights?: string[];    // Poin-poin sorotan ringkas (tampil di Homepage)
  techStack?: string[];     // Array teknologi (contoh: ["Python", "PyTorch", "Qdrant", "FastAPI"])
  images: ProjectImage[];   // Array screenshot / mockups proyek
  link?: {
    liveUrl?: string;       // URL demo langsung (kosongkan jika internal/privat)
    githubUrl?: string;     // URL repositori GitHub (kosongkan jika privat)
  } | null;
  updatedAt: string;
}
```

### 2. Template Siap Pakai untuk Menambah Proyek Baru
Buka [`src/data/projects.ts`](file:///Users/rio/Documents/RIO/Pemrograman/my_product/my-portofolio/src/data/projects.ts), lalu tambahkan objek berikut ke dalam array `PROJECTS`:

```typescript
{
  databaseId: "proj-" + Date.now(),
  id: "ai-financial-rag",
  number: "01", // Sesuaikan nomor urut
  name: "Financial Report AI Analyzer",
  role: "Machine Learning & Backend Engineer",
  category: "fullstack", // "frontend" | "backend" | "fullstack"
  featured: true,        // Set true agar muncul di Homepage
  status: "active",
  experienceId: "nama-perusahaan-slug", // Opsional: kaitkan ke ID Experience jika relevan
  experienceLabel: "Nama Perusahaan / Personal Project",
  summary:
    "Sistem AI berbasis Retrieval-Augmented Generation (RAG) yang menganalisis dokumen laporan keuangan tahunan, mengekstrak metrik kunci secara otomatis, dan menyediakan antarmuka tanya-jawab interaktif.",
  highlights: [
    "Membangun pipeline ekstraksi PDF dengan OCR dan chunking semantik",
    "Integrasi vector database Qdrant dan model embeddings open-source",
    "Mengembangkan REST API asinkron menggunakan FastAPI dan Redis queue",
    "Mencapai akurasi ekstraksi informasi keuangan sebesar 94%",
  ],
  contributions: [
    "Merancang arsitektur database relasional PostgreSQL untuk menyimpan riwayat analisis",
    "Mengimplementasikan autentikasi JWT dan rate-limiting untuk keamanan API",
    "Membangun antarmuka dashboard monitoring menggunakan Next.js dan Tailwind CSS",
    "Melakukan deployment containerized menggunakan Docker dan Nginx",
  ],
  techStack: [
    "Python",
    "FastAPI",
    "LangChain",
    "Qdrant",
    "PostgreSQL",
    "Docker",
    "Next.js",
    "TypeScript",
  ],
  images: [
    {
      id: "ai-financial-rag-cover",
      src: "/images/projects/ai-financial-rag/cover.webp",
      alt: "Financial Report AI Analyzer Dashboard Overview",
      label: "Dashboard Overview",
      description: "Antarmuka dashboard analitik laporan keuangan dan chat RAG.",
      isCover: true, // Gambar sampul utama
    },
    {
      id: "ai-financial-rag-rag",
      src: "/images/projects/ai-financial-rag/pipeline.webp",
      alt: "Vector Search & Retrieval Flow",
      label: "RAG Pipeline",
      description: "Visualisasi proses pencarian dokumen pada vector store.",
      isCover: false,
    },
  ],
  link: {
    liveUrl: "https://demo-proyek-anda.com", // atau "" jika tidak ada
    githubUrl: "https://github.com/rfirmn/nama-repo", // atau "" jika repo privat
  },
  updatedAt: new Date().toISOString(),
},
```

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
- **Rasio Aspek:** **16:9** atau **16:10** (contoh ukuran: `1440x900px` atau `1920x1080px`).
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
   - Buka `http://localhost:3000/#experience` untuk melihat perubahan kartu Experience dan scroll horizontalnya.
   - Buka `http://localhost:3000/#projects` untuk melihat proyek featured di Homepage.
   - Buka `http://localhost:3000/projects` untuk memastikan filter kategori (*All, Frontend, Backend, Fullstack*) dan galeri arsip proyek berfungsi normal.
3. **Uji Kompilasi TypeScript (Production Build Test):**
   ```bash
   npm run build
   ```
   *Jika perintah selesai dengan `Route (app) ... Compiled successfully`, berarti seluruh data baru Anda 100% valid dan siap di-deploy.*
