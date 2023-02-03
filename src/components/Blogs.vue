<template>
    <div class="main blogCardContainer">
        <BlogCard :blogs=blogs></BlogCard>
    </div>
</template>

<script>
import AnchorLeft from "./AnchorLeft.vue";
import BlogCard from "./BlogCard.vue";

export default {
    name: "Blogs",
    props: ["blogs"],
    components: {
        BlogCard,
        AnchorLeft,
    },
};
</script>

<style scoped>

</style>
