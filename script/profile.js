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
    
    document.getElementById('profile-card').classList.remove('hidden');
    document.getElementById('error-message').classList.add('hidden');
    
    const profileBanner = document.getElementById('profile-banner');
    profileBanner.style.backgroundImage = `url('${data.banner || 'https://res.cloudinary.com/dlx2zm7ha/image/upload/v1737654318/banner_i51agc.jpg'}')`;
    
    document.getElementById('profile-img').src = data.img_alt;
    document.getElementById('profile-name').textContent = data.fullname;
    document.getElementById('profile-nickname').textContent = data.nickname;
    
    document.getElementById('member-info').innerHTML = `
                    <p><strong>Tanggal Lahir:</strong> ${new Date(data.birthdate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    <p><strong>Golongan Darah:</strong> ${data.bloodType}</p>
                    <p><strong>Zodiak:</strong> ${getZodiacSign(new Date(data.birthdate))}</p>
                    <p><strong>Tinggi:</strong> ${data.height}</p>
                `;
    
    document.getElementById('profile-motto').textContent = data.jikosokai;
    document.getElementById('followers-count').textContent = data.stats.total_live.showroom || 'N/A';
    document.getElementById('room-level-count').textContent = data.stats.total_live.idn || 'N/A';
    
    if (data.introduction_video_url) {
      document.getElementById('introduction-video').innerHTML = `
                        <h3 class="text-lg font-semibold"><i class="fas fa-video text-red-500"></i> Introduction Video</h3>
                        <iframe class="w-full h-48 rounded-lg" src="${data.introduction_video_url}" frameborder="0" allowfullscreen></iframe>
                    `;
    }
  } catch (error) {
    document.getElementById('profile-card').classList.add('hidden');
    document.getElementById('error-message').classList.remove('hidden');
  }
}

fetchMemberData();