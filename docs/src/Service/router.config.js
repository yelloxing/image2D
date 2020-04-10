const pages = {
    "guide": {
        "content": () => import('../Pages/guide.iCrush')
    },
    "api": {
        "content": () => import('../Pages/api.iCrush'),
        "how-to-use": () => import('../Pages/api/how-to-use.iCrush'),
        "xhtml": () => import('../Pages/api/xhtml.iCrush'),
        "painter": () => import('../Pages/api/painter.iCrush'),
        "calculate": () => import('../Pages/api/calculate.iCrush'),
        "tool": () => import('../Pages/api/tool.iCrush'),
        "_default": "how-to-use"
    },
    "about": {
        "content": () => import('../Pages/about.iCrush')
    },
    "_default_": "guide"
};


export function loadRouter(doback, deep) {

    let routers = (window.location.href + "#").split("#")[1].replace(/\?.{0,}$/, '').replace(/^\//, '').replace(/\/$/, '').split('/'), page = pages;
    for (let i = 0; i < deep; i++) {
        page = page[routers[i]] || page[page['_default_']];
    }
    page.content().then(function (data) {
        doback(data.default);
    });

};

export function goRouter(doback, keyArray) {

    let page = pages, router = "#";
    for (let i = 0; i < keyArray.length; i++) {
        page = page[keyArray[i]] || page[page['_default_']];
        router += "/" + keyArray[i];
    }
    
    page.content().then(function (data) {
        doback(data.default);
    });

    window.location.href = router;

};