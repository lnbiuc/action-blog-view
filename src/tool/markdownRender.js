import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js/lib/core';
import emoji from 'markdown-it-emoji';
import ins from 'markdown-it-ins';
import footnote from 'markdown-it-footnote';
import sub from 'markdown-it-sub';
import sup from 'markdown-it-sup';
import list from 'markdown-it-deflist';
import addr from 'markdown-it-abbr';
import mark from 'markdown-it-mark';
import anchor from 'markdown-it-anchor';
import multimd from 'markdown-it-multimd-table';
import uslug from 'uslug';
import smartarrows from 'markdown-it-smartarrows';
import js from 'highlight.js/lib/languages/javascript';
import java from 'highlight.js/lib/languages/java';
import sh from 'highlight.js/lib/languages/shell';
import sql from 'highlight.js/lib/languages/sql';
import nginx from 'highlight.js/lib/languages/nginx';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/vbscript-html';
import ts from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash';
import md from 'highlight.js/lib/languages/markdown';
import go from 'highlight.js/lib/languages/go';
import json from 'highlight.js/lib/languages/json';
import less from 'highlight.js/lib/languages/less';
import lua from 'highlight.js/lib/languages/lua';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import yaml from 'highlight.js/lib/languages/yaml';
import scss from 'highlight.js/lib/languages/scss';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import docker from 'highlight.js/lib/languages/dockerfile';
import config from 'highlight.js/lib/languages/dsconfig';
import properties from 'highlight.js/lib/languages/properties';
import stylus from 'highlight.js/lib/languages/stylus';
import log from 'highlight.js/lib/languages/accesslog';
import rust from 'highlight.js/lib/languages/rust';
import xml from 'highlight.js/lib/languages/xml';
import http from 'highlight.js/lib/languages/http';

hljs.registerLanguage('javascript', js);
hljs.registerLanguage('java', java);
hljs.registerLanguage('sh', sh);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('nginx', nginx);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);
hljs.registerLanguage('typescript', ts);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('markdown', md);
hljs.registerLanguage('go', go);
hljs.registerLanguage('json', json);
hljs.registerLanguage('less', less);
hljs.registerLanguage('lua', lua);
hljs.registerLanguage('php', php);
hljs.registerLanguage('python', python);
hljs.registerLanguage('yaml', yaml);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('c', c);
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('dockerfile', docker);
hljs.registerLanguage('config', config);
hljs.registerLanguage('properties', properties);
hljs.registerLanguage('stylus', stylus);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('http', http);
hljs.registerLanguage('log', log);
hljs.registerLanguage('rust', rust);

export function mdStrToHTML(htmlStr) {
    const md = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
        highlight: function (str, lang) {
            // 当前时间加随机数生成唯一的id标识
            const codeIndex = parseInt(Date.now()) + Math.floor(Math.random() * 10000000);
            // 复制功能主要使用的是 clipboard.js
            let html = `<span class="copy-btn" type="button" data-clipboard-action="copy" data-clipboard-target="#copy${codeIndex}"><i class="clone icon"></i></span>`;
            const linesLength = str.split(/\n/).length - 1;
            // 生成行号
            let linesNum = '<span aria-hidden="true" class="line-numbers-rows">';
            for (let index = 0; index < linesLength; index++) {
                linesNum = linesNum + '<span></span>';
            }
            linesNum += '</span>';
            if (lang && hljs.getLanguage(lang)) {
                try {
                    const preCode = hljs.highlight(str, {
                        language: lang,
                        ignoreIllegals: true,
                    }).value;
                    html = html + preCode;
                    if (linesLength) {
                        html += '<b class="name">' + lang + '</b>';
                    }
                    return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(
                        /<\/textarea>/g,
                        '&lt;/textarea>'
                    )}</textarea>`;
                } catch (error) {
                    console.log(error);
                }
            }

            const preCode = md.utils.escapeHtml(str);
            html = html + preCode;
            return `<pre class="hljs"><code>${html}</code>${linesNum}</pre><textarea style="position: absolute;top: -9999px;left: -9999px;z-index: -9999;" id="copy${codeIndex}">${str.replace(
                /<\/textarea>/g,
                '&lt;/textarea>'
            )}</textarea>`;
        },
    });
    md.use(emoji);
    md.use(ins);
    md.use(footnote);
    md.use(sub);
    md.use(sup);
    md.use(list);
    md.use(addr);
    md.use(mark);
    md.use(multimd, {
        multiline: false,
        rowspan: false,
        headerless: false,
        multibody: true,
        aotolabel: true,
    });
    md.use(smartarrows);

    const uslugify = (s) => uslug(s);

    md.use(anchor, {
        permalink: false,
        permalinkSpace: false,
        slugify: uslugify,
    });
    md.renderer.rules.image = function (tokens, idx, options, env, slf) {
        const token = tokens[idx];
        token.attrs[token.attrIndex('alt')][1] = slf.renderInlineAsText(token.children, options, env);
        token.attrSet('style', 'max-width:100%');
        return slf.renderToken(tokens, idx, options);
    };

    return md.render(htmlStr);
}

``;
