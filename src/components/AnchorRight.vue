<template>
    <div class="block" v-motion-slide-right>
        <!-- <div v-if="!($route.name === 'BlogDetail')"
             class="blogIndex">
            <div class="indexHead">
                <p><i class="icon list"
                       style="color: #4285f4" />Post</p>
            </div>
            <div class="indexList">
                <div v-for="blog in blogs"
                     :key="blog.articleId"
                     class="blog"
                     @click="toBlog(blog.articleId)">
                    <div :style="{ 'background-image': 'url(' + blog.bgImg + ')' }"
                         style="cursor: pointer"
                         class="blogImg">
                        <span class="blogTitle">{{ blog.title }}</span>
                    </div>
                </div>
            </div>
        </div> -->
        <div v-if="!($route.name === 'BlogDetail')"
             class="tagCloud">
            <div class="tagHead">
                <p><i class="icon tags"
                       style="color: #4285f4" />Tags</p>
            </div>
            <div class="tagList">
                <span v-for="tag in tags"
                      :key="tag.tagId"
                      class="ui tiny blue myTag label"
                      style="margin-right: 10px;cursor: pointer;"
                      @click="toTag(tag.tagId, tag.tagName)">{{ tag.tagName }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { getRandomBlog, getTag } from '../axios'
import { sliderStore, useSearchStore } from '../stores/counter'

export default {
    name: 'AnchorRight',
    data() {
        return {
            currnetRouter: '',
            tags: [
                {
                    tagId: '1028',
                    tagName: '正在加载标签',
                    count: 1,
                },
            ],
            blogs: [
                {
                    articleId: 'OgSVnkzF',
                    authorId: 'K4vWpAz1',
                    title: 'Centos8环境搭建及项目部署',
                    introduction:
                        'Centos8 部署Springboot + Vue前后端分离项目全过程',
                    content: null,
                    tagNames: [
                        {
                            tagId: '1042',
                            tagName: 'Linux',
                        },
                    ],
                    releaseTime: '2022-09-14 13:37:03',
                    updateTime: '2022-09-14 16:07:25',
                    setTop: false,
                    authorVo: {
                        id: 'K4vWpAz1',
                        username: 'violet',
                        email: null,
                        headPortrait: '默认头像',
                        lastLogin: '2022-09-24 23:47:13',
                    },
                    visitsCount: 39,
                    likeCount: 0,
                    filingName: {
                        id: 2026,
                        filingName: '知识记录',
                    },
                    bgImg: 'https://user-pic-1308549476.cos.ap-nanjing.myqcloud.com/pic/96991663133786320.jpeg',
                },
            ],
        }
    },
    methods: {
        getTag() {
            const store = sliderStore()

            if (store.tags.length > 0) {
                this.tags = store.tags
            } else {
                getTag().then((res) => {
                    this.tags = res.data.data
                    store.tags = res.data.data
                })
            }
        },
        // getRandomArticle() {
        //     const store = sliderStore()

        //     if (store.blogs.length > 0) {
        //         this.blogs = store.blogs
        //     } else {
        //         getRandomBlog(4).then((res) => {
        //             this.blogs = res.data.data
        //             store.blogs = res.data.data
        //         })
        //     }
        // },
        toTag(params, name) {
            const store = useSearchStore()
            store.type = 'Tag'
            store.searchParams = params
            store.searchName = name
            this.$router.push({ name: 'Result' })
        },
        toBlog(articleId) {
            this.$router.push({
                name: 'BlogDetail',
                params: {
                    articleId: articleId,
                },
            })
        },
        routeChange(route) {
            this.currnetRouter = route
        },
    },
    created() {
        this.getTag()
        // this.getRandomArticle()
    },
    watch: {
        $route: {
            handler(route) {
                this.routeChange(route.name)
            },
            immediate: true, // 此项须设置为true
        },
    },
}
</script>
<style scoped>
.blogIndex,
.tagCloud,.blogIndex::after,.tagCloud::after {
    border-radius: 7px;
    background-color: #fff;
    border: 1px solid #dcdcdc;
    margin-top: 20px;
    transition: all 0.3s ease;
}

.blogIndex:hover,
.tagCloud:hover {
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 8%),
        0 2px 4px -1px rgba(0, 0, 0, 12%);
    transition: all 0.3s ease;
}

.indexHead,
.tagHead {
    text-align: center;
    margin: 10px auto;
    padding-bottom: 10px;
    border-bottom: 1px solid #c9d1d9;
    font-size: 15px;
}

.tagList {
    padding: 0 10px 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.myTag,.myTag::after,.myTag::before {
    margin: 3px 3px !important;
    font-size: 15px;
    display: inline-block;
    cursor: pointer;
    transition: all 0.2s ease;
}

.myTag:hover {
    background-color: #0f6fb9!important;
    border-color: #0f6fb9!important;
    transform: scale(1.1);
    transition: all 0.2s ease;
}

.blog {
    padding: 0 12px;
    margin: 12px auto;
}

.blogImg:hover {
    background-color: rgba(0, 0, 0, 0);
    transition: all 0.3s;
}

.blogImg {
    background-size: cover;
    width: 100%;
    height: 80px;
    border-radius: 7px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    backdrop-filter: saturate(50%) blur(8px);
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05);
    background-color: rgba(0, 0, 0, 0.5);
    background-position: center center;
    background-blend-mode: multiply;
}

.blogTitle {
    font-size: 15px;
    color: #fff;
    text-shadow: 1px 1px 2px #17325b;
}

@media (prefers-color-scheme: dark) {
    .blogIndex,
    .tagCloud {
        background-color: #0d1117;
        color: #c9d1d9 !important;
        border: 1px solid #30363d;
    }

    .tagHead,
    .indexHead {
        border-bottom: 1px solid #30363d;
    }
}

.block {
    display: flex;
    flex-direction: column;
    width: 100%;
    z-index: 9;
}
</style>
