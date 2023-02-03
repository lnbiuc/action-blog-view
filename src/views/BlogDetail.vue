<template>
    <div class="mainContent">
        <div class="left-box">
        </div>
        <div class="article">
            <div :style="{ backgroundImage: 'url(' + blog.bgImg + ')' }" v-motion-slide-top
             class="blogImg">
                <div>
                    <p class="blogTitle">{{ blog.title }}</p>
                    <p class="blogInfo">作者：{{ blog.authorVo.username }}｜发布于：{{ blog.releaseTime }}</p>
                </div>
            </div>
            <div class="content" v-motion-slide-bottom>
                <el-divider class="divider">
                    <p class="divider">CONTENT</p>
                </el-divider>
                <div id="nav"></div>
                <div class="contnent"
                    v-html="content"></div>
                <el-divider class="divider">
                    <p class="divider">END</p>
                </el-divider>
                <div class="end">
                    <ul>
                        <li>
                            本文作者：
                            <span style="color: #4285f4">{{ blog.authorVo.username }}
                                <router-link to="/about">（联系作者）</router-link>
                            </span>
                        </li>
                        <li>
                            标题：<span style="color: #4285f4">{{ blog.title }}</span>
                        </li>
                        <li>
                            简介：<span style="color: #4285f4">{{ blog.introduction }}</span>
                        </li>
                        <li>
                            发布于：<span style="color: #4285f4">{{ blog.releaseTime }}</span>
                        </li>
                        <li>
                            最近更新于：<span style="color: #4285f4">{{ blog.updateTime }}</span>
                        </li>
                        <li>
                            点击量：<span style="color: #4285f4">{{ blog.visitsCount }}</span>
                            (大部分都是自己点的)
                        </li>
                        <li>
                            本站点采用
                            <a href="https://creativecommons.org/licenses/by/4.0/"
                            style="color: #4285f4">
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
                <div class="toc-head"><i class="list ul icon"></i>Directory</div>
                <div class="index">
                    <div class="js-toc"></div>
                </div>
            </div>
        </el-affix>
    </div>
</template>
<script>
import { getArticleByArticleId } from '../axios'
import Clipboard from 'clipboard'
import { ElMessage } from 'element-plus'
import { mdStrToHTML } from '../tool/markdownRender'
import { renderToc } from '../tool/renderToc'
import _ from 'lodash'
export default {
    name: 'BlogDetail',
    data() {
        return {
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
        }
    },
    methods: {
        initTocbot() {
            renderToc()
        },
        formatTime(str) {
            return str.substring(0, 10)
        },
    },
    created() {
        this.articleId = this.$route.params.articleId
        getArticleByArticleId(this.articleId).then((res) => {
            this.blog = res.data.data
            this.content = mdStrToHTML(this.blog.content)
            document.title = this.blog.title
            document.description = this.blog.introduction
            this.$nextTick(() => {
                this.initTocbot()
                if(!this.$route.hash == '') {
                    let el = document.querySelector(this.$route.hash)
                    window.scroll({ top: el.offsetTop, behavior: 'smooth' })
                }
            })
        })
    },
    mounted() {
        this.clipboard = new Clipboard('.copy-btn')
        // 复制成功失败的提示
        this.clipboard.on('success', (e) => {
            ElMessage.success('复制成功')
        })
        this.clipboard.on('error', (e) => {
            ElMessage.error('复制失败')
        })
    },
    beforeDestroy() {
        this.clipboard.destroy()
        tocbot.destroy()
    },
    destroy() {
        this.clipboard.destroy()
        tocbot.destroy()
    },
    beforeRouteLeave() {
        this.clipboard.destroy()
        tocbot.destroy()
    },
}
</script>
<style scoped>
.mainContent {
    margin-bottom: 20px;
    width: 1000px;
    display: flex;
    flex-direction: row;
}

.left-box {
    width: 240px;
}

.content {
    padding: 20px 2vw;
    z-index: 2;
    border-radius: 7px;
    background-color: #fff;
    border: 1px solid #d0d7de;
    scroll-behavior: smooth;
    margin-top: 20px;
    transition: all 0.3s ease;
    width: 100%;
}

.content:hover {
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 8%),
        0 2px 4px -1px rgba(0, 0, 0, 12%);
    transition: all 0.3s ease;
}

.contnent {
    width: 900px;
    scroll-behavior: smooth;
    font-size: 1.15em;
    white-space: normal;
    word-wrap: break-word;
    word-break: break-all;
}

.blogImg {
    background-size: cover !important;
    /*height: calc(50vh - 60px);*/
    height: 250px;
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
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 8%),
        0 2px 4px -1px rgba(0, 0, 0, 12%);
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

@media screen and (max-width: 1000px) {
    .mainContent {
        /* width: 95vw; */
        min-width: 0;
    }
    .content {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        border-radius: 0;
        width: 100vw;
    }

    .toc-box {
        display: none !important;
    }

    .contnent {
        overflow: hidden !important;
        margin-right: 10px;
        width: unset;
    }

    .article {
        width: 100vw;
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
        padding: 0 100px 0;
    }
}

@media screen and (max-width: 1500px) {
    .toc {
        display: none;
    }

    .left-box {
        display: none;
    }
}

@media (prefers-color-scheme: dark) {
    .contnent,
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
    /* position: fixed; */
    display: flex;
    /* top: 80px; */
    width: 240px;
    border-radius: 7px;
    flex-direction: column;
    padding: 10px 20px;
    /* overflow-y: hidden; */
    z-index: 10;
    border: 1px solid #d0d7de;
    background-color: #fff;
    margin-left: 20px;
    transition: all 0.3s ease;
    /* left: 70%; */
    /* height: calc(100vh - 100px); */
}

.toc-box:hover {
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 8%),
        0 2px 4px -1px rgba(0, 0, 0, 12%);
    transition: all 0.3s ease;
}

.toc-box > ul li {
    overflow: hidden;
    position: relative;
    list-style: none;
    padding-left: 20px;
}

.toc-head {
    font-size: 17px;
    text-align: center;
    padding: 10px 0;
    color: rgb(0, 123, 245);
}
</style>
<style lang="scss">
pre.hljs:hover {
    b.name {
        display: none;
        transition: all 300ms ease;
    }

    .copy-btn {
        display: block;
        transition: all 300ms ease;
        z-index: 1;
    }
}

pre.hljs {
    padding: 12px 2px 12px 50px !important;
    border-radius: 5px !important;
    position: relative;
    font-size: 14px !important;
    line-height: 22px !important;
    overflow: hidden !important;
    background-color: #161b22 !important;

    code {
        display: block !important;
        margin: 7px 10px 5px 2px !important;
        overflow-x: auto !important;
        &::-webkit-scrollbar {
            z-index: 11;
            width: 6px;
        }

        &::-webkit-scrollbar:horizontal {
            height: 6px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 7px;
            width: 6px;
            background: #666;
        }

        &::-webkit-scrollbar-corner,
        &::-webkit-scrollbar-track {
            background: #1e1e1e;
        }

        &::-webkit-scrollbar-track-piece {
            background: #1e1e1e;
            width: 6px;
        }
    }

    .line-numbers-rows {
        position: absolute;
        pointer-events: none;
        top: 18px;
        bottom: 20px;
        left: 0;
        font-size: 100%;
        width: 40px;
        text-align: center;
        letter-spacing: -1px;
        border-right: 1px solid rgba(0, 0, 0, 0.66);
        user-select: none;
        counter-reset: linenumber;

        span {
            pointer-events: none;
            display: block;
            counter-increment: linenumber;

            &:before {
                content: counter(linenumber);
                color: #999;
                display: block;
                text-align: center;
            }
        }
    }

    b.name {
        position: absolute;
        top: 2px;
        right: 8px;
        z-index: 1;
        color: #999;
        pointer-events: none;
    }

    .copy-btn {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 10;
        border-radius: 5px;
        border: 1px solid rgb(255,255,255,0.3);
        padding: 5px 5px;
        color: rgb(255,255,255,0.3);
        font-size: 20px;
        margin: 5px 5px;
        transition: all 300ms ease;
        display: none;
    }

    .copy-btn:hover {
        color: #fff;
        border: 1px solid #fff;
        transition: all 300ms ease;
    }

    .copy-btn:active {
        color: #67c23a;
        border: 1px solid #67c23a;
        transition: all 300ms ease;
    }

    .copy-btn:focus {
        color: #67c23a;
        border: 1px solid #67c23a;
        transition: all 300ms ease;
    }
}
</style>
