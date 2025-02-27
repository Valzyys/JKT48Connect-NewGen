async function fetchVideos() {
  try {
    // Ambil data dari API
    const response = await fetch("https://api.jkt48connect.my.id/api/youtube?api_key=JKTCONNECT");
    const videos = await response.json();

    const container = document.getElementById("videos-container");

    // Kosongkan kontainer sebelum menambahkan video baru
    container.innerHTML = "";

    // Ambil hanya 4 video pertama
    const limitedVideos = videos.slice(0, 4);

    // Loop data dan buat elemen video dengan tampilan besar
    limitedVideos.forEach(video => {
      const videoCard = document.createElement("div");
      videoCard.className =
        "relative w-full h-64 rounded-[20px] overflow-hidden shadow-lg transform transition-transform hover:scale-105";

      videoCard.innerHTML = `
        <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('${video.thumbnail}');"></div>
        
        <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4">
          <div class="flex items-center space-x-4">
            <img src="${video.channelImage}" class="w-12 h-12 rounded-full border-2 border-white" alt="${video.channelName}">
            <div>
              <span class="text-white font-semibold text-lg">${video.channelName}</span>
              <p class="text-sm text-gray-300">${video.views} views</p>
            </div>
          </div>
          <h2 class="mt-2 text-lg font-semibold text-white">${video.title}</h2>
          <button 
            class="mt-4 w-full text-white font-semibold py-2 rounded-[20px] transition-all 
                    bg-white/30 backdrop-blur-lg hover:bg-white/50" 
            onclick="window.open('${video.videoUrl}', '_blank')">
            Tonton Video
          </button>
        </div>
      `;

      container.appendChild(videoCard);
    });
  } catch (error) {
    console.error("Gagal mengambil data video:", error);
    container.innerHTML = `<p class="text-center text-red-500">Gagal memuat video.</p>`;
  }
}

// Ambil data saat halaman dimuat
fetchVideos();
