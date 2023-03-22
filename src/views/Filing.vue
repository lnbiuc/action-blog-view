<template>
    <div class="mainContent" v-motion-slide-top>
        <p class="head">Category</p>
        <div v-for="filing in filings" :key="filing.filingId">
            <div class="oneFiling">
                <span
                    @click="toFiling(filing.filingId, filing.filingName)"
                    class="ui violet ribbon label"
                    style="margin-left: 13px; cursor: pointer"
                >
                    {{ filing.filingName }}
                </span>
                Total:
                <span class="articleCount" v-text="filing.articles.length"></span>
                Posts
                <div class="cards">
                    <div v-for="article in filing.articles" :key="article.articleId">
                        <div class="articleTitle" style="margin: 10px auto">
                            <span style="font-size: 85%; color: #6a67ce" v-text="littleTimeStr(article.releaseTime)">
                            </span
                            >&nbsp;&nbsp;
                            <span style="cursor: pointer; color: dodgerblue" @click="detail(article.articleId)">
                                {{ article.title }} </span
                            >&nbsp;&nbsp;
                            <span style="font-size: 80%; color: gray">{{ article.introduction }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getFilingInfo } from '../axios';
import AnchorLeft from '../components/AnchorLeft.vue';
import { filingStore, useSearchStore } from '../stores/counter';
import BlogCard from '../components/BlogCard.vue';

export default {
    name: 'Filing',
    components: {
        AnchorLeft,
        BlogCard,
    },
    data() {
        return {
            filings: [],
        };
    },
    methods: {
        getFilingInfo() {
            const store = filingStore();
            if (store.filings.length > 0) {
                this.filings = store.filings;
            } else {
                getFilingInfo().then((res) => {
                    this.filings = res.data.data;
                    store.filings = res.data.data;
                });
            }
        },
        detail(articleId) {
            this.$router.push({
                name: 'BlogDetail',
                params: { articleId: articleId },
            });
        },
        littleTimeStr(str) {
            return str.substring(0, 10);
        },
        toFiling(params, name) {
            const store = useSearchStore();
            store.type = 'Category';
            store.searchParams = params;
            store.searchName = name;
            this.$router.push({ name: 'Result' });
        },
    },
    created() {
        this.getFilingInfo();
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
}

.cards {
    width: 94.5%;
    margin: 10px auto;
    justify-content: space-between;
    flex-direction: column;
}

.articleTitle {
    font-size: 1.3em;
    overflow: hidden;
    /*文本不会换行*/
    white-space: nowrap;
    /*当文本溢出包含元素时，以省略号表示超出的文本*/
    text-overflow: ellipsis;
}

.articleCount {
    font-size: 1.15em;
}

.oneFiling,
.oneFiling::before,
.oneFiling::after {
    border-radius: 7px;
    border: 1px solid #d0d7de;
    width: 98%;
    padding: 15px 0;
    margin: 20px auto 30px;
    max-width: 47.1vw;
    transition: all 0.3s ease;
}

.oneFiling:hover {
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 8%), 0 2px 4px -1px rgba(0, 0, 0, 12%);
    transition: all 0.3s ease;
}

@media screen and (max-width: 1000px) {
    .mainContent {
        width: 94%;
        margin: 3vw auto;
        padding: 10px 10px;
    }

    .oneFiling {
        margin: 20px auto 1.9vw;
        max-width: 86vw;
    }

    .ui > .card {
        margin: 20px auto;
        width: 100%;
    }
}

@media (prefers-color-scheme: dark) {
    .mainContent {
        background-color: #0d1117 !important;
        color: #c9d1d9 !important;
        border: 1px solid #30363d;
    }

    .oneFiling {
        background-color: #0d1117 !important;
        border: 1px solid #30363d;
    }

    .oneFiling:hover {
        background-color: #191a1c !important;
    }
}
</style>
