module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/style.css": "style.css" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });

  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("date", (value, fmt) => {
    if (!value) return "";
    const d = new Date(value);
    if (isNaN(d)) return String(value);
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const dd = String(d.getUTCDate()).padStart(2, "0");
    const mmm = months[d.getUTCMonth()];
    const yyyy = d.getUTCFullYear();
    return `${dd} ${mmm} ${yyyy}`;
  });

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
