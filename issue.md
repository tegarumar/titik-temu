# Feature Planning: Refactor Routing, Route Protection, & Calendar Sorting

**Tujuan:** Memisahkan halaman utama (Discover) dengan halaman pembuatan event (Creator) menjadi dua *page* terpisah, menerapkan proteksi rute pada halaman `/calendar` dan halaman *create event*, serta menambahkan filter pengurutan pada halaman Calendar.

**Assignee:** Junior Developer / AI Agent

---

## Spesifikasi Kebutuhan (Requirements)

### 1. Pemisahan Halaman Home (Discover) dan Creator
Saat ini, halaman utama (`app/page.tsx`) menggabungkan `JoinerView` dan `CreatorView` dengan menggunakan *state* `userRole`.
- **Halaman Home (`/`):** Ubah `app/page.tsx` menjadi murni halaman *Discover* untuk partisipan (hanya merender `JoinerView`). Hapus state terkait perpindahan *role* (joiner/creator) di halaman ini.
- **Halaman Baru (`/create`):** Buat rute baru (misal di `app/create/page.tsx`) yang khusus merender `CreatorView`.
- **Handling Button "Create" di Navigasi:**
  - Jika *user* **belum login** dan mengklik tombol "Create", tampilkan *popup alert* (Unauthenticated Modal) seperti perilaku saat ini. *User* tidak akan dialihkan ke halaman manapun.
  - Jika *user* **sudah login**, tombol "Create" akan menavigasi (redirect) *user* ke halaman `/create`.

### 2. Proteksi Akses (Route Protection)
- **Halaman Creator (`/create`):** Jika *user* mencoba masuk ke *path* ini langsung melalui URL tetapi belum login, halaman harus diblokir (misal dengan menampilkan modal *unauthenticated* di tengah halaman kosong, atau me-redirect kembali ke Home).
- **Halaman Calendar (`/calendar`):** Terapkan proteksi yang **sama** seperti halaman Creator. Halaman Calendar sama sekali tidak boleh menampilkan konten event list jika *user* belum login. *User* harus diminta login (melalui *popup* atau *redirect*).

### 3. Filter Pengurutan (Sorting) di Halaman Calendar
- Pada halaman `/calendar`, tambahkan sebuah filter (bisa berupa *dropdown* atau *toggle button* bergaya Neo-Brutalist) untuk menentukan arah urutan tanggal:
  - **Terdekat:** Event diurutkan dari tanggal paling dekat ke masa depan secara *ascending*. (Ini adalah urutan bawaan).
  - **Terjauh:** Event diurutkan dari tanggal yang paling jauh di masa depan secara *descending*.

---

## Langkah-langkah Eksekusi (Implementation Steps)

1. **Persiapan Branch:**
   Buat branch fitur baru dari `developer`.
   ```bash
   git checkout developer
   git pull origin developer
   git checkout -b feature/routing-auth-protection
   ```

2. **Refactor `app/page.tsx` & Pembuatan `app/create/page.tsx`:**
   - Bersihkan `app/page.tsx` dari state `userRole`. Jadikan halaman ini selalu merender `JoinerView`.
   - Buat folder dan file `app/create/page.tsx`. Pindahkan logika render `CreatorView` beserta propertinya ke sini.
   - Di `app/create/page.tsx`, tambahkan pemeriksaan `isLoggedIn` dari *Auth Context*. Jika *false*, jangan render konten *creator*, melainkan panggil atau tampilkan `UnauthenticatedModal`.

3. **Pembaruan Halaman Calendar (`app/calendar/page.tsx`):**
   - Lakukan pemeriksaan `isLoggedIn` serupa. Jika `!isLoggedIn`, halangi akses (render modal atau state kosong).
   - Buat *state* lokal untuk *sorting* (`const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')`).
   - Ubah logika utilitas grouping (misal `getGroupedAndSortedEvents`) agar menerima parameter `sortOrder` dan menyesuaikan pengurutan *array* event.
   - Tambahkan *button* UI di atas daftar grup untuk mengubah state `sortOrder`.

4. **Pembaruan Komponen `Navigation.tsx`:**
   - Komponen navigasi mungkin tidak lagi memerlukan properti `currentRole` karena *role* sudah dipisahkan ke dalam path URL (`/` dan `/create`).
   - Ubah perilaku fungsi `onCreateClick` untuk langsung memvalidasi *login*. Jika belum login, *trigger* peringatan/modal. Jika sudah, panggil `router.push('/create')`.

5. **Penyelesaian & Cleanup:**
   - **PENTING:** Hapus file `issue.md` ini terlebih dahulu sebelum melakukan commit.
   ```bash
   rm issue.md
   git add .
   git commit -m "feat: separate discover and create views, add route protection and calendar sorting"
   git push -u origin feature/routing-auth-protection
   ```
   - Lakukan Pull Request ke branch `developer` melalui GitHub.
