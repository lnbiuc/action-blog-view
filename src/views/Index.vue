<template>
    <div class="site">
        <HeaderRebuild v-if="pc"></HeaderRebuild>
        <HeaderRebuildPhone v-if="phone"></HeaderRebuildPhone>
        <MainImg v-if="$route.name==='home'"></MainImg>
        <div class="three">
            <div v-if="$route.name!=='BlogDetail'"
                 class="left">
                <AnchorLeft />
            </div>
            <div class="middle">
                <router-view></router-view>
            </div>
            <div v-if="$route.name!=='BlogDetail'"
                 class="right">
                <AnchorRight />
            </div>
        </div>
        <el-backtop :bottom="20"
                    :right="20"
                    :visibility-height="500">
            <div class="backTop">
                <i class="icon paper plane"></i>
            </div>
        </el-backtop>
    </div>
    <Footer></Footer>
</template>

<script>
import Footer from '../components/Footer.vue'
import HeaderRebuild from '../components/HeaderRebuild.vue'
import HeaderRebuildPhone from '../components/HeaderRebuildPhone.vue'
import AnchorLeft from '../components/AnchorLeft.vue'
import AnchorRight from '../components/AnchorRight.vue'
import MainImg from '../components/MainImg.vue'

export default {
    name: 'Index',
    components: {
        HeaderRebuildPhone,
        HeaderRebuild,
        Footer,
        AnchorLeft,
        AnchorRight,
        MainImg,
    },
    data() {
        return {
            pc: true,
            phone: false,
            imgDisplay: true,
        }
    },
    methods: {
        setHeader() {
            let width = document.documentElement.clientWidth
            if (width < 1000) {
                this.phone = true
                this.pc = false
            }
        },
    },
    created() {
        this.setHeader()
    },
}
</script>

<style scoped>
.site {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 50px) !important;
    background-color: #eee;
}

.backTop {
    height: 100%;
    width: 100%;
    background-color: #fff;
    text-align: center;
    line-height: 40px;
    border-radius: 10px;
    color: #1989fa;
    z-index: 999;
    position: relative;
    transition: all 0.3s ease;
}

.backTop:hover {
    background-color: #1989fa;
    color: #fff;
    transition: all 0.3s ease;
}

.three {
    max-width: 1200px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin: 0 auto;
}

.left {
    display: flex;
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 20px;
    min-width: 250px;
}

.right {
    display: flex;
    flex: 1;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 20px;
    min-width: 250px;
}

.middle {
    max-width: 1000px;
    display: flex;
    flex: 3;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 20px;
    min-height: 100vh;
    min-width: 500px;
    align-items: flex-start;
    margin: 0 auto;
    justify-content: center;
}

@media (prefers-color-scheme: dark) {
    .site {
        background-color: #0d1117;
    }

    .backTop {
        background-color: #0d1117;
        border: 1px solid #0d1117;
    }
}

@media screen and (max-width: 1000px) {
    .left,
    .right {
        display: none;
        min-width: 0;
    }

    .middle {
        padding: 0;
        min-width: 0;
    }

    .three {
        width: 100vw;
        min-width: 0;
    }
}
</style>