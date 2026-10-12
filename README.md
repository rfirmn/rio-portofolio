# Rio Firman Raharja — Portfolio

Portofolio Applied AI dan iOS dengan Next.js 16, React 19, TypeScript, Tailwind CSS 4, GSAP, dan Lenis.

- **Applied AI:** Strata PDA, Streamly, Market Intelligence.
- **Swift / iOS:** Slate, BrandLens, Personal Money Tracker.
- **Flutter & Web:** Rantang untuk Android, iOS, dan web.

Bagian Experience disembunyikan dan datanya kosong sampai pengalaman asli ditambahkan.

## Menjalankan lokal

Gunakan Node.js 20.9 atau lebih baru dan npm. Versi dependency dikunci di `package-lock.json`.

```bash
npm ci
npm run dev
```

Buka `http://localhost:3000`. Hentikan server dengan `Ctrl+C`.

## Validasi produksi

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

`npm run start` menjalankan hasil build produksi. Proses build memerlukan koneksi internet untuk mengambil font Google yang kemudian disajikan oleh aplikasi.

## Deploy

Proyek memakai optimasi gambar Next.js dan route `/api/github`. Gunakan hosting yang mendukung runtime Next.js/Node.js; jangan memakai static export tanpa menyesuaikan kedua fitur tersebut.

### Vercel

1. Impor repository dengan root directory proyek ini dan framework **Next.js**.
2. Gunakan install command `npm ci` dan build command `npm run build`. Biarkan output directory mengikuti preset Next.js.
3. Isi `NEXT_PUBLIC_SITE_URL` dengan URL publik final, misalnya `https://your-domain.com`, untuk metadata Open Graph.
4. Jalankan deploy dari dashboard hosting.

### Hosting Node.js

```bash
npm ci
npm run build
npm run start
```

Atur `NEXT_PUBLIC_SITE_URL` sebelum build dan `PORT` bila hosting memerlukan port tertentu. Gunakan process manager yang disediakan hosting untuk menjalankan server produksi.

Tidak ada database atau API key yang wajib dikonfigurasi. `/api/github` mengambil kontribusi akun `rfirmn` melalui API publik pihak ketiga dan menggunakan snapshot lokal bila layanan tidak tersedia. Data dicache selama satu minggu. Domain metadata dapat dikonfigurasi mengikuti contoh `.env.example`; jangan commit `.env.local`.

## Mengubah konten

- `src/data/profile.ts`: identitas, bio, skills, kontak, tautan CV, dan metadata.
- `src/data/projects.ts`: deskripsi, kategori, studi kasus, dan galeri tujuh proyek.
- `public/images/projects/`: screenshot proyek yang siap disajikan saat deploy.
- `public/images/avatar/profile.png`: foto profil.
- `public/icon.svg`: favicon berinisial R.

Panduan lengkap tersedia di [panduan konten](docs/GUIDE_UPDATE_PROJECTS_AND_EXPERIENCE.md).

Source proyek lain dan direktori `porto_documentation` tidak diperlukan di server deploy; aset yang digunakan sudah berada di `public/`.
