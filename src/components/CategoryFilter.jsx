import { useState, useEffect } from 'react';
import { categoryAPI } from '../services/api';
import './CategoryFilter.css';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await categoryAPI.getAll();
            setCategories(response.data.categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Function to get appropriate icon for each category
    const getCategoryIcon = (categoryName) => {
        const name = categoryName.toLowerCase();

        if (name.includes('nhẫn') || name.includes('ring')) {
            return '💍';
        } else if (name.includes('dây') || name.includes('chuyền') || name.includes('necklace')) {
            return '📿';
        } else if (name.includes('lắc') || name.includes('vòng') || name.includes('bracelet')) {
            return '⚪';
        } else if (name.includes('khuyên') || name.includes('tai') || name.includes('earring')) {
            return '✨';
        } else if (name.includes('mặt') || name.includes('pendant')) {
            return '💎';
        } else {
            return '✦';
        }
    };

    // Function to get gradient color for each category
    const getCategoryGradient = (categoryName) => {
        const name = categoryName.toLowerCase();

        if (name.includes('nhẫn') || name.includes('ring')) {
            return 'linear-gradient(135deg, #fce4ec 0%, #f5b5c5 100%)'; // Light pink for rings
        } else if (name.includes('dây') || name.includes('chuyền') || name.includes('necklace')) {
            return 'linear-gradient(135deg, #f5b5c5 0%, #e8a5b5 100%)'; // Rose pink for necklaces
        } else if (name.includes('lắc') || name.includes('vòng') || name.includes('bracelet')) {
            return 'linear-gradient(135deg, #ffd4e5 0%, #ffc0d3 100%)'; // Soft rose for bracelets
        } else if (name.includes('khuyên') || name.includes('tai') || name.includes('earring')) {
            return 'linear-gradient(135deg, #D4AF37 0%, #E6C35C 100%)'; // Gold for earrings
        } else if (name.includes('mặt') || name.includes('pendant')) {
            return 'linear-gradient(135deg, #ffe9f0 0%, #ffd9e6 100%)'; // Misty rose for pendants
        } else {
            return 'linear-gradient(135deg, #f8f8f8 0%, #ececec 100%)'; // Soft white for others
        }
    };


    return (
        <div className="category-filter-visual">
            <button
                className={`category-item ${!selectedCategory ? 'active' : ''}`}
                onClick={() => onCategoryChange('')}
            >
                <div className="category-image-wrapper all-category">
                    <div className="category-placeholder">
                        <span className="category-icon">✨</span>
                    </div>
                </div>
                <span className="category-name">Tất cả</span>
            </button>

            {categories.map((category) => (
                <button
                    key={category._id}
                    className={`category-item ${selectedCategory === category._id ? 'active' : ''}`}
                    onClick={() => onCategoryChange(category._id)}
                >
                    <div className="category-image-wrapper">
                        <div className="category-placeholder" style={{ background: getCategoryGradient(category.name) }}>
                            <span className="category-icon">{getCategoryIcon(category.name)}</span>
                        </div>
                    </div>
                    <span className="category-name">{category.name}</span>
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
