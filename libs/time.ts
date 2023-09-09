import moment from 'moment'

function getSeconds(duration: any) {
  return Number(moment.duration(`00:${duration}`).asMilliseconds())
}

function getTotalSeconds(duration: any) {
  return moment.duration(duration).asMilliseconds()
}

function getTime(duration: any) {
  return moment(duration).format('mm:ss')
}

function getTotalTime(duration: any) {
  return moment.utc(duration).format('HH:mm:ss')
}

export { getSeconds, getTime, getTotalSeconds, getTotalTime }

2
