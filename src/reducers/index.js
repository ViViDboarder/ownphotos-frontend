import { combineReducers } from "redux"

import people from "./peopleReducer"
import faces from "./facesReducer"
import albums from './albumsReducer'
import util from './utilReducer'
import photos from './photosReducer'
import auth from './authReducer'

export default combineReducers({
  people,
  faces,
  albums,
  util,
  photos,
  auth,
})