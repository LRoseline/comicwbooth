import { useState, useEffect } from 'react';

import './item.css';
import './popup.css';
import './App.css';
import axios from "axios";

function App() {
    useEffect(() => {
        document.title = `${process.env.REACT_APP_TITLE} : 굿즈 리스트`;
    }, []);

    const header = { "Authentication": process.env.REACT_APP_PRODUCT_KEY };

    const urlParams = new URLSearchParams(window.location.search);
    const initialPage = parseInt(urlParams.get('page')) || 1;
    const initialLimit = parseInt(urlParams.get('limit')) || 10;

    const [prod, setProd] = useState(null);
    const [page, setPage] = useState(initialPage);
    const [limit, setLimit] = useState(initialLimit);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.post("https://api.tsukimorifriends.xyz/api/seko/booth", {}, { headers: header })
            .then(r => {
                setProd(r.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, [header]);

    const openDetail = (product) => {
        setSelectedProduct(product);
        console.log("Opening detail for product:", product);
    };

    const closeDetail = () => {
        setSelectedProduct(null);
    };

    if (loading) {
        return (
            <div className="loading">
                <div>
                    <div className="Load-Circle"></div>
                    <div>데이터 가져오는중</div>
                </div>
            </div>
        );
    }

    if (prod && prod.cod === 403) {
        return (
            <div className="loading">
                <div>
                    <div className="Warn">!</div>
                    <div>서비스키의 설정이 잘못되었습니다!</div>
                    <div>페이지 관리자에게 연락해주세요.</div>
                </div>
            </div>
        );
    }

    if (!prod || prod.cod !== 200) {
        return (
            <div className="loading">
                <div>
                    <div className="Warn">!</div>
                    <div>서버가 오프라인 상태입니다!</div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="item-list">
                {selectedProduct && (
                    <div className="modal">
                        <div className="modal-content">
                            <div className="window-top">
                                <div className="h2">
                                    <h2>{selectedProduct.name}</h2>
                                </div>
                                <div className="close" onClick={closeDetail}>
                                    &times;
                                </div>
                            </div>
                            <img className="modal-image" src={selectedProduct.imgurl} alt={selectedProduct.name} />
                            <div className="modal-info">
                                <div>
                                    <h2>{selectedProduct.name}</h2>
                                </div>
                                <div>
                                    1EA ￦{selectedProduct.price}
                                    <hr />
                                    {selectedProduct.memo}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {prod.body.products.map(i => (
                    <div className="item" key={i.name} onClick={() => openDetail(i)}>
                        <div>
                            <img className="image" src={i.imgurl} alt={i.name} />
                        </div>
                        <div className="info">
                            <div>{i.name}</div>
                            <div>1EA ￦{i.price}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
