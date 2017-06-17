<template>
  <div class="log-in">
    <h1 class="title">log in</h1>
    <div class="text-area">
      <mu-text-field v-model.trim="uName" label="user name" labelFloat fullWidth :errorText="uNameERR" @input="checkName" @blur="checkName" />
      <mu-text-field v-model.trim="uPwd" label="password" type="password" labelFloat fullWidth :errorText="uPwdERR" @input="checkPwd" @blur="checkPwd" />
    </div>
    <p class="tips">
      <mu-icon value="info" :size="13" /> You have no account? Click
      <router-link to="/signUp">here</router-link> to sign up.
    </p>
    <mu-raised-button label="log in" class="log-in-btn" primary @click="logIn" :disabled="this.uNameERR !== undefined || this.uPwdERR !== undefined"/>
    <mu-dialog :open="dialog" title="Opps!" @close="closeDialog">
      Your username or password is incorrect!
      <mu-flat-button slot="actions" primary @click="closeDialog" label="OK" />
    </mu-dialog>
  </div>
</template>

<script>
import qs from 'qs'
import router from './../router/index.js'
export default {
  data() {
    return {
      uName: '',
      uPwd: '',
      uNameERR: '',
      uPwdERR: '',
      dialog: false
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
    },
    logIn() {
      this.$http.post('http://localhost:3000/api/checkUser', qs.stringify(this.postObj), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        console.log(response.data)
        if (response.data.code === '200') {
          this.$cookie.set('uID', response.data.data[0].uID, 1)
          this.$emit('log-in-success')
          router.push('todo')
        } else {
          this.dialog = true
        }
      })
    },
    closeDialog() {
      this.dialog = false
    }
  },
  computed: {
    postObj() {
      return {
        uName: this.uName,
        uPassword: this.uPwd
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
  .tips
    margin-bottom 10px
    font-size 13px
    text-align left
    color #757575
</style>
