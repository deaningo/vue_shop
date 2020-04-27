<template>
    <div>
       <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row>
                <el-col :span="1">
                    <el-button type="primary">添加角色</el-button>
                </el-col>
            </el-row>
            <el-table stripe border :data="rolesList">
                <el-table-column type="expand">
                    <template slot-scope = "scope">
                        
                        <el-row v-for="(item1,i1) in  scope.row.children" :key="item1.id" :class="['bdbottom',i1 === 0 ? 'bdtop' :'','rights_center']">
                            <!-- 一级权限 -->
                            <el-col :span="5"><el-tag closable @close="removeById(scope.row,item1.id);">{{item1.authName}}</el-tag><i class="el-icon-caret-right"></i></el-col>
                            <!-- 二级权限 -->
                            <el-col :span="19" >
                                <el-row v-for="(item2,i2) in item1.children" :key="item2.id" :class="[i2 === 0 ? '':'bdtop','rights_center']">
                                    <el-col :span="6"><el-tag type="success" closable @close="removeById(scope.row,item2.id);">{{item2.authName}}</el-tag><i class="el-icon-caret-right"></i></el-col>
                                    <el-col :span="18" >
                                        <el-tag type="warning" v-for="(item3,i3) in item2.children" :key="item3.id" closable @close="removeById(scope.row,item3.id);">{{item3.authName}}</el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <!-- <pre>
                            {{scope.row}}
                        </pre> -->
                    </template>
                </el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="roleName" label="角色名称"></el-table-column>
                <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete">删除</el-button>
                        <el-button type="warning" icon="el-icon-setting" @click="showSetRightDiolog(scope.row);">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>


        <!-- 分配权限diolog -->
        <el-dialog
            title="分配权限"
            :visible.sync="rightsDialogVisible"
            width="50%"
            @close = "setDefKey();"
        >
            <!-- 树形控件 -->
            <el-tree :data="rightsList" :props="rightsProps" ref="roleTree" node-key="id" :default-expand-all = "true" :default-checked-keys="defKeys" show-checkbox></el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button @click="rightsDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="aletRole();">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            rolesList:[],
            rightsDialogVisible:false,
            rightsList:[],
            rightsProps: {
                children: 'children',
                label: 'authName'
            },
            //默认选中的key值
            defKeys:[105,116],
            //需要分配权限的id
            roleId:''
        }
    },
    created(){
        this.getRolesList();
    },
    methods:{
        async getRolesList(){
            const {data:res} = await this.$http.get('roles');
            if(res.meta.status !== 200){
                this.$message.error("获取角色信息失败");
            }
            this.rolesList = res.data
            //console.log(this.rolesList);
        },
        //根据id删除权限
        removeById(role,rightId){
            //点击删除弹出是否确认删除
            this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const { data:res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
                if(res.meta.status !== 200){
                    return this.$message.error("删除权限失败");
                }
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                role.children = res.data;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //展示分配权限
        async showSetRightDiolog(role){
            this.roleId = role.id;
            const { data:res } = await this.$http.get('rights/tree');
            if(res.meta.status !== 200){
                return this.$message.error("获取权限列表失败");
            }
            this.rightsList = res.data;
            //console.log(this.rightsList);
            //递归获取三级权限id
            this.getRolesById(role,this.defKeys)
            this.rightsDialogVisible = true;
        },
        //获取三级权限id保存到数组defKeys
        getRolesById(node,arr){
            if(!node.children){
                return  arr.push(node.id);
            }
            node.children.forEach(item => {
                this.getRolesById(item,arr);
            });
        },
        //监听分配权限关闭事件
        setDefKey(){
            this.defKeys=[];
        },
        //为角色分配权限
        async aletRole(){
            const keys = [
                ...this.$refs.roleTree.getCheckedKeys(),
                ...this.$refs.roleTree.getHalfCheckedKeys()
            ]
            //console.log(keys);
            const idstr = keys.join(',');
            //console.log(this.roleId);
            const {data:res} = await this.$http.post(`roles/${this.roleId}/rights`,{rids:idstr});
            if(res.meta.status !== 200){
                return this.$message.error("分配权限失败");
            }
            this.$message.success("分配权限成功");
            this.getRolesList();
            this.rightsDialogVisible = false;
        }
    }
}
</script>


<style lang="less" scoped>
.el-tag{
    margin:7px;
}
.bdbottom{
    border-bottom: 1px solid #eee;
}
.bdtop{
    border-top: 1px solid #eee;
}
.rights_center{
    display: flex;
    align-items: center;
}
</style>