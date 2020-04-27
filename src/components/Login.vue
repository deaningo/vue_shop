<template>
  <div class="loginContainer">
    <div class="loginBox">
      <!-- 头像区域 -->
      <div class="logoBox">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 表单区域 -->
      <el-form ref="loginFormRef" :rules="loginFormRules" :model="form" class="loginForm">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="form.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      // 登录表单数据绑定对象
      form: {
        username: "admin",
        password: "123456"
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  watch: {},
  methods: {
    resetForm: function() {
      // console.log(this)
      this.$refs.loginFormRef.resetFields();
    },
    login: function() {
      this.$refs.loginFormRef.validate(async valid => {
        //valid的验证结果
        if (!valid) {
          this.$message.error("登录失败");
          return;
        }
        //es6解构语法 数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值
        //示例   let { foo: baz } = { foo: 'aaa', bar: 'bbb' };  baz // "aaa"
        //解构前   const result={data:"date",status:200}  解构后 const {data:result}={data:"date",status:200}

        const { data: result } = await this.$http.post("login", this.form); //await简化请求,直接获取响应数据
        if (result.meta.status == 200) this.$message({
          message: '登录成功',
          type: 'success',
          duration:500
        });
        //保存token和跳转页面
        window.sessionStorage.setItem("token",result.data.token)
        this.$router.push('/home')

      });
    }
  },
  mounted() {}
};
</script>
<style lang="less"  scoped>
.loginContainer {
  background-color: #2b4b6b;
  height: 100%;
}
.loginBox {
  width: 450px;
  height: 300px;
  background-color: azure;
  border-radius: 3px;
  /* 绝对定位是相对父元素的 */
  position: absolute;
  /* left 和 top便宜都是相对父元素  即偏移父元素宽度的1/2,所以需要补偿 */
  left: 50%;
  top: 50%;
  /* 该元素宽度的一半
    margin-left: -225px; 
    margin-top: -150px;  */
  /* 元素往左位移自身宽度50%的距离  元素往上位移自身高度的50% */
  transform: translate(-50%, -50%);
  .logoBox {
    width: 130px;
    height: 130px;
    padding: 10px;
    position: absolute;
    left: 50%;
    border-radius: 50%;
    transform: translate(-40%, -50%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: white;
    }
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.loginForm {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>