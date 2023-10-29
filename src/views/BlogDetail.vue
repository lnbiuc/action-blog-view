<template>
    <div class="mainContent">
        <div class="article">
            <div :style="{ backgroundImage: 'url(' + data.blog.bgImg + ')' }"  class="blogImg">
                <div>
                    <p class="blogTitle">{{ data.blog.title }}</p>
                    <p class="blogInfo">作者：{{ data.blog.authorVo.username
                        }}&nbsp;&nbsp;发布于：{{ data.blog.releaseTime }}</p>
                </div>
            </div>
            <div v-if="data.aiSum !== '' && data.aiSum !== 'No Result'" class="content" style="padding: 15px 20px;font-size: 0.95rem; display: flex; flex-direction: column; justify-content: start">
                <div style="width: 100%; display: flex; flex-direction: row;align-items: center; justify-content: start; margin-bottom: 10px">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20.562 10.188c.25-.688.313-1.376.25-2.063c-.062-.688-.312-1.375-.625-2c-.562-.938-1.375-1.688-2.312-2.125c-1-.438-2.063-.563-3.125-.313c-.5-.5-1.063-.937-1.688-1.25C12.437 2.126 11.687 2 11 2a5.17 5.17 0 0 0-3 .938c-.875.624-1.5 1.5-1.813 2.5c-.75.187-1.375.5-2 .875c-.562.437-1 1-1.375 1.562c-.562.938-.75 2-.625 3.063a5.438 5.438 0 0 0 1.25 2.874a4.695 4.695 0 0 0-.25 2.063c.063.688.313 1.375.625 2c.563.938 1.375 1.688 2.313 2.125c1 .438 2.062.563 3.125.313c.5.5 1.062.937 1.687 1.25c.625.312 1.375.437 2.063.437a5.17 5.17 0 0 0 3-.938c.875-.625 1.5-1.5 1.812-2.5a4.543 4.543 0 0 0 1.938-.875c.562-.437 1.062-.937 1.375-1.562c.562-.938.75-2 .625-3.063c-.125-1.062-.5-2.062-1.188-2.874Zm-7.5 10.5c-1 0-1.75-.313-2.437-.875c0 0 .062-.063.125-.063l4-2.313a.488.488 0 0 0 .25-.25c.062-.125.062-.187.062-.312V11.25l1.688 1v4.625a3.685 3.685 0 0 1-3.688 3.813ZM5 17.25c-.438-.75-.625-1.625-.438-2.5c0 0 .063.063.125.063l4 2.312a.563.563 0 0 0 .313.063c.125 0 .25 0 .312-.063l4.875-2.813v1.938l-4.062 2.375A3.71 3.71 0 0 1 7.312 19c-1-.25-1.812-.875-2.312-1.75ZM3.937 8.562a3.807 3.807 0 0 1 1.938-1.624v4.75c0 .124 0 .25.062.312a.488.488 0 0 0 .25.25l4.875 2.813l-1.687 1l-4-2.313a3.697 3.697 0 0 1-1.75-2.25c-.25-.938-.188-2.063.312-2.938ZM17.75 11.75l-4.875-2.813l1.687-1l4 2.313c.625.375 1.125.875 1.438 1.5c.312.625.5 1.313.437 2.063a3.718 3.718 0 0 1-.75 1.937c-.437.563-1 1-1.687 1.25v-4.75c0-.125 0-.25-.063-.313c0 0-.062-.124-.187-.187Zm1.687-2.5s-.062-.063-.125-.063l-4-2.312c-.125-.063-.187-.063-.312-.063s-.25 0-.313.063L9.812 9.688V7.75l4.063-2.375c.625-.375 1.312-.5 2.062-.5c.688 0 1.375.25 2 .688c.563.437 1.063 1 1.313 1.625s.312 1.375.187 2.062Zm-10.5 3.5l-1.687-1V7.062c0-.687.187-1.437.562-2C8.187 4.438 8.75 4 9.375 3.688a3.365 3.365 0 0 1 2.062-.312c.688.063 1.375.375 1.938.813c0 0-.063.062-.125.062l-4 2.313a.488.488 0 0 0-.25.25c-.063.125-.063.187-.063.312v5.625Zm.875-2L12 9.5l2.187 1.25v2.5L12 14.5l-2.188-1.25v-2.5Z"/></svg>
                  <span style="margin-left: 10px">由 <a href="https://chat.openai.com/" target="_blank">ChatGPT</a> 生成的摘要</span>
                </div>
                <div>
                    {{ data.aiSum }}
                </div>
            </div>
            <div class="content">
                <el-divider class="divider">
                    <p class="divider">CONTENT</p>
                </el-divider>
                <div id="nav"></div>
                <!--                <div class="contnent" v-html="content"></div>-->
                <md-editor
                    editor-id="blogEditor"
                    style="max-width: 850px"
                    :show-code-row-number="true"
                    v-model="data.blog.content"
                    :theme="data.currentTheme"
                    previewOnly
                    preview-theme="smart-blue"
                />
                <el-divider class="divider">
                    <p class="divider">END</p>
                </el-divider>
                <div class="end">
                    <ul>
                        <li>
                            本文作者：
                            <span style="color: #4285f4"
                            >{{ data.blog.authorVo.username }}
                                <router-link to="/about">（联系作者）</router-link>
                            </span>
                        </li>
                        <li>
                            标题：<span style="color: #4285f4">{{ data.blog.title }}</span>
                        </li>
                        <li>
                            简介：<span style="color: #4285f4">{{ data.blog.introduction }}</span>
                        </li>
                        <li>
                            发布于：<span style="color: #4285f4">{{ data.blog.releaseTime }}</span>
                        </li>
                        <li>
                            最近更新于：<span style="color: #4285f4">{{ data.blog.updateTime }}</span>
                        </li>
                        <li>
                            点击量：<span style="color: #4285f4">{{ data.blog.visitsCount }}</span>
                        </li>
                        <li>
                            本站点采用
                            <a href="https://creativecommons.org/licenses/by/4.0/" style="color: #4285f4">
                                署名 4.0 国际 (CC BY 4.0)
                            </a>
                            创作共享协议。可自由转载、引用，并且允许商业性使用。但需署名作者且注明文章出处。
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <el-affix :offset="82" class="toc" target=".article">
            <div class="toc-box">
                <md-catalog
                    editor-id="blogEditor"
                    :offsetTop="75"
                    :scrollElementOffsetTop="70"
                    :scroll-element="scrollElement"
                    :theme="data.currentTheme"
                />
            </div>
        </el-affix>
    </div>
</template>
<script setup>
import {getAiSum, getArticleByArticleId} from "../axios";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { reactive, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { ElLoading } from "element-plus";
import EasyTyper from 'easy-typer-js'
const data = ref({
    currentTheme: "dark",
    articleId: "default",
    blog: {
        articleId: "123",
        authorId: "123",
        title: "正在加载～～",
        introduction: "",
        content: "LOADING PLEASE WAIT...",
        tagNames: [
            {
                tagId: "1052",
                tagName: "正在加载～～"
            }
        ],
        releaseTime: "正在加载～～",
        updateTime: "正在加载～～",
        setTop: false,
        authorVo: {
            id: "",
            username: "正在加载～～",
            email: null
        },
        filingName: {
            id: 2023,
            filingName: "正在加载～～"
        },
        bgImg: "https://typora-1308549476.cos.ap-nanjing.myqcloud.com/img/wallhaven-2ygz3x.jpeg/default"
    },
    content: "",
    indexList: {},
    clipboard: "",
    nav: {},
    aiSum: '',
});
const MdCatalog = MdEditor.MdCatalog;

const route = useRoute();
data.value.articleId = route.params.articleId;
const loading = ElLoading.service({
  lock: true,
  text: "Loading, please wait...",
  background: "rgba(0, 0, 0, 0.7)"
});
getArticleByArticleId(data.value.articleId).then((res) => {
    data.value.blog = res.data.data;
    document.title = "薇尔薇 | " + data.value.blog.title;
    document.description = data.value.blog.introduction;
    loading.close();
});
getAiSum(data.value.articleId).then(res => {
    data.value.aiSum = res.data.data
})

const scrollElement = document.documentElement;
var isLight = window.matchMedia("(prefers-color-scheme: light)").matches;

if (isLight) {
    data.value.currentTheme = "light";
} else {
    data.value.currentTheme = "dark";
}

const mqList = window.matchMedia("(prefers-color-scheme: light)");

mqList.addEventListener("change", (event) => {
    // is dark mode
    data.value.currentTheme = "light";
    if (event.matches) {
    } else {
        // not dark mode
        data.value.currentTheme = "dark";
    }
});

onMounted(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});
</script>

<style scoped>
.mainContent {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    max-width: 850px;
}

.content {
    z-index: 2;
    border-radius: 7px;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid #dcdcdc;
    scroll-behavior: smooth;
    margin-top: 20px;
    transition: all 0.3s ease;
    width: 850px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.content:hover {
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 8%), 0 2px 4px -1px rgba(0, 0, 0, 12%);
    transition: all 0.3s ease;
}

.blogImg {
    background-size: cover !important;
    /*height: calc(50vh - 60px);*/
    min-height: 250px;
    position: relative;
    background-position: center center;
    background-repeat: no-repeat;
    z-index: 1;
    border: 1px solid #dcdcdc;
    border-radius: 7px;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    backdrop-filter: saturate(50%) blur(8px);
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05);
    background-color: rgba(0, 0, 0, 0.5);
    background-blend-mode: multiply;
    transition: all 0.3s;
}

.blogImg:hover {
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 8%), 0 2px 4px -1px rgba(0, 0, 0, 12%);
    transition: all 0.3s;
}

.blogTitle {
    padding: 0 100px 0;
    font-size: 30px;
    color: #fff;
    text-shadow: 1px 1px 2px black;
}

.blogInfo {
    font-size: 15px;
    color: #fff;
    text-shadow: 1px 1px 2px black;
}

.md-editor-dark {
    --md-bk-color: rgba(0, 0, 0, 0.7) !important;
}

@media screen and (max-width: 1000px) {
    .mainContent {
        /* width: 95vw; */
        min-width: 0;
    }

    .content {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        border-radius: 0;
        width: 100%;
    }

    .toc-box {
        display: none !important;
    }

    .article {
        width: 100%;
    }

    .blogImg {
        height: 25vh;
        border-radius: 0;
    }

    .mainContent {
        margin-bottom: 0;
        width: 100vw;
    }

    .blogTitle {
        font-size: 30px;
        padding: 0 20px 0;
    }
}

@media screen and (max-width: 1300px) {
    .toc {
        display: none;
    }
}

@media (prefers-color-scheme: dark) {
    .content {
        background: rgba(0, 0, 0, 0.7);
        color: #c9d1d9 !important;
    }

    .content,
    .blogImg {
        border: 1px solid #30363d;
    }

    .toc-box {
        background: rgba(0, 0, 0, 0.7) !important;
        color: #c9d1d9 !important;
        border: 1px solid #30363d !important;
    }

    /* 滚动条有滑块的轨道部分 */
    ::-webkit-scrollbar-track-piece {
        background-color: black !important;
        border-radius: 5px;
    }

    /* 滚动条滑块(竖向:vertical 横向:horizontal) */
    ::-webkit-scrollbar-thumb {
        background-color: rgb(30, 30, 30) !important;
    }

    /* 滚动条滑块hover */
    ::-webkit-scrollbar-thumb:hover {
        background-color: rgb(50, 50, 50) !important;
    }
}

.toc-box {
    display: flex;
    width: 200px;
    max-height: calc(100vh - 120px);
    border-radius: 7px;
    flex-direction: column;
    padding: 10px 20px;
    z-index: 0;
    border: 1px solid #dcdcdc;
    background: rgba(255, 255, 255, 0.7);
    margin-left: 20px;
    transition: all 0.3s ease;
    overflow-y: auto;
}

::-webkit-scrollbar {
    width: 7px;
}

/* 滚动条有滑块的轨道部分 */
::-webkit-scrollbar-track-piece {
    background-color: #ffffff;
    border-radius: 5px;
}

/* 滚动条滑块(竖向:vertical 横向:horizontal) */
::-webkit-scrollbar-thumb {
    cursor: pointer;
    background-color: rgb(230, 230, 230);
    border-radius: 100px;
}

/* 滚动条滑块hover */
::-webkit-scrollbar-thumb:hover {
    background-color: rgb(200, 200, 200);
}

/* 同时有垂直和水平滚动条时交汇的部分 */
::-webkit-scrollbar-corner {
    display: block; /* 修复交汇时出现的白块 */
}

.toc-box:hover {
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 8%), 0 2px 4px -1px rgba(0, 0, 0, 12%);
    transition: all 0.3s ease;
}
</style>
