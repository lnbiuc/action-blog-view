import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// axios.defaults.baseURL = 'http://localhost:8888/api';
axios.defaults.baseURL = 'https://beyondhorizon.top/api/';

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

export function getBlogList(pageNumber, pageSize) {
    return axios({
        url: './articles/title?pageNumber=' + pageNumber + '&pageSize=' + pageSize,
        method: 'GET',
    });
}

export function getCountInfo() {
    return axios({
        url: './count',
        method: 'GET',
    });
}

export function getArticleByArticleId(articleId) {
    return axios({
        url: './articles/views/' + articleId,
        method: 'GET',
    });
}

export function getTimeLineData() {
    return axios({
        url: './articles/time',
        method: 'GET',
    });
}

export function getFilingInfo() {
    return axios({
        url: './filing/filing',
        method: 'GET',
    });
}

export function searchTitle(title) {
    return axios({
        url: './search/title',
        method: 'GET',
        params: {
            title: title,
        },
    });
}

export function searchTagName(tagName) {
    return axios({
        url: './search/tagName',
        method: 'GET',
        params: {
            tagName: tagName,
        },
    });
}

export function searchFilingName(filingName) {
    return axios({
        url: './search/filingName',
        method: 'GET',
        params: {
            filingName: filingName,
        },
    });
}

export function searchFilingId(filingId) {
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

export function searchTagId(tagId) {
    return axios({
        url: './search/tagId',
        method: 'GET',
        params: {
            tagId: tagId,
        },
    });
}

export function getTag() {
    return axios({
        url: './tag/all',
        method: 'GET',
    });
}

export function getMessage(current, size) {
    return axios({
        url: './message/get',
        method: 'GET',
        params: {
            pageNumber: current,
            pageSize: size,
        },
    });
}

export function sendMessage(qq, msg) {
    let formData = new FormData();
    formData.append('qqNumber', qq);
    formData.append('content', msg);
    return axios({
        url: './message/send',
        method: 'POST',
        data: formData,
    });
}

export function getAnnoInfo() {
    return axios({
        url: './anno/get',
        method: 'GET',
    });
}

export function getRandomBlog(size) {
    return axios({
        url: './articles/random',
        method: 'GET',
        params: {
            size: size,
        },
    });
}

export function getCustomConfig() {
    return axios({
        url: './me/get',
        method: 'GET',
    });
}

export function getFriendLink() {
    return axios({
        url: './friends/get',
        method: 'GET',
    });
}
