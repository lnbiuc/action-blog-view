<template>
    <div class="mainContent">
        <div class="article">
            <div :style="{ backgroundImage: 'url(' + data.blog.bgImg + ')' }" v-motion-slide-top class="blogImg">
                <div>
                    <p class="blogTitle">{{ data.blog.title }}</p>
                    <p class="blogInfo">作者：{{ data.blog.authorVo.username }}｜发布于：{{ data.blog.releaseTime }}</p>
                </div>
            </div>
            <div class="content" v-motion-slide-bottom>
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
                            (大部分都是自己点的)
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
        <el-affix :offset="82" class="toc">
            <div class="toc-box" v-motion-slide-right>
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
import { getArticleByArticleId } from '../axios';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const data = ref({
    currentTheme: 'dark',
    articleId: 'default',
    blog: {
        articleId: '123',
        authorId: '123',
        title: '正在加载～～',
        introduction: '',
        content: '',
        tagNames: [
            {
                tagId: '1052',
                tagName: '正在加载～～',
            },
        ],
        releaseTime: '正在加载～～',
        updateTime: '正在加载～～',
        setTop: false,
        authorVo: {
            id: '',
            username: '正在加载～～',
            email: null,
        },
        filingName: {
            id: 2023,
            filingName: '正在加载～～',
        },
        bgImg: 'https://typora-1308549476.cos.ap-nanjing.myqcloud.com/img/wallhaven-2ygz3x.jpeg',
    },
    content: '',
    indexList: {},
    clipboard: '',
    nav: {},
});
const MdCatalog = MdEditor.MdCatalog;

const route = useRoute();
data.value.articleId = route.params.articleId;
getArticleByArticleId(data.value.articleId).then((res) => {
    data.value.blog = res.data.data;
    document.title = '薇尔薇 | ' + data.value.blog.title;
    document.description = data.value.blog.introduction;
});
const scrollElement = document.documentElement;

var isLight = window.matchMedia('(prefers-color-scheme: light)').matches;

if (isLight) {
    data.value.currentTheme = 'light';
} else {
    data.value.currentTheme = 'dark';
}

const mqList = window.matchMedia('(prefers-color-scheme: light)');

mqList.addEventListener('change', (event) => {
    // is dark mode
    data.value.currentTheme = 'light';
    if (event.matches) {
    } else {
        // not dark mode
        data.value.currentTheme = 'dark';
    }
});

onMounted(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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
    padding: 15px 1.5vw;
    z-index: 2;
    border-radius: 7px;
    background-color: #fff;
    border: 1px solid #d0d7de;
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
    border: 1px solid #d0d7de;
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
    font-size: 40px;
    color: #fff;
    text-shadow: 1px 1px 2px #17325b;
}

.blogInfo {
    font-size: 15px;
    color: #fff;
    text-shadow: 1px 1px 2px #17325b;
}

.md-editor-dark {
    --md-bk-color: #0d1117 !important;
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
        background-color: #0d1117 !important;
        color: #c9d1d9 !important;
    }

    .content,
    .blogImg {
        border: 1px solid #30363d;
    }

    .toc-box {
        background-color: #0d1117 !important;
        color: #c9d1d9 !important;
        border: 1px solid #30363d !important;
    }
}

.toc-box {
    display: flex;
    width: 200px;
    border-radius: 7px;
    flex-direction: column;
    padding: 10px 20px;
    z-index: 10;
    border: 1px solid #d0d7de;
    background-color: #fff;
    margin-left: 20px;
    transition: all 0.3s ease;
}

.toc-box:hover {
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 8%), 0 2px 4px -1px rgba(0, 0, 0, 12%);
    transition: all 0.3s ease;
}
</style>
