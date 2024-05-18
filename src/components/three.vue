<template>
    <section id="three">
        <div class="frame">
            <div class="box">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <div class="content">
                    <h2>My animated Border </h2>
                    <p>All our modules are designed to play nicely with responsive of course. At the end of the day it comes down to the theme you use - our code doesn't get in your way.</p>
                </div>
                
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: 'Three',
}
</script>

<style scope>
    *{
        margin:0;
        padding:0;
    }

    .frame{  
        padding-top: 20px;
        padding-bottom: 20px;
    }

    .content h2{ font-size:19px;}

    .box{
        transform: translate(20%, 10%);
        width: 500px;
        height: 500px;
        /* background: #111845a6; */
        /* background: #3ad776a6; */
        box-sizing: border-box;
        overflow: hidden;
        box-shadow: 0 20px 50px rgb(23, 32, 90);
        /* border: 2px solid #2a3cad; */
        border: 2px solid rgb(53, 160, 67);
        color: grey;
        padding: 20px;
    }

    .box:before{
        content: '';
        position:absolute;
        top:0;
        left:-100%;
        width:100%;
        height:100%;
        background: rgba(255,255,255,0.1);
        transition:0.5s;
        pointer-events: none;
    }


    .box .content{
        position:absolute;
        top:15px;
        left:15px;
        right:15px;
        bottom:15px;
        border:1px solid #f0a591;
        padding:20px;
        text-align:center;
        box-shadow: 0 5px 10px rgba(9,0,0,0.5);
    }

    .box span{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: block;
        box-sizing: border-box;
    }

    .box span:nth-child(1)
    {
        transform:rotate(0deg);
    }

    .box span:nth-child(2)
    {
        transform:rotate(90deg);
    }

    .box span:nth-child(3)
    {
        transform:rotate(180deg);
    }

    .box span:nth-child(4)
    {
        transform:rotate(270deg);
    }

    .box span:before
    {
        content: '';
        position: absolute;
        width:100%;
        height: 3px;
        background: #50dfdb;
        animation: animate 4s linear infinite;
    }

    @keyframes animate {
        0% {
            transform:scaleX(0);
            transform-origin: left;
        }

        50%
        {
            transform:scaleX(1);
            transform-origin: left;
        }

        50.1%
        {
            transform:scaleX(1);
            transform-origin: right;
        }
    
        100%
        {
            transform:scaleX(0);
            transform-origin: right;
        }
    }
</style>