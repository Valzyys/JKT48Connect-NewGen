const API_KEY = "AIzaSyBCHgsvXcZKl_qS3-vMGpT1FRRib_xhXpQ"; // Ganti dengan API Key YouTube Anda
const CHANNEL_ID_SHOWROOM = "UCFUXOzBCTnF-k00cBsmKDtA"; // Ganti dengan ID Channel Showroom/IDN
const CHANNEL_ID_THEATER = "UCT7GobiObAxIScUIcgNxCqQ"; // Ganti dengan ID Channel Theater
const MAX_RESULTS = 25; // Jumlah video yang ingin diambil

function fetchYouTubeVideos(channelId, containerId) {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet&order=date&maxResults=${MAX_RESULTS}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById(containerId);
      container.innerHTML = "";
      
      if (!data.items || data.items.length === 0) {
        container.innerHTML = "<p class='text-center text-gray-500'>Tidak ada video tersedia</p>";
        return;
      }
      
      data.items.forEach(video => {
        const videoId = video.id.videoId;
        const title = video.snippet.title;
        const thumbnail = video.snippet.thumbnails.high.url;
        const publishedAt = new Date(video.snippet.publishedAt).toLocaleDateString("id-ID");
        
        const videoHTML = `
                            <div class="bg-white rounded-lg shadow-md overflow-hidden">
                                <img src="${thumbnail}" alt="${title}" class="w-full h-48 object-cover"/>
                                <div class="p-4">
                                    <p class="text-gray-700">${title}</p>
                                    <div class="flex justify-between items-center mt-2">
                                        <span class="text-gray-500">${publishedAt}</span>
                                        <button onclick="window.open('https://www.youtube.com/watch?v=${videoId}', '_blank')" class="text-gray-500 flex items-center">
                                            <i class="fas fa-eye mr-1"></i> Watch Replay
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `;
        
        container.innerHTML += videoHTML;
      });
    })
    .catch(error => {
      console.error("Error fetching YouTube data:", error);
    });
}

function toggleCategory(category) {
  const showroomBtn = document.getElementById("btn-showroom");
  const theaterBtn = document.getElementById("btn-theater");
  const showroomContent = document.getElementById("content-showroom");
  const theaterContent = document.getElementById("content-theater");
  
  if (category === "showroom") {
    showroomBtn.classList.add("bg-pink-200", "text-pink-600");
    showroomBtn.classList.remove("bg-white", "text-gray-600");
    
    theaterBtn.classList.add("bg-white", "text-gray-600");
    theaterBtn.classList.remove("bg-pink-200", "text-pink-600");
    
    showroomContent.classList.remove("hidden");
    theaterContent.classList.add("hidden");
  } else {
    theaterBtn.classList.add("bg-pink-200", "text-pink-600");
    theaterBtn.classList.remove("bg-white", "text-gray-600");
    
    showroomBtn.classList.add("bg-white", "text-gray-600");
    showroomBtn.classList.remove("bg-pink-200", "text-pink-600");
    
    theaterContent.classList.remove("hidden");
    showroomContent.classList.add("hidden");
  }
}

// Ambil data video saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  fetchYouTubeVideos(CHANNEL_ID_SHOWROOM, "content-showroom");
  fetchYouTubeVideos(CHANNEL_ID_THEATER, "content-theater");
});