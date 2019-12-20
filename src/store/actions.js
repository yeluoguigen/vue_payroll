export default {
    add: ({commit}, param) => commit('ADD', {items: param}),
    edit: ({commit}, param) => commit('ADD', {id: param}),
    // eventtodo: ({commit}, param) => commit('EVENTTODO', {id: param}),
}
