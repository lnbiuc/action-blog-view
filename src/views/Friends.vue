<template>
    <div class="mainContent" v-motion-slide-top>
        <p class="title">Friends</p>
        <div class="content">
            <div class="card" @click="goto(f.indexUrl)" v-for="f in friends" :key="f.id">
                <div class="avatar">
                    <el-avatar :size="60" :src="f.avatarUrl" />
                </div>
                <div class="info" style="cursor: pointer">
                    <span class="infoTitle">{{ f.title }}</span>
                    <p>{{ f.description }}</p>
                </div>
            </div>
        </div>
        <div class="add">
            <h3>申请方式</h3>
            <ul>
                <li>在<router-link to="/message">&nbsp;留言板&nbsp;</router-link>留言</li>
                <li>发送邮件到&nbsp;<a href="mailto:violetzzs@proton.me">violetzzs@proton.me</a></li>
            </ul>
            <h3>申请格式</h3>
            <ul>
                <li>昵称：violet</li>
                <li>描述：violet的摸鱼日志。</li>
                <li>站点地址：https://www.beyondhorizon.top/</li>
                <li>头像URL：https://www.beyondhorizon.top/favicon.ico</li>
            </ul>
            <h3>添加条件：</h3>
            <ul>
                <li>网站可以正常访问</li>
                <li>网站在国内无代理情况下可以正常加载</li>
                <li>无不良内容，无垃圾信息，无广告</li>
                <li>强制Https，必须有域名，不接IP访问</li>
            </ul>
            <h3>其他：</h3>
            <ul>
                <li>欢迎添加本站点</li>
                <li>每周会检查已经添加的网站是否能正常访问，不正常会标记为失联状态</li>
                <li>持续失联一个月友链会被移除，网站恢复后可以申请重新添加</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getFriendLink } from '../axios';
import { friendsStore } from '../stores/counter';

export default {
    name: 'Friends',
    data() {
        return {
            friends: [],
        };
    },
    methods: {
        getInfo() {
            const store = friendsStore();
            if (store.friends.length > 0) {
                this.friends = store.friends;
            } else {
                getFriendLink().then((res) => {
                    this.friends = res.data.data;
                    store.friends = res.data.data;
                });
            }
        },
        goto(url) {
            const parm = '\u003cscript\u003elocation.replace("' + url + '")\u003c/script\u003e';
            const str = 'javascript:window.name;';
            window.open(str, parm);
        },
    },
    created() {
        this.getInfo();
    },
};
</script>

<style scoped>
.mainContent,
.mainContent::after,
.mainContent::before {
    width: 100%;
    padding: 25px 25px;
    border-radius: 7px;
    position: relative;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid #dcdcdc;
    margin-bottom: 20px;
    transition: all 0.3s ease;
}

.mainContent:hover {
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 8%), 0 2px 4px -1px rgba(0, 0, 0, 12%);
    transition: all 0.3s ease;
}

.title {
    font-size: 35px;
    text-align: center;
    font-weight: 400;
    margin-bottom: 10px;
}
.mainContent > .content {
    margin: 10px auto;
}
.content {
    display: flex;
    flex-direction: row;
    max-width: 47.1vw;
    flex-wrap: wrap;
    justify-content: center;
}

.card,
.card::after,
.card::before {
    display: flex;
    flex-direction: row;
    width: 250px;
    border: 1px solid #dcdcdc;
    border-radius: 7px;
    margin: 10px 10px;
    padding: 10px 10px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.card:hover {
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 8%), 0 2px 4px -1px rgba(0, 0, 0, 12%);
    transition: all 0.3s ease;
    background-color: rgba(0, 0, 0, 0.04);
}
.avatar,
.avatar::before,
.avatar::after {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
}

.avatar:hover {
    transform: rotate(360deg);
    transition: all 0.3s ease;
}
.info {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
}

.infoTitle {
    font-size: 1.2em;
    color: dodgerblue;
}

.info > p {
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.add {
    text-align: left !important;
}

@media screen and (max-width: 1000px) {
    .mainContent {
        width: 94%;
        margin: 3vw auto;
        padding: 10px 10px;
    }

    .content {
        max-width: 86vw;
    }
}

@media (prefers-color-scheme: dark) {
    .mainContent,
    .card {
        background: rgba(0, 0, 0, 0.7);
        color: #c9d1d9 !important;
        border: 1px solid #30363d;
    }

    .card:hover {
        background-color: #0f0f0f !important;
    }
}
</style>
