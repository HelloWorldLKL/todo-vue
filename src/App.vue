<template>
  <div id="app">
    <h1 class="title">todos</h1>
    <mu-row gutter class="btn-row">
      <mu-col width="0" tablet="0" desktop="15">&nbsp;</mu-col>
      <mu-col width="100" tablet="100" desktop="70">
        <transition name="fade" mode="out-in">
          <router-link to="/logIn" v-if="!uID">
            <mu-flat-button label="Log in" icon="account_box" primary/>
          </router-link>
          <router-link to="/logIn" v-if="uID">
            <mu-flat-button v-if="uID" @click="logOut" label="Log off" icon="exit_to_app" primary/>
          </router-link>
        </transition>
      </mu-col>
      <mu-col width="0" tablet="0" desktop="15">&nbsp;</mu-col>
    </mu-row>
    <mu-row gutter>
      <mu-col width="0" tablet="0" desktop="15">&nbsp;</mu-col>
      <mu-col width="100" tablet="100" desktop="70">
        <mu-paper :zDepth="2">
          <transition name="fade" mode="out-in">
            <router-view style="width:100%" @log-in-success="updateUser" :uID="uID"></router-view>
          </transition>
        </mu-paper>
      </mu-col>
      <mu-col width="0" tablet="0" desktop="15">&nbsp;</mu-col>
    </mu-row>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      uID: undefined,
      infoArr: undefined
    }
  },
  methods: {
    updateUser() {
      this.uID = this.$cookie.get('uID')
    },
    logOut() {
      this.$cookie.delete('uID')
      this.uID = undefined
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import 'assets/stylus/index'
#app
  margin-bottom 20px
  text-align center
  font-weight thin
  .title
    width 100%
    font-size 100px
    font-weight 100
    text-align center
    margin 10px 0 20px 0
    text-rendering optimizeLegibility
  .btn-row
    margin-top -120px
    margin-bottom 40px
    font-size 15px
    text-align right
.fade-enter-active
  transition all .5s ease-in-out
.fade-leave-active
  transition all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0)
.fade-enter, .fade-leave-active
  transform translateY(10px)
  opacity 0
</style>
