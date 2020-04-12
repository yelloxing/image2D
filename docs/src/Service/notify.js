// 具体的通知内容
function doNotify(title, message) {
    let notification = new Notification(title, {
        body: message,
        icon: "src/assets/image2D.png"
    });
    setTimeout(function () { notification.close(); }, 5000);
}

// 通知一些重要事情
export default function (title, message) {
    if (window.Notification) {
        if (window.Notification.permission == "granted") {
            doNotify(title, message);
        } else {
            window.Notification.requestPermission(function (permission) {
                if (permission == 'granted') {
                    doNotify(title, message);
                }
            });
        }
    }
}