<template>
    <div class="login_comtainer">
        <div class="login_box">
            <div class="avater_box">
                <img src="../assets/logo.png">
            </div>
            <el-form ref="login_formref" :model="login_form" :rules="login_rules" label-width="0px" class="login_form">
                <el-form-item prop="username">
                    <el-input v-model="login_form.username" prefix-icon="el-icon-user" ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="login_form.password" prefix-icon="el-icon-lock" type="password"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login();">登陆</el-button>
                    <el-button type="info" @click="resetLoginFormRef();">重置</el-button>
                 </el-form-item>
            </el-form>
        </div>
    </div>
    
</template>
   
<script>
export default{
     data(){
        return{
            login_form:{
                username:'admin',
                password:'123456'
            },
            login_rules:{
                username:[
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入用户密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    methods:{
        resetLoginFormRef(){
            //console.log(this);
            this.$refs.login_formref.resetFields();
        },
        login(){
            //表单验证
            this.$refs.login_formref.validate(async valid => {
                //console.log(valid);
                if(!valid){
                    return;
                }
                const {data:res} = await this.$http.post('login',this.login_form);
                if(res.meta.status !== 200){
                    return this.$message.error('登陆失败');
                }
                this.$message.success('登陆成功');
                //将登陆成功后的token保存到sessionStroge中，网站的其它接口必须登陆之后才能访问，sessionStroge只在当前网站打开期间生效，通过编程式导航跳转到后台首页  /home
                window.sessionStorage.setItem('token',res.data.token);
                this.$router.push('/home');

            });
        }
    }
}
</script>


<style lang="less" scoped>
.login_comtainer{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border: 1px solid #eee;
}
.avater_box{
    width: 130px;
    height: 130px;
    border:1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
}
.avater_box img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;  
}
.btns{
    display: flex;
    justify-content: flex-end;
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
</style>