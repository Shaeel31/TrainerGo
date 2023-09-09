import { notification } from 'antd'
import _ from 'lodash'

const checkMessage = _.memoize((status: number, msg: string, delay = 2.5) => {
  if (status === 200) {
    notification.success({
      duration: delay,
      message: `Success`,
      description: msg,
      placement: 'bottomLeft',
    })
  } else if (status === 400) {
    notification.error({
      duration: delay,
      message: `Error`,
      description: msg,
      placement: 'bottomLeft',
    })
  }
})

export { checkMessage }
