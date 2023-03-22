<template>
    <div class="mainContent" v-motion-slide-top>
        <p class="head">Time Line</p>
        <div class="ui attached segment">
            <div class="timeline">
                <div v-for="time in times" :key="time.timeStrings.year" :class="colorObj[time.timeStrings.month % 5]">
                    <div class="tl-header">
                        <a class="ui large label m-text-500">
                            Y&nbsp;{{ time.timeStrings.year }}&nbsp;M&nbsp;{{ time.timeStrings.month }}
                        </a>
                    </div>
                    <div v-for="blog in time.articleVos" :key="blog.articleId" class="tl-item">
                        <div class="tl-wrap">
                            <span class="tl-date" v-text="littleTimeStr(blog.releaseTime)"></span>
                            <a href="javascript:" @click.prevent="toBlog(blog.articleId)">
                                <div class="ui left pointing label tl-title">
                                    {{ blog.title }}
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="tl-header">
                    <a class="ui black large label m-text-500">Hello World!</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getTimeLineData } from '../axios';
import AnchorLeft from '../components/AnchorLeft.vue';
import { timeLineStore } from '../stores/counter';

export default {
    name: 'TimeLine',
    components: {
        AnchorLeft,
    },
    data() {
        return {
            times: [],
            colorObj: {
                0: 'tl-blue',
                1: 'tl-dark',
                2: 'tl-green',
                3: 'tl-purple',
                4: 'tl-red',
            },
        };
    },
    methods: {
        littleTimeStr(str) {
            var newstring = 'Day ' + str.substring(8, 10);
            return newstring;
        },
        toBlog(articleId) {
            this.$router.push({
                name: 'BlogDetail',
                params: { articleId: articleId },
            });
        },
        getTimeLine() {
            const store = timeLineStore();

            if (store.times.length > 0) {
                this.times = store.times;
            } else {
                getTimeLineData().then((res) => {
                    this.times = res.data.data;
                    store.times = res.data.data;
                });
            }
        },
    },
    created() {
        this.getTimeLine();
    },
};
</script>

<style scoped>
.mainContent,
.mainContent::before,
.mainContent::after {
    width: 100%;
    padding: 25px 25px;
    border-radius: 7px;
    position: relative;
    background-color: #fff;
    min-height: 100vh;
    border: 1px solid #d0d7de;
    margin-bottom: 20px;
    transition: all 0.3s ease;
}

.mainContent:hover {
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 8%), 0 2px 4px -1px rgba(0, 0, 0, 12%);
    transition: all 0.3s ease;
}

.head {
    font-size: 35px;
    text-align: center;
    font-weight: 400;
    z-index: 1;
    padding-bottom: 10px;
}

@media screen and (max-width: 1000px) {
    .mainContent {
        width: 94%;
        margin: 3vw auto;
        padding: 10px 10px;
    }
}

@media (prefers-color-scheme: dark) {
    .mainContent {
        background-color: #0d1117 !important;
        color: #c9d1d9 !important;
        border: 1px solid #30363d;
    }

    .segment {
        background-color: unset;
        border: unset !important;
    }

    .tl-wrap:before {
        background: rgb(0, 0, 0) !important;
        box-shadow: 0 0 0 4px rgb(0, 0, 0) !important;
    }

    .tl-wrap:hover:before {
        background: 0 0 !important;
        border-color: rgb(0, 0, 0) !important;
    }
}

.segment {
    border: unset !important;
}

.tl-header {
    width: 12em;
    text-align: center;
}

.tl-date {
    position: relative;
    top: 10px;
    display: block;
    float: left;
    width: 4.5em;
    margin-left: -7.5em;
    text-align: right;
}

.tl-wrap,
.tl-wrap:after {
    padding: 15px 0 10px 20px;
    margin-left: 6em;
    border-style: solid;
    border-width: 0 0 0 4px;
}

.tl-wrap:before {
    position: relative;
    top: 15px;
    float: left;
    width: 10px;
    height: 10px;
    margin-left: -27px;
    background: #fff;
    border-color: inherit;
    border-style: solid;
    border-width: 3px;
    border-radius: 50%;
    content: '';
    box-shadow: 0 0 0 4px #fff;
    transition: all 0.2s ease;
}

.tl-wrap:hover:before {
    background: 0 0;
    border-color: #fff;
    transition: all 0.2s ease;
}

.tl-title,
.tl-title::after {
    margin-left: 0 !important;
    letter-spacing: 0.3px !important;
    font-size: 15px !important;
    font-weight: 500 !important;
    padding: 12px 15px !important;
}

.tl-blue .tl-header a,
.tl-blue .tl-item .tl-title {
    background: #23b7e5 !important;
    color: #fff !important;
}

.tl-blue .tl-item .tl-wrap {
    border-color: #23b7e5;
}

.tl-dark .tl-header a,
.tl-dark .tl-item .tl-title {
    background: #3a3f51 !important;
    color: #fff !important;
}

.tl-dark .tl-item .tl-wrap {
    border-color: #3a3f51;
}

.tl-green .tl-header a,
.tl-green .tl-item .tl-title {
    background: #27c24c !important;
    color: #fff !important;
}

.tl-green .tl-item .tl-wrap {
    border-color: #27c24c;
}

.tl-purple .tl-header a,
.tl-purple .tl-item .tl-title {
    background: #7266ba !important;
    color: #fff !important;
}

.tl-purple .tl-item .tl-wrap {
    border-color: #7266ba;
}

.tl-red .tl-header a,
.tl-red .tl-item .tl-title {
    background: #f05050 !important;
    color: #fff !important;
}

.tl-red .tl-item .tl-wrap {
    border-color: #f05050;
}
</style>
