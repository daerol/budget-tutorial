import { take, delay, put, call, fork, takeEvery } from 'redux-saga/effects'

function double(number) {
    return number * 2;
}

export function* testSaga() {
    while (true) {
        console.log("Starting saga")
        const state = yield take('TEST_MESSAGE')
        const a = yield call(double, 2)
        console.log(a)
        const b = yield double(3);
        console.log(b)
        console.log("Finish saga function", state);
    }
}

function* doNothing() {
    console.log("I have been called by fork")
    yield delay(1000)
    console.log("I'm doing nothing")
}

// export function* testSagaFork() {
//     while(true) {
//         yield take('TEST_MESSAGE_2')
//         yield delay(1000)
//         yield call(doNothing)
//         yield call(doNothing)
//         yield call(doNothing)
//     }
// }

export function* testSagaTakeEvery() {
    const { payload } =  yield takeEvery('TEST_MESSAGE_3', testSagaTakeEveryProcess)
    console.log(`Finish TakeEvery for index ${payload}`)
}


export function* testSagaTakeEveryProcess({payload}) {
    console.log(`Process for index ${payload}`)
    yield delay(3000)
    console.log(`Finish Process for index ${payload}`)
}

export function* dispatchTest() {
    let index = 0
    while (true) {
        yield delay(500)
        yield put({type: 'TEST_MESSAGE_3', payload: index})
        index++
    }
}