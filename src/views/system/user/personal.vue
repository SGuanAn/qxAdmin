<template>
    <div class="app-container">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>个人信息</span>
            </div>
            <div>
                <div style="text-align: center">
                <el-upload
                    :show-file-list="false"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :headers="headers"
                    :action="updateAvatarApi"
                    class="avatar-uploader">
                    <img v-if="user.avatar" :src="user.avatar" title="点击上传头像" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"/>
                </el-upload>
                </div>
                <ul class="user-info">
                <li><svg-icon icon-class="user1" /> 用户账户 <div class="user-right">{{ user.username }}</div></li>
                <li><svg-icon icon-class="user2" /> 用户名称 <div class="user-right">{{ user.usernames }}</div></li>
                <li><svg-icon icon-class="phone" /> 手机号码 <div class="user-right">{{ user.phone }}</div></li>
                <li><svg-icon icon-class="email" /> 用户邮箱 <div class="user-right">{{ user.email }}</div></li>
                <li><svg-icon icon-class="date" /> 创建日期 <div class="user-right">{{ parseTime(user.createTime) }}</div></li>
                <li>
                    <svg-icon icon-class="anq" /> 安全设置
                    <div class="user-right">
                    <a @click="$refs.pass.dialog = true">修改密码</a>
                    </div>
                </li>
                </ul>
            </div>
        </el-card>     
        </el-col>
      </el-row>
      <updatePass ref="pass"/>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils/index'
import { getToken } from '@/utils/auth'
import updatePass from './personal/updatePass'
import store from '@/store'
import { constants } from 'crypto';
export default {
  components: { updatePass },
    data(){
        return{
            headers: {
                'Token': getToken()
            }
        }
    },
    created(){
        store.dispatch('user/getInfo').then(() => {})
    },
    methods:{
        parseTime,
        handleSuccess(response, field, fileList) {
          this.$notify({
            title: '上传成功',
            type: 'success',
            duration: 2500
          })
          store.dispatch('user/getInfo').then(() => {})
        },
      handleError(e, file, fileList) {
        const msg = JSON.parse(e.message)
        this.$notify({
          title: msg.message,
          type: 'error',
          duration: 2500
        })
      },
    },
    computed:{
        ...mapGetters([
            'updateAvatarApi',
            'user'
        ])
    }
}
</script>

</script>

<style rel="stylesheet/scss" lang="scss">
  .avatar-uploader-icon {
    font-size: 28px;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
    border-radius: 50%
  }
  .user-info {
    padding-left: 0px;
    list-style: none;
    li{
      border-bottom: 1px solid #F0F3F4;
      border-top: 1px solid #F0F3F4;
      padding: 11px 0px;
      font-size: 13px;
    }
    .user-right {
      float: right;

      a{
        color: #317EF3;
      }
    }
  }
</style>
