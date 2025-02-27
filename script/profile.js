 async function fetchMemberData() {
            const urlParams = new URLSearchParams(window.location.search);
            const memberName = urlParams.get('name');

            if (!memberName) {
                document.getElementById('error-message').classList.remove('hidden');
                return;
            }

            try {
                const response = await fetch(`https://api.jkt48connect.my.id/api/member/${memberName}?api_key=JKTCONNECT`);
                if (!response.ok) throw new Error('Member not found');
                const data = await response.json();

                // Menampilkan Profile Card dan menyembunyikan pesan error jika berhasil
                document.getElementById('profile-card').classList.remove('hidden');
                document.getElementById('error-message').classList.add('hidden');

                // Update Profile Banner
                const profileBanner = document.getElementById('profile-banner');
                profileBanner.style.backgroundImage = `url('${data.banner || 'https://res.cloudinary.com/dlx2zm7ha/image/upload/v1737654318/banner_i51agc.jpg'}')`;

                // Update Profile Image and Name
                document.getElementById('profile-img').src = data.img_alt;
                document.getElementById('profile-name').textContent = data.fullname;
                document.getElementById('profile-nickname').textContent = data.nickname;

                // Update Member Info
                const memberInfo = document.getElementById('member-info');
                memberInfo.innerHTML = `
                    <p><strong>Tanggal Lahir:</strong> ${new Date(data.birthdate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    <p><strong>Golongan Darah:</strong> ${data.bloodType}</p>
                    <p><strong>Zodiak:</strong> ${getZodiacSign(new Date(data.birthdate))}</p>
                    <p><strong>Tinggi:</strong> ${data.height}</p>
                `;

                // Update Motto
                document.getElementById('profile-motto').textContent = data.jikosokai;

                // Update Followers & Room Level
                document.getElementById('followers-count').textContent = data.stats.total_live.showroom || 'N/A';
                document.getElementById('room-level-count').textContent = data.stats.total_live.idn || 'N/A';

                // Update Introduction Video
                const introductionVideo = document.getElementById('introduction-video');
                if (data.introduction_video_url) {
                    introductionVideo.innerHTML = `
                        <h3 class="text-lg font-semibold"><i class="fas fa-video text-red-500"></i> Introduction Video</h3>
                        <div class="mt-2">
                            <iframe class="w-full h-48 rounded-lg" src="${data.introduction_video_url}" frameborder="0" allowfullscreen></iframe>
                        </div>
                    `;
                }
            } catch (error) {
                document.getElementById('profile-card').classList.add('hidden');
                document.getElementById('error-message').classList.remove('hidden');
            }
        }

        function getZodiacSign(date) {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) return "Capricorn";
            if ((month == 1 && day >= 21) || (month == 2 && day <= 19)) return "Aquarius";
            if ((month == 2 && day >= 20) || (month == 3 && day <= 20)) return "Pisces";
            if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) return "Aries";
            if ((month == 4 && day >= 21) || (month == 5 && day <= 21)) return "Taurus";
            if ((month == 5 && day >= 22) || (month == 6 && day <= 21)) return "Gemini";
            if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) return "Cancer";
            if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) return "Leo";
            if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) return "Virgo";
            if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) return "Libra";
            if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) return "Scorpio";
            if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) return "Sagittarius";
        }

        fetchMemberData();
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
