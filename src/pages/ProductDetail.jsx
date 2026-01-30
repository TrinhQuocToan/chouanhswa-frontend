import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import { Facebook, Instagram } from 'lucide-react';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await productAPI.getById(id);
            setProduct(response.data.product);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
                <h2>Không tìm thấy sản phẩm</h2>
                <Link to="/products" className="btn btn-primary" style={{ marginTop: '2rem' }}>
                    Quay lại danh sách
                </Link>
            </div>
        );
    }

    return (
        <div className="product-detail">
            <div className="container">
                <Link to="/" className="back-link">
                    ← Quay lại danh sách
                </Link>

                <div className="product-detail-content">
                    {/* Image Gallery */}
                    <div className="product-gallery">
                        <div className="main-image">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                            />
                        </div>
                        {product.images.length > 1 && (
                            <div className="thumbnail-list">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img src={image} alt={`${product.name} ${index + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="product-detail-info">
                        {product.featured && (
                            <span className="detail-badge">Sản Phẩm Nổi Bật</span>
                        )}

                        <h1 className="detail-title">{product.name}</h1>

                        <div className="detail-price">{formatPrice(product.price)}</div>

                        <div className="detail-meta">
                            <div className="meta-item">
                                <span className="meta-label">Danh mục:</span>
                                <span className="meta-value">{product.category?.name}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Chất liệu:</span>
                                <span className="meta-value">{product.material}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Màu sắc:</span>
                                <span className="meta-value">{product.color}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">Tình trạng:</span>
                                <span className={`meta-value ${product.status === 'Còn hàng' ? 'in-stock' : 'out-stock'}`}>
                                    {product.status}
                                </span>
                            </div>
                        </div>

                        <div className="detail-description">
                            <h3>Mô tả sản phẩm</h3>
                            <p>{product.description}</p>
                        </div>

                        <div className="detail-contact">
                            <p>Liên hệ tư vấn & đặt hàng:</p>
                            <div className="social-buttons">
                                <a href="https://www.facebook.com/linh.trinhthuy.796" target="_blank" rel="noopener noreferrer" className="btn-social facebook">
                                    <Facebook size={20} />
                                    <span>Facebook</span>
                                </a>
                                <a href="https://www.instagram.com/chouanhswan_/" target="_blank" rel="noopener noreferrer" className="btn-social instagram">
                                    <Instagram size={20} />
                                    <span>Instagram</span>
                                </a>
                                <a href="https://www.tiktok.com/@chouanhswan?_r=1&_d=secCgYIASAHKAESPgo8yYWKh7emhSICDKNzKXVyFcM%2B1wjbwFLr1NKiVQXvhfOXKQlyB71gyiiZ%2FG1ZL%2B6KYPSn562XhLsoTEOoGgA%3D&_svg=1&checksum=134bddf47195bf462de0ded9618ae53a3fede4719988629debeaa6aa028b06ca&item_author_type=2&sec_uid=MS4wLjABAAAASDFTTVfqHCGinRGz0cyaIKtWlVqa7RRd2Sv99XMZ_nG2L3IflaKq62WfYFj0sREA&sec_user_id=MS4wLjABAAAAkwUoZSAHBGQ62vSz3ACv4s_4acBOwQ4OnPG4CBZNHMkzg5zfg06_ETJLpHX3HGIC&share_app_id=1180&share_author_id=7106801304563942402&share_link_id=03C476E8-5880-41A9-91FB-C9357D91B350&share_region=VN&share_scene=1&sharer_language=vi&social_share_type=5&source=h5_t&timestamp=1769779747&tt_from=copy&u_code=d6kilf9acbm5e8&ug_btm=b6880%2Cb5836&user_id=6703801355201364994&utm_campaign=client_share&utm_medium=ios&utm_source=copy" target="_blank" rel="noopener noreferrer" className="btn-social tiktok">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-music-2"
                                    >
                                        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                    </svg>
                                    <span>TikTok</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
