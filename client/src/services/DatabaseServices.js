import Api from '@/services/Api'

export default {
  getAllName () {
    return Api().get('user')
    
  },
  getAllDataByName (credentials) {
    return Api().post('user', credentials)
  }
}