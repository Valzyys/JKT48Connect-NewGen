const colors = [
  "from-red-500 to-orange-500",
  "from-blue-500 to-teal-500",
  "from-green-500 to-lime-500",
  "from-pink-500 to-purple-500",
  "from-yellow-500 to-amber-500",
  "from-indigo-500 to-blue-500",
  "from-cyan-500 to-sky-500"
];

async function fetchNews() {
  try {
    const response = await fetch("https://api.jkt48connect.my.id/api/news?api_key=JKTCONNECT");
    const data = await response.json();
    const newsContainer = document.getElementById("news-container");

    if (!data.news || data.news.length === 0) {
      newsContainer.innerHTML = `<p class="text-center text-gray-600">Tidak ada berita tersedia.</p>`;
      return;
    }

    newsContainer.innerHTML = ""; // Kosongkan kontainer sebelum menambahkan berita

    // Ambil hanya 4 berita pertama
    data.news.slice(0, 4).forEach((news, index) => {
      const date = new Date(news.date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });

      const newsItem = document.createElement("div");
      newsItem.className = `news-item p-4 rounded-[20px] shadow-md text-white bg-gradient-to-r ${colors[index % colors.length]}`;

      // Menambahkan gambar label dengan menggunakan URL yang benar
      const imageUrl = `https://jkt48.com${news.label}`;

      newsItem.innerHTML = `
        <div class="news-header flex justify-between items-center mb-2">
          <div class="label flex items-center">
            <img src="${imageUrl}" alt="Label Image" class="w-10 h-5 rounded-[20px]">
          </div>
          <div class="date text-sm font-medium bg-white/30 backdrop-blur-lg px-3 py-1 rounded-[20px]">
            ${date}
          </div>
        </div>
        <div class="title font-bold text-lg">${news.title}</div>
      `;

      newsContainer.appendChild(newsItem);
    });
  } catch (error) {
    document.getElementById("news-container").innerHTML = `<p class="text-center text-red-500">Gagal memuat berita.</p>`;
    console.error("Error fetching news:", error);
  }
}

fetchNews();
