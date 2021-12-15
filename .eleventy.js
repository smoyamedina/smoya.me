module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/style.css.map');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/admin');
    eleventyConfig.addPassthroughCopy('./src/copy');
    eleventyConfig.addPassthroughCopy('./scripts/script.js');
    eleventyConfig.addPassthroughCopy('./scripts/locomotive-scroll.min.js');

    return {
        dir: {
            input: "src",
            output: "public",
            includes: "partials",
            data: "copy"
        },
        htmlTemplateEngine: "pug"
    };
}
