// ==UserScript==
// @id           cf-problem-features
// @name         Codeforces, problem-page features
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  This userscript adds link from problem to its statistic
// @author       moss3s
// @match        http://codeforces.com/problemset/problem/*
// @match        https://codeforces.com/problemset/problem/*
// @grant        none
// ==/UserScript==

function htmlToNode(html) {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstChild;
}

(function() {
    var path = window.location.pathname.split('/').slice(-2)
    var problemId = path.pop()
    var contestId = path.pop()
    console.log(`cf-problem-features: contestId=${contestId} problemId=${problemId}`);

    var menu = document.getElementsByClassName("second-level-menu-list")[0];

    // newMenu = menu - jquery.lavalamp.example service node + new menu item
    var newMenu = menu.cloneNode(true);
    newMenu.removeChild(newMenu.firstChild);
    newMenu.appendChild(htmlToNode(`<li><a href="/problemset/status/${contestId}/problem/${problemId}">Statistic</a></li>`));

    // replace menu by newMenu
    menu.parentNode.insertBefore(newMenu, menu);
    menu.style.display = 'none';

    // register jquery.lavalamp
    $(".second-level-menu-list").lavaLamp({
        fx: "backout",
        speed: 1000
    });
})();
