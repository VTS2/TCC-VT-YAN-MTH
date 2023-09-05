import { useState } from 'react';

function App() {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [activePreview, setActivePreview] = useState(null);

    const products = [
        {
            dataName: 'p-1',
            // Outros dados do produto
        },
        // Adicione os outros produtos aqui
    ];

    const previews = [
        {
            dataTarget: 'p-1',
            // Outros dados da prévia
        },
        // Adicione as outras visualizações aqui
    ];

    const handleProductClick = (name) => {
        setPreviewVisible(true);
        setActivePreview(name);
    };

    const handleClosePreview = () => {
        setPreviewVisible(false);
        setActivePreview(null);
    };

    return (
        <div>
            <div className="products-container">
                {products.map((product, index) => (
                    <div
                        key={index}
                        className="product"
                        data-name={product.dataName}
                        onClick={() => handleProductClick(product.dataName)}
                    >
                        {/* Renderizar os detalhes do produto aqui */}
                    </div>
                ))}
            </div>

            <div className={`products-preview ${previewVisible ? 'active' : ''}`}>
                {previews.map((preview, index) => (
                    <div
                        key={index}
                        className={`preview ${preview.dataTarget === activePreview ? 'active' : ''}`}
                        data-target={preview.dataTarget}
                    >
                        {/* Renderizar os detalhes da prévia aqui */}
                        <i className="fas fa-times" onClick={handleClosePreview}></i>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
