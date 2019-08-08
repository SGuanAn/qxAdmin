<template>
    <div class="dashboard-drawer">
        <el-drawer class="dow" title="数据详情" :visible.sync="drawer"  :destroy-on-close='true' :wrapperClosable='false' direction="rtl" size="30%">
            <div class="drawer_centent">
                <div class="drawer_standard clearfix">
                    <h2>标准制</h2>
                    <ul>
                        <li v-for="(item, index) in standard" :key="index">
                            <el-badge :value=item.total class="item">
                                <el-tag effect="dark"> {{ item.tag }} </el-tag>
                            </el-badge>
                        </li>
                    </ul>
                </div>
                <div class="drawer_standard clearfix">
                    <h2>积分制</h2>
                    <ul>
                        <li v-for="(item, index) in Integral" :key="index">
                            <el-badge :value=item.total class="item">
                                <el-tag effect="dark"> {{ item.tag }} </el-tag>
                            </el-badge>
                        </li>
                    </ul>
                </div>
                <div class="drawer_standard clearfix">
                    <h2>留学生</h2>
                    <ul>
                        <li v-for="(item, index) in Overseas" :key="index">
                            <el-badge :value=item.total class="item">
                                <el-tag effect="dark"> {{ item.tag }} </el-tag>
                            </el-badge>
                        </li>
                    </ul>
                </div>
                <div class="drawer_standard clearfix">
                    <h2>应届生</h2>
                    <ul>
                        <li v-for="(item, index) in Freshmen" :key="index">
                            <el-badge :value=item.total class="item">
                                <el-tag effect="dark"> {{ item.tag }} </el-tag>
                            </el-badge>
                        </li>
                    </ul>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Details } from '@/api/dashboard'

export default {
    data(){
        return{
            drawer: false,
            standard:[],
            Integral:[],
            Overseas:[],
            Freshmen:[],
        }
    },
    created(){
        this.dataDetails();
    },
    computed:{
        ...mapGetters([
            'user'
        ])
    },
    methods:{
        dataDetails() {
            Details({name: this.user.usernames}).then(res => {
                this.standard = res.standard
                this.Integral = res.Integral
                this.Overseas = res.Overseas
                this.Freshmen = res.Freshmen
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.dow{
    /deep/ .el-drawer__body{
        overflow: auto;
    }
}
.drawer_centent{
    padding-left: 20px;
}
.drawer_standard{
    display: block;
    ul li{
        margin: 20px 16px;
        list-style: none;
        float: left;
    }
}
.clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
        content: "";
        display: block;
        height: 0;
        clear:both;
        visibility: hidden;
    }
    .clearfix{
        *zoom: 1;/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
    }
</style>

