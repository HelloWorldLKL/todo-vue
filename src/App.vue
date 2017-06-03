<template>
  <div id="app">
    <h1 class="title">todos</h1>
    <mu-row gutter class="btn-row">
      <mu-col width="0" tablet="0" desktop="15">&nbsp;</mu-col>
      <mu-col width="100" tablet="100" desktop="70">
        <router-link to="/logIn">
          <mu-flat-button label="Log in" icon="account_box" primary/>
        </router-link>
      </mu-col>
      <mu-col width="0" tablet="0" desktop="15">&nbsp;</mu-col>
    </mu-row>
    <mu-row gutter>
      <mu-col width="0" tablet="0" desktop="15">&nbsp;</mu-col>
      <mu-col width="100" tablet="100" desktop="70">
        <mu-paper :zDepth="2">
          <transition name="fade" mode="out-in">
            <router-view style="width:100%"></router-view>
          </transition>
        </mu-paper>
      </mu-col>
      <mu-col width="0" tablet="0" desktop="15">&nbsp;</mu-col>
    </mu-row>
  </div>
</template>

<script>
export default {
  name: 'app'
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
  transition all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
.fade-enter, .fade-leave-active
  transform translateY(10px)
  opacity 0
</style>
