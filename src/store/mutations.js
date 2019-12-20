export default {
  TOGGLE_LOADING(state) {
    state.callingAPI = !state.callingAPI
  },
  TOGGLE_SEARCHING(state) {
    state.searching = (state.searching === '') ? 'loading' : ''
  },
  SET_NICKNAME(state, username) {
    state.username = username
  },
  SET_USERID(state, user_id) {
    state.user_id = user_id
  },
  SET_USERTYPE(state, user_type) {
    state.user_type = user_type
  },
  SET_COMPANYNAME(state, user_company) {
    state.user_company = user_company
  },
  SET_DEPARTMENT(state, company_dept) {
    state.company_dept = company_dept
  },
  SET_DECODED(state, decoded) {
    state.decoded = decoded
  },
  SET_TOKEN(state, TOKEN) {
    state.TOKEN = TOKEN
  },
   // 选择文件后的base编码
  SET_FILEDATABASE64(state, fileData) {
    state.fileData = fileData
  },
  SET_PAGELIST(state, pagaList) {
    state.pagaList = pagaList
  },
  // 经过菜单栏页面整合后的菜单数据
  SET_MENUS(state, menus) {
    state.menus = menus
  },
}
