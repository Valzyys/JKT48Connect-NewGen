function toggleNavbar() {
  const menu = document.getElementById("navbar-menu");
  const links = menu.querySelectorAll("a");
  
  if (menu.classList.contains("hidden")) {
    menu.classList.remove("hidden");
    setTimeout(() => {
      menu.classList.remove("opacity-0", "scale-y-0");
    }, 10);
    
    links.forEach((link, index) => {
      setTimeout(() => {
        link.classList.remove("opacity-0", "translate-y-3");
      }, index * 100);
    });
    
  } else {
    menu.classList.add("opacity-0", "scale-y-0");
    links.forEach((link) => {
      link.classList.add("opacity-0", "translate-y-3");
    });
    
    setTimeout(() => {
      menu.classList.add("hidden");
    }, 300);
  }
}

// Fungsi Fetch Live Stream
async function fetchLiveStreams() {
  try {
    const response = await fetch('https://api.crstlnz.my.id/api/now_live?group=jkt48');
    const streams = await response.json();
    
    const container = document.getElementById("streams-container");
    container.innerHTML = ""; // Hapus konten lama jika ada
    
    if (!streams || streams.length === 0) {
      container.innerHTML = "<p class='text-center text-gray-500'>Tidak ada live saat ini</p>";
      return;
    }
    
    streams.forEach(stream => {
      const isShowroom = stream.type === "showroom";
      const bgColor = isShowroom ? "bg-pink-100" : "bg-yellow-100";
      const tagColor = isShowroom ? "bg-pink-500" : "bg-black";
      const streamPlatform = isShowroom ? "SHOWROOM" : "IDN Live";
      const streamURL = `https://www.jkt48connect.my.id/live?name=${encodeURIComponent(stream.name)}`;
      
      // Konversi waktu ke WIB
      const startDate = new Date(stream.started_at);
      const formattedTime = startDate.toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }) + " WIB";
      
      // Template Card
      const cardHTML = `
                        <div class="bg-white rounded-3xl shadow-lg overflow-hidden">
                            <div class="relative">
                                <img src="${stream.img}" alt="Live stream thumbnail" class="w-full h-48 object-cover" />
                                <div class="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">LIVE</div>
                                <div class="absolute top-2 right-2 ${tagColor} text-white text-xs font-semibold px-2 py-1 rounded-full">${streamPlatform}</div>
                            </div>
                            <div class="p-4 ${bgColor}">
                                <div class="flex items-center space-x-2">
                                    <img src="${stream.img_alt}" alt="Profile picture" class="w-10 h-10 rounded-full" />
                                    <div>
                                        <div class="text-sm font-semibold">${stream.name}</div>
                                        <div class="text-xs text-gray-500">${formattedTime}</div>
                                    </div>
                                </div>
                                <button onclick="window.location.href='${streamURL}'" class="mt-4 w-full ${isShowroom ? 'bg-pink-500' : 'bg-yellow-500'} text-white text-sm font-semibold py-2 rounded-full flex items-center justify-center">
                                    <i class="fas fa-play mr-2"></i> Watch Stream
                                </button>
                            </div>
                        </div>
                    `;
      
      container.innerHTML += cardHTML;
    });
    
  } catch (error) {
    console.error("Error fetching live streams:", error);
  }
}

// Panggil fetchLiveStreams setelah halaman dimuat
document.addEventListener("DOMContentLoaded", fetchLiveStreams);