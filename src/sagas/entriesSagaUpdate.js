import { call, takeLatest, put } from "redux-saga/effects";
import axios from "axios";
import entriesTypes from "../actions/entries.actions";

export function* updateEntrySaga() {
  yield takeLatest(entriesTypes.UPDATE_ENTRY, updateEntryToDb);
}

function* updateEntryToDb({ payload }) {
    console.log(payload)
  yield call(updateEntry, payload);
  yield call(updateEntryDetails, payload);
  yield put({ type: entriesTypes.UPDATE_ENTRY_RESULT, payload });
}

async function updateEntry({ id, entry }) {
    console.log(entry.description)
  await axios.put(`http://localhost:3001/entries/${id}`, { id: entry.id, description: entry.description });
}

async function updateEntryDetails({ id, entry }) {
  await axios.put(`http://localhost:3001/values/${id}`, {
    id,
    isExpense: entry.isExpense,
    value: entry.value,
  });
}
