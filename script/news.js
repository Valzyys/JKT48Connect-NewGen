
        function toggleNavbar() {
            const menu = document.getElementById("navbar-menu");
            const links = menu.querySelectorAll("a");

            if (menu.classList.contains("hidden")) {
                // Munculkan menu dengan efek smooth
                menu.classList.remove("hidden");
                setTimeout(() => {
                    menu.classList.remove("opacity-0", "scale-y-0");
                }, 10);

                // Animasi munculnya teks satu per satu
                links.forEach((link, index) => {
                    setTimeout(() => {
                        link.classList.remove("opacity-0", "translate-y-3");
                    }, index * 100);
                });

            } else {
                // Sembunyikan menu dengan efek smooth
                menu.classList.add("opacity-0", "scale-y-0");

                // Sembunyikan teks dengan delay
                links.forEach((link) => {
                    link.classList.add("opacity-0", "translate-y-3");
                });

                setTimeout(() => {
                    menu.classList.add("hidden");
                }, 300);
            }
        }

        // Fetch news data from API
        document.addEventListener("DOMContentLoaded", async () => {
            const API_URL = "https://api.crstlnz.my.id/api/news";
            const IMAGE_BASE_URL = "https://jkt48.com";

            try {
                const response = await fetch(API_URL);
                const { news } = await response.json();

                // Urutkan berita berdasarkan tanggal terbaru (descending)
                news.sort((a, b) => new Date(b.date) - new Date(a.date));

                // Container untuk berita
                const newsContainer = document.getElementById("news-container");

                // Gradient warna untuk card berita
                const gradientColors = [
                    "bg-gradient-to-r from-blue-400 to-purple-500",
                    "bg-gradient-to-r from-green-400 to-teal-500",
                    "bg-gradient-to-r from-pink-400 to-red-500",
                    "bg-gradient-to-r from-yellow-400 to-orange-500",
                    "bg-gradient-to-r from-gray-400 to-gray-600"
                ];

                // Loop untuk membuat kartu berita
                news.forEach((item, index) => {
                    const date = new Date(item.date).toLocaleDateString("id-ID", {
                        day: "2-digit", month: "long", year: "numeric"
                    });

                    // Ambil gradient berdasarkan indeks
                    const bgColor = gradientColors[index % gradientColors.length];

                    const newsCard = `
                        <div class="${bgColor} text-white p-4 rounded-[20px] shadow-lg relative">
                            <!-- Label kategori tanpa background -->
                            <div class="absolute top-3 left-3">
                                <img src="${IMAGE_BASE_URL}${item.label}" alt="Label" class="w-auto h-auto rounded-[15px] object-contain">
                            </div>
                            
                            <h2 class="text-lg font-semibold mt-12">${item.title}</h2>
                            <p class="text-sm">${date}</p>
                        </div>
                    `;

                    newsContainer.innerHTML += newsCard;
                });
            } catch (error) {
                console.error("Gagal mengambil data:", error);
                document.getElementById("news-container").innerHTML = "<p class='text-red-500'>Gagal memuat berita.</p>";
            }
        });