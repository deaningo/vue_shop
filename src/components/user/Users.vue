<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-input placeholder="请输入内容" v-model="paramsinfo.query" class="input-with-select" clearable @clear="getUserList();">
                            <el-button slot="append" icon="el-icon-search" @click="getUserList();"></el-button>
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <el-button type="primary" @click="dialogIsVisible = true">添加用户</el-button>  
                    </div>
                </el-col>
            </el-row>

        </el-card>
        <el-table  :data="userList" style="width: 100%" border stripe>
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="username" label="姓名">
            </el-table-column>
            <el-table-column prop="mobile" label="电话">
            </el-table-column>
             <el-table-column prop="email" label="邮箱">
            </el-table-column>
            <el-table-column prop="role_name" label="角色">
            </el-table-column>
                <el-table-column prop="mg_state" label="状态">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.mg_state" @change="userChangeState(scope.row);" ></el-switch>
                　　</template>
            </el-table-column>
            <el-table-column prop="role_name" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle @click="showEditDiolog(scope.row.id);"></el-button>
                    <el-button type="warning" icon="el-icon-star-off" circle @click="showRoles(scope.row);"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle @click="removeUserById(scope.row.id);"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paramsinfo.pagenum"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="paramsinfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>




        <!-- 添加用户对话框 -->
        <el-dialog
            title="添加用户"
            :visible.sync="dialogIsVisible"
            width="50%"
        >
            <!-- <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogIsVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogIsVisible = false">确 定</el-button>
            </span> -->

            <el-form :model="addUserForm" :rules="addUserFormRuls" ref="addUserFormRef" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="addUserForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addUserForm.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addUserForm.email"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile">
                    <el-input v-model="addUserForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetForm(addUserForm);">重 置</el-button>
                <el-button type="primary" @click="submitForm(addUserForm)">提 交</el-button>
            </span>
        </el-dialog>
        <!-- 修改用户对话框 -->
        <el-dialog
            title="修改用户"
            :visible.sync="EditDialogIsVisible"
            width="50%"
        >
            <el-form ref="updateUserFormRef" :model="editFormData" :rules="editFormRuls" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="editFormData.username" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editFormData.email"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile">
                    <el-input v-model="editFormData.mobile"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetEditForm();">重 置</el-button>
                <el-button type="primary" @click="submitEditForm()">提 交</el-button>
            </span>
        </el-dialog>
        <!-- 分配角色对话框 -->
        <el-dialog
        title="分配角色"
        :visible.sync="roleDialogVisible"
        width="50%"
        @close = "resetRoles();"
        >
            <div class="role_left">
                <p>当前的用户：{{this.userinfo.username}}</p>
                <p>当前的角色：{{this.userinfo.role_name}}</p>
                <p>
                    分配新角色
                    <el-select v-model="selectedRoleList" placeholder="请选择">
                        <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id">
                        </el-option>
                    </el-select>
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="roleDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveRoleInfo();">确 定</el-button>
            </span>
            
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        var checkmobile = (rule,value,callback) =>{
            const mobilereg = /^1[3-9][0-9]{9}$/
            if(mobilereg.test(value)){
                return callback()
            }
             callback(new Error('手机号码格式错误'))
        }
         var checkemail = (rule,value,callback) =>{
            const emailreg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/
            if(emailreg.test(value)){
                return callback()
            }
             callback(new Error('邮箱格式错误'))
        }
        return{
            paramsinfo:{
                query:'',
                pagenum:1,
                //当前页面显示的条数
                pagesize:5
            },
            userList:[],
            total:0,
            dialogIsVisible: false,
            addUserForm:{
                username:'',
                password:'',
                mobile:'',
                email:''
            },
            addUserFormRuls:{
                username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ],
                mobile: [
                        { required: true, message: '请输入电话号码', trigger: 'blur' },
                        { validator: checkmobile,trigger: 'blur'}
                ],
                email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { validator: checkemail,trigger: 'blur'}
                ]
            },
            //控制修改对话框的显示与隐藏
            EditDialogIsVisible:false,
            editFormData:{},
            editFormRuls:{
                mobile: [
                        { required: true, message: '请输入电话号码', trigger: 'blur' },
                        { validator: checkmobile,trigger: 'blur'}
                ],
                email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { validator: checkemail,trigger: 'blur'}
                ]
            },
            roleDialogVisible:false,
            //需要分配的角色信息
            userinfo:{},
            //获取的角色列表
            roleList:{},
            //已选中的角色id
            selectedRoleList:''
        }
    },
    created(){
        this.getUserList()
    },
    methods:{
        async getUserList(){
            const {data:user_list}  = await this.$http.get('users',{params:this.paramsinfo})
            if(user_list.meta.status !== 200){return this.$message.error("获取数据失败")}
            this.userList = user_list.data.users;
            this.total = user_list.data.total
        },
        async userChangeState(userinfo){
            //console.log(userinfo);
            const {data:res} = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`);
            if(res.meta.status !== 200){
                userinfo.mg_state = !userinfo.mg_state
                return this.$message.error('更新用户状态失败')
            }
            this.$message.success('更新用户状态成功')
        },
        //监听pageSize改变
        handleSizeChange(newSieze){
            this.paramsinfo.pagesize = newSieze;
            this.getUserList();
        },
        //监听页码改变
        handleCurrentChange(newPage){
            this.paramsinfo.pagenum = newPage;
            this.getUserList();
        },
        resetForm(){
            this.$refs.addUserFormRef.resetFields();
        },
        submitForm(){
            this.$refs.addUserFormRef.validate(async (valid) =>{
                if(valid){
                    //this.$message.success("提交信息成功");
                   const {data:res} = await this.$http.post('users',this.addUserForm);
                   if(res.meta.status !== 201){
                       this.$message.error("添加用户失败");
                   }
                   this.$message.success("添加用户成功");
                   this.dialogIsVisible = false;
                   //重新获取用户数据
                   this.getUserList();
                }
            });
        },
        async showEditDiolog(id){
            //console.log(id);
            const {data:res} = await this.$http.get('users/'+id)
            if(res.meta.status !==200) {
                return this.$message.error("查询失败");
            }
            this.editFormData = res.data;
            this.EditDialogIsVisible = true;
        },
        resetEditForm(){
            this.$refs.updateUserFormRef.resetFields();
        },
        submitEditForm(id){
            this.$refs.updateUserFormRef.validate(async (valid) =>{
                if(valid){
                    //this.$message.success("提交信息成功");
                   const {data:res} = await this.$http.put('users/'+this.editFormData.id,{
                       email:this.editFormData.email,
                       mobile:this.editFormData.mobile
                    });
                   if(res.meta.status !== 200){
                       this.$message.error("修改用户信息失败");
                   }
                   
                   this.EditDialogIsVisible = false;
                   //重新获取用户数据
                   this.getUserList();
                   this.$message.success("修改用户信息成功");
                }
            });
        },
        removeUserById(id){
            //询问是否删除
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const {data:res} = await this.$http.delete('users/'+id);
                if(res.meta.status !== 200){
                    this.$message({
                        type: 'error',
                        message: '删除失败!'
                    });             
                }
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                }); 
                this.getUserList();
               
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //分配角色
        async showRoles(userinfo){
            
            this.userinfo = userinfo;
            const {data:res} = await this.$http.get('roles');
            if(res.meta.status !== 200){
                return this.$message.error("获取角色失败");
            }
            this.roleList = res.data;
            //console.log(this.roleList);
            this.roleDialogVisible = true;
        },
        async saveRoleInfo(){
            if(!this.selectedRoleList){
                return this.$message.error("请选择一个角色");
            }
            const {data:res} = await this.$http.put(`users/${this.userinfo.id}/role`,{rid:this.selectedRoleList});
            if(res.meta.status !== 200 ){
                return this.$message.error("更新角色失败");
            }
            this.$message.success("更新角色成功");
            this.getUserList();
            this.roleDialogVisible = false;
        },
        resetRoles(){
            this.selectedRoleList = '';
            this.userinfo = {};
        }
    }
}
</script>



<style lang="less" scoped>
.el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
.role_left{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
}
</style>