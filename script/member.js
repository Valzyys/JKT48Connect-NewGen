
    document.addEventListener("DOMContentLoaded", async () => {
        const API_URL = "https://jkt-48-scrape-three.vercel.app/api/member";
        const IMAGE_BASE_URL = "https://jkt48.com";
        const searchInput = document.getElementById("search");
        const memberContainer = document.getElementById("member-container");

        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            let members = data.members.member;

            // Urutkan berdasarkan nama secara alfabetis (A-Z)
            members.sort((a, b) => a.nama_member.localeCompare(b.nama_member));

            // Fungsi untuk menampilkan anggota
            function displayMembers(filteredMembers) {
                memberContainer.innerHTML = "";
                filteredMembers.forEach(member => {
                    const memberCard = `
                        <div class="bg-${member.kategori.includes("Trainee") ? "blue" : "pink"}-100 p-2 rounded-[20px] shadow-md text-center cursor-pointer transition hover:scale-105" 
                            onclick="redirectToProfile('${member.nama_member}')">
                            <div class="relative">
                                <div class="w-full aspect-square overflow-hidden rounded-[20px]">
                                    <img src="${IMAGE_BASE_URL}${member.ava_member}" 
                                         alt="Portrait of ${member.nama_member}" 
                                         class="w-full h-full object-cover">
                                </div>
                                <span class="absolute top-1 left-1 bg-${member.kategori.includes("Trainee") ? "blue" : "pink"}-500 text-white text-xs font-semibold px-2 py-1 rounded-[20px]">
                                    ${member.kategori}
                                </span>
                            </div>
                            <h2 class="text-sm font-semibold mt-2">${member.nama_member}</h2>
                        </div>
                    `;
                    memberContainer.innerHTML += memberCard;
                });
            }

            // Event listener untuk pencarian
            searchInput.addEventListener("input", (e) => {
                const searchText = e.target.value.toLowerCase();
                const filteredMembers = members.filter(member => 
                    member.nama_member.toLowerCase().includes(searchText)
                );
                displayMembers(filteredMembers);
            });

            // Tampilkan data pertama kali
            displayMembers(members);
        } catch (error) {
            console.error("Gagal mengambil data:", error);
            memberContainer.innerHTML = "<p class='text-red-500'>Gagal memuat data member.</p>";
        }
    });

    // **Pindahkan fungsi ini ke luar agar bisa diakses oleh HTML**
    function redirectToProfile(name) {
        const formattedName = encodeURIComponent(name);
        window.location.href = `/profile?name=${formattedName}`;
    }

    // Fungsi Toggle Navbar
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
