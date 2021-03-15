const pages = {
    "guide": {
        "content": () => import('../Pages/guide.paper')
    },
    "api": {
        "content": () => import('../Pages/api.paper'),
        "how-to-use": {
            "content": () => import('../Pages/api/how-to-use.paper')
        },
        "xhtml": {
            "content": () => import('../Pages/api/xhtml.paper')
        },
        "painter": {
            "content": () => import('../Pages/api/painter.paper')
        },
        "calculate": {
            "content": () => import('../Pages/api/calculate.paper')
        },
        "tool": {
            "content": () => import('../Pages/api/tool.paper')
        },
        "_default_": "how-to-use"
    },
    "course": {
        "content": () => import('../Pages/course.paper'),
        "author": {
            "content": () => import('../Pages/course/author.paper')
        },
        "install": {
            "content": () => import('../Pages/course/install.paper')
        },
        "introduce": {
            "content": () => import('../Pages/course/introduce.paper')
        },
        "svg-painter": {
            "content": () => import('../Pages/course/svg-painter.paper')
        },
        "_default_": "install"
    },
    "QA": {
        "content": () => import('../Pages/QA.paper')
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
