import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react'
import { Provider } from 'react-redux'
import { store } from './store/store'

import './index.css'
import { AppRuter } from './routes/AppRuter'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={ store }>
      <NextUIProvider>
        <div className='grid grid-cols-12 gap-4 grid-rows-12 app__container'>
          <AppRuter />
        </div>
      </NextUIProvider>
  </Provider>,
)
