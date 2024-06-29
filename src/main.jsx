import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { Provider } from 'react-redux'
import { store } from './store/store'

import './index.css'
import { AppRuter } from './routes/AppRuter'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const persistor = persistStore( store );

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={ store }>
    <PersistGate loading={<p>Loading...</p>} persistor={ persistor }>
      <NextUIProvider>
        <div className='grid grid-cols-12 gap-4 grid-rows-12 app__container'>
          <AppRuter />
        </div>
      </NextUIProvider>
    </PersistGate>
  </Provider>,
)
