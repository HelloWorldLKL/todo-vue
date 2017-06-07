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
        <mu-list-item v-for="(item, index) in todoList" :key="index" disableRipple @click="handleToggle(item)" :title="item.info" class="todo-item" :class="{'todo-item-complete':item.complete}">
          <mu-checkbox v-model="item.complete" slot="left" />
          <mu-icon-button icon="delete" slot="right" @click.stop="deleteTodo(index)" />
        </mu-list-item>
      </transition-group>
      <transition name="slide" mode="in-out">
        <div class="nothing" v-if="todoList.length === 0">
          <mu-icon value="sentiment_very_satisfied" :size="36" />
          <span style="font-weight: 100">Nothing Here Now~</span>
        </div>
      </transition>
    </mu-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todoList: [{
        info: '吃饭',
        complete: true
      }, {
        info: '睡觉',
        complete: false
      }, {
        info: '打豆豆',
        complete: false
      }
      ],
      newTodo: '',
      toast: false
    }
  },
  methods: {
    handleToggle(item) {
      item.complete = !item.complete
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
      obj.info = this.newTodo
      obj.complete = false
      this.newTodo = ''
      this.todoList.push(obj)
    },
    deleteTodo(index) {
      this.todoList.splice(index, 1)
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
