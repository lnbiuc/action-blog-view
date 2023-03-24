<template>
<!--    <div class="occupancy"></div>-->
    <div class="head">
        <div class="logo"><a style="color: #6a67ce" @click="index(1)">Violet</a></div>
        <div class="links" @click="visible = true">
            <span class="link">
                <i class="icon outdent" />
            </span>
        </div>
    </div>

    <el-drawer v-model="visible" :show-close="false" class="drawer" close-on-press-escape="true" size="200">
        <template #header="{ close, titleId, titleClass }">
            <span class="close" @click="visible = false"> <i class="icon indent" />&nbsp;&nbsp;&nbsp;&nbsp;Close </span>
        </template>
        <div class="navs">
            <span
                class="nav"
                @click="
                    index(1);
                    visible = false;
                "
            >
                <i class="icon home" />
                Index</span
            >
            <span
                class="nav"
                @click="
                    index(2);
                    visible = false;
                "
            >
                <i class="icon archive" />
                Time Line</span
            >
            <span
                class="nav"
                @click="
                    index(3);
                    visible = false;
                "
            >
                <i class="icon bookmark" />
                Category</span
            >
            <span
                class="nav"
                @click="
                    index(6);
                    visible = false;
                "
            >
                <i class="icon comment alternate" />
                Message</span
            >
            <span
                class="nav"
                @click="
                    index(7);
                    visible = false;
                "
            >
                <i class="icon linkify" />
                Friends</span
            >
            <span
                class="nav"
                @click="
                    index(4);
                    visible = false;
                "
            >
                <i class="icon info" />
                About</span
            >
            <span
                class="nav"
                @click="
                    index(5);
                    visible = false;
                "
            >
                <i class="icon search" />
                Search</span
            >
            <span
                class="nav"
                @click="
                    goGithub();
                    visible = false;
                "
            >
                <i class="icon github" />
                Github
            </span>
        </div>
    </el-drawer>
</template>

<script>
export default {
    name: 'HeaderRebuildPhone',
    components: {},
    data() {
        return {
            open: false,
            visible: false,
        };
    },
    methods: {
        goGithub() {
            window.open('https://github.com/lnbiuc');
        },
        index(index) {
            if (index === 1) {
                this.$router.push('/home');
            } else if (index === 2) {
                this.$router.push('/timeLine');
            } else if (index === 3) {
                this.$router.push('/filing');
            } else if (index === 4) {
                this.$router.push('/about');
            } else if (index === 5) {
                this.$router.push('/search');
            } else if (index === 6) {
                this.$router.push('/message');
            } else if (index === 7) {
                this.$router.push('/friends');
            }
        },
    },
};
</script>

<style scoped>
.occupancy {
    height: 60px;
}

.head {
    //position: fixed;
    top: 0;
    height: 60px;
    width: 100%;
    display: flex;
    flex-direction: row;
    z-index: 10;
    backdrop-filter: saturate(50%) blur(8px);
    background: rgba(255, 255, 255, 0.7);
    border-bottom: 1px solid #dcdcdc;
}

.logo {
    display: flex;
    width: 200px;
    align-items: center;
    margin-left: 20px;
    font-size: 25px;
    color: #6a67ce;
    font-weight: 500;
    overflow: hidden;
}

.navs {
    flex: 5;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.nav,
.nav::before {
    padding: 10px 10px;
    font-size: 20px;
    display: block;
    width: 100%;
}

.nav:hover {
    transition: all 0.2s;
    color: white;
    background-color: #6a67ce;
}

.links {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: right;
}

.link,
.close,
.link::after,
.close::after {
    font-size: 25px;
    margin: 0 10px;
    color: #6a67ce;
}

@media (prefers-color-scheme: dark) {
    .head {
        background: rgba(0, 0, 0, 0.7);
        box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05);
        border-bottom: 1px solid #30363d;
    }

    .nav {
        color: #dcdcdc;
    }
}
</style>
