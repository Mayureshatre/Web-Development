document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("error", function () {
      const altText = this.getAttribute("alt") || "Image Unavailable";
      this.src = `https://placehold.co/600x400?text=${encodeURIComponent(altText)}`;
      this.style.border = "2px dashed #ccc";
    });
  });
});
