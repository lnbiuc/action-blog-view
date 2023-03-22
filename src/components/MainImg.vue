<template>
    <div class="wobble-horizontal" v-motion-slide-top>
        <div class="printContent">
            {{ obj.output }}
            <span class="easy-typed-cursor">_</span>
        </div>
        <div class="iconDown" @click="scrollToBlog()">
            <span id="s" class="iconSpan hvr-bounce-in" style="text-shadow: 1px 1px 2px #6a67ce">
                <i class="icon chevron down" />
            </span>
        </div>
    </div>
</template>

<script>
import EasyTyper from 'easy-typer-js';

export default {
    name: 'MainImg',
    components: {},
    data() {
        return {
            // img: "https://typora-1308549476.cos.ap-nanjing.myqcloud.com/img/a2551175c0ffbca69be319962e9a48a66d1efae5.jpeg",
            img: 'https://typora-1308549476.cos.ap-nanjing.myqcloud.com/img/a2551175c0ffbca69be319962e9a48a66d1efae5.jpeg',
            obj: {
                output: '',
                isEnd: false,
                speed: 80,
                singleBack: false,
                sleep: 15000,
                type: 'rollback',
                backSpeed: 60,
                sentencePause: false,
            },
            keepDo: false,
            timer: null,
        };
    },
    methods: {
        scrollToBlog() {
            var el = document.getElementById('blogScroll');
            window.scroll({ top: el.offsetTop, behavior: 'smooth' });
        },
        // 初始化
        init() {
            this.fetchData();
        },
        fetchData() {
            // 一言Api进行打字机循环输出效果
            fetch('https://v1.hitokoto.cn')
                .then((res) => {
                    return res.json();
                })
                .then(({ hitokoto }) => {
                    this.initTyped(hitokoto);
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        initTyped(input, fn, hooks) {
            const obj = this.obj;
            const typed = new EasyTyper(obj, input, fn, hooks);
        },
        keep() {
            if (this.keepDo) {
                this.init();
                this.timer = setTimeout(this.keep, 20000);
            } else {
                clearTimeout(timer);
            }
        },
    },
    mounted() {
        this.keepDo = true;
        this.keep();
        clearInterval(this.timer);
    },
    beforeDestroy() {
        this.keepDo = false;
        this.timer = null;
        clearInterval(this.timer);
    },
    destroy() {
        this.keepDo = false;
        this.timer = null;
        clearInterval(this.timer);
    },
    beforeRouteLeave() {
        this.keepDo = false;
        this.timer = null;
        clearInterval(this.timer);
    },
};
</script>

<style scoped>
.cover {
    position: relative;
    z-index: 1;
    width: 100%;
    height: calc(50vh - 60px);
    overflow: hidden;
}

img {
    background-size: cover;
    width: 100%;
    height: calc(100vh - 60px);
    position: relative;
}

.wobble-horizontal {
    background-size: cover !important;
    width: 100%;
    height: calc(100vh - 60px);
    position: relative;
    background: url('https://typora-1308549476.cos.ap-nanjing.myqcloud.com/img/wallhaven-2ygz3x.jpeg') center center
        no-repeat;
    z-index: 1;
    min-height: 300px;
}

.wobble-horizontal:hover {
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 8%), 0 2px 4px -1px rgba(0, 0, 0, 12%);
    transition: all 0.3s ease-in-out;
}

.iconDown {
    position: absolute;
    bottom: 0;
    width: 100%;
    cursor: pointer;
    text-align: center;
    z-index: 3;
}

.iconSpan {
    font-size: 40px;
    color: #6a67ce;
}

.iconSpan {
    animation: myfirst 1.5s infinite;
}

.printContent {
    font-size: 30px;
    position: relative;
    z-index: 2;
    color: #edf2f4;
    margin: 0 auto;
    text-align: center;
    top: 15%;
    text-shadow: 1px 1px 2px #17325b;
    line-height: 2;
    padding: 0 100px;
}

@keyframes myfirst {
    0% {
        transform: translate(0px, 0px);
    }
    50% {
        transform: translate(0px, -10px);
    }
    100% {
        transform: translate(0px, 0px);
    }
}

.container {
    display: flex;
    /*border: 1px solid red;*/
    /*height: 100%;*/
    align-items: center;
}

svg {
    display: block;
    font: 65px 'Montserrat';
    /*width: 960px;*/
    /*height: 300px;*/
    margin: 0 auto;
    font-weight: 200;
}

.text-copy {
    fill: none;
    stroke: white;
    stroke-dasharray: 6% 29%;
    stroke-width: 5px;
    stroke-dashoffset: 0%;
    animation: stroke-offset 5.5s infinite linear;
}

.text-copy:nth-child(1) {
    stroke: #d9dce8;
    animation-delay: -1s;
}

.text-copy:nth-child(2) {
    stroke: #c5cdea;
    animation-delay: -2s;
}

.text-copy:nth-child(3) {
    stroke: #b1bee7;
    animation-delay: -3s;
}

.text-copy:nth-child(4) {
    stroke: #96a9e3;
    animation-delay: -4s;
}

.text-copy:nth-child(5) {
    stroke: #7c94de;
    animation-delay: -5s;
}

@keyframes stroke-offset {
    100% {
        stroke-dashoffset: -35%;
    }
}

@media screen and (max-width: 1000px) {
    .wobble-horizontal {
        height: calc(35vh - 60px);
        min-height: 100px;
    }

    .printContent {
        top: 10vh;
        font-size: 25px;
        padding: 0 20px;
    }

    #s-text {
        font-size: 120px;
    }

    .iconDown {
        position: absolute;
        bottom: -10px;
    }
}
</style>

<style lang="stylus">
.typed-cursor {
    margin-left: 10px;
    opacity: 1;
    -webkit-animation: blink 0.7s infinite;
    -moz-animation: blink 0.7s infinite;
    animation: blink 0.7s infinite;
}

@keyframes blink {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes blink {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes blink {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>
