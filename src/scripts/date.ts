import dayjs from 'dayjs'

export const getCurrentDate = ():string => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
}

export const dateToString = (date:Date):string => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

export const stringToDate = (str:string):Date => {
  return dayjs(str).toDate()
}