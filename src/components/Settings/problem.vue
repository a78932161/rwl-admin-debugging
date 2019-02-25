<template>
  <div>
    <div class="pm-top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><span @click="goIndex2">平台设置</span></el-breadcrumb-item>
        <el-breadcrumb-item>更多编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="pm-top1">
      <el-radio-group v-model="radio" style="font-size: 20px">
        <el-radio :label="1">常见问题</el-radio>
        <el-radio :label="2">关于小让</el-radio>
        <el-radio :label="3">加盟小让</el-radio>
        <el-radio :label="4">用户协议</el-radio>
        <el-radio :label="5">加入小让</el-radio>
      </el-radio-group>

    </div>
    <div id="editorElem"></div>

    <div class="ititle1">
      <el-button v-if="isok" type="primary" @click="tijiao">提交</el-button>
      <el-button v-if="isok1" type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script>
  import E from 'wangeditor'
  import {getproblem, addproblem, upproblem} from "@/components/api/settings";

  export default {
    name: 'editor',
    data() {
      return {
        editorContent: '',
        input: '',
        radio: 1,
        isok: true,
        isok1: false,
        tjIndex: '',
        id: '',
        qaq: null,
      }
    },
    methods: {
      goIndex2() {
        this.$emit('goIndex2', true);
      },
      getList(index) {
        let a = {
          type: index,
        };
        this.tjIndex = index;
        getproblem(a).then((res) => {
          if (res.data.data) {
            this.id = res.data.data.id;
            this.qaq = res.data.data.content;
            if (this.qaq != null) {
              let editor = new E('#editorElem');
              editor.customConfig.onchange = (html) => {
                this.editorContent = html
              };
              editor.create();
              editor.txt.html(this.qaq);
            }

          } else {
            let editor = new E('#editorElem');
            editor.customConfig.onchange = (html) => {
              this.editorContent = html
            };
            editor.create();
            editor.txt.clear();
          }
        })
      },
      tijiao() {
        if (this.editorContent) {
          let a = {
            type: this.tjIndex,
            content: this.editorContent,
          };
          addproblem(a).then((res) => {
            this.$message({
              message: "添加成功!",
              type: 'success'
            });
          })
        } else {
          this.$message({
            message: "请填写完整!",
            type: 'warning'
          });
        }

      },
      save() {
        if (this.editorContent) {
          let a = {
            content: this.editorContent,
            platformtextid: this.id,
          };
          upproblem(a).then((res) => {
            this.$message({
              message: "修改成功!",
              type: 'success'
            });
          })
        } else {
          this.$message({
            message: "请填写完整!",
            type: 'warning'
          });
        }
      },
    },
    mounted() {
      this.getList(1);

    },

    watch: {
      radio(a) {
        switch (a) {
          case 1:
            this.getList(1);
            break;
          case 2:
            this.getList(2);
            break;
          case 3:
            this.getList(3);
            break;
          case 4:
            this.getList(4);
            break;
          case 5:
            this.getList(5);
            break;
        }
      }
    }
  }
</script>

<style scoped>
  .pm-top {
    margin-bottom: 3%;
  }

  .el-breadcrumb {
    font-size: 18px;
  }

  #editorElem {
    margin-bottom: 3%;
  }

  .pm-top1 {
    margin-bottom: 3%;
    text-align: center;
  }

  .ititle1 {
    text-align: center;
  }

  .ititle1 button {
    width: 100px;
    font-size: 16px;
  }

</style>
