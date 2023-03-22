<template>
    <div class="mainContent blogCardContainer">
        <p class="head">About</p>
        <div class="secondContent">
            <md-editor
                editor-id="blogEditor"
                style="max-width: 850px"
                :show-code-row-number="true"
                v-model="data.content"
                :theme="data.currentTheme"
                previewOnly
                preview-theme="smart-blue"
            />
        </div>
    </div>
</template>
<script setup>
import { aboutMeStore } from '../stores/counter';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { ref } from 'vue';
import { getCustomConfig } from '../axios';
const data = ref({
    currentTheme: 'light',
    aboutMe: {},
    content: '',
});

const getInfo = () => {
    getCustomConfig().then((res) => {
        const store = aboutMeStore();
        data.value.aboutMe = res.data.data.value;
        data.value.content = data.value.aboutMe;
        store.content = data.value.content;
    });
};

const store = aboutMeStore();
if (store.content == 'null') {
    getInfo();
} else {
    data.value.content = store.content;
}

var isLight = window.matchMedia('(prefers-color-scheme: light)').matches;

if (isLight) {
    data.value.currentTheme = 'light';
} else {
    data.value.currentTheme = 'dark';
}

const mqList = window.matchMedia('(prefers-color-scheme: light)');

mqList.addEventListener('change', (event) => {
    // is dark mode
    data.value.currentTheme = 'light';
    if (event.matches) {
    } else {
        // not dark mode
        data.value.currentTheme = 'dark';
    }
});
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
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 8%), 0 2px 4px -1px rgba(0, 0, 0, 12%);
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

.md-editor-dark {
    --md-bk-color: #0d1117 !important;
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
