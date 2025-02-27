const data = {
  success: true,
  data: [
    { value: "/mng26thsinglepb?lang=id", img_url: "https://jkt48.com/images/banner.home.mng26thsinglepb-id.jpg" },
    { value: "https://www.jtrustbank.co.id", img_url: "https://jkt48.com/images/banner.jtrust.20241008.webp" },
    { value: "/jkt48v", img_url: "https://jkt48.com/images/banner.home.jkt48v.jpg" },
    { value: "/valkyrie48?lang=id", img_url: "https://jkt48.com/images/banner.home.valkyrie48_2023.jpg?v=2" },
    { value: "/fanclub?lang=id", img_url: "https://jkt48.com/images/banner.fanclub2021-id.jpg" },
    { value: "https://www.tokopedia.com/officialjkt48", img_url: "https://jkt48.com/images/banner.home.tokopedia.jpg" }
  ]
};

let currentIndex = 0;
const imageElement = document.getElementById("slider-image");

function updateImage() {
  imageElement.classList.add("opacity-0");
  setTimeout(() => {
    imageElement.src = data.data[currentIndex].img_url;
    imageElement.classList.remove("opacity-0");
    imageElement.classList.add("opacity-100");
    currentIndex = (currentIndex + 1) % data.data.length;
  }, 500);
}

imageElement.src = data.data[0].img_url;
setInterval(updateImage, 3000);
