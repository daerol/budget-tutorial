import { take, call, put, fork } from 'redux-saga/effects';
import entriesTypes, { populateEntries, populateEntriesDetails } from '../actions/entries.actions';
import axios from 'axios';

export function* getAllEntries() {
    yield take(entriesTypes.GET_ENTRIES)
    const {data} = yield call(axios, 'http://localhost:3001/entries')
    yield put(populateEntries(data))
}

export function* getEntriesDetails(id) {
    const {data} = yield call(axios, `http://localhost:3001/values/${id}`)
    yield put(populateEntriesDetails(id, data))
}

export function* getAllEntriesDetails() {
    const { payload } = yield take(entriesTypes.POPULATE_ENTRIES)
    for (let i = 0; i < payload.length; i++) {
        const entry = payload[i]
        yield fork(getEntriesDetails, entry.id)
    }
}
