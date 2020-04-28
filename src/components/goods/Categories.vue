<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row>
                <el-col :span="1">
                    <el-button type="primary">添加分类</el-button>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>



<script>
export default {
    
}
</script>

<style lang="less" scoped>

</style>