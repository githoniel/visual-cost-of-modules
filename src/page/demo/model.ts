import durex from '@gem-mine/durex'
import request from '@sdp.nd/sdp-request'

const { demo } = request

durex.model({
  name: 'demo',
  state: {
    count: 5
  },
  reducers: {
    change(n): void {
      return this.setField({
        count: (prev) => prev + n
      })
    },
    reset(): void {
      return this.setField({
        data: undefined,
        status: undefined
      })
    },
    success(data): void {
      return this.setField({
        status: 'success',
        data
      })
    }
  },
  effects: {
    successGet(): void {
      this.actions.reset()
      demo.get('/user/101').then(this.actions.success)
    },
    failureGet(): void {
      this.actions.reset()
      demo.get('/user/0').then(this.actions.success)
    },
    loadingGet(): void {
      this.actions.reset()
      demo
        .get('/user/102', {
          params: {
            sleep: 3500
          }
        })
        .then(this.actions.success)
    },
    successPost(): void {
      this.actions.reset()
      demo.post('/user').then(this.actions.success)
    },
    customErrorGet(): void {
      this.actions.reset()
      demo
        .get('/user/0', {
          customError: true
        })
        .catch((e) => {
          this.setField({
            status: 'failure(custom)',
            data: e.data
          })
        })
    }
  }
})
