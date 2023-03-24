<template>
    <div class="mainContent" v-motion-slide-top>
        <div class="head">Search</div>
        <div class="searchGroup">
            <div class="t-demo-tabs">
                <!-- <t-radio-group v-model="index" variant="default-filled">
						<t-radio-button value="1"> 标题</t-radio-button>
						<t-radio-button value="2"> 分类</t-radio-button>
						<t-radio-button value="3"> 标签</t-radio-button>
					</t-radio-group> -->
                <el-radio-group v-model="index">
                    <el-radio-button label="Title" />
                    <el-radio-button label="Category" />
                    <el-radio-button label="Tag" />
                </el-radio-group>
            </div>
            <div class="searchInput">
                <!-- <a-input-search
					v-model:value="params"
					enter-button="Search"
					placeholder="输入关键词搜索"
					size="large"
					@search="search" /> -->
                <el-input
                    class="search"
                    style="margin-right: 10px"
                    v-model="params"
                    placeholder="输入关键词搜索"
                    clearable
                />
                <el-button @click="search" style="margin-left: 10px" type="primary">
                    <i class="icon search" />
                    Search
                </el-button>
            </div>
            <div class="total">
                <p>
                    Total&nbsp;<span style="color: #4285f4">{{ total }}</span>
                </p>
            </div>
        </div>
        <div class="result">
            <BlogCard :blogs="blogs"></BlogCard>
        </div>
    </div>
</template>

<script>
import Blogs from '../components/Blogs.vue';
import { searchFilingName, searchTagName, searchTitle } from '../axios';
import BlogCard from '../components/BlogCard.vue';

export default {
    name: 'Search',
    components: {
        BlogCard,
        Blogs,
    },
    data() {
        return {
            index: 'Title',
            params: '',
            blogs: {},
            total: 0,
        };
    },
    methods: {
        search() {
            this.blogs = {};

            if (this.index === 'Title') {
                this.searchTitle();
                return;
            }
            if (this.index === 'Category') {
                this.searchFiling();
                return;
            }
            if (this.index === 'Tag') {
                this.searchTag();
                return;
            }
            this.searchTitle();
        },
        searchTitle() {
            if (this.params !== '') {
                searchTitle(this.params).then((res) => {
                    this.total = res.data.data.total;
                    this.blogs = res.data.data.data;
                });
            }
        },
        searchFiling() {
            if (this.params !== '') {
                searchFilingName(this.params).then((res) => {
                    this.total = res.data.data.total;
                    this.blogs = res.data.data.data;
                });
            }
        },
        searchTag() {
            if (this.params !== '') {
                searchTagName(this.params).then((res) => {
                    this.total = res.data.data.total;
                    this.blogs = res.data.data.data;
                });
            }
        },
    },
};
</script>

<style scoped>
.mainContent {
    width: 100%;
    padding: 25px 25px;
    border-radius: 7px;
    position: relative;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid #dcdcdc;
    transition: all 0.3s ease;
    margin-bottom: 20px;
}

.mainContent:hover {
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 8%), 0 2px 4px -1px rgba(0, 0, 0, 12%);
    transition: all 0.3s ease;
}

.result {
    padding: 0 20px;
}

.total {
    margin-top: 15px;
}

.head {
    font-size: 35px;
    text-align: center;
    font-weight: 400;
}

.searchGroup {
    margin: 10px 25px;
    display: flex;
    flex-direction: column;
    align-content: space-between;
}

.searchInput {
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: row;
}

.t-demo-tabs {
    margin-top: 20px;
}
@media screen and (max-width: 1000px) {
    .mainContent {
        width: 94%;
        margin: 3vw auto;
        padding: 10px 10px;
    }

    .result {
        padding: 0 0;
    }

    .searchGroup {
        margin: 10px 5vw;
    }

    .head {
        margin-top: 10px;
    }
}

@media (prefers-color-scheme: dark) {
    .mainContent {
        background: rgba(0, 0, 0, 0.7);
        color: #c9d1d9 !important;
        border: 1px solid #30363d;
    }
}
</style>
