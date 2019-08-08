<template>
    <div class="dashboard-header">
        <el-row type="flex" justify="space-around">
            <el-col :span="5">
                <div class="profile-state pointer">
                    <div class="icon-box">
                        <span class="icon-bg icon-bg-1">
                            <svg-icon icon-class="user_total" />
                        </span>
                        <h2>系统用户</h2>
                    </div>
                    <h3>{{ usersTotal }}</h3>
                    <p>账户总数</p>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="profile-state pointer" @click="$refs.drawers.drawer = true">
                    <div class="icon-box">
                        <span class="icon-bg icon-bg-2">
                            <svg-icon icon-class="My_data" />
                        </span>
                        <h2>我的数据</h2>
                    </div>
                    <h3> {{ MyDataTotal }} </h3>
                    <p>客户总数</p>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="profile-state pointer">
                    <div class="icon-box">
                        <span class="icon-bg icon-bg-3">
                            <svg-icon icon-class="Label" />
                        </span>
                        <h2>办理完结数量</h2>
                    </div>
                    <h3> 当月完成总数：{{ SameMonth }} </h3>
                    <p>上月完成总数：{{ LastMonth }} </p>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="profile-state pointer">
                    <div class="icon-box">
                        <span class="icon-bg icon-bg-4">
                            <svg-icon icon-class="Input" />
                        </span>
                        <h2>新录客户</h2>
                    </div>
                    <h3> {{ NewDataTotal }} </h3>
                    <p>新进客户总数</p>
                </div>
            </el-col>
        </el-row>
        <drawer ref="drawers" />
    </div>
</template>

<script>
import { getAllUsers } from '@/api/user'
import drawer from './drawer'
import { MyData, Label, NewData } from '@/api/dashboard'
import { mapGetters } from 'vuex'
export default {
    components:{ drawer },
    data(){
        return{
            usersTotal:0,
            MyDataTotal:0,
            LabelTotal:0,
            NewDataTotal:0,
            SameMonth:0,
            LastMonth:0
        }
    },
    created(){
        this.getAllU();
        this.MyTotal();
        this.complete();
        this.newRecord();
    },
    methods:{
        getAllU(){
            getAllUsers().then(res => {
                this.usersTotal = res.data.length
            })
        },
        //我的数据
        MyTotal(){
            MyData({name: this.user.usernames}).then(res => {
              this.MyDataTotal  = res.total
            })
        },
        //办理完成总数
        complete(){
            Label().then(res => {
                this.SameMonth  = res.SameMonth;
                this.LastMonth  = res.LastMonth
            })
        },
        //新录客户
        newRecord(){
            NewData().then(res => {
              this.NewDataTotal  = res.total
            })
        },
    },
    computed: {
        ...mapGetters([
            'user'
        ])
    }
}
</script>

<style lang="scss" scoped>
.dashboard-header{
    .pointer{
        cursor:pointer
    }
    .el-row{
        .el-col{
           -webkit-box-shadow: 0 0 5px 0 #ababab;
            -moz-box-shadow: 0 0 5px 0 #ababab;
            box-shadow: 0 0 5px 0 #ababab;
            .profile-state{
                padding: 15px 0 5px 10px;
                color: #121f3e;
                font-family: "CircularStd", sans-serif;
                border-radius: 5px;
                background-color: #ffffff;
                .icon-box {
                    display: flex;
                    margin-bottom: 10px;
                }
                .svg-icon{
                    width: 20px;
                    height: 20px;
                }
                .icon-bg-1 {
                    background: rgba(170,109,243,.1);
                }
                .icon-bg-2 {
                    background: rgba(85,168,253,.1);
                }
                .icon-bg-3 {
                    background: rgba(82,203,195,.1);
                }
                .icon-bg-4 {
                    background: rgba(255,81,138,.1);
                }
                .icon-bg {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 35px;
                    height: 35px;
                    line-height: 35px;
                    border-radius: 50%;
                }
                .icon-box h2 {
                    font-size: 14px;
                    font-weight: normal;
                    text-transform: capitalize;
                    line-height: 0.7;
                    padding-left: 6px;
                }
                h3 {
                    margin: 0;
                    height: 30px;
                    line-height: 30px;
                    font-size: 18px;
                    font-weight: normal;
                }
                p {
                    margin: 0;
                    margin-bottom: 10px;
                    font-size: 12px;
                    font-weight: normal;
                    color: #919bb1;
                }
            }
        }
    }
}
</style>