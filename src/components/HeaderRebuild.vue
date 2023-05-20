<template>
    <div class="occupancy" v-if="$route.name !== 'home'"></div>
    <div class="head">
        <div class="logo" @click="index(1)">
            <a style="color: #6a67ce"> Violet </a>
        </div>
        <div class="navs">
            <div class="nav-div" @click="index(1)">
                <span class="nav">
                    <i class="icon home" />
                    Index</span
                >
            </div>
            <div class="nav-div" @click="index(2)">
                <span class="nav">
                    <i class="icon archive" />
                    TimeLine</span
                >
            </div>
            <div class="nav-div" @click="index(3)">
                <span class="nav">
                    <i class="icon bookmark" />
                    Category</span
                >
            </div>
            <div class="nav-div" @click="index(6)" v-if="false">
                <span class="nav">
                    <i class="icon comment alternate" />
                    Message</span
                >
            </div>
            <div class="nav-div" @click="index(7)">
                <span class="nav">
                    <i class="icon linkify" />
                    Friends</span
                >
            </div>
            <div class="nav-div" @click="index(4)">
                <span class="nav">
                    <i class="icon info" />
                    About</span
                >
            </div>
        </div>
        <div class="links">
            <div style="display: flex; flex-direction: row; height: 100%; justify-content: center">
                <div class="icons">
                    <span class="link" @click="index(5)">
                        <i class="icon search" />
                    </span>
                </div>
                <div class="icons">
                    <span class="link" @click="goGithub()">
                        <i class="icon github" />
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderRebuild',
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
    position: fixed;
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

.logo,
.logo::after {
    display: flex;
    flex: 2;
    align-items: center;
    font-size: 25px;
    color: #6a67ce;
    font-weight: 500;
    overflow: hidden;
    justify-content: space-around;
    cursor: pointer;
    transition: all 0.2s ease;
}

.logo:hover {
    border-bottom: 3px solid #6a67ce;
    transition: all 0.2s ease;
}

.navs {
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: center;
}

.nav {
    font-size: 16px;
    color: #1e1e1e;
    display: inline-block;
    padding: 0 10px;
    font-weight: 500;
    text-align: center;
    transition: all 0.2s ease;
}

.nav-div,
.nav-div::after,
.nav-div::before {
    cursor: pointer;
    height: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
}

.nav-div:hover {
    border-bottom: 3px solid #6a67ce;
    transition: all 0.2s ease;
}

.nav-div:hover > .nav {
    color: #6a67ce;
    transition: all 0.2s ease;
}

.links {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.link {
    font-size: 25px;
    padding: 0 10px;
    display: flex;
    align-items: center;
}

.icons {
    height: 100%;
    display: flex;
    justify-content: center;
}

.icons:hover {
    border-bottom: 3px solid #6a67ce;
    transition: all 0.2s ease;
    color: #6a67ce;
}

.nav,
.link {
    cursor: pointer;
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

    .t-menu__operations-icon {
        color: #dcdcdc;
    }

    .t-menu__operations-icon:hover {
        background-color: black;
    }

    .logo:hover {
        border-bottom: 3px solid #6a67ce;
        border-top: 3px solid transparent;
    }

    .link > .icon {
        color: #6a67ce;
    }
}
</style>
