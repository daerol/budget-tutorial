import { take, delay, put, call, fork, takeEvery, cancelled, cancel } from "redux-saga/effects";

function double(number) {
  return number * 2;
}

export function* testSaga() {
  while (true) {
    console.log("Starting saga");
    const state = yield take("TEST_MESSAGE");
    const a = yield call(double, 2);
    console.log(a);
    const b = yield double(3);
    console.log(b);
    console.log("Finish saga function", state);
  }
}

// function* doNothing() {
//   console.log("I have been called by fork");
//   yield delay(1000);
//   console.log("I'm doing nothing");
// }

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
  const { payload } = yield takeEvery(
    "TEST_MESSAGE_3",
    testSagaTakeEveryProcess
  );
  console.log(`Finish TakeEvery for index ${payload}`);
}

export function* testSagaTakeEveryProcess({ payload }) {
  console.log(`Process for index ${payload}`);
  yield delay(3000);
  console.log(`Finish Process for index ${payload}`);
}

function* inifinitySaga() {
  console.log("Starting infinity saga");
  while (true) {
    try {
      console.log("inside inifinity loop");
      yield delay(500);
    } catch (error) {
        console.error('An error happened', error)
    } finally {
        console.log('The fork was cancelled? ', yield cancelled())
    }
  }
}

export function* testSagaCancelled() {
  yield take("TEST_MESSAGE_4");
  const handleCancel = yield fork(inifinitySaga);
  yield delay(3000)
  yield cancel(handleCancel)
}

export function* dispatchTest() {
  let index = 0;
  yield put({ type: "TEST_MESSAGE_4", payload: index });
  // while (true) {
  //     yield delay(500)
  //     yield put({type: 'TEST_MESSAGE_3', payload: index})
  //     index++
  // }
}
