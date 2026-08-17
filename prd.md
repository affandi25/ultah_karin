

# 📄 Product Requirement Document (PRD)

**Nama Proyek:** Website Ucapan Ulang Tahun Interaktif (20th Birthday Edition)

**Tujuan Proyek:** Memberikan kejutan ulang tahun yang personal, estetik, interaktif, dan berkesan melalui pengalaman navigasi web bertahap (*multi-page / continuous scroll section*) hindari emoticon pada website.

---

## 1. Alur Pengguna (User Flow)

`Landing Page (Cover)` ➡️ `Halaman Ucapan Utama` ➡️ `Halaman Galeri Moment` ➡️ `Halaman Permainan / Mini Games` ➡️ `Halaman Penutup (Wishing Box & Music)`

---

## 2. Rincian Fitur & Spesifikasi Halaman

### Section 1: Landing Page (Hero Cover)

* **Tampilan Visual:**
* Foto *full screen* pacar sebagai latar belakang utama (dengan efek *overlay* gelap transparan agar teks mudah dibaca).
* Typography mengalir menggunakan font gaya latin/cursive estetik bertuliskan: **"Happy Birthday"** dibagian kiri dan  **" 20th sayang"** dibagian kanan.
* Efek visual tambahan: mengkilap diagonal dari kiri bawah menuju atas sebelah kanan.


* **Elemen Interaktif:**
* Tombol CTA (*Call to Action*) yang menonjol dan beranimasi (contoh: *"Pencet Aja"* atau *"Lanjutkan"*).
* Efek *fade-out* mulus saat tombol diklik menuju Section 2.



### Section 2: Halaman Ucapan Utama (Letter Section)

* **Tampilan Visual:**
* Tata letak split (2 Kolom di tampilan desktop, responsif menumpuk di tampilan seluler):
* **Sisi Kiri:** *Card container* dengan gaya kertas surat/glassmorphism berisi teks ucapan emosional dan mendalam dengan desain card yang berbentuk seperti buku yang terbuka.
* **Sisi Kanan:** Frame foto favorit pacar dengan efek bingkai polaroid/shadow yang estetik dengan efek hover membesar ketika foto di sentuh.




* **Elemen Interaktif:**
* Teks ucapan menggunakan efek *typing/typewriter animation* (muncul perlahan seperti ketikan surat).
* Tombol navigasi di bagian bawah: **"Lihat Kenangan Kita 📸"**.



### Section 3: Halaman Moment Kebersamaan (Gallery Section)

* **Tampilan Visual:**
* Konsep galeri unik berbentuk **"Floating / Hanging Polaroid Cards di sebuah ranting pohon yang aesthetic"**.
* Berisi **8 foto kebersamaan** yang dipasang secara acak (kemiringan rotasi beda-beda: $-5^\circ, 3^\circ, -8^\circ, \text{dll.}$) seolah-olah bergelantungan pada tali atau dinding kenangan.


* **Elemen Interaktif:**
* **Efek Hover/Tap:** Saat foto diklik atau diarahkan kursor, foto akan membesar (*zoom in*), berorientasi lurus ($0^\circ$), dan menampilkan caption pendek di balik foto.
* Tombol navigasi: **"Kuis Dulu Yuk!"**.



### Section 4: Halaman Permainan Seru & Bucin (Interactive Mini-Games)

* **Konsep Permainan:**
1. **Game 1: Quiz "Seberapa Kenal Kamu Sama Aku/Kita?"**
* 3–5 pertanyaan lucu seputar hubungan (misal: *"Tempat kencan favorit kita?", "Siapa yang paling sering ngambek?"*).
* Jika jawaban salah, muncul efek *pop-up* candaan.


2. **Game 2: Tombol "Maafin / Makin Sayang" (Impossible Button Game)**
* Pertanyaan: *"Kamu makin sayang gak sama aku?"*
* Pilihan: **[Makin Sayang Banget!]** & **[Gak]**.
* Jika tombol "Gak" diklik/diarahkan kursor, tombol tersebut akan menghindar secara otomatis sehingga pacar **harus** memilih "Makin Sayang Banget!".





### Section 5: Halaman Penutup (Wish Box & Audio)

* **Tampilan Visual:**
* Tampilan akhir yang romantis dengan rangkuman doa/harapan.


* **Elemen Interaktif:**
* **Make a Wish Box:** Form interaktif sederhana bagi pacar untuk mengetik harapannya di umur 20 tahun, yang tersimpan/terkirim langsung ke pesan kamu melalui whatsapp.
* **Virtual Gift Unboxing:** Tombol kado 3D/interaktif yang jika diklik mengeluarkan efek ledakan *confetti* dan menampilkan kupon *reward hug 24 jam* .



---

## 3. Spesifikasi Teknis & Estetika

* **Palet Warna:**  Sweet Blush & Warm White
Background Utama: Warm White / Creamy White (#FFFDF9) — Memberikan kesan bersih, lembut, dan mahal.

Warna Utama (Card & Container): Soft Blush Pink (#FFE4E8) — Pink lembut yang hangat, cocok untuk background kartu ucapan dan polaroid.

Warna Aksen & Tombol: Vibrant Coral Pink (#FF6B8B) — Warna pink cerah yang ceria untuk tombol, efek hover, dan elemen interaktif.

Warna Teks: Deep Berry / Soft Mahogany (#4A2E35) — Cokelat keunguan gelap untuk teks agar tetap sangat mudah dibaca, terasa ramah, dan tidak sekaku warna hitam pekat.

berikan efek kertas bertekstur pada semua elemen card 
* **Audio:** Background Music (BGM) lagu favorit kalian yang bisa di-*play/pause* menggunakan floating widget di pojok layar.
* **Responsivitas:** *Mobile-First Design* (harus terlihat sempurna saat dibuka dari smartphone).
* **Teknologi yang Direkomendasikan:**
* HTML5, CSS3 (Tailwind CSS untuk styling cepat & responsif).
* JavaScript (Vanilla / React) + Library Animasi (GSAP / AOS / SweetAlert2 / Canvas-Confetti).



---
