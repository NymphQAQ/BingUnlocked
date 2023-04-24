<script setup lang='ts'>
import { ref, reactive } from 'vue'


</script>

<template>
    <!-- 这是html代码喵 -->
    <div class="container">
        <div class="title">标题</div>
        <div class="content">
            <!-- 这里放对话内容喵 -->
        </div>
        <div class="input">
            <!-- 这里放输入框喵 -->
        </div>
    </div>
</template>

<style scoped lang="scss">
:global(body) {
    // color: red;
    margin: 0;
    padding: 0;
}

// 这是scss代码喵

// 把容器指定为flex布局，并设置垂直方向的主轴和不换行的方式喵
.container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    height: 100vh;

    //给标题设置高度和颜色喵
    .title {
        height: 50px;
        background-color: pink;
    }

    // 给内容设置高度和颜色，并让它占据剩余的空间喵
    .content {
        flex-grow: 1;
        background-color: lightblue;
    }

    // 给输入框设置高度和颜色喵
    .input {
        height: 50px;
        background-color: lightgreen;
    }
}
</style>