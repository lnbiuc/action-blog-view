<template>
    <div class="Home">
        <div id="blogScroll"></div>
        <Blogs :blogs="blogs"></Blogs>
        <div class="page">
            <el-pagination
                :currentPage="current"
                :page-size="size"
                :total="total"
                pager-count="5"
                background
                hide-on-single-page
                layout="prev, pager, next"
                @size-change="sizeChange"
                @current-change="currentChange"
            />
        </div>
    </div>
</template>

<script>
import MainImg from '../components/MainImg.vue';
import Blogs from '../components/Blogs.vue';
import { getBlogList } from '../axios';
import { homeBlogsStore } from '../stores/counter';

export default {
    name: 'Home',
    components: { MainImg, Blogs },
    data() {
        return {
            blogs: [],
            total: 0,
            size: 5,
            current: 1,
            pageSizeOptions: [5, 10, 15],
        };
    },
    methods: {
        sizeChange(size) {
            this.page(this.current, size);
        },
        currentChange(current) {
            this.page(current, this.size);
            const el = document.getElementById('blogScroll');
            window.scroll({ top: el.offsetTop, behavior: 'smooth' });
        },
        page(current, size) {
            const store = homeBlogsStore();

            // 如果当前需要请求的数据和store中保存的不一致，刷新数据
            if (store.current !== current || store.size !== size) {
                this.current = current;
                this.size = size;
                this.reGetBlogs();
                return;
            }

            // 如果store中有数据，直接从store中获取数据
            if (store.blogs.length > 0) {
                this.blogs = store.blogs;
                this.total = store.total;
                this.size = store.size;
                this.current = store.current;
            } else {
                // 如果没有就重新拿数据
                this.reGetBlogs();
            }
        },
        reGetBlogs() {
            getBlogList(this.current, this.size).then((res) => {
                this.blogs = res.data.data.articleVos;
                this.total = res.data.data.total;
                this.size = res.data.data.pageSize;
                this.current = res.data.data.currentPage;

                const store = homeBlogsStore();

                store.blogs = res.data.data.articleVos;
                store.total = res.data.data.total;
                store.size = res.data.data.pageSize;
                store.current = res.data.data.currentPage;
            });
        },
    },
    created() {
        const store = homeBlogsStore();
        if (store.current !== -1) {
            this.current = store.current;
            this.size = store.size;
            this.total = store.total;
            this.page(this.current, this.size);
        } else {
            this.page(1, 5);
        }
    },
};
</script>

<style scoped>
.page {
    margin: 0 auto;
    position: relative;
    z-index: 1;
    color: #fff !important;
}

#blogScroll {
    position: relative;
    top: -80px;
}

.Home {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
}

@media (prefers-color-scheme: dark) {
    .titleBlank {
        background-color: #020407;
    }
}

@media screen and (max-width: 1000px) {
    #blogScroll {
        top: -55px;
    }
}
</style>
