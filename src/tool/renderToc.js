export function renderToc(toSelector, contentSelector) {
    // 生成目录插件初始化
    tocbot.init({
        // Where to render the table of contents.
        tocSelector: '.js-toc', // 生成的目录放在哪儿 , 这里用css选中
        // Where to grab the headings to build the table of contents.
        contentSelector: '.contnent', // 生成目录的源在那儿 , 就是给谁生成目录
        // Which headings to grab inside of the contentSelector element.
        headingSelector: 'h1, h2, h3', // 能给生成的几级标题
        // For headings inside relative or absolute positioned containers within content.
        hasInnerContainers: true,
        // Smooth scrolling enabled.
        scrollSmooth: true,
        // Smooth scroll duration.
        scrollSmoothDuration: 420,
        // 到顶部导航条的距离
        scrollSmoothOffset: -70,
        // Headings offset between the headings and the top of the document (this is meant for minor adjustments).
        // Can also be used to account for scroll height discrepancies from the use of css scroll-padding-top
        headingsOffset: 70,
    });
}
