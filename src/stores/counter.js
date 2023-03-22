import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
    state: () => ({
        type: 'old-type',
        searchParams: 'old-params',
        searchName: 'old-name',
    }),
});

export const sliderStore = defineStore('slider', {
    state: () => ({
        count: {},
        anno: [],
        tags: [],
        blogs: [],
    }),
});

export const homeBlogsStore = defineStore('blogs', {
    state: () => ({
        blogs: [],
        total: -1,
        size: -1,
        current: -1,
    }),
});

export const timeLineStore = defineStore('time', {
    state: () => ({
        times: [],
    }),
});

export const filingStore = defineStore('filing', {
    state: () => ({
        filings: [],
    }),
});

export const messageStore = defineStore('message', {
    state: () => ({
        total: -1,
        size: -1,
        current: -1,
        msgs: {},
    }),
});

export const blogContentStore = defineStore('blog', {
    state: () => ({
        blogIdList: [],
    }),
});

export const aboutMeStore = defineStore('about', {
    state: () => ({
        content: 'null',
    }),
});

export const friendsStore = defineStore('friend', {
    state: () => ({
        friends: [],
    }),
});
