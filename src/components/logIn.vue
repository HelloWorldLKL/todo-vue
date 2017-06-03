<template>
  <div class="log-in">
    <h1 class="title">log in</h1>
    <div class="text-area">
      <mu-text-field v-model.trim="uName" label="user name" labelFloat fullWidth :errorText="uNameERR" @input="checkName" @blur="checkName"/>
      <mu-text-field v-model.trim="uPwd" label="password" type="password" labelFloat fullWidth :errorText="uPwdERR"  @input="checkPwd" @blur="checkPwd"/>
    </div>
    <router-link to="/todo"><mu-raised-button label="log in" class="log-in-btn" primary/></router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uName: '',
      uPwd: '',
      uNameERR: '',
      uPwdERR: ''
    }
  },
  methods: {
    checkName() {
      if (this.uName === '') {
        this.uNameERR = `It can't be empty`
      } else {
        this.uNameERR = undefined
      }
    },
    checkPwd() {
      if (this.uPwd === '') {
        this.uPwdERR = `It can't be empty`
      } else {
        this.uPwdERR = undefined
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.log-in
  padding 0 10px 10px 10px
  .title
    text-align center
    font-size 40px
    line-height 60px
  .text-area
    margin-top -30px
</style>
