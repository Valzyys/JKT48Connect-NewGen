async function fetchBirthdayData() {
  try {
    const response = await fetch("https://api.crstlnz.my.id/api/next_birthday?group=jkt48");
    const data = await response.json();

    // Ambil hanya 3 data pertama
    const limitedData = data.slice(0, 3);

    // Update total members count
    document.getElementById("total-members").textContent = `${limitedData.length} Members`;

    const birthdayCardsContainer = document.getElementById("birthday-cards");
    birthdayCardsContainer.innerHTML = ""; // Kosongkan kontainer sebelum menambahkan data

    limitedData.forEach((member) => {
      // Format tanggal lahir
      const birthDate = new Date(member.birthdate);
      const formattedDate = birthDate.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      // Buat elemen kartu ulang tahun
      const card = document.createElement("div");
      card.className =
        "birthday-card bg-white shadow-md rounded-[20px] p-4 flex items-center space-x-4 transition hover:shadow-lg";

      card.innerHTML = `
        <img src="${member.img}" alt="Profile picture of ${member.name}" class="w-16 h-16 rounded-full object-cover border-2 border-pink-500">
        <div class="info flex-1">
          <h3 class="text-lg font-semibold text-gray-800">${member.name}</h3>
          <p class="text-sm text-gray-500">${formattedDate}</p>
        </div>
        <div class="actions flex space-x-2 text-gray-600">
          <i class="fas fa-chevron-right cursor-pointer hover:text-gray-800 rounded-[20px] p-2 transition"></i>
          <i class="far fa-heart cursor-pointer hover:text-red-500 rounded-[20px] p-2 transition"></i>
        </div>
      `;

      birthdayCardsContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    document.getElementById("birthday-cards").innerHTML =
      '<p class="text-center text-red-500">Gagal memuat data.</p>';
  }
}

// Panggil fungsi untuk mengambil data saat halaman dimuat
fetchBirthdayData();
