import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import { AppRouter } from './router/AppRouter'
import { Toaster } from 'sonner'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { NavBar } from './components/Header'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
      <Toaster richColors/>
        <NavBar
            routes={[
              {
                name: 'Clients',
                url: '/'
              },
              {
                name: 'El camino',
                url: 'el-camino'
              },
              {
                name: 'Earnings',
                url: 'earnings'
              }
            ]}
            backgroundColor='rgba(0, 0, 0, 0)'
            sideBarColor='rgba(0, 0, 0, 0.8)'
            padding='10px 20px'
            height={80}
        />
        <AppRouter />
      </HashRouter>

    </Provider>

  </React.StrictMode>,
)
