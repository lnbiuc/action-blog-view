<template>
    <div class="mainContent blogCardContainer">
        <p class="head">About</p>
        <div class="secondContent">
            <div class="contnent"
                 v-html="content" />
        </div>
    </div>
</template>

<script>
import AnchorLeft from '../components/AnchorLeft.vue'
import { getCustomConfig } from '../axios'
import { mdStrToHTML } from '../tool/markdownRender'
import { aboutMeStore } from '../stores/counter'
export default {
    name: 'AboutPage',
    components: {
        AnchorLeft,
    },
    data() {
        return {
            aboutMe: {},
            content: '',
        }
    },
    methods: {
        getInfo() {
            getCustomConfig().then((res) => {
                const store = aboutMeStore()
                this.aboutMe = res.data.data
                this.content = mdStrToHTML(this.aboutMe.value)
                store.content = this.content
            })
        },
    },
    created() {
        const store = aboutMeStore()
        if (store.content == 'null') {
            this.getInfo()
        } else {
            this.content = store.content
        }
    },
}
</script>

<style scoped>
.mainContent,
.mainContent::after,
.mainContent::before {
    width: 100%;
    padding: 25px 25px;
    border-radius: 7px;
    position: relative;
    background-color: #fff;
    min-height: 30vh;
    border: 1px solid #d0d7de;
    margin-bottom: 20px;
    transition: all 0.3s ease;
}

.mainContent:hover {
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 8%),
        0 2px 4px -1px rgba(0, 0, 0, 12%);
    transition: all 0.3s ease;
}

.head {
    font-size: 35px;
    text-align: center;
    font-weight: 400;
}

.secondContent {
    display: flex;
    flex-direction: column;
}

img {
    width: 200px;
}

.contnent {
    max-width: 69.4vw;
    scroll-behavior: smooth;
    margin: 0 20px 15px;
    font-size: 15px;
    word-break: break-all;
}

@media screen and (max-width: 1000px) {
    .mainContent {
        width: 94%;
        margin: 3vw auto;
        padding: 10px 10px;
    }

    .contnent {
        margin: 3vw;
        max-width: calc(100vw - 70px);
    }

    img {
        width: 150px;
    }
}

h2 {
    color: #6a67ce;
}

h4 {
    color: #4285f4;
}

@media (prefers-color-scheme: dark) {
    .mainContent {
        background-color: #0d1117 !important;
        color: #c9d1d9 !important;
        border: 1px solid #30363d;
    }
}
</style>
