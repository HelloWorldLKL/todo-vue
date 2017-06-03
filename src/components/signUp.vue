<template>
  <div class="sign-up">
    <h1 class="title">sign up</h1>
    <div class="text-area">
      <mu-text-field v-model.trim="uName" label="user name" labelFloat fullWidth :errorText="uNameERR" @input="checkName" @blur="checkName"/>
      <mu-text-field v-model.trim="uPwd1" label="password" type="password" labelFloat fullWidth :errorText="uPwd1ERR"  @input="checkPwd1" @blur="checkPwd1"/>
      <mu-text-field v-model.trim="uPwd2" label="verify password" type="password" labelFloat fullWidth :errorText="uPwd2ERR"  @input="checkPwd2" @blur="checkPwd2"/>
    </div>
    <router-link to="/logIn"><mu-raised-button label="sign up" class="sign-up-btn" primary/></router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uName: '',
      uPwd1: '',
      uPwd2: '',
      uNameERR: '',
      uPwd1ERR: '',
      uPwd2ERR: ''
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
    checkPwd1() {
      if (this.uPwd1 === '') {
        this.uPwd1ERR = `It can't be empty`
      } else {
        this.uPwd1ERR = undefined
      }
    },
    checkPwd2() {
      if (this.uPwd2 === '') {
        this.uPwd2ERR = `It can't be empty`
      } else if (this.uPwd1 !== this.uPwd2) {
        this.uPwd2ERR = `The password you entered must be the same as the former.`
        // console.log(`upwd1:  ${this.uPwd1}   upwd2:  ${this.uPwd2}`)
      } else {
        this.uPwd2ERR = undefined
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.sign-up
  padding 0 10px 10px 10px
  .title
    text-align center
    font-size 40px
    line-height 60px
  .text-area
    margin-top -30px
</style>
