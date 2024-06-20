<template>
    <section id="three">
        <div class="background">
            <a-breadcrumb>
                <a-breadcrumb-item href="" style="margin-left: 10px;">
                    <home-outlined />
                </a-breadcrumb-item>
                <a-breadcrumb-item href="">
                    <user-outlined />
                    <span>用户中心</span>
                </a-breadcrumb-item>
                <a-breadcrumb-item>
                    <span style="color: gray">智能问答</span>
                </a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div id="con">
            <div class="frame">
                <div class="box">
                    <span class="flow"></span>
                    <span class="flow"></span>
                    <span class="flow"></span>
                    <span class="flow"></span>
                    <div style="width: 100%;height: 30px;border-bottom: 1.5px solid rgb(176, 217, 255);border-radius: 20px;margin-top: -12px;text-align: center;">
                        <h4>铁路智能问答系统</h4>
                        <div style="border-top: 1.5px solid rgb(176, 217, 255); margin-top: -22px; width: 150px" />
                        <div style="border-top: 1.5px solid rgb(176, 217, 255); margin-top: -1.8px; width: 150px; margin-left: 305px"/>
                    </div>
                    <div class="content">
                        <div id="text_area">
                        </div>
                        <a-radio-group v-model:value="value1" button-style="solid" id="radio">
                            <a-radio-button value="a" style="font-size: 12px;font-weight: normal;height: 28px;line-height: 28px;">事故</a-radio-button>
                            <a-radio-button value="b" style="font-size: 12px;font-weight: normal;height: 28px;line-height: 28px;">隐患</a-radio-button>
                        </a-radio-group>
                        <div v-if="!loading">
                            <a-textarea
                                id="inputText"
                                v-model:value="input1"
                                placeholder="请输入您的问题"
                                :auto-size="{ minRows: 1, maxRows: 2 }"
                            />
                            <div id="enter_div">
                                <a id="enter" @click="query" href="javascript:void(0);"><EnterOutlined/></a>
                            </div>
                        </div>
                        <div v-if="loading">
                            <a-textarea
                                id="inputText"
                                v-model:value="input1"
                                placeholder="正在加载回答..."
                                :auto-size="{ minRows: 1, maxRows: 2 }"
                                disabled="true"
                                loading
                            />
                            <div id="loading_div">
                                <a-spin :indicator="indicator" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';
export default {
  name: 'Three',
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async query() {
        if(this.input1 == ""){
            return;
        }
        let text = document.getElementById("text_area");
        let container = document.createElement("div");
        container.style.display = 'flex';
        container.style.flexDirection = 'row';
        container.style.justifyContent = 'flex-end';
        let pop = document.createElement("div");
        pop.className = 'pop';
        pop.style.textAlign = 'left';
        pop.innerText = this.input1;    
        let traingle = document.createElement("div");
        traingle.className = 'triangle-bottom';
        pop.style.width = "auto";
        pop.style.height = "auto";
        pop.style.padding = "5px";
        pop.style.border = "2px solid grey";
        pop.style.borderRadius = "4px";
        pop.style.boxShadow = "2px 2px 2px grey";
        pop.style.backgroundColor = "white";
        pop.style.whiteSpace = "normal";
        let height;
        this.$nextTick(() => {
            // 获取元素的实际宽度和高度
            height = pop.offsetHeight;
            traingle.style.marginTop = height/2 - 10 + 'px';
        });
        traingle.style.width = "0";
        traingle.style.height = "0";
        traingle.style.borderLeft= "10px solid grey";
        traingle.style.borderTop = "10px dashed transparent";
        traingle.style.borderBottom = "10px dashed transparent";
        traingle.style.left = '0px';
        
        container.append(pop);
        container.append(traingle);
        text.append(container);
        const question = this.input1;
        this.input1 = "";

        let answer = document.createElement("div");
        answer.style.textAlign = 'left'; 
        answer.style.width = "410px";
        answer.style.height = "auto";
        answer.style.padding = "5px";
        answer.style.margin = "10px";
        answer.style.backgroundColor = "white";
        answer.style.wordWrap = "break-word";
        answer.style.whiteSpace = "normal";
        answer.innerText = "正在加载, 请稍等...";
        text.append(answer);

        var url;
        if(this.value1 == 'a'){
            url = 'http://localhost:9000/api/neo4j/accident';
            console.log('事故');
        }
        else {
            url = 'http://localhost:9000/api/neo4j/danger';
            console.log('隐患');
        }
        this.loading = true;
        try{
            const token = localStorage.getItem('token');
            const params = {
                question: question,
            }
            // const params = {
            //     question: '有哪些铁路事故原因',
            // }
            const response = await axios.get(url, {
                params,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            answer.innerText = response.data.answer;
        } catch(error) {
            answer.innerText = "抱歉, 这个问题你问你爹GPT吧";
        }
        this.loading = false;
        return;
    },
  },
  setup() {
    const value1 = ref('a');
    const input1 = ref('');
    const indicator = h(LoadingOutlined, {
        style: {
            fontSize: '24px',
        },
        spin: true,
    });
    return {
        value1,
        input1,
        indicator,
    }
  }
}
</script>

<style scope>
    #con{
        margin-top: -10px;
        width: 910px;
        height: 600px;
        background-color: aliceblue;
    }

    #inputText {
        margin-top: 360px;
    }

    #radio {
        position: absolute;
        transform: translate(103px, 333px);
    }

    #enter {
        font-size: 18px;
    }

    #enter_div {
        position: absolute;
        width: 24px;
        height: 24px;
        background-color:rgb(201, 230, 255);
        transform: translate(398px, -27.5px);
        border-radius: 3px;
        transition: all 0.5s;
    }

    #enter_div:hover{
        background-color: rgb(208, 233, 255);
        border-radius: 12px;
    }

    #loading_div {
        position: absolute;
        width: 24px;
        height: 24px;
        transform: translate(398px, -27.5px);
    }

    #text_area{
        top: 5px;
        left: 10px;
        position: absolute;
        width: 445px;
        height: 345px;
        overflow-y: scroll;
        /* background-color: #50dfdb; */
    }

    *{
        margin:0;
        padding:0;
    }

    .frame{  
        padding-top: 20px;
        padding-bottom: 20px;
        margin-left: 115px;
        transform: translateY(-60px);
        position: absolute;
    }

    .content h2{ font-size:19px;}

    .box{
        transform: translate(20%, 10%);
        width: 500px;
        height: 500px;
        box-sizing: border-box;
        overflow: hidden;
        box-shadow: 0 20px 50px rgb(23, 32, 90);
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
        top:40px;
        left:15px;
        right:15px;
        bottom:15px;
        border:1px solid #f0a591;
        padding:20px;
        text-align:center;
        box-shadow: 0 5px 10px rgba(9,0,0,0.5);
    }

    .box .flow{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: block;
        box-sizing: border-box;
    }

    .box .flow:nth-child(1)
    {
        transform:rotate(0deg);
    }

    .box .flow:nth-child(2)
    {
        transform:rotate(90deg);
    }

    .box .flow:nth-child(3)
    {
        transform:rotate(180deg);
    }

    .box .flow:nth-child(4)
    {
        transform:rotate(270deg);
    }

    .box .flow:before
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