import Vue from 'vue'
import dayjs from 'dayjs'

Vue.mixin({

  filters: {
    filterDate(val, format = 'YYYY-MM-DD') {
      if ( !val ) return ''
      return dayjs(val).format(format)
    }
  },

  computed: {

  },

  methods: {
    checkForm(formName, message = true) {
      if (typeof formName === 'string') {
        return new Promise((resolve, reject) => {
          this.$refs[formName].validate(valid => {
            if ( valid ) {
              resolve()
            } else {
              if ( message ) this.$message.warning('請完善信息')
              reject()
            }
          })
        })
      } else {
        let result = []
        formName.forEach(item => result.push(this.checkForm(item, false) ))
        return new Promise((resolve, reject) => {
          Promise.all(result)
            .then(() => {
              resolve()
            })
            .catch(() => {
              this.$message.warning('請完善信息')
              reject()
            })
        })
      }
    },
  }
})