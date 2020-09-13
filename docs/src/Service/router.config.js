const pages = {
    "guide": {
        "content": () => import('../Pages/guide.iCrush')
    },
    "api": {
        "content": () => import('../Pages/api.iCrush'),
        "how-to-use": {
            "content": () => import('../Pages/api/how-to-use.iCrush')
        },
        "xhtml": {
            "content": () => import('../Pages/api/xhtml.iCrush')
        },
        "painter": {
            "content": () => import('../Pages/api/painter.iCrush')
        },
        "calculate": {
            "content": () => import('../Pages/api/calculate.iCrush')
        },
        "tool": {
            "content": () => import('../Pages/api/tool.iCrush')
        },
        "_default_": "how-to-use"
    },
    "course": {
        "content": () => import('../Pages/course.iCrush'),
        "author": {
            "content": () => import('../Pages/course/author.iCrush')
        },
        "install": {
            "content": () => import('../Pages/course/install.iCrush')
        },
        "introduce": {
            "content": () => import('../Pages/course/introduce.iCrush')
        },
        "svg-painter": {
            "content": () => import('../Pages/course/svg-painter.iCrush')
        },
        "_default_": "install"
    },
    "QA": {
        "content": () => import('../Pages/QA.iCrush')
    },
    "Sponsors": {
        "content": () => import('../Pages/Sponsors.iCrush')
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
