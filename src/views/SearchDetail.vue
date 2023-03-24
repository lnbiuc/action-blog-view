<template>
    <div class="mainContent" v-motion-slide-top>
        <div class="head">
            <p>
                {{ type }}&nbsp;<span style="color: #4285f4">{{ searchName }}</span>
            </p>
        </div>
        <div class="result">
            <BlogCard :blogs="blogs"></BlogCard>
        </div>
    </div>
</template>

<script>
import { searchFilingId, searchTagId } from '../axios';
import Blogs from '../components/Blogs.vue';
import { useSearchStore } from '../stores/counter';
import { computed } from 'vue';
import BlogCard from '../components/BlogCard.vue';

export default {
    name: 'SearchDetail',
    components: { BlogCard, Blogs },
    data() {
        return {
            type: '',
            searchParams: '',
            searchName: '',
            blogs: {},
        };
    },
    methods: {
        getInfo(type, params) {
            if (type === 'Category') {
                searchFilingId(params).then((res) => {
                    this.blogs = res.data.data.data;
                });
                return;
            }
            if (type === 'Tag') {
                searchTagId(params).then((res) => {
                    this.blogs = res.data.data.data;
                });
            }
        },
    },
    setup() {
        // 像 useRouter 那样定义一个变量拿到实例
        const store = useSearchStore();
        // 直接通过实例来获取数据
        const type = computed(() => store.type);
        const searchParams = computed(() => store.searchParams);
        const searchName = computed(() => store.searchName);
        return {
            type,
            searchParams,
            searchName,
        };
    },
    mounted() {
        this.getInfo(this.type, this.searchParams);
    },
    watch: {
        searchParams() {
            this.getInfo(this.type, this.searchParams);
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

.head {
    font-size: 35px;
    text-align: center;
    font-weight: 400;
    margin: 15px auto;
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
        background: rgba(0, 0, 0, 0.7);
        color: #c9d1d9 !important;
        border: 1px solid #30363d;
    }
}
</style>
