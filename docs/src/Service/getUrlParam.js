/**
 * 解析浏览器的参数
 * 比如：http://localhost:20000/#/api/how-to-use?fixed=example
 * 返回就是:
 * {
 * "fixed":"example"
 * }
 */
export default function () {

    let paramStr = window.location.href.split('?')[1] || "";
    if (paramStr == "") {
        return {};
    } else {
        let paramArray = paramStr.split("&"), result = {};
        paramArray.forEach(item => {
            let temp = item.split("=");
            result[temp[0]] = temp[1];
        });
        return result;
    }

};