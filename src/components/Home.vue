<template>
    <el-container class="home_container">
        <el-aside width="200px">
            <div class="ag-logo">
                <a href="/admin/home" class="router-link-exact-active router-link-active">
                    <img alt="主页" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAACTFBMVEUAAAD+kTT+dwH/eAL/dwL+jCD+iR3/kzT/kTP+kjP+ahf+cwH+ahb+iSn+bAD/cBX+kzT+mjX/fAH+dgD+ji7+lDL+jCn+egH+lzH+egH+ewD+hCn+bAH/dwL/eAL/fgL+eQL+hgL/dQL+kTL/gi3/awL+dgH+bwL+cQH+jDL+dgH+mTT+dgH+cgD+iyr+dgH+eyj+ZgH+lC3+fwH+iCr/ijL/nDf/cgL+izL/cgL/dgL+ljn+nTb/hi/+bgL+kDP+fAL+fgL+cwL+njb+awL+gwL+jC/+iS/+ewL+nDT+gQH+ji3+ggH+fQL+fCn+iiv+ZQH+fSv+eAH+ZQH+hAH+hiz+dyr+jQH+YgH/eAH/kjT/////eQL/jSr/jiz/dAD/kzX/lz7/cwD/7Nv/kjP/lDf/dgD/gxb/YgD/lzf/dwD/fQL/cgD/lTn/kDP/gBL/XwD/lTb/hBn/ZwD/ZgD/snD/iyX/ewL/bwH/ljv/iCD/hh3/fAv/dwL/ZQD/fw7/ZAD/7Nn/tHT/iSP/ewj/fAL//fv/8eX/7t//yJn/kTH/bQD/XAD/WQD/8+n/wo7/wYr/q2L/plv/m0b/kC//kC7/iin/bAD/agD/9u3/5Mr/4cb/1a//0Kf/y5z/xpT/u4D/uX3/r2n/rGj/mTf/dQ7/eAv/+/b/8OD/59L/3sH/1rP/zqP/tXf/p2T/pVf/nEv/+PH/6NT/5c7/3b//2bz/voT/sm7/lDT/59b/2Lb/0qv/y6T/n1T/o1H/kDv/gCD/fBj/ew//VAB6RnE7AAAAWXRSTlMA6mL29BQH9e6+NC0lHRoE3NnSvK58XlxUUBENC/339unk2dDMy8eyo5+Vj3htZGNIRD87Lvv5+fLv7enm5eLf29nYx8XDvraqpJ+Yi4mIh4WDgn51cW5uajKL+ekAAAVcSURBVGje7Zlle9pQFIAzd3d3d3d3d7k3F0gyAgS3tQwYZbCuW2W1re3c3d39j6253UhoaROSyzfeLy3J8/By5B5OHqg8efLkaY3Og/p26dJv9wgqhwztykAI3UKX2VSuWDhRYCCG8fXrTuWCEdPuCm6YwjewE3nH4cUMlMMwzCDCivl9pSgkz8q5BBWdBvIMzEi3XqQc++4yMDMfefeMPkTatp0PtgG/dLBuRc8NEKeqVdyCb8JCfQd8h5uBivBwm44RMLuLzwfV4Ft0SKOiez+oFrcgrJmvqW3dPMwGYUvW7TwICj6YFe67H/dkpZi7ygezhxG6DlWt6LVZwENEi2ZiT1WKPjOgPAzG7C8qMvCqO+DutM4qCt43/fCVRm5fvVGa5NVHs0K5Abo1ezvrTZqm3xgMqiVmdoKSY7DLDOVcLHhEN3LHr1bBs6XWWUqBwHSMxrOiJGFVp2BYPnKSm9yjbUm75hLDMVFyXJ3kxImC05wFdBzStqSrdonZxRqLOBMAYPQc0pFIxTBbTSYg0qF9TiRmyLrCoDFTBCRmY9LfSNJobl4MFhcD6JYwBo/HUFtTXV1TK/7HyItxwYMzpVfC10UNx68eOyO+OnP2SeJCtID/37bQb+HsgICkqKDyEi3j1Q1jUSkDoVgM5MSZ0iu5U199nm7Gqw+NwbhYQxS3LQHJi2d0Br5Y6xhcDCKSM7gWmAclJQ9Sliv3G0x2QEQicbayhjWb2RdVp+gmntqciKzkUiIctSYNhqQ/GrldQmNueQFRyZW600YGNlFqtT6lMT9siKDkc5GfTw10V7isogpfftzAkZNctoZ5+UAHIe81fOObDZGSnGGtvDTQxbZFgXv46LwLWEhJzp1m4IUL4kCHVlNTglD5HXwr2UBKUhs2eiIRD2TDiLMjgCm7j0OpthGSXIkkw1WvX1d6TPIDbvuKg7TZyUjORSNPxL/X4/ICeG/j/iojNLtuhT7QmNogkIi/FC+d4jgykoTpHI25KT/hgRN41tideiTScncrlqAxd+RVjrE4EpNeSWnkLZb8+Y07qSQaktfkOT6mIb01gR58rq/FY3UPGzNTF0RySSWexEG7Xon/Jt3I+fuhYEgQQmkOZ9kn8d4zvefExXoM+PvqeXmxMxh0yh3IW0uLMAE9ErwUcrF3uLqhMiyQQM7gY/HOGyenWYKXwgjg7LYaWqSqwoTSHPaK4/hGwos0SqQNHThDj2iR6jQLslS8xJdL7pcBjRK3i70obug49S9pzO3yAEL/HQ0V32nMcy/SJMFLoTW1FFps/077tdPlMafFbrdzwXLTDRrzJMYBLRJz01KYan5UX3/53zpUaeQCsVjAWXDz3zb58F4AZS/pCs0nmi+FhcF7p1JL0dXr566mXl36aSts6VB+COKlDV2yxO9doTNw6pcNZXAoPs5146UNXWYJBKtaOq7XxwtBJpQeTAcjsW1bgELlhrfpiss+b31Gh8lxhFJgQOYPh0A8fvHGw/+GkutCwGZHIBOOSZQSw9eDzCBLzMsZXiTev39Wc9Fii5sQyMy43pQyu0CrcA02TMAJMitOFjumd6bU0HuAw2EBWkCOjT0ptcxbXahJMnYYlQ0HRxWjk1kJLI7i/VSWDJ/arLKKmZrSm8qe7v2BIlK9xy+gtNG+I1KXs8IlsyjNdJ5uQWoC2T5S3w8CmxBSyBTq34PSy7CxbaYMLRtCkeCAA7USBUJgZx9SPzdNaS1lA3pT5FiwttjSMlPj5lFkOToGpRvAqJkUcUZOTRubhVuHU7mgx6RUB6D+3alcMWw5wqNwTHsqh/SZOb5jx3V7R1J58uTJ0wp/AdCoI7DdlJ5IAAAAAElFTkSuQmCC">
                    <img alt="Boilerplate" src="https://bp.huijiewei.com/statics/build/admin/img/banner-white.eb5de50e.png">
                </a>
            </div>
            <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#2c343f"
            text-color="#fff"
            unique-opened
            router
            active-text-color="rgb(255, 208, 75)">
                <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
                    <template slot="title">
                        <i :class="menuiconobj[item.id]"></i>
                        <span>{{item.authName}}</span>
                    </template>
                
                    <el-menu-item :index="'/'+subitem.path" v-for="subitem in item.children" :key="subitem.id">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>{{subitem.authName}}</span>
                        </template>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>

                <el-dropdown trigger="click" class="user_group">
                    <span class="el-dropdown-link">
                        <i class="el-icon-user"></i>下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-user">个人资料</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-refresh">刷新资料</el-dropdown-item>
                        <el-dropdown-item icon="el-icon-switch-button" @click="loginout();">退出登陆</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
               
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
</template>



<script>
export default {
    created(){
        this.getMenuList()
    },
    data(){
        return{
            menulist:[],
            menuiconobj:{
                '125':'el-icon-user-solid',
                '103':'el-icon-platform-eleme',
                '101':'el-icon-s-goods',
                '102':'el-icon-s-order',
                '145':'el-icon-s-data'
            }
        }
    },
    methods:{
        loginout(){
            window.sessionStorage.clear();
            this.$router.push('login');
        },
        handleOpen(key, keyPath) {
            //console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            //console.log(key, keyPath);
        },
        async getMenuList(){
            const {data:menu} = await this.$http.get('menus');
            if(menu.meta.status !== 200){
                return this.$message.error(this.meta.msg);
            }
            this.menulist = menu.data;
            //console.log(menu);
        }
    }
}
</script>


<style lang="less" scoped>
  .el-header {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #2c343f;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #eaedf1;
    color: #333;
    text-align: center;
  }
  .home_container{
    height: 100%;
  }
  .ag-logo{
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
  .ag-logo img{
    display: inline-block;
    height: 39px;
  }
  .menu{
    background-color:"#545c64";
  };

  .el-dropdown {
    display: inline-block;
    position: relative;
    color: #606266;
    font-size: 14px;
    cursor: pointer;
 }
 .user_group{
    float: right;
    font-size: 14px;
 }
 .el-menu-item{
     margin-left: 20px;
 }
 .el-menu{
     border-right: 0;
 }
</style>