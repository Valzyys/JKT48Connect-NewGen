let currentPage = 1; // Mulai dari halaman 1 (bulan ini)
let totalPages = 1; // Akan diperbarui setelah fetch data

// Fungsi untuk mengambil data dari API berdasarkan halaman tertentu
async function fetchTheaterData(page = 1) {
  try {
    const response = await fetch(`https://api.crstlnz.my.id/api/theater?page=${page}`);
    const data = await response.json();

    totalPages = Math.ceil(data.total_count / data.perpage); // Hitung total halaman

    const theaterContainer = document.getElementById("theater-container");
    theaterContainer.innerHTML = ""; // Kosongkan kontainer sebelum menambahkan data

    data.theater.forEach(show => {
      const showDate = new Date(show.date);
      const formattedDate = showDate.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });

      const time = showDate.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });

      // Tentukan badge status
      const now = new Date();
      let badgeText = "Upcoming";

      if (showDate.toDateString() === now.toDateString()) {
        badgeText = "Hari Ini";
      } else if (showDate - now < 86400000) {
        badgeText = "Besok";
      }

      // Cek apakah ada Seitansai
      let stsLabel = "";
      if (show.seitansai && show.seitansai.length > 0) {
        stsLabel = `
          <div class="absolute top-2 left-2 px-3 py-1 text-xs font-bold text-white 
                      bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
                      rounded-[20px] shadow-lg animate-pulse">
            STS
          </div>`;
      }

      // Buat elemen kartu teater
      const card = document.createElement("div");
      card.className =
        "relative w-full h-64 rounded-[20px] overflow-hidden shadow-lg transform transition-transform hover:scale-105";

      card.innerHTML = `
        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('${show.banner}');"></div>
        ${stsLabel}
        <div class="absolute top-2 right-2 px-3 py-1 text-xs font-semibold text-white 
                    bg-white/30 backdrop-blur-lg rounded-[20px]">
          ${badgeText}
        </div>
        <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4">
          <h2 class="text-lg font-semibold text-white text-left">${show.title}</h2>
          <div class="flex items-cente space-x-2 mt-2 text-gray-200 text-sm">
            <i class="fas fa-calendar-alt"></i>
            <p>${formattedDate} | ${time} WIB</p>
          </div>
          <div class="flex items-center space-x-2 mt-1 text-gray-200 text-sm">
            <i class="fas fa-users"></i>
            <p>${show.member_count} Members yang tampil</p>
          </div>
          <button 
            class="mt-4 w-full text-white font-semibold py-2 rounded-[20px] transition-all 
                    bg-white/30 backdrop-blur-lg hover:bg-white/50" 
            onclick="window.location.href='https://jkt48.com/theater/schedule/id/${show.url}'">
            Detail
          </button>
        </div>
      `;

      theaterContainer.appendChild(card);
    });

    // Update UI Pagination
    document.getElementById("page-info").innerText = `Halaman ${currentPage} dari ${totalPages}`;
    document.getElementById("next-btn").disabled = currentPage === 1;
    document.getElementById("prev-btn").disabled = currentPage >= totalPages;

    console.log(`Halaman Saat Ini: ${currentPage}`);

  } catch (error) {
    console.error("Error fetching theater data:", error);
    document.getElementById("theater-container").innerHTML = "<p class='text-red-500'>Gagal memuat data.</p>";
  }
}

// Fungsi untuk berpindah ke halaman sebelumnya
function goToPreviousPage() {
  if (currentPage < totalPages) { 
    currentPage++;
    fetchTheaterData(currentPage);
  }
}

// Fungsi untuk berpindah ke halaman berikutnya
function goToNextPage() {
  if (currentPage > 1) { 
    currentPage--;
    fetchTheaterData(currentPage);
  }
}

// Event Listener untuk tombol Previous dan Next
document.getElementById("prev-btn").addEventListener("click", goToPreviousPage);
document.getElementById("next-btn").addEventListener("click", goToNextPage);

// Panggil fungsi saat halaman dimuat
fetchTheaterData();
