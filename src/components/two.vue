<template>
    <section id="two">
        <d-table
            :table-layout="tableLayout ? 'auto' : 'fixed'"
            :striped="striped"
            :header-bg="headerBg"
            :data="table_data"
            :size="size"
            :border-type="borderType"
            :show-header="showHeader"
            id="data_table"
            >
            <d-column field="firstName" header="First Name"></d-column>
            <d-column field="lastName" header="Last Name"></d-column>
            <d-column field="gender" header="Gender"></d-column>
            <d-column field="date" header="Date of birth"></d-column>
        </d-table>


        <d-pagination
            :total="pager.total"
            v-model:pageSize="pager.pageSize"
            total-item-text="Total"
            v-model:pageIndex="pager.pageIndex"
            :can-view-total="true"
            :can-change-page-size="true"
            :lite="true"
            id="pager"
        />
    </section>
</template>

<script>
import { defineComponent, ref, shallowReactive } from 'vue';
export default {
    name: 'Two',
    data() {
        return{
            table_data: ref([
            {
                firstName: 'Mark',
                lastName: 'Otto',
                date: '1990/01/11',
                gender: 'Male',
            },
            {
                firstName: 'Jacob',
                lastName: 'Thornton',
                gender: 'Female',
                date: '1990/01/12',
            },
            {
                firstName: 'Danni',
                lastName: 'Chen',
                gender: 'Male',
                date: '1990/01/13',
            },
            {
                firstName: 'green',
                lastName: 'gerong',
                gender: 'Male',
                date: '1990/01/14',
            },
            ]),
        }
    },
    setup() {
        const tableLayout = ref(false);
        const striped = ref(true);
        const headerBg = ref(true);
        const size = ref('lg');
        const borderType = ref('');
        const showHeader = ref(true);
        const sizeList = [
        {
            label: 'Normal',
            value: 'sm',
        },
        {
            label: 'Middle',
            value: 'md',
        },
        {
            label: 'large',
            value: 'lg',
        },
        ];
        const borderTypeList = [
        {
            label: 'Normal',
            value: '',
        },
        {
            label: 'Bordered',
            value: 'bordered',
        },
        {
            label: 'Borderless',
            value: 'borderless',
        },
        ];
        const stripedTableData = ref([
        {
            firstName: 'Mark',
            lastName: 'Otto',
            date: '1990/01/11',
            gender: 'Male',
        },
        {
            firstName: 'Jacob',
            lastName: 'Thornton',
            gender: 'Female',
            date: '1990/01/12',
        },
        {
            firstName: 'Danni',
            lastName: 'Chen',
            gender: 'Male',
            date: '1990/01/13',
        },
        {
            firstName: 'green',
            lastName: 'gerong',
            gender: 'Male',
            date: '1990/01/14',
        },
        ]);

        const pager = shallowReactive({
            total: 306,
            pageIndex: 5,
            pageSize: 10,
            pageSizeOptions: [10, 20, 30, 40, 50],
        });

        return {
        stripedTableData,
        striped,
        headerBg,
        size,
        sizeList,
        borderType,
        showHeader,
        borderTypeList,
        tableLayout,
        pager,
        };
    },
}
</script>

<style lang="scss">
    #two{
        display: flex;
        flex-direction: column;
        align-items: center;/*垂直交叉轴居中*/
    }

    #data_table{
        left: 20.5%;
        width: 155%;
    }

    #pager{
        width: 43%;
        transform: translateX(50%);
        // background-color: green;
    }
</style>
