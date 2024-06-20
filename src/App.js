import { useState, useEffect } from 'react';

import './item.css';
import './popup.css';
import './App.css';
import axios from "axios";

function App() {
    document.querySelector("title").innerHTML = process.env.REACT_APP_TITLE+" : "+"굿즈 리스트";
    const header = { "Authentication": process.env.REACT_APP_TEST_KEY };

    const items = {
        "cod": 200,
        "mes": "OK",
        "body": {
          "products": [
            {
              "pno": 1,
              "owner": 1,
              "name": "우이 3단 자동우산",
              "imgurl": "https://puu.sh/K9ecD/ed2191b623.jpg",
              "price": 35000,
              "amount": 10,
              "memo": "토, 일요일 10개씩 판매중!!"
            },
            {
              "pno": 2,
              "owner": 1,
              "name": "크라페 전자파 스티커",
              "imgurl": "https://booth.tsukimorifriends.xyz/cdn/unknown.png",
              "price": 2000,
              "amount": -1,
              "memo": "메이드 크라페!"
            },
            {
              "pno": 4,
              "owner": 1,
              "name": "이드 거꾸로 우산",
              "imgurl": "https://booth.tsukimorifriends.xyz/cdn/unknown.png",
              "price": 35000,
              "amount": -1,
              "memo": "바깥은 나타(컬러×), 안에는 이드가 있어요! 제품의 가격은 변동될 수 있습니다."
            }
          ],
          "page": {
            "curPage": 1,
            "limit": 10,
            "endPage": 1,
            "totalItem": 3
          }
        }
    };

    // Get the query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const initialPage = parseInt(urlParams.get('page')) || 1;
    const initialLimit = parseInt(urlParams.get('limit')) || 10;

    const [prod,setProd] = useState(null);
    const [page,setPage] = useState(initialPage);
    const [limit,setLimit] = useState(initialLimit);
    const [selectedProduct, setSelectedProduct] = useState(null); // State to manage selected product
    
    useEffect(() => {
        setProd(items);
    }, []);

    const openDetail = (product) => {
        setSelectedProduct(product);
        console.log("Opening detail for product:", product);
    };

    const closeDetail = () => {
        setSelectedProduct(null);
    };

    try {
        return (
            <div>
                {prod.cod === 200 ? (
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
                                            <hr/>
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
                ) : (prod.cod === 403 ? 
                    (
                    <div className="loading">
                        <div>
                            <div className="Load-Circle"></div>
                            <div>데이터 가져오는중</div>
                        </div>
                    </div>
                    ) : (
                    <div className="loading">
                        <div>
                            <div className="Warn">!</div>
                            <div>서비스키의 설정이 잘못되었습니다!</div>
                            <div>페이지 관리자에게 연락해주세요.</div>
                        </div>
                    </div>
                    )
                )}
            </div>
        );
    } catch (error) {
        return (
            <div className="loading">
                <div>
                    <div className="Warn">!</div>
                    <div>서버가 오프라인 상태입니다!</div>
                </div>
            </div>
        );
    }
}

export default App;
