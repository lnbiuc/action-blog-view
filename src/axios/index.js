import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// axios.defaults.baseURL = 'http://localhost:8888/api';
// axios.defaults.baseURL = 'https://beyondhorizon.top/api/';
axios.defaults.baseURL = 'https://blog.vio.vin/api/';

NProgress.configure({
    showSpinner: false,
    minimum: 0.2,
    easeing: 'swing',
    speed: 500,
    trickleRate: 0.2,
});

//前置拦截
axios.interceptors.request.use((config) => {
    NProgress.start();
    return config;
});

//后置拦截
axios.interceptors.response.use((response) => {
    NProgress.done();
    return response;
});

export async function getBlogList(pageNumber, pageSize) {
    return axios({
        url: './articles/title?pageNumber=' + pageNumber + '&pageSize=' + pageSize,
        method: 'GET',
    });
}

export async function getCountInfo() {
    return axios({
        url: './count',
        method: 'GET',
    });
}

export async function getArticleByArticleId(articleId) {
    return axios({
        url: './articles/views/' + articleId,
        method: 'GET',
    });
}

export async function getTimeLineData() {
    return axios({
        url: './articles/time',
        method: 'GET',
    });
}

export async function getFilingInfo() {
    return axios({
        url: './filing/filing',
        method: 'GET',
    });
}

export async function searchTitle(title) {
    return axios({
        url: './search/title',
        method: 'GET',
        params: {
            title: title,
        },
    });
}

export async function searchTagName(tagName) {
    return axios({
        url: './search/tagName',
        method: 'GET',
        params: {
            tagName: tagName,
        },
    });
}

export async function searchFilingName(filingName) {
    return axios({
        url: './search/filingName',
        method: 'GET',
        params: {
            filingName: filingName,
        },
    });
}

export async function searchFilingId(filingId) {
    let formData = new FormData();
    formData.append('filingId', filingId);
    return axios({
        url: './search/filingId',
        method: 'GET',
        params: {
            filingId: filingId,
        },
    });
}

export async function searchTagId(tagId) {
    return axios({
        url: './search/tagId',
        method: 'GET',
        params: {
            tagId: tagId,
        },
    });
}

export async function getTag() {
    return axios({
        url: './tag/all',
        method: 'GET',
    });
}

export async function getMessage(current, size) {
    return axios({
        url: './message/get',
        method: 'GET',
        params: {
            pageNumber: current,
            pageSize: size,
        },
    });
}

export async function sendMessage(qq, msg) {
    let formData = new FormData();
    formData.append('qqNumber', qq);
    formData.append('content', msg);
    return axios({
        url: './message/send',
        method: 'POST',
        data: formData,
    });
}

export async function getAnnoInfo() {
    return axios({
        url: './anno/get',
        method: 'GET',
    });
}

export async function getRandomBlog(size) {
    return axios({
        url: './articles/random',
        method: 'GET',
        params: {
            size: size,
        },
    });
}

export async function getCustomConfig() {
    return axios({
        url: './me/get',
        method: 'GET',
    });
}

export async function getFriendLink() {
    return axios({
        url: './friends/get',
        method: 'GET',
    });
}
