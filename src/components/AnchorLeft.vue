<template>
    <div class="block"
         v-motion-slide-left>
        <div class="about">
            <div class="anchorHeader">
                <p><i class="icon user"
                       style="color: #4285f4" />&nbsp;Author</p>
            </div>
            <div class="anchor">
                <el-avatar :size="150"
                           class="anchorImg"
                           src="https://typora-1308549476.cos.ap-nanjing.myqcloud.com/img/squre-modified.png" />
                <p class="name">violet</p>
                <p class="introduction"
                   style="text-indent: 2em">
                    什么？你左大括号不换行？天纳！这简直相当于你吃甜豆腐脑一样！！ </p>
            </div>
            <div class="aboutInfo">
                <a class="svg"
                   href="https://github.com/lnbiuc">
                    <i class="icon github"
                       style="color: #1e1e1e" />
                </a>
                <a class="svg"
                   href="https://twitter.com/ZZSLL_53387">
                    <i class="icon twitter"
                       style="color: rgba(74, 153, 233)" />
                </a>
                <a class="svg"
                   href="https://weibo.com/u/5641901500">
                    <i class="icon weibo"
                       style="color: rgba(255, 0, 0, 0.76)" />
                </a>
                <a class="svg"
                   href="mailto:violetzzs@proton.me">
                    <i class="icon envelope"
                       style="color: #4285f4" />
                </a>
            </div>
            <div class="blogInfo">
                <div class="info">
                    <p class="infoTitle">Post</p>
                    <p class="infoInfo">{{ count.totalBlogs }}</p>
                </div>
                <div class="info">
                    <p class="infoTitle">Tag</p>
                    <p class="infoInfo">{{ count.totalTags }}</p>
                </div>
                <div class="info">
                    <p class="infoTitle">Category</p>
                    <p class="infoInfo">{{ count.totalFiling }}</p>
                </div>
            </div>
        </div>
        <div class="count">
            <div class="countHead">
                <p><i class="icon chart bar outline"
                       style="color: #4285f4" />&nbsp;Statistical Info</p>
            </div>
            <div class="countList">
                <div>
                    <div>
                        <i class="icon red calendar alternate outline" />
                        Run Time
                    </div>
                    <span>
                        {{ count.existTime }} Day
                    </span>
                </div>
                <div>
                    <div>
                        <i class="icon blue eye" />
                        Article View
                    </div>
                    <span>
                        {{ count.totalViews }} Times
                    </span>
                </div>
                <div>
                    <div>
                        <i class="icon yellow tv" />
                        Page View
                    </div>
                    <span>
                        {{ count.webViews }} Times
                    </span>
                </div>
                <div>
                    <div>
                        <i class="icon orange sync" />
                        Last Update
                    </div>
                    <span v-text="subStr(count.lastUpdate)">
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getCountInfo } from '../axios'
import { sliderStore } from '../stores/counter'

export default {
    name: 'Anchor',
    data() {
        return {
            count: {
                totalViews: '-',
                existTime: '-',
                totalBlogs: '-',
                totalTags: '-',
                totalFiling: '-',
                webViews: '-',
                lastUpdate: '-',
            },
            anno: [
                {
                    id: 1,
                    content: '公告加载中',
                    time: '2022-09-24 23:48:41',
                },
            ],
        }
    },
    methods: {
        subStr(str) {
            var newstring = str.substring(0, 10)
            return newstring
        },
        getCountInfo() {
            const store = sliderStore()

            if (store.count.webViews) {
                this.count = store.count
            } else {
                getCountInfo().then((res) => {
                    this.count = res.data.data
                    store.count = res.data.data
                })
            }
        },
    },
    created() {
        this.getCountInfo()
    },
}
</script>

<style scoped>
.anchor {
    text-align: center;
    margin: 20px auto;
}

.anchorImg, .anchorImg::after {
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 8%),
        0 2px 4px -1px rgba(0, 0, 0, 12%);
    transition: all 0.5s ease;
}

.anchorImg:hover {
    transform: rotate(360deg) scale(1.1);
    transition: all 0.3s ease;
}



.name {
    font-size: 25px;
    display: block;
    margin: 10px 0;
    padding-bottom: 10px;
    font-weight: 700;
    font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
    /*border-bottom: 1px solid #30363d;*/
}

.introduction {
    text-align: left;
    font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
    width: 80%;
    margin: 0 auto;
    font-size: 12px;
}

.svg,.svg::after,.svg::before {
    background-color: #eee;
    font-size: 20px;
    padding: 7px 7px;
    border-radius: 20px;
    margin: auto 5px;
    text-align: center;
    transition: all 0.2s ease;
}

.svg:hover {
    background-color: rgba(0, 0, 0, 0.15);
    transition: all 0.2s ease;
    transform: scale(1.1);
}

.icon {
    margin: 0;
}

.about > .aboutInfo {
    margin: 0 auto;
}

.aboutInfo {
    text-align: center;
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 80%;
}

.blogInfo {
    text-align: center;
    margin: 10px auto;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
}

.infoTitle {
    font-size: 15px;
    font-weight: 500;
}

.infoInfo {
    font-weight: 500;
}

.info {
    display: flex;
    flex-direction: column;
}

.countHead,
.anchorHeader {
    text-align: center;
    display: block;
    border-bottom: 1px solid #c9d1d9;
    font-size: 15px;
    margin: 10px auto;
    padding-bottom: 10px;
}

.countList {
    text-align: left;
    font-size: 13px;
    padding: 0 15px;
}

.countList > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0;
    flex-wrap: wrap;
}

.about,
.count,.about::after,.count::after {
    border-radius: 7px;
    background-color: #ffffff;
    border: 1px solid #c9d1d9;
    margin-top: 20px;
    transition: all 0.3s ease;
}

.about:hover,
.count:hover {
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 8%),
        0 2px 4px -1px rgba(0, 0, 0, 12%);
    transition: all 0.3s ease;
}

@media screen and (max-width: 1000px) {
    .main {
        display: none;
    }
}

@media (prefers-color-scheme: dark) {
    .about,
    .count {
        background-color: #0d1117;
        color: #c9d1d9 !important;
        border: 1px solid #30363d;
    }

    .svg {
        background-color: #c9d1d9;
    }

    .countHead,
    .anchorHeader {
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