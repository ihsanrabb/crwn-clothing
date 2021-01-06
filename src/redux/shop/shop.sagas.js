import { takeLatest, all, call, put } from 'redux-saga/effects'
import { ShopActionsTypes } from './shop.types'
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions'

export function* fetchCollectionAsync() {
  yield console.log('Aku terbakar')

  try {
    const collectionRef = firestore.collection('collections')
    const snapshot = yield collectionRef.get()
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)
    yield put(fetchCollectionsSuccess(collectionsMap))
  } catch(error) {
    yield put(fetchCollectionsFailure(error.message))
  }
}

export function* fetchCollectionStart() {
  yield takeLatest(ShopActionsTypes.FETCH_COLLECTIONS_START, fetchCollectionAsync)
}

export function* shopSagas() {
  yield(all([
    call(fetchCollectionStart)
  ]))
}