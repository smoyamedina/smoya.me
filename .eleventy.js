module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/style.css.map');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/admin');
    eleventyConfig.addPassthroughCopy('./src/copy');
    eleventyConfig.addPassthroughCopy('./scripts/script.js');
    eleventyConfig.addPassthroughCopy('./scripts/locomotive-scroll.min.js');

    // locomotives scroll doesn't allow for relative paths bc it's fake scroll-to-id uses query selectors to get its scrolling destination
    
    eleventyConfig.addGlobalData(
        "idLink", 
        () => {
            let fileHere = __dirname
            console.log(fileHere)
            if (fileHere.includes('/p/') == true) {
                return '/#'
            } else {
                return '#'
            }
        }
    );

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
