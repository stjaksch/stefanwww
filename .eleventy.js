const Image = require("@11ty/eleventy-img");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");

  eleventyConfig.addNunjucksAsyncShortcode("bild", async function(src, caption) {
    let metadata = await Image(src, {
      widths: [400, 1200],
      formats: ["webp", "jpeg"],
      outputDir: "./_site/img/",
      urlPath: "/img/",
    });

    let thumb = metadata.jpeg[0];
    let voll  = metadata.jpeg[1];

    return `<figure>
      <a href="${voll.url}" data-glightbox data-description="${caption}">
        <img src="${thumb.url}" alt="${caption}" title="${caption}">
      </a>
      <figcaption>${caption}</figcaption>
    </figure>`;
  });
};
