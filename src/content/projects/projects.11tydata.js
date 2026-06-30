module.exports = {
  eleventyComputed: {
    permalink_en: (data) => data.permalink_en || `/pages/${data.page.fileSlug}.html`,
    permalink_ka: (data) => data.permalink_ka || `/pages/${data.page.fileSlug}-ge.html`,
  },
};
