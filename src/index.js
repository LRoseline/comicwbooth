import React from 'react';
import ReactDOM from 'react-dom/client';
import {Link, BrowserRouter, Route, Routes} from 'react-router-dom';

import './index.css';
import App from './App';
import Brand from './Brand';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <header className="booth-name">
			<Link to="/">우이는 비를 좋아해!</Link>
		</header>
        <div id="root-body">
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/brand" element={<Brand />} />
            </Routes>
        </div>
        <footer>
            <Link to="https://www.pixiv.net/users/30842146" target="_blank" rel="noopener noreferrer">
                Pixiv
            </Link> | <Link to="https://x.com/LuelRoseline" target="_blank" rel="noopener noreferrer">
                X(트위터)
            </Link> | <Link to="https://booth.tsukimorifriends.xyz" target="_blank" rel="noopener noreferrer">
                API 제공처
            </Link> | <Link to="/brand">
                상표명&기타사항
            </Link>
        </footer>
    </BrowserRouter>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();