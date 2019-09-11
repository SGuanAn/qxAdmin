<template>
  <div>
    <el-button size="mini" type="warning" icon="el-icon-setting" :disabled="this.data.id ==1 ? true:false" @click="to" >权限</el-button>

    <!-- 弹出层 -->
    <el-dialog title="权限分配" :visible.sync="powerBox" width="600px" align="left" >
        <div id="opt" class="disp">
            <el-radio-group v-model="opt" size="mini">
            <el-radio-button label="菜单权限"/>
            <el-radio-button label="按钮权限"/>
            </el-radio-group>
        </div>
    <div class="disp">
        <!-- 菜单权限 -->
        <el-card v-show="opt === '菜单权限'" class="box-card" shadow="never">
          <div slot="header" class="clearfix disp">
            <el-tooltip class="item disp" effect="dark" content="选择指定角色分配菜单" placement="top">
              <span class="role-span">菜单权限</span>
            </el-tooltip>
          </div>
          <el-tree
            ref="menu"
            :data="menus"
            :default-checked-keys="menuIds"
            :props="defaultProps"
            accordion
            show-checkbox
            node-key="id"/>
        </el-card>

        <!-- 按钮权限 -->
        <el-card v-show="opt === '按钮权限'" class="box-card" shadow="never">
          <div slot="header" class="clearfix disp">
            <el-tooltip class="item disp" effect="dark" content="选择指定角色分配权限" placement="top">
              <span class="role-span">按钮权限</span>
            </el-tooltip>
          </div>
          <el-tree
            ref="permission"
            :data="permissions"
            :default-checked-keys="permissionIds"
            :props="defaultProps"
            show-checkbox
            accordion
            node-key="id"/>
        </el-card>
    </div>
    <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="powerBox = false">取 消</el-button>
        <el-button size="mini" type="primary" icon="el-icon-check" @click="savePermission">保 存</el-button>
    </div>
    </el-dialog>
  </div>
</template>
<script>
import { getPermissionTree } from '@/api/permission'
import { getMenuTree } from '@/api/menu'
import { getRolePower, editPermission } from '@/api/permission'
import { constants } from 'crypto';

export default {
    data(){
        return {
          defaultProps: {
            children: 'children',
            label: 'label'
          },
          powerBox: false,
          opt: '菜单权限',
          menus:[],
          powerId:'',
          menuIds: [],
          permissionIds:[],
          permissions:[]
        }
    },
  props: {
    data: {
      type: Object,
      required: true
    },
  },
  created(){
    this.getPermissions();
    this.getMenus();
  },
  methods: {
    savePermission(){
      const role = { role_id: this.data.id, permissions: [], menus:[] }
      this.$refs.menu.getCheckedKeys().forEach((data, index) => {
        const menus = { menu_id: data }
        role.menus.push(menus)
      });
      this.$refs.permission.getCheckedKeys().forEach((data, index) => {
        const permission = { permission_id: data }
        role.permissions.push(permission)
      });
      if(role.permissions[0] == null && role.menus[0] == null){
        this.$notify({
          title: '请分配权限！',
          type: 'warning',
          duration: 2500
        })
      }else{
        editPermission(role).then(res => {
          this.$notify({
            title: '保存成功',
            type: 'success',
            duration: 2500
          })
          this.powerBox = false
        })
      }
    },
    getPermissions() {
      getPermissionTree().then(res => {
        this.permissions = res.data
      })
    },
    getMenus() {
      getMenuTree().then(res => {
        this.menus = res.data
      })
    },
    to() {
      getRolePower().then(res => {
        var menuId = res.menuId
        var permissionId = res.permissionId
        var menuIdArr = []
        var permissionIdArr = []
       for(var i=0;i<menuId.length;i++){
         if(menuId[i].role_id == this.data.id){
           var a = menuId[i].menu_id
           menuIdArr = a.split(',')
           this.menuIds = menuIdArr
         }
       }
       for(var i=0;i<permissionId.length;i++){
         if(permissionId[i].role_id == this.data.id){
           var p = permissionId[i].permission_id
           permissionIdArr = p.split(',')
           this.permissionIds = permissionIdArr
         }
       }
      })
      this.powerBox = true
    }
  }
}
</script>

<style scoped>
  div{
    /* display: inline-block; */
    margin-right: 3px;
  }
  .disp,.is-never-shadow,.el-tree{
   
    margin-top: 10px;
  }
</style>