const fs = require('fs');
const rollup = require('rollup');
const rollupPluginNodeResolve = require('rollup-plugin-node-resolve');
const rollupPluginCommonjs = require('rollup-plugin-commonjs');
const babel = require('babel-core');
const cp = require('child_process');

// 生成banner
let banner = function (pkg) {
    return `/*!
* image2D - `+ pkg.description + `
* `+ pkg.repository.url + `
*
* For online documents, please visit
* `+ pkg.homepage + `
*
* author `+ pkg.author.name + `
*
* version `+ pkg.version + `
*
* build Thu Apr 11 2019
*
* Copyright yelloxing
* Released under the `+ pkg.license + ` license
*
* Date:`+ new Date() + `
*/\n\n`;

};

module.exports = {

    // 当前配置文件的相对路径上下文
    path: __dirname,

    // package.json路径
    pkg: '.',

    // 定义任务
    task: {

        init(cuf, pkg) {

            cuf.print(pkg.name + "@" + pkg.version + " " + pkg.description);

            // 如果打包后的文件存在
            if (fs.existsSync('./build')) cuf.deleteSync('./build');

            cuf.log("\n-----------------------\n环境整理完毕，开始打包！\n-----------------------");
            cuf.print("Date : " + new Date() + "\n");

        },

        end(cuf) {

            cuf.log("\n-----------------------\n打包完毕！\n-----------------------");
            cuf.print("Date : " + new Date() + "\n\n");

            // 打印文件大小
            const printFileSize = function (index, url) {

                fs.stat(url, (err, stats) => {
                    if (err) {
                        console.log(err);
                    } else {
                        let size = (bytes => {
                            if (bytes < 1024) return bytes + " Bytes";
                            else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KB";
                            else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MB";
                            else return (bytes / 1073741824).toFixed(3) + " GB";
                        })(stats.size);

                        cuf.log("[" + index + "]    " + url + "    " + size);
                    }

                });
            };

            printFileSize(1, './build/image2D.js');
            printFileSize(2, './build/image2D.min.js');

        },

        /**
         * 第一步：模块打包
         * ----------------------
         */
        bundle(cuf) {
            async function build(inputOptions, outputOptions) {
                const bundle = await rollup.rollup(inputOptions);
                await bundle.write(outputOptions);

                cuf.error('模块打包完毕');
            }

            cuf.log("\n[1]模块打包:./build/module.new.js\n");

            build({
                input: 'src/index.js',
                plugins: [

                    // 帮助 Rollup 查找外部模块，然后安装
                    rollupPluginNodeResolve({
                        customResolveOptions: {
                            moduleDirectory: 'node_modules'
                        }
                    }),

                    // 将CommonJS模块转换为 ES2015 供 Rollup 处理
                    rollupPluginCommonjs({
                        include: "node_modules/**",
                        exclude: []
                    })

                ]
            }, {
                format: 'iife',
                name: "temp",
                file: './build/module.new.js'
            });
        },

        /**
         * 第二步：babel转义
         * ----------------------
         */
        babel(cuf, pkg) {

            cuf.log("\n[2]babel转义:./build/module.new.js → ./build/image2D.js\n");

            babel.transformFile("./build/module.new.js", {}, function (err, result) {
                if (!err) {
                    fs.writeFileSync("./build/image2D.js", banner(pkg));
                    fs.appendFileSync("./build/image2D.js", result.code);
                    fs.appendFileSync("./build/image2D.js", `
                    
/*!

    我还惊讶地意识到， 在我生命中有很多时刻， 每当我遇到一个遥不可及、令人害怕的情境，
    并感到惊慌失措时， 我都能够应付——因为我回想起了很久以前自己上过的那一课。
    我提醒自己不要看下面遥远的岩石， 而是注意相对轻松、容易的第一小步， 迈出一小步、再一小步，
    就这样体会每一步带来的成就感， 直到完成了自己想要完成的， 达到了自己的目标，
    然后再回头看时， 不禁对自己走过的这段漫漫长路感到惊讶和自豪。

                                            ———— 摘自 莫顿·亨特《走一步，再走一步》

*/`);
                    cuf.deleteSync("./build/module.new.js");

                    cuf.error('转义完毕');
                } else {
                    console.log(err);
                }
            });
        },

        /**
         * 第三步：压缩代码
         * ----------------------
         */
        uglifyjs(cuf, pkg) {

            cuf.log("\n[3]压缩代码:./build/image2D.js → ./build/image2D.min.js\n");

            cp.exec("uglifyjs ./build/image2D.js -m -o ./build/uglifyjs.new.js", function (error) {
                if (error) {
                    console.log(error);
                } else {

                    fs.writeFileSync("./build/image2D.min.js", banner(pkg));
                    fs.appendFileSync("./build/image2D.min.js", fs.readFileSync("./build/uglifyjs.new.js"));

                    cuf.error('压缩完毕');
                }
                cuf.deleteSync("./build/uglifyjs.new.js");
            });
        }

    }

};
