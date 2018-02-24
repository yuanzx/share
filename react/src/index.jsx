import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import Index from './src/index'

const render = Component => {
    ReactDOM.render(<AppContainer>
        <Component/>
    </AppContainer>, document.getElementById('root'))
}

render(Index)

if (module.hot) {
    module.hot.accept('./containers/Index', () => {
        render(Index)
    })
}
