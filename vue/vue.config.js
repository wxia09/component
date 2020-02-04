const path = require("path");
const isDev = process.env.NODE_ENV !== "production";
module.exports = {
  outputDir: "dist",
  publicPath: isDev ? "" : "/",
  chainWebpack: config => {
    config.resolve.alias
      .set("@", path.join(__dirname, "src"))
      .set("@components", path.join(__dirname, "src/components"))
      .set("@views", path.join(__dirname, "src/views"))
      .set("@assets", path.join(__dirname, "src/assets"));
  },
  devServer: {
    open: true
  }
};
