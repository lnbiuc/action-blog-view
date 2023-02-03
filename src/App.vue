<template>
    <router-view />
</template>

<style>
::-webkit-scrollbar {
    width: 7px;
}

/* 滚动条有滑块的轨道部分 */
::-webkit-scrollbar-track-piece {
    background-color: transparent;
    border-radius: 5px;
}
/* 滚动条滑块(竖向:vertical 横向:horizontal) */
::-webkit-scrollbar-thumb {
    cursor: pointer;
    background-color:#b3b1d8;
    border-radius: 0;
}
/* 滚动条滑块hover */
::-webkit-scrollbar-thumb:hover {
    background-color: #6a67ce;
}
/* 同时有垂直和水平滚动条时交汇的部分 */
::-webkit-scrollbar-corner {
    display: block;    /* 修复交汇时出现的白块 */
}

#app {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
        sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'tnum';
    overflow-x: hidden;
}

p > img {
    max-width: 100%;
    border-radius: 4px;
}

.t-anchor__line {
    background-color: unset !important;
}

.hljs {
    border-radius: 5px !important;
}

.el-drawer {
    background-color: #fff !important;
}

h1::before,
h2::before,
h3::before,
h4::before,
h5::before,
h6::before {
    position: absolute;
    left: auto;
    right: calc(100% + 0.75em);
    /*top: 0;*/
    color: #5b5b5b;
    font-size: 90%;
    font-weight: bold;
}

h1 {
    margin: 30px 0 !important;
    font-size: 2.3rem !important;
}

h2 {
    display: block;
    margin: 0.83em 0 !important;
    padding-bottom: 0.3rem !important;
    font-size: 1.8rem !important;
}

h3 {
    margin: 18px 0 !important;
    font-size: 1.5rem !important;
}

h4 {
    font-size: 1.3rem !important;
    margin: 8px 0 !important;
}

h5 {
    font-size: 1.2rem !important;
    margin: 5px 0 !important;
}

h6 {
    font-size: 1.1rem !important;
    margin: 3px 0 !important;
}

p > code,
li > code,
h1 > code,
h2 > code,
h3 > code,
h4 > code,
h5 > code,
h6 > code {
    border-radius: 6px;
    padding: 0.2em 0.4em;
    font-size: 85%;
    font-family: ui-monospace, SF Mono, Menlo, Consolas, Liberation Mono,
        monospace !important;
    margin: 0.2em;
    background-color: rgba(175, 184, 193, 0.2);
    color: #0d1117;
}

code {
    font-family: SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono,
        monospace !important;
}

blockquote {
    padding: 0 1em;
    color: #57606a;
    border-left: 0.25em solid #d0d7de;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    /*margin-inline-start: 40px;*/
    /*margin-inline-end: 40px;*/
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
        sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
    word-wrap: break-word;
    margin: 5px auto;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
        sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji' !important;
    -webkit-font-smoothing: antialiased;
    font-weight: 500 !important;
}

h1,
h2,
h3 {
    border-bottom: 1px solid #d8dee4;
}

.contnent > *,
blockquote {
    line-height: 1.6 !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
        sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji' !important;
    -webkit-font-smoothing: antialiased;
    text-align: justify;
    font-weight: 350;
    margin-top: 8px !important;
    margin-bottom: 8px !important;
}

p,
ol {
    margin-bottom: 0 !important;
}

ul {
    margin-top: 5px !important;
    margin-bottom: 5px !important;
}

blockquote > p {
    line-height: 1.6 !important;
}

.contnent > h1 {
    font-weight: bold !important;
}

table {
    font-family: verdana, arial, sans-serif;
    border-width: 1px;
    border-color: #c9d1d9;
    border-collapse: collapse;
    overflow: hidden;
    text-align: center;
    margin: 0 auto;
    width: 100% !important;
}

table,
table >>> *,
table th,
table td,
table tr {
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
}

table th {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #c9d1d9;
    background-color: #dedede;
}

table td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #c9d1d9;
    background-color: rgb(250, 250, 250);
}

.toc-list {
    padding-left: 20px !important;
}

.toc-link {
    background-color: unset !important;
}

.toc-link::before {
    background-color: #eee;
    content: ' ';
    display: inline-block;
    height: 0;
    left: 0;
    margin-top: -1px;
    position: absolute;
    width: 2px;
}

.is-active-link {
    color: #4285f4 !important;
    transition: all 500ms !important;
    font-weight: 700 !important;
}

hr {
    border: none;
    height: 1px;
    background-color: #dedede;
}

@media (prefers-color-scheme: dark) {
    #app {
        background-color: #020407 !important;
    }

    .site {
        background-color: #020407 !important;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: #c9d1d9 !important;
    }

    h1,
    h2,
    h3 {
        border-bottom: 1px solid #30363d;
    }

    td,
    th {
        border: 1px #30363d solid !important;
        background-color: #0d1117 !important;
    }

    th {
        background-color: #000000 !important;
    }

    p > code,
    li > code,
    h1 > code,
    h2 > code,
    h3 > code,
    h4 > code,
    h5 > code,
    h6 > code {
        background-color: rgba(110, 118, 129, 0.4);
        color: #c9d1d9;
    }

    .el-drawer,
    .--el-drawer-bg-color {
        background-color: #020407 !important;
    }

    blockquote {
        padding: 0 1em;
        color: #8b949e;
        border-left: 0.25em solid #30363d;
    }

    html,
    body {
        background-color: #020407 !important;
    }

    .articleCard {
        background: #0d1117 !important;
    }

    .t-tag--default {
        background-color: #30363d !important;
    }

    .el-divider__text,
    .is-center {
        background-color: #30363d !important;
    }

    .el-divider__text {
        color: #c9d1d9 !important;
    }

    .el-divider--horizontal {
        border-top: 1px solid #30363d !important;
    }

    .btn-prev,
    .is-first,
    .is-active,
    .number,
    .btn-next,
    .el-input__wrapper,
    .el-input__wrapper,
    .el-input__inner,
    .el-textarea__inner {
        background-color: #0d1117 !important;
    }

    .el-pagination__editor,
    .is-in-pagination {
        border: 0 solid black !important;
    }

    .is-active > .el-radio-button__inner {
        background-color: #30363d !important;
    }
    .el-radio-button__inner {
        background-color: #0d1117 !important;
    }

    .el-input__inner {
        color: #fff !important;
    }

    .more,.btn-quicknext ,.el-icon {
        background-color: #0d1117 !important;
    }

    hr {
        border: none;
        height: 1px;
        background-color: #30363d;
    }
}

.t-card__cover {
    max-height: 300px !important;
    overflow: hidden;
}

.t-card__title {
    font-size: 130% !important;
    font-weight: 400;
}

html,
body {
    color: #333;
    background: #eee;

    min-height: calc(100vh - 50px) !important;
}

html.borderbox *,
html.borderbox *:before,
html.borderbox *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

p::selection,
h1::selection,
h2::selection,
h3::selection,
h4::selection,
h5::selection,
h6::selection,
span::selection,
a::selection,
ol::selection,
li::selection,
strong::selection,
code::selection,
div::selection,
b::selection {
    background: #6a67ce;
    color: #ffffff;
}

img::selection {
    background-color: greenyellow;
}

@media screen and (max-width: 1000px) {
    h1 {
        margin: 10px 0 !important;
        font-size: 2rem !important;
    }

    h2 {
        padding: 0 !important;
        margin: 7px 0 !important;
        font-size: 1.7rem !important;
    }

    h3 {
        padding: 0 !important;
        margin: 5px 0 !important;
        font-size: 1.4rem !important;
    }

    h4 {
        font-size: 1.3rem !important;
        padding: 4px 0 !important;
        margin: 0 !important;
    }

    h5 {
        font-size: 1.2rem !important;
        padding: 3px 0 !important;
        margin: 0 !important;
    }

    h6 {
        font-size: 1.1rem !important;
        padding: 2px 0 !important;
        margin: 0 !important;
    }

    table {
        max-width: 94vw;
    }
}
</style>
