<template>
    <section id="two">
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
                    <div v-if="activeKey == '1'">
                        <span style="color: gray">铁路事故</span>
                    </div>
                    <div v-else-if="activeKey == '2'">
                        <span style="color: gray">铁路隐患</span>
                    </div>
                </a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div class="card-container">
            <a-tabs v-model:activeKey="activeKey" type="card" :centered=true :tabBarGutter=300>
            <a-tab-pane key="1" tab="铁路事故">
                <div id="container">
                    <p style="font-size: 15px;color: #333;">铁路事故数据列表</p>
                    <a-button type="primary" id="btn_add" @click="openShowAdd_1">添加</a-button>
                </div>
                <a-table :columns="columns" :data-source="data_1" class="table_1" :pagination="{ position: ['bottomCenter'],pageSize: 5 }" :scroll="{y: 250}">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'reason'">
                            <template v-if="record.reason == ''">
                                <span>
                                    <ExceptionOutlined />
                                    暂无数据
                                </span>
                            </template>
                        </template>
                        <template v-if="column.key === 'action'">
                            <span>
                                <a @click="openShowDel_1(record.key)">删除</a>
                                <a-divider type="vertical" />
                                <a @click="openShowUpdate_1(record.key)">修改</a>
                            </span>
                        </template>
                    </template>
                </a-table>
                <a-modal v-model:open="showAdd_1" title="添加铁路事故数据" @ok="add_1" style="margin-top: -90px;">
                    <p><a-date-picker v-model:value="accident_date" placeholder="请输入事故发生日期" style="width: 200px"/></p>
                    <p><a-input v-model:value="railway" placeholder="请输入事故发生路线" /></p>
                    <p><a-input v-model:value="position" placeholder="请输入事故发生地点" /></p>
                    <p><a-input v-model:value="rail_id" placeholder="请输入事故车次" /></p>
                    <p><a-input v-model:value="accident_type" placeholder="请输入事故类型" /></p>
                    <p><a-input v-model:value="accident_reason" placeholder="请输入事故发生原因" /></p>
                    <p><a-input v-model:value="accident_death" placeholder="请输入事故死亡人数" /></p>
                    <p><a-input v-model:value="accident_injured" placeholder="请输入事故受伤人数" /></p>
                    <a-radio-group v-model:value="value1">
                        <a-radio-button value="列车组">列车组</a-radio-button>
                        <a-radio-button value="乘客">乘客</a-radio-button>
                        <a-radio-button value="环境">环境</a-radio-button>
                        <a-radio-button value="设备">设备</a-radio-button>
                    </a-radio-group>
                </a-modal>
                <a-modal v-model:open="showDel_1" title="确认删除数据" @ok="del_1" />
                <a-modal v-model:open="showUpdate_1" title="修改铁路事故数据" @ok="update_1" style="margin-top: -90px;">
                    <p><a-input v-model:value="update_reason" placeholder="请输入修改后的事故发生原因" /></p>
                    <p><a-input v-model:value="update_death" placeholder="请输入修改后的事故死亡人数" /></p>
                    <p><a-input v-model:value="update_injured" placeholder="请输入修改后的事故受伤人数" /></p>
                </a-modal>
            </a-tab-pane>

            <a-tab-pane key="2" tab="铁路隐患">
                <div id="container">
                    <p style="font-size: 15px;color: #333;">铁路隐患列表</p>
                </div>
                <a-table :columns="columns_2" :data-source="data_2" class="table_1" :pagination="{ position: ['bottomCenter'],pageSize: 5 }" :scroll="{y:250}">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.key === 'intro'">
                            <template v-if="record.intro == ''">
                                <span>
                                    <ExceptionOutlined />
                                    暂无数据
                                </span>
                            </template>
                        </template>
                    </template>
                </a-table>
            </a-tab-pane>
            </a-tabs>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { message } from 'ant-design-vue';
export default {
    name: 'Two',
    data() {
        return{
            showAdd_1: false,
            showDel_1: false,
            showUpdate_1: false,
            delKey_1: '1',
            updateKey_1: '1',
            data_1: [],
            data_2: [],
        }
    },
    setup() {
        const activeKey = ref('1');
        const value1 = ref('列车组');
        const accident_date = ref('');
        const railway = ref('');
        const position = ref('');
        const rail_id = ref('');
        const accident_type = ref('');
        const accident_reason = ref('');
        const accident_death = ref('');
        const accident_injured = ref('');
        const update_reason = ref('');
        const update_death = ref('');
        const update_injured = ref('');
        return {
            value1,
            activeKey,
            accident_date,
            railway,
            position,
            rail_id,
            accident_type,
            accident_reason,
            accident_death,
            accident_injured,
            update_reason,
            update_death,
            update_injured,
            columns: [
                {
                    title: '编号',
                    dataIndex: 'id',
                    key: 'id',
                    width: '8%',
                },
                {
                    title: '事故原因',
                    dataIndex: 'reason',
                    key: 'reason',
                    width: '50%',
                },
                {
                    title: '死亡人数',
                    dataIndex: 'death',
                    key: 'death',
                    width: '15%',
                },
                {
                    title: '受伤人数',
                    key: 'injured',
                    dataIndex: 'injured',
                    width: '15%',
                },
                {
                    title: 'Action',
                    key: 'action',
                    width: '12%',
                },
            ],
            columns_2: [
                {
                    title: '编号',
                    dataIndex: 'id',
                    key: 'id',
                    width: '8%',
                },
                {
                    title: '风险点',
                    dataIndex: 'point',
                    key: 'point',
                    width: '20%',
                },
                {
                    title: '危险源',
                    dataIndex: 'content',
                    key: 'content',
                    width: '20%',
                },
                {
                    title: '隐患描述',
                    key: 'intro',
                    dataIndex: 'intro',
                    width: '40%',
                },
                {
                    title: '隐患地点',
                    key: 'place',
                    dataIndex: 'place',
                    width: '12%',
                },
            ],
        };
    },
    methods: {
        async fetchData_1() {
            var url = 'http://localhost:9000/api/neo4j/accident/list?page=1&page_size=40';
            try{
                const token = localStorage.getItem('token');
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = response.data.answer;
                for(let i = 0; i < data.length; i++){
                    const d = {
                        id: i+1,
                        key: data[i][0].index,
                        reason: data[i][0].detail_reasion,
                        death: data[i][0].death_toll,
                        injured: data[i][0].injured_toll,
                    };
                    this.data_1[i] = d;
                }
            } catch(error) {
                console.error('Error fetching data:', error);
            }
        },

        async fetchData_2() {
            var url = 'http://localhost:9000/api/neo4j/danger/list?page=1&page_size=10';
            try{
                const token = localStorage.getItem('token');
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = response.data.answer;
                for(let i = 0; i < data.length; i++){
                    const d = {
                        id: i+1,
                        key: data[i][0].id,
                        point: data[i][0].troubleshooting_item_point,
                        content: data[i][0].troubleshooting_content,
                        intro: data[i][0].troubleshooting_description,
                        place: data[i][0].place,
                    };
                    this.data_2[i] = d;
                }
            } catch(error) {
                console.error('Error fetching data:', error);
            }
        },

        openShowAdd_1() {
            this.showAdd_1 = true;
        },

        openShowDel_1(key) {
            this.delKey_1 = key;
            this.showDel_1 = true;
        },

        openShowUpdate_1(key) {
            console.log(key)
            this.updateKey_1 = key;
            this.showUpdate_1 = true;
        },

        async add_1() {
            if(this.accident_date == '' || this.railway == '' || this.position == '' || this.rail_id == '' || this.accident_type == '' || this.accident_reason == '' || this.accident_death == '' || this.accident_injured == ''){
                message.error('添加的数据不能为空', 2);
                return;
            }
            let date = new Date(this.accident_date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // 月份是从0开始的，所以要加1
            const day = date.getDate();
            date = `${year}年${month}月${day}日`;
            const data = {
                "日期": date,
                "路线": this.railway,
                "地点": this.position,
                "车次": this.rail_id,
                "事故类型": this.accident_type,
                "原因": this.accident_reason,
                "死亡人数": this.accident_death,
                "受伤人数": this.accident_injured,
                "列车组/乘客/环境/设备": this.value1,
            };
            var url = 'http://localhost:9000/api/neo4j/accident';
            try{
                const token = localStorage.getItem('token');
                const response = await axios.post(url, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                if(response.data.answer == '插入成功'){
                    message.success('插入成功', 2);
                }
                else{
                    message.error('插入失败', 2);
                }
            } catch(error) {
                message.error('插入失败', 2);
                console.error('Error fetching data:', error);
            }
            this.showAdd_1 = false;
            this.fetchData_1();
        },

        async del_1() {
            let url = 'http://localhost:9000/api/neo4j/accident';
            url = url + '?index=' + this.delKey_1;
            try{
                const token = localStorage.getItem('token');
                const response = await axios.delete(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                if(response.data.answer.length == 0){
                    message.success('删除成功', 2);
                }
                else{
                    message.error('删除失败', 2);
                }
            } catch(error){
                console.error('Error fetching data:', error);
            }
            this.showDel_1 = false;
            this.fetchData_1();
        },

        async update_1() {
            const data = {
                "index": parseInt(this.updateKey_1),
                "death_toll": this.update_death,
                "injured_toll": this.update_injured,
                "detail_reason": this.update_reason,
            };
            const url = 'http://localhost:9000/api/neo4j/accident';
            try{
                const token = localStorage.getItem('token');
                const response = await axios.put(url, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                if(response.data.answer.length == 0){
                    message.success('修改成功', 2);
                }
                else{
                    message.error('修改失败', 2);
                }
            } catch(error) {
                message.error('修改失败', 2);
                console.error('Error fetching data:', error);
            }
            this.showUpdate_1 = false;
            this.fetchData_1();
        },

    },
    created() {

    },
    mounted() {
        this.fetchData_1();
        this.fetchData_2();
    },
}
</script>

<style>
    .table_1 {
        margin-left: 30px;
        margin-top: 10px;
        width: 95%; 
        height: 100%;
    }

    .table_1 .ant-table-tbody > tr > td  {
        background-color: azure; /* 设置表格背景颜色 */
    }

    .table_1 .ant-table-thead > tr > th {
        background-color: #53e1bb; /* 设置表头背景颜色 */
    }

    .table_1 .ant-pagination-item {
        transform: translate(4px);
    }

    .table_1 .ant-table-thead > tr > th {
        font-weight: bold;
        font-size: 14px;
        color: azure;
    }

    .table_1 .ant-table-tbody > tr > td {
        font-size: 12px;
        color: #333;
    }


    .background {
        margin-left: 5px;
        width: 900px;
        height: 50px;
        margin-bottom: 20px;
        margin-top: 10px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        text-align: center;
        border: 2px solid rgb(176, 217, 255);
    }

    #container {
        margin-left: 40px;
        width: 810px;
        height: 40px;
        margin-bottom: 10px;
        border-radius: 10px;
        line-height: 40px;
        text-align: center;
        border: 2px solid rgb(176, 217, 255);
    }

    #btn_add {
        width: 60px;
        height: 30px;
        display: inline-block;
        vertical-align: middle;
        line-height: normal;
        background-color: rgb(176, 217, 255);
        color:  aliceblue;
        transform: translate(355px, -44px);
    }

    .card-container p {
        margin: 0;
    }
    .card-container > .ant-tabs-card .ant-tabs-content {
        height: 120px;
        margin-top: -16px;
    }
    .card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
        padding: 16px;
        background: #fff;
    }
    .card-container > .ant-tabs-card > .ant-tabs-nav::before {
        display: none;
    }
    .card-container > .ant-tabs-card .ant-tabs-tab,
    [data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-tab {
        background: transparent;
        border-color: transparent;
    }
    .card-container > .ant-tabs-card .ant-tabs-tab-active,
    [data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-tab-active {
        background: #fff;
        border-color: #fff;
    }
    #components-tabs-demo-card-top .code-box-demo {
        padding: 24px;
        overflow: hidden;
        background: #f5f5f5;
    }
    [data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-content {
        height: 120px;
        margin-top: -8px;
    }
    [data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-tab {
        background: transparent;
        border-color: transparent;
    }
    [data-theme='dark'] #components-tabs-demo-card-top .code-box-demo {
        background: #000;
    }
    [data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
        background: #141414;
    }
    [data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-tab-active {
        background: #141414;
        border-color: #141414;
    }
</style>
