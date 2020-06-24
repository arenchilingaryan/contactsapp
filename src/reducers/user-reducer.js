const initialState = {
  name: null,
  contacts: [],
  search: []
}

export const setUser = (data) => ({ type: 'SET_USER', data })
export const clearUser = () => ({ type: 'CLEAR_USER' })
export const setContacts = (data) => ({ type: 'SET_CONTACTS', data })
export const setEdit = (id) => ({ type: 'SET_EDIT', id })
export const updateContact = (data, id) => ({ type: 'UPDATE_CONTACT', data, id })
export const deleteContact = (id) => ({type: 'DELETE_CONTACT', id})
export const addContact = (data) => ({type: 'ADD_CONTACT', data})
export const setSearch = (data) => ({type: 'SET_SEARCH', data})

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER': {
      return {
        name: action.data.name,
        contacts: action.data.contacts
      }
    }
    case 'SET_CONTACTS': {
      return {
        ...state,
        contacts: action.data
      }
    }
    case 'CLEAR_USER': {
      return {
        name: '',
        contacts: []
      }
    }
    case 'SET_EDIT': {
      const newArr = []
      state.contacts.map(el => {
        if (el.id === action.id) {
          el.edit = !el.edit
        }
        return newArr.push(el)
      })
      return {
        ...state,
        contacts: newArr
      }
    }
    case 'UPDATE_CONTACT': {
      const newArr = []
      state.contacts.map(el => {
        if (el.id === action.id) {
          el.contactName = action.data.contactName
            el.contactAge = action.data.contactAge
            el.contactPhone = action.data.contactPhone
        }
        return newArr.push(el)
      })
      return {
        ...state,
        contacts: newArr
      }
    }
    case 'DELETE_CONTACT': {
      const newArr = state.contacts.filter(el => el.id !== action.id)
      const newSearchArr = state.search.filter(el => el.id !== action.id)
      return {
        ...state,
        contacts: newArr,
        search: newSearchArr
      }
    }
    case 'ADD_CONTACT': {
      const newArr = [...state.contacts, action.data]
      const newSearchArr = [...state.contacts, action.data]
      return {
        ...state,
        contacts: newArr,
        search: newSearchArr
      }
    }
    case 'SET_SEARCH': {
      return {
        ...state,
        search: action.data
      }
    }
    default: return state
  }
}
