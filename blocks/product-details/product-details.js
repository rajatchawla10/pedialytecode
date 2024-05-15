import { createOptimizedPicture } from "../../scripts/aem.js";

export default function decorate(block) {
  /* change to ul, li */
  const outerDiv = document.createElement("div");
  [...block.children].forEach((row) => {
    const innerDiv = document.createElement("div");
    innerDiv.className = "product-details-card";
    while (row.firstElementChild) innerDiv.append(row.firstElementChild);
    [...innerDiv.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector("picture"))
        div.className = "product-details-card-image";
      else div.className = "product-details-card-body";
    });
    outerDiv.append(innerDiv);
  });

  outerDiv
    .querySelectorAll("img")
    .forEach((img) =>
      img
        .closest("picture")
        .replaceWith(createOptimizedPicture(img.src, img.alt, false))
    );
  block.textContent = "";
  block.append(outerDiv);
}
