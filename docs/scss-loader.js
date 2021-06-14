module.exports = function (source) {

    if (/\.css$/.test(this.resourcePath)) {
        return source;
    } else {
        return require('@hai2007/algorithm').scss(source);
    }

}
