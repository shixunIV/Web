<template>
<section id="header">
    <header>
        <span class="image avatar"><img src="../../public/static/images/avatar.jpg" alt="" /></span>
        <h1 id="logo"><a href="#">您好</a></h1>
        <p>I got reprogrammed by a rogue AI<br />
        and now I'm totally cray</p>
    </header>
    <nav id="nav">
        <ul class="routes">
        <router-link to="/one" @click="checkActive"><li><a class="active">首页</a></li></router-link>
        <router-link to="/two" @click="checkActive"><li><a>铁路事故数据列表</a></li></router-link>
        <router-link to="/three" @click="checkActive"><li><a>铁路事故智能问答</a></li></router-link>
        </ul>
    </nav>
    <footer>
        <ul class="icons">
        <li><a href="#" class="icon brands fa-twitter"><span class="label">Twitter</span></a></li>
        <li><a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>
        <li><a href="#" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>
        <li><a href="#" class="icon brands fa-github"><span class="label">Github</span></a></li>
        <li><a href="#" class="icon solid fa-envelope"><span class="label">Email</span></a></li>
        </ul>
    </footer>
</section>

<div id="wrapper">
    <!-- 声明路由占位标签 -->
    <router-view id="main_content"></router-view>

    <section id="footer">
      <div class="container">
          <ul class="copyright">
            <li>&copy; Untitled. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
          </ul>
      </div>
    </section>
</div>

</template>

<script>

  export default {
    name: 'Main',
    components:{
    },

    methods:{
      checkActive(){
        const routes = document.querySelector('.routes');
        const links = routes.children;
        setTimeout(() => {
          for(let i = 0; i < links.length; i++){
            if(links[i].className === 'router-link-active router-link-exact-active'){
              links[i].children[0].children[0].className = 'active';
            }
            else{
              links[i].children[0].children[0].className = null;
            }
          }
        }, 0);
        
      },
    }
  }
</script>

<style scoped>
  #wrapper{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  #main_content{
    margin-left: -41.5px;
    width: 910px;
    height: 20%;
    background-color: rgb(224, 240, 255);
  }

</style>

