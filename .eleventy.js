module.exports = function(eleventyConfig) {
    
    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/admin');
    eleventyConfig.addPassthroughCopy('./src/copy');
    
    return {
        dir: {
            input: "src",
            output: "public",
            includes: "partials",
            data: "copy"
        }
    };
}
