import { useState, useEffect } from 'react';
import axios from 'axios';
import './Shop.css';
import SectionOne from '../components/SectionOne';

export default function PadelShop() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('relevance');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [currentPriceRange, setCurrentPriceRange] = useState({ min: 0, max: 1000 });
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'rackets', name: 'Rackets' },
    { id: 'balls', name: 'Balls' },
    { id: 'shoes', name: 'Shoes' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'accessories', name: 'Accessories' }
  ];
  
  useEffect(() => {
    // Fetch products when component mounts
    fetchPadelProducts();
  }, []);
  
  // Apply filters and sorting whenever products or filter conditions change
  useEffect(() => {
    if (products.length > 0) {
      applyFiltersAndSort();
    }
  }, [products, sortOption, categoryFilter, currentPriceRange, searchQuery]);
  
  const fetchPadelProducts = async () => {
    setLoading(true);
    
    const options = {
      method: 'GET',
      url: 'https://real-time-amazon-data.p.rapidapi.com/search',
      params: {
        query: 'Padel racket',
        page: '1',
        country: 'US',
        sort_by: 'RELEVANCE',
        product_condition: 'ALL',
        is_prime: 'false',
        deals_and_discounts: 'NONE'
      },
      headers: {
        'x-rapidapi-key': '97eb2ede81mshf96976c9367fbc3p1eda3cjsnb57418499ad7',
        'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      
      if (response.data && response.data.data && response.data.data.products) {
        const fetchedProducts = response.data.data.products.map(product => ({
          ...product,
          // Assign random categories for demonstration
          category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1].id,
          // Extract numeric price for sorting and filtering
          numericPrice: extractPrice(product.product_price)
        }));
        
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
        
        // Find min and max prices for range slider
        const prices = fetchedProducts.map(p => p.numericPrice).filter(p => !isNaN(p));
        if (prices.length > 0) {
          const minPrice = Math.floor(Math.min(...prices));
          const maxPrice = Math.ceil(Math.max(...prices));
          setPriceRange({ min: minPrice, max: maxPrice });
          setCurrentPriceRange({ min: minPrice, max: maxPrice });
        }
      } else {
        setError('No products found');
      }
    } catch (error) {
      console.error(error);
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Extract numeric price from price string
  const extractPrice = (priceString) => {
    if (!priceString) return NaN;
    const match = priceString.match(/[\d,.]+/);
    return match ? parseFloat(match[0].replace(/,/g, '')) : NaN;
  };
  
  const applyFiltersAndSort = () => {
    let result = [...products];
    
    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.product_title?.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    // Apply price range filter
    result = result.filter(product => 
      !isNaN(product.numericPrice) && 
      product.numericPrice >= currentPriceRange.min && 
      product.numericPrice <= currentPriceRange.max
    );
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.numericPrice - b.numericPrice);
        break;
      case 'price-high':
        result.sort((a, b) => b.numericPrice - a.numericPrice);
        break;
      case 'rating':
        result.sort((a, b) => parseFloat(b.product_star_rating || 0) - parseFloat(a.product_star_rating || 0));
        break;
      case 'newest':
        // For demonstration, since we don't have date data
        result.sort(() => Math.random() - 0.5);
        break;
      default: // relevance, keep original order
        break;
    }
    
    setFilteredProducts(result);
  };
  
  // Handle price range change and apply when slider is released
  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({
      ...prev,
      [name]: parseInt(value)
    }));
  };
  
  const applyPriceRange = () => {
    setCurrentPriceRange(priceRange);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const clearFilters = () => {
    setCategoryFilter('all');
    setSortOption('relevance');
    setSearchQuery('');
    setPriceRange({ min: priceRange.min, max: priceRange.max });
    setCurrentPriceRange({ min: priceRange.min, max: priceRange.max });
  };

  return (
    <div className="padel-shop">
    <SectionOne />
      <div className="shop-banner">
        <div className="banner-content">
          <h1>Padel Pro Shop</h1>
          <p>Elevate your game with professional equipment</p>
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search for padel equipment..." 
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button className="search-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="shop-layout">
        <aside className="shop-sidebar">
          <div className="filter-group">
            <h3>Categories</h3>
            <ul className="category-list">
              {categories.map(category => (
                <li key={category.id}>
                  <button 
                    className={categoryFilter === category.id ? 'active' : ''}
                    onClick={() => setCategoryFilter(category.id)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="filter-group">
            <h3>Price Range</h3>
            <div className="price-display">
              ${priceRange.min} - ${priceRange.max}
            </div>
            <div className="price-sliders">
              <input 
                type="range" 
                min={currentPriceRange.min} 
                max={currentPriceRange.max}
                value={priceRange.min}
                name="min"
                onChange={handlePriceRangeChange}
              />
              <input 
                type="range" 
                min={currentPriceRange.min} 
                max={currentPriceRange.max}
                value={priceRange.max}
                name="max"
                onChange={handlePriceRangeChange}
              />
            </div>
            <button className="apply-button" onClick={applyPriceRange}>
              Apply
            </button>
          </div>
          
          <button className="clear-filters-button" onClick={clearFilters}>
            Clear All Filters
          </button>
        </aside>

        <main className="shop-main">
          <div className="shop-controls">
            <div className="results-count">
              {filteredProducts.length} products found
            </div>
            <div className="sort-controls">
              <label htmlFor="sort-select">Sort by:</label>
              <select 
                id="sort-select" 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="loader"></div>
              <p>Loading padel equipment...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
              </svg>
              <p>{error}</p>
              <button className="retry-button" onClick={fetchPadelProducts}>Try Again</button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-results">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
              <p>No products match your filters</p>
              <button className="clear-button" onClick={clearFilters}>Clear Filters</button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product, index) => (
                <div key={product.asin || index} className="product-card">
                  {product.is_best_seller && (
                    <div className="product-badge bestseller">Best Seller</div>
                  )}
                  {product.product_original_price && (
                    <div className="product-badge sale">Sale</div>
                  )}
                  <div className="product-image-container">
                    {product.product_photo ? (
                      <img 
                        src={product.product_photo}
                        alt={product.product_title} 
                        className="product-image"
                      />
                    ) : (
                      <div className="product-image-placeholder">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                          <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                        </svg>
                      </div>
                    )}
                    <div className="product-quick-actions">
                      <button className="quick-view-btn" title="Quick view">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                        </svg>
                      </button>
                      <button className="wishlist-btn" title="Add to wishlist">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="product-info">
                    <div className="product-category">{categories.find(c => c.id === product.category)?.name}</div>
                    <h3 className="product-title">{product.product_title || 'Padel Equipment'}</h3>
                    <div className="product-rating">
                      <div className="stars">
                        {'★'.repeat(Math.round(parseFloat(product.product_star_rating || 0)))}
                        {'☆'.repeat(5 - Math.round(parseFloat(product.product_star_rating || 0)))}
                      </div>
                      <span className="rating-count">({product.product_num_ratings || 0})</span>
                    </div>
                    <div className="product-pricing">
                      <span className="current-price">{product.product_price || 'Price unavailable'}</span>
                      {product.product_original_price && (
                        <span className="original-price">{product.product_original_price}</span>
                      )}
                    </div>
                    {product.delivery && (
                      <div className="delivery-info">{product.delivery}</div>
                    )}
                  </div>
                  <div className="product-actions">
                    { /*<button className="add-to-cart">Add to Cart</button> */} 
                    <a href={product.product_url} className="view-details" target="_blank" rel="noopener noreferrer">
                      Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}