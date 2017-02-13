import express from 'express';
import path from 'path';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import routes from './src/routes';
import reducer from './src/reducers/index';
import Header from './src/components/Header/index';
import Index from './src/containers/index';

const app = express(),
    port = 9000;

app.use(express.static(path.join(__dirname)));

app.use((req, res, next) => {
    match({ routes, location: req.url }, (err, redirect, props) => {
        if (err) {
            res.status(500).end(`Internal Server Error ${err}`);
        } else if (redirect) {
            res.redirect(redirect.pathname + redirect.search);
        } else if (props) {
            const store = createStore(reducer),
                html = renderToString(
                    <Provider store={store}>
                        <div>
                            <Header />
                            <RouterContext {...props} />
                        </div>
                    </Provider>
                );  
            res.end(renderFullPage(html, store.getState()));
        } else {
            res.status(404).end('Not Found');
        }
    });
});

app.listen(port, () => {
    console.log(`server in on port ${port}...`);
});

function renderFullPage(html, initialState) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8" />
                <title>React</title> 
                <link rel="stylesheet" type="text/css" href="build/css/app.style.css" />
                <link rel="stylesheet" type="text/css" href="/icons/css/font-awesome.min.css" />
            </head>
            <body>
                <div id="root">${html}</div>
                <script type="text/javascript">
                    window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
                </script>
                <script type="text/javascript" src="build/lib.bundle.js"></script>
                <script type="text/javascript" src="build/app.js"></script>
            </body>
        </html>
    `;
}