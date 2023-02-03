<template>
    <footer>
        <div class="create">
            <p class="copy"
               style="font-size:90%">
                <span>Copyright © 2022&nbsp;&nbsp;<span style="color:dodgerblue;cursor: pointer;"
                          @click="this.$router.push('/about')">Violet</span>&nbsp;&nbsp;</span>
                <span><a href="https://beian.miit.gov.cn/">陕ICP备2021015553号-1</a></span>
            </p>
            <p class="power"
               style="font-size:70%">
                <span>Powered by <a href="https://spring.io/projects/spring-boot">Spring Boot</a> & <a href="https://cn.vuejs.org/">Vue3</a>,</span>
                <span>UI by <a href="https://semantic-ui.com/">SemanticUI</a> & <a href="https://element-plus.org/zh-CN/#/zh-CN">ElementUI</a></span>
            </p>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
}
</script>

<style scoped>
footer {
    width: 100%;
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: space-between;
    align-items: center;
    backdrop-filter: saturate(50%) blur(8px);
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.18);
    position: relative;
    z-index: 3;
}

.countInfo {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
}

.create {
    font-size: 18px;
    margin: 10px auto;
    display: flex;
    flex-direction: column;
}

.value {
    font-size: 25px;
}

.label {
    font-size: 15px;
}

.statistic {
    margin: 0 25px;
}

.describe {
    margin-bottom: 10px;
}

@media screen and (max-width: 1000px) {
    .describe {
        display: none;
    }

    .create {
        font-size: 10px;
        display: flex;
        flex-direction: column;
    }

    .create span {
        font-size: 15px;
        text-align: center;
    }

    .value {
        font-size: 15px;
        overflow: hidden;
        display: flex;
        flex-direction: row;
    }
}

@media (prefers-color-scheme: dark) {
    footer {
        color: #fff !important;
        background: rgba(36, 36, 36, 0.7);
        box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05);
    }
}

@media screen and (max-width: 1000px) {
    footer >>> p {
        padding: 5px 0;
    }
}

@media screen and (max-width: 450px) {
    .create >>> span {
        padding: 5px 0;
    }
    .copy,
    .power {
        display: flex;
        flex-direction: column;
    }
}
</style>