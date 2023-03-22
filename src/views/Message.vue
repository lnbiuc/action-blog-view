<template>
    <div class="mainContent blogCardContainer" v-motion-slide-top>
        <p class="title">Message</p>
        <div class="message">
            <div class="oneMessage" v-for="msg in msgs" :key="msg.id">
                <el-avatar :size="50" :src="msg.avatar" />
                <div class="info">
                    <p style="font-size: 16px; font-weight: 650">{{ msg.nickname }}</p>
                    <p class="content">{{ msg.content }}</p>
                    <p class="time">{{ msg.time }}</p>
                </div>
            </div>
        </div>
        <div class="page">
            <el-pagination
                :currentPage="current"
                :page-size="size"
                :total="total"
                background
                hide-on-single-page
                layout="prev, pager, next"
                @size-change="sizeChange"
                @current-change="currentChange"
            />
        </div>
        <div class="form">
            <el-form ref="baseForm" :model="ruleForm" :rules="rules" label-width="auto" status-icon>
                <el-form-item label="QQ" prop="qq">
                    <el-input v-model="ruleForm.qq" placeholder="请输入QQ号！会根据QQ号自动获取头像和昵称" />
                </el-form-item>
                <el-form-item label="留言" prop="content">
                    <el-input
                        v-model="ruleForm.content"
                        placeholder="留言(支持emoji表情😊)"
                        :rows="5"
                        type="textarea"
                    />
                </el-form-item>
                <el-button style="float: right" type="primary" @click="confirmOperation">Send </el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
import { getMessage, sendMessage } from '../axios';
import { ElMessage } from 'element-plus';
import AnchorLeft from '../components/AnchorLeft.vue';
import { messageStore } from '../stores/counter';

export default {
    name: 'Message',
    components: {
        AnchorLeft,
    },
    data() {
        return {
            total: 0,
            size: 10,
            current: 1,
            msgs: {},
            rules: {
                qq: [{ required: true, message: '不可为空', trigger: 'change' }],
                content: [
                    {
                        required: true,
                        type: 'string',
                        message: '不可为空',
                        trigger: 'change',
                    },
                ],
            },
            ruleForm: {
                qq: '',
                content: '',
            },
        };
    },
    methods: {
        sizeChange(size) {
            this.page(this.current, size);
        },
        currentChange(current) {
            this.page(current, this.size);
        },
        page(current, size) {
            const store = messageStore();

            if (store.current !== current || store.size !== size) {
                this.current = current;
                this.size = size;
                this.reGetMessage();
                return;
            }

            if (store.msgs.length > 0) {
                this.msgs = store.msgs;
                this.size = store.size;
                this.current = store.current;
                this.total = store.total;
            } else {
                this.reGetMessage();
            }
        },
        reGetMessage() {
            getMessage(this.current, this.size).then((res) => {
                this.msgs = res.data.data.data;
                this.size = res.data.data.size;
                this.current = res.data.data.current;
                this.total = res.data.data.total;

                const store = messageStore();

                store.msgs = res.data.data.data;
                store.total = res.data.data.total;
                store.size = res.data.data.size;
                store.current = res.data.data.current;
            });
        },
        confirmOperation() {
            this.$refs.baseForm.validate((valid) => {
                if (valid) {
                    sendMessage(this.ruleForm.qq, this.ruleForm.content).then((res) => {
                        if (res.data.code === 519) {
                            ElMessage.error('QQ号或评论内容格式格式不正确');
                            this.ruleForm.qq = '';
                            this.ruleForm.content = '';
                        } else if (res.data.code === 520) {
                            ElMessage.error('QQ号不存在，请输入正确的QQ号');
                            this.ruleForm.qq = '';
                            this.ruleForm.content = '';
                        } else if (res.data.code === 200) {
                            ElMessage.success('发送成功');
                            this.reGetMessage();
                            this.ruleForm.qq = '';
                            this.ruleForm.content = '';
                        }
                    });
                }
            });
        },
    },
    created() {
        const store = messageStore();
        if (store.current !== -1) {
            this.current = store.current;
            this.size = store.size;
            this.tatal = store.total;
            this.page(this.current, this.size);
        } else {
            this.page(1, 10);
        }
    },
};
</script>

<style scoped>
.mainContent,
.mainContent::before,
.mainContent::after {
    width: 100%;
    padding: 25px 25px;
    border-radius: 7px;
    position: relative;
    background-color: #fff;
    min-height: 100vh;
    border: 1px solid #d0d7de;
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
}

.message {
    min-height: 80vh;
}

.form {
    margin-top: 20px;
}

.oneMessage,
.oneMessage::before,
.oneMessage::after {
    display: flex;
    flex-direction: row;
    margin: 20px auto;
    padding: 15px 15px;
    border-radius: 7px;
    border: 1px solid #d0d7de;
    transition: all 0.3s ease;
}

.oneMessage:hover {
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05), 0 4px 5px rgba(0, 0, 0, 8%), 0 2px 4px -1px rgba(0, 0, 0, 12%);
    transition: all 0.3s ease;
    background-color: rgba(0, 0, 0, 0.04);
}

.avatar {
    flex: 1;
    background-size: cover;
    max-width: 200px;
    margin: 0 10px;
}

.info {
    flex: 5;
    flex-direction: column;
    margin-left: 15px;
}

.time {
    font-size: 90%;
    color: #606263;
    float: right;
}

.content {
    margin-top: 10px;
}

.page {
    margin: 0 auto;
}
@media screen and (max-width: 1000px) {
    .mainContent {
        width: 94%;
        margin: 3vw auto;
        padding: 10px 10px;
    }
    .oneMessage {
        margin: 10px auto;
    }

    .msgContent {
        display: flex;
        flex-direction: column;
    }

    .time {
        display: flex;
        flex-direction: row;
        justify-content: end;
    }
}

@media (prefers-color-scheme: dark) {
    .mainContent {
        background-color: #0d1117 !important;
        color: #c9d1d9 !important;
        border: 1px solid #30363d;
    }

    .oneMessage {
        background-color: #0e1013;
        border: 1px solid #30363d;
    }

    .oneMessage:hover {
        background-color: #191a1c !important;
    }
}
</style>
