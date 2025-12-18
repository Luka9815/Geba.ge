module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/style.css": "style.css" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });

  eleventyConfig.addCollection("news", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/content/news/*.md")
      .sort((a,b)=> (a.data.date||0) - (b.data.date||0));
  });

  eleventyConfig.addCollection("projects", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/content/projects/*.md");
  });

  return {
    dir: { input: "src", output: "public", includes: "_includes" }
  };
};
