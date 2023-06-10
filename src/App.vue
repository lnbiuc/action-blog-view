<template>

        <router-view />

</template>

<style>
::-webkit-scrollbar {
    width: 8px;
}

/* 滚动条有滑块的轨道部分 */
::-webkit-scrollbar-track-piece {
    background-color: transparent;
    border-radius: 5px;
}
/* 滚动条滑块(竖向:vertical 横向:horizontal) */
::-webkit-scrollbar-thumb {
    cursor: pointer;
    background-color: #8583d5;
    border-radius: 0;
}
/* 滚动条滑块hover */
::-webkit-scrollbar-thumb:hover {
    background-color: #6a67ce;
}
/* 同时有垂直和水平滚动条时交汇的部分 */
::-webkit-scrollbar-corner {
    display: block; /* 修复交汇时出现的白块 */
}

#app {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
        'Segoe UI Emoji';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'tnum';
    overflow-x: hidden;
}

.t-anchor__line {
    background-color: unset !important;
}

.el-drawer {
    background: rgba(255, 255, 255, 0.7) !important;
}

@media (prefers-color-scheme: dark) {
    ::-webkit-scrollbar-track-piece {
        background-color: black;
        border-radius: 5px;
    }
    #app {
        background-color: #020407 !important;
    }

    .site {
        background-color: #020407 !important;
    }

    .el-drawer,
    .--el-drawer-bg-color {
        background-color: #020407 !important;
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
        background: rgba(0, 0, 0, 0.7) !important;
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

    .el-pager > .el-icon {
        background-color: #0d1117 !important;
    }

    .el-dialog {
        backdrop-filter: saturate(50%) blur(8px) !important;
        background: rgba(36, 36, 36, 0.7) !important;
        box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05) !important;
    }

    .el-dialog__title {
        color: #fff !important;
    }

    body {
        background-color: #020407 !important;
    }
}

html,
body {
    color: #333;
    font-size: 16px;
}

@media screen and (max-width: 1000px) {
    html,
    body {
        font-size: 10px;
    }
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

.md-editor-catalog-active>span {
    color: #6a67ce !important;
    font-weight: 600;
}

.md-editor-catalog-link>span:hover {
    color: #1e90ff !important;
}

.md-editor-preview {
    padding: 15px 1vw !important;

}

.el-drawer__header {
    margin-bottom: 0;
}

:deep(#nprogress .bar) {
    background: #6a67ce !important;
    height: 3px !important;
}
</style>
