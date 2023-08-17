// ==UserScript==
// @name         Github releases button
// @namespace    https://gitmylo.github.io/
// @version      0.1
// @description  Adds a download tab to github repositories
// @author       GitMylo
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var headerBar = document.querySelector(".AppHeader-localBar>.js-repo-nav>.UnderlineNav-body")
    if (headerBar) {
        var li = document.createElement("li")
        li.classList.add("d-inline-flex")
        var discussions = headerBar.children[3]
        var code = headerBar.children[0].children[0]
        code.dataset.selectedLinks = code.dataset.selectedLinks.replace("repo_releases ", "")

        var regex = /(?<=^https:\/\/github\.com)\/[a-zA-Z0-9\-]+\/[a-zA-Z0-9\-]+/m
        var repoUrl = ""
        var m
        if ((m = regex.exec(document.baseURI)) !== null) {
            console.log("Testing regex")
            m.forEach((match, groupIndex) => {
                repoUrl = match
            });
        }
        li.innerHTML = `
  <a id="pull-requests-tab" href="${repoUrl}/releases" data-tab-item="i2pull-requests-tab" data-selected-links="repo_releases checks ${repoUrl}/releases" data-pjax="#repo-content-pjax-container" data-turbo-frame="repo-content-turbo-frame" data-hotkey="g p" data-analytics-event="{&quot;category&quot;:&quot;Underline navbar&quot;,&quot;action&quot;:&quot;Click tab&quot;,&quot;label&quot;:&quot;Pull requests&quot;,&quot;target&quot;:&quot;UNDERLINE_NAV.TAB&quot;}" data-view-component="true" class="UnderlineNav-item no-wrap js-responsive-underlinenav-item js-selected-navigation-item">

              <svg aria-label="Tag" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-git-pull-request UnderlineNav-octicon d-none d-sm-inline">
    <path d="M1 7.775V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 0 1 0 2.474l-5.026 5.026a1.75 1.75 0 0 1-2.474 0l-6.25-6.25A1.752 1.752 0 0 1 1 7.775Zm1.5 0c0 .066.026.13.073.177l6.25 6.25a.25.25 0 0 0 .354 0l5.025-5.025a.25.25 0 0 0 0-.354l-6.25-6.25a.25.25 0 0 0-.177-.073H2.75a.25.25 0 0 0-.25.25ZM6 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"></path>
</svg>
        <span data-content="Releases">Releases</span>
          <span id="pull-requests-repo-tab-count" data-pjax-replace="" data-turbo-replace="" title="0" hidden="hidden" data-view-component="true" class="Counter">0</span>
</a>`
        headerBar.insertBefore(li, discussions)
        console.log("Added download button")
    }
})();
