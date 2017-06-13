<template>
  <div class="todo">
    <mu-toast v-if="toast" message="Ah... It's empty" @close="hideToast" />
    <mu-list>
      <mu-list-item>
        <mu-text-field label="New Todo" labelFloat fullWidth v-model.trim="newTodo" @keyup.enter.native="addNewTodo" />
      </mu-list-item>
    </mu-list>
    <mu-divider/>
    <mu-list class="todo-list">
      <mu-sub-header>Todos</mu-sub-header>
      <transition-group name="item" tag="ul">
        <mu-list-item v-for="(item, index) in infoArr" :key="index" disableRipple @click="handleToggle(item)" :title="item.iInfo" class="todo-item" :class="{'todo-item-complete':item.iComplete}">
          <mu-checkbox v-model="item.iComplete" slot="left" />
          <mu-icon-button icon="delete" slot="right" @click.stop="deleteTodo(index, item.iID)" />
        </mu-list-item>
      </transition-group>
      <transition name="slide" mode="in-out">
        <div class="nothing" v-if="infoArr.length === 0">
          <mu-icon value="sentiment_very_satisfied" :size="36" />
          <span style="font-weight: 100">Nothing Here Now~</span>
        </div>
      </transition>
    </mu-list>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  props: {
    uID: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      infoArr: [],
      newTodo: '',
      toast: false,
      postObj: {}
    }
  },
  methods: {
    handleToggle(item) {
      item.iComplete = !item.iComplete
      console.log(item.iComplete)
      this.postObj.iID = item.iID
      if (item.iComplete) {
        this.postObj.iComplete = 1
      } else {
        this.postObj.iComplete = 0
      }
      this.$http.post('http://localhost:3000/api/todoComplete', qs.stringify(this.postObj), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        console.log(this.postObj)
      })
    },
    showToast() {
      this.toast = true
      if (this.toastTimer) clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
    },
    hideToast() {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    },
    addNewTodo() {
      if (this.newTodo === '') {
        this.showToast()
        return
      }
      let obj = {}
      obj.iInfo = this.newTodo
      obj.iComplete = 0
      this.$http.post('http://localhost:3000/api/addInfo', qs.stringify(this.addNewTodoPostObj), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        console.log(this.addNewTodoPostObj)
        this.infoArr.push(obj)
        this.newTodo = ''
        this.updateTodo()
      })
    },
    deleteTodo(index, iID) {
      this.infoArr.splice(index, 1)
      this.$http.post('http://localhost:3000/api/deleteInfo', qs.stringify({ iID: iID }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((response) => {
        console.log({ iID: iID })
      })
    },
    updateTodo() {
      this.$http.get(`http://localhost:3000/api/info?uID=${this.uID}`).then((response) => {
        console.log(response.data)
        if (response.data.code === '200') {
          this.infoArr = response.data.data
          console.log(this.infoArr)
        } else {
          alert('ERR')
        }
      })
    }
  },
  created() {
    this.updateTodo()
  },
  computed: {
    addNewTodoPostObj() {
      return {
        iInfo: this.newTodo,
        uID: this.$cookie.get('uID')
      }
    }
  }
}
</script>

<style lang="stylus">
.todo
  text-align left
  .todo-list
    position relative
    overflow hidden
    .todo-item
      transition all .6s cubic-bezier(.23,1,.32,1)
      .mu-item-title
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
    .todo-item-complete
      .mu-item
        color #9e9e9e
        font-weight 200
        text-decoration line-through
    .nothing
      padding-left 30px
      color #676767
      font-size 36px
.item-enter
  opacity 0
  transform translateX(100px)
.item-leave
  transform translateX(-100px)
.item-enter-active
  transition all .6s cubic-bezier(.23,1,.32,1)
.item-leave-active
  opacity 0
  position absolute
.item-move
  transition all 1s
.slide-enter-active
  transition all .5s ease
.slide-leave-active
  transition all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0)
.slide-enter, .slide-leave-active
  transform translateX(10px)
  opacity 0
</style>
