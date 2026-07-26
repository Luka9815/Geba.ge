module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/style.css": "style.css" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });

  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("dateGe", (value) => {
    if (!value) return "";
    const d = new Date(value);
    if (isNaN(d)) return String(value);
    return new Intl.DateTimeFormat("ka-GE", {
      day: "numeric", month: "short", year: "numeric", timeZone: "UTC"
    }).format(d);
  });
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

  const markdownIt = require("markdown-it");
  const mdLib = markdownIt({ html: true, linkify: true, breaks: true });
  eleventyConfig.addFilter("markdownify", (content) => content ? mdLib.render(content) : "");

  eleventyConfig.addCollection("news", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/content/news/*.md")
      .sort((a,b)=> (a.data.date||0) - (b.data.date||0));
  });

  eleventyConfig.addCollection("projects", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/content/projects/*.md")
      .sort((a, b) => (b.data.date || 0) - (a.data.date || 0));
  });

  // Pasted Word/web content (via the CMS) can carry non-breaking spaces,
  // which stretch short justified lines edge-to-edge. Strip both forms
  // from rendered HTML so this can't be reintroduced by future pastes.
  eleventyConfig.addTransform("stripNbsp", (content, outputPath) => {
    if (outputPath && outputPath.endsWith(".html")) {
      const nbsp = new RegExp(String.fromCharCode(160), "g");
      return content.replace(/&nbsp;/gi, " ").replace(nbsp, " ");
    }
    return content;
  });

  return {
    dir: { input: "src", output: "public", includes: "_includes" }
  };
};
