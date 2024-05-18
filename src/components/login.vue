<template>
    <section id="login">
        <div v-if="showAlert">
            <d-alert type="danger" :dismiss-time="1000">登录失败</d-alert>
        </div>
        <div v-if="showSuccess">
            <d-alert type="success" :dismiss-time="1000">登录成功</d-alert>
        </div>
        <div v-if="registerAlert">
            <d-alert type="danger" :dismiss-time="1000">{{ register_fail_info }}</d-alert>
        </div>
        <div v-if="registerSuccess">
            <d-alert type="success" :dismiss-time="1000">注册成功</d-alert>
        </div>
        <div id="all">
            <h3 style="text-align:center;" id="title">铁路事故系统</h3>
            <div class="box_login" v-ripple="{ duration: 800 }">
                <div class="container">
                    <form method="post" action="#" v-if="formMode === 'login'">
                        <h4>登录</h4>
                        <div class="row gtr-uniform">
                            <div class="col-6-xsmall">
                                <select id="group" value="1">
                                    <option value="1">用户</option>
                                    <option value="2">管理员</option>
                                </select>
                            </div>
                            <div class="col-12-xsmall"><input type="text" name="name" id="name" placeholder="用户名" v-model="username_login"/></div>
                            <div class="col-12-xsmall"><input type="password" name="email" id="password" placeholder="密码" v-model="password_login"/></div>

                            <div class="col-12">
                                <ul class="actions">
                                    <li><input type="button" class="primary" value="登录" id="login_btn" @click="login"></li>
                                </ul>
                            </div>
                        </div>
                    </form>
                    <form method="post" action="#" v-else="formMode === 'register'">
                        <h4 style="color: aliceblue;">注册</h4>
                        <div class="row gtr-uniform">
                            <div class="col-6-xsmall">
                                <select id="gender" value="男">
                                    <option value="男">男</option>
                                    <option value="女">女</option>
                                </select>
                            </div>
                            <div class="col-12-xsmall"><input type="text" name="name" v-model="name_register" placeholder="姓名" /></div>
                            <div class="col-12-xsmall"><input type="text" name="name" v-model="username_register" placeholder="用户名" /></div>
                            <div class="col-12-xsmall"><input type="password" name="email" v-model="password_register" placeholder="密码"/></div>
                            <div class="col-12">
                                <ul class="actions">
                                    <li><input type="button" class="primary" value="注册" id="register_btn" @click="register"/></li>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="box_background" v-ripple="{ color: '#b4b4b4',duration: 800, delay:200 }">
                <d-button id="login" @click="login_move">登录</d-button>
                <d-button @click="register_move" id="register">注册</d-button>
                <img src="../../public/static/images/1.png" id="img_1"/>
                <img src="../../public/static/images/2.png" id="img_2"/>
                <p id="p1"><em>Railway System</em></p>
                <p id="p2"><em>Register</em></p>
            </div>
        </div>
    </section>
</template>


<script>
import axios from 'axios';
export default {
    name: 'Login',
    data() {
        return {
            showAlert: false,
            showSuccess: false,
            registerAlert: false,
            registerSuccess: false,
            formMode: 'login',
            intervalId: null,
            username_login: '',
            password_login: '',
            name_register: '',
            username_register: '',
            password_register: '',
            register_fail_info: '注册失败',
        }
    },
    methods:{
        login(){
            this.showAlert = false;
            this.showSuccess = false;
            var url = 'http://localhost:9000/api/user/login';
            const json_data = {
                "id":this.username_login,
                "password":this.password_login,
            };
            axios.post(url, json_data).then((response)=>{
                this.showSuccess = true;
                if(response){
                    const token = response.data.data[0].token;
                    localStorage.setItem("token",token);
                    this.$router.push("/main");
                }
            })
            .catch(err => {
                this.showAlert = true;
            })
        },

        register(){
            this.registerAlert = false;
            this.registerSuccess = false;
            const gender = document.getElementById('gender');
            const json_data = {
                'id': this.username_register,
                'name': this.name_register,
                'age': null,
                'phone': String(Math.floor(Math.random() * 100000 + 1)),
                'password': this.password_register,
                'gender': gender.value,
            };
            var url = 'http://localhost:9000/api/user/register'
            axios.post(url, json_data).then((response)=>{
                if(response){
                    this.registerSuccess = true;
                    console.log("注册成功");
                }
            })
            .catch(err => {
                if(err.response.data.error == "constraint failed: UNIQUE constraint failed: users.name (2067)"){
                    this.register_fail_info = "姓名已重复";
                }
                if(err.response.data.error == "ID已存在"){
                    this.register_fail_info = "用户名已存在";
                }
                else{
                    this.register_fail_info = "注册失败";
                }
            })
        },

        register_move() {
            const box = document.getElementsByClassName('box_login')[0];
            this.formMode = 'register';
            setTimeout(() => {
                box.style.transform = 'translate(35%, 7%)';
                box.style.backgroundColor = '#989898';
            }, 0);
        },

        login_move() {
            const box = document.getElementsByClassName('box_login')[0];
            this.formMode = 'login';
            setTimeout(() => {
                box.style.transform = 'translate(-35%, 7%)';
                box.style.backgroundColor = 'aquamarine';
            }, 0);
            
        },

        // 泡泡生成器
        genBuble() {
            let all = document.getElementById('all');
            const buble = document.createElement('span');
            var style = document.styleSheets[0];
            style.insertRule('@keyframes myMove { 0% { transform: translateY(0%); opacity: 1;} 50% { transform: translate(10%, -1000%);} 75% {transform: translate(-20%, -1200%);} 99% {opacity: .9;} 100% {transform: translateY(-1800%) scale(1.5); opacity: 0;} }', style.cssRules.length);
            buble.className = 'buble';
            let r = Math.random() * 35 + 15; // 25-30,泡泡半径
            buble.style.position = 'absolute';
            buble.style.width = r + 'px';
            buble.style.height = r + 'px';
            buble.style.background = 'radial-gradient(circle at 72% 28%, #a2d2e4 5px, skyblue 8%,#b3ffd4, #aad7f9 100%)';
            buble.style.boxShadow = 'inset 0 0 6px #fff, inset 3px 0 6px #eaf5fc, inset 2px -2px 10px #efcde6, inset 0 0 60px #f9f6de, 0 0 20px #fff'; 
            buble.style.borderRadius = '50%';
            buble.style.left = Math.random()*innerWidth + 'px';
            buble.style.bottom = 0;
            buble.style.animation = 'myMove 4s linear infinite';
            all.append(buble);
            setTimeout(()=>{
                buble.remove();
            }, 3000);
        }
    },
    mounted: function(){
        this.intervalId = setInterval(() => {
            this.genBuble();
        }, 800);
    },
    beforeRouteLeave(to,from,next){
        clearInterval(this.intervalId);
        next();
    }
}
</script>

<style scoped>
    #title {
        margin-top: 40px;
    }

    #all {
        position: relative;
        width: 100vw;
        height: 100vh;
        overflow-x: hidden;
    }

    .box_background {
        position: absolute;
        width: 600px;
        height: 300px;
        background-color: antiquewhite;
        border-radius: 5px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-42%);
        z-index: 0;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5); /* 添加阴影效果 */
    }

    .box_background #register{
        position: absolute;
        background-color: #989898;
        color: #ffffff;
        border-radius: 5px;
        width: 80px;
        height: 44px;
        left: 71%;
        bottom: 13%;
    }

    .box_background #register:hover{
        border-color: #ffffff;
    }

    .box_background #login{
        position: absolute;
        background-color: rgb(22, 222, 155);
        color: #ffffff;
        border-radius: 5px;
        width: 80px;
        height: 44px;
        right: 72%;
        bottom: 13%;
    }

    .box_background #login:hover{
        border-color: #ffffff;
    }

    .box_login {
        position: relative;
        margin: 0 auto;
        width: 280px;
        height: 400px;
        border-radius: 20px;
        background-color: aquamarine;
        z-index: 10;
        transform: translate(-35%,7%);
        transition: 1s;
    }

    #register_btn {
        background-color: grey;
    }

    .container {
        width: 200px;
        height: 400px;
        padding-top: 15px;
        margin: 0 auto;
    }

    .container h4{
        font-size: 23px;
        color: #b3b3b3f6;
        text-align: center;
        padding-bottom: 20px;
    }

    #img_1 {
        position: absolute;
        right: 12%;
        top: 25%;
        width: 120px;
        height: 120px;
    }

    #img_2 {
        position: absolute;
        left: 12%;
        top: 25%;
        width: 120px;
        height: 120px;
    }

    #p1 {
        position: absolute;
        font-family: NSimSun;
        right: 11%;
        top: 12%;
        font-size: 20px;
        color: grey;
    }

    #p2 {
        position: absolute;
        font-family: NSimSun;
        left: 15%;
        top: 12%;
        font-size: 20px;
        color:rgb(22, 222, 155);
    }

    /* 泡泡动画 */
    /* @keyframes myMove {
        0% {
            transform: translateY(0%);
            opacity: 1;
        }

        50% {
            transform: translate(10%, -50%)
        }
    } */

    testColor{
        background-color: #b4b4b4;
    }
</style>