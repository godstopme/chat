import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import registerServiceWorker from './registerServiceWorker'

import App from './components/App'
import { normalize, schema } from 'normalizr'

const store = configureStore()
let nestedState = {
  "channel_id1": {
    "rooms": [
      {
        "id": "roomid1",
        "info": "test",
        "history": [
          {
            "header": {
              "username": "user1",
              "datetime": "June 17"
            },
            "messages": [
              {
                "id": "messageid1",
                "content": "Kogda mne bilo",
              },
              {
                "id": "messageid2",
                "content": "15 let batya"
              }
            ]
          }
        ]
      }
    ]
  }
}

const channel = new schema.Entity('channels')
const room = new schema.Entity('rooms')


render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)

registerServiceWorker()
