<template>
    <div class="main">
        <div v-for="blog in blogs" :key="blog.articleId" class="cards">
            <!-- <div style="position:relative;">
                <div style="position:absolute;left: 14px;top: -20px;font-size: 10px">
                    <a class="ui blue ribbon label filing"
                       @click="toFiling(blog.filingName.id,blog.filingName.filingName)">
                        {{ blog.filingName.filingName }}</a>
                </div>
            </div> -->
            <div :style="{ 'background-image': 'url(' + blog.bgImg + ')' }" class="blogImg">
                <span class="toBlog" style="cursor: pointer" @click="jump(blog.articleId)">Read More</span>
                <p class="blogTitle">{{ blog.title }}</p>
            </div>
            <div class="blogInfo">
                <div class="left">
                    <div class="introduction">
                        <i class="paperclip blue icon" />&nbsp;
                        {{ blog.introduction }}
                    </div>
                    <div class="time">
                        <i class="icon green cloud upload" />&nbsp;
                        <span v-text="littleTimeStr(blog.releaseTime)"></span>&nbsp;&nbsp;
                        <i class="icon orange tags" />&nbsp;
                        <span
                            v-for="tag in blog.tagNames"
                            :key="tag.tagId"
                            style="margin-right: 10px; cursor: pointer; color: dodgerblue"
                            @click="toTag(tag.tagId, tag.tagName)"
                        >
                            {{ tag.tagName }}
                        </span>
                        <i class="icon folder red" />&nbsp;
                        <span
                            @click="toFiling(blog.filingName.id, blog.filingName.filingName)"
                            style="cursor: pointer; color: dodgerblue"
                        >
                            {{ blog.filingName.filingName }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useSearchStore } from '../stores/counter';
import AnchorLeft from './AnchorLeft.vue';
export default {
    name: 'BlogCard',
    props: ['blogs'],
    components: {
        AnchorLeft,
    },
    data() {
        return {
            chrome: false,
        };
    },
    methods: {
        jump(articleId) {
            this.$router.push({
                name: 'BlogDetail',
                params: { articleId: articleId },
            });
        },
        littleTimeStr(str) {
            var newstring = str.substring(0, 10);
            return newstring;
        },
        toFiling(params, name) {
            const store = useSearchStore();
            store.type = 'Category';
            store.searchParams = params;
            store.searchName = name;
            this.$router.push({ name: 'Result' });
        },
        toTag(params, name) {
            const store = useSearchStore();
            store.type = 'Tag';
            store.searchParams = params;
            store.searchName = name;
            this.$router.push({ name: 'Result' });
        },
    },
};
</script>

<style scoped>
.cards,
.cards::after {
    width: 100%;
    position: relative;
    z-index: 1;
    margin: 0 auto 20px;
    border-radius: 7px;
    border: 1px solid #d0d7de;
    background-color: #fff;
    transition: all 0.3s ease;
}

.main {
    margin-bottom: 20px;
}

.cards:hover {
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 8%), 0 2px 4px -1px rgba(0, 0, 0, 12%);
    transition: all 0.2s ease;
    transform: scale(1.01);
}

.blogImg,
.blogTitle::after {
    background-size: cover;
    width: 100%;
    height: 300px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 7px 7px 0 0;
    backdrop-filter: saturate(50%) blur(8px);
    background-position: center center;
    background-blend-mode: multiply;
    overflow: hidden;
    background-image: inherit;
    transition: all 0.2s ease;
}

.toBlog,
.toBlog::after {
    font-size: 35px;
    font-weight: 500;
    color: #fff;
    border: 2px solid #fff;
    padding: 20px 25px;
    border-radius: 7px;
    opacity: 0;
    z-index: 2;
    cursor: pointer;
    transition: all 0.2s ease;
}

.toBlog:hover {
    backdrop-filter: saturate(50%) blur(8px);
    background: rgba(0, 0, 0, 0.5);
    transition: all 0.2s ease;
}

.blogImg:hover > .toBlog {
    opacity: 1;
    transition: all 0.3s;
}

.blogImg:hover > .blogTitle {
    opacity: 0;
    transition: all 0.3s;
}

.blogImg:hover {
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.5s;
}

.blogTitle,
.blogTitle::after {
    position: absolute;
    font-size: 30px;
    color: #fff;
    text-shadow: 1px 1px 2px #0d1117;
    z-index: 1;
    padding: 0 50px;
    transition: all 0.3s ease;
}

.blogInfo,
.blogTitle::after {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 15px;
    transition: all 0.3s ease;
}

.right {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
}

.tag {
    justify-content: flex-end;
}

.left {
    flex-direction: column;
    font-size: 15px;
    flex: 2;
    width: 100%;
}

.filing {
    position: relative;
    z-index: 3;
    top: 30px;
    font-size: 10px;
}

.introduction {
    word-wrap: break-word;
    word-break: break-all;
    margin-bottom: 5px;
}

@media screen and (max-width: 1000px) {
    .cards {
        width: 90%;
        margin: calc(3vw + 10px) auto;
    }

    .blogImg {
        height: 40vw;
    }

    .blogInfo {
        flex-direction: column;
    }

    .toBlog {
        font-size: 20px;
    }

    .blogTitle {
        font-size: 20px;
        padding: 20px;
    }

    .tag {
        margin-right: -11px;
    }
    .filing {
        font-size: 8px;
    }
}

@media (prefers-color-scheme: dark) {
    .cards {
        background-color: #0d1117 !important;
        color: #c9d1d9 !important;
        border: 1px solid #30363d;
    }
}

@media screen and (max-width: 1000px) {
    .left {
        font-size: 12px;
    }
}
</style>
