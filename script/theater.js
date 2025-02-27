async function fetchTheaterData() {
  try {
    const response = await fetch("https://api.crstlnz.my.id/api/theater");
    const data = await response.json();

    // Ambil hanya 4 teater terdekat berdasarkan tanggal
    const upcomingShows = data.theater
      .filter(show => new Date(show.date) >= new Date()) // Ambil hanya yang belum lewat
      .sort((a, b) => new Date(a.date) - new Date(b.date)) // Urutkan berdasarkan tanggal
      .slice(0, 4); // Ambil 4 data terdekat

    const theaterContainer = document.getElementById("theater-container");
    theaterContainer.innerHTML = ""; // Kosongkan kontainer sebelum menambahkan data

    upcomingShows.forEach(show => {
      // Format tanggal dan waktu pertunjukan
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

      // Tentukan badge status berdasarkan waktu saat ini
      const now = new Date();
      let badgeText = "Upcoming";

      const isSameDay = showDate.toDateString() === now.toDateString();
      const isSameHour = showDate.getHours() === now.getHours();
      const isSameMinute = showDate.getMinutes() === now.getMinutes();

      if (isSameDay && isSameHour && isSameMinute) {
        badgeText = "Sedang Berlangsung";
      } else if (isSameDay) {
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
          <h2 class="text-lg font-semibold text-white">${show.title}</h2>
          <div class="flex items-center space-x-2 mt-2 text-gray-200 text-sm">
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
  } catch (error) {
    console.error("Error fetching theater data:", error);
    document.getElementById("theater-container").innerHTML = "<p class='text-red-500'>Gagal memuat data.</p>";
  }
}

// Panggil fungsi saat halaman dimuat
fetchTheaterData();
