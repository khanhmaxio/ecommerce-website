// Trang chủ - Quản lý hiển thị và tương tác
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

// Khởi tạo trang
function initializePage() {
    // Hiển thị sản phẩm
    displayProducts();
    
    // Thiết lập các event listeners
    setupEventListeners();
    
    // Khởi tạo filters
    initializeFilters();
    
    // Cập nhật UI auth
    auth.updateAuthUI();
    
    // Cập nhật cart count
    cart.updateCartCount();
}

// Hiển thị sản phẩm
function displayProducts(productsToShow = null) {
    const productsGrid = document.getElementById('products-grid');
    const loading = document.getElementById('loading');
    const noProducts = document.getElementById('no-products');
    
    if (!productsGrid) return;
    
    // Hiển thị loading
    loading.style.display = 'block';
    noProducts.style.display = 'none';
    productsGrid.innerHTML = '';
    
    // Lấy danh sách sản phẩm
    const products = productsToShow || getAllProducts();
    
    // Simulate loading delay
    setTimeout(() => {
        loading.style.display = 'none';
        
        if (products.length === 0) {
            noProducts.style.display = 'block';
            return;
        }
        
        // Tạo HTML cho từng sản phẩm
        products.forEach(product => {
            const productHTML = createProductHTML(product);
            productsGrid.insertAdjacentHTML('beforeend', productHTML);
        });
        
        // Thêm animation
        animateProducts();
    }, 500);
}

// Animation cho sản phẩm
function animateProducts() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
}

// Thiết lập event listeners
function setupEventListeners() {
    // Tìm kiếm
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 500));
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    // Filters
    const categoryFilter = document.getElementById('category-filter');
    const brandFilter = document.getElementById('brand-filter');
    const priceFilter = document.getElementById('price-filter');
    const clearFilters = document.getElementById('clear-filters');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (brandFilter) {
        brandFilter.addEventListener('change', applyFilters);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', applyFilters);
    }
    
    if (clearFilters) {
        clearFilters.addEventListener('click', clearAllFilters);
    }
    
    // Category menu clicks
    const categoryLinks = document.querySelectorAll('[data-category]');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.category;
            filterByCategory(category);
        });
    });
    
    // Product card clicks
    document.addEventListener('click', function(e) {
        const productCard = e.target.closest('.product-card');
        if (productCard && !e.target.closest('.product-actions')) {
            const productId = productCard.dataset.productId;
            viewProductDetail(productId);
        }
    });
}

// Khởi tạo filters
function initializeFilters() {
    // Populate brand filter
    const brandFilter = document.getElementById('brand-filter');
    if (brandFilter) {
        const brands = [...new Set(getAllProducts().map(p => p.brand))];
        brands.forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            brandFilter.appendChild(option);
        });
    }
}

// Xử lý tìm kiếm
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    const query = searchInput.value.trim();
    const searchResults = query ? searchProducts(query) : getAllProducts();
    
    displayProducts(searchResults);
    
    // Cập nhật URL (optional)
    const url = new URL(window.location);
    if (query) {
        url.searchParams.set('search', query);
    } else {
        url.searchParams.delete('search');
    }
    window.history.replaceState({}, '', url);
}

// Áp dụng filters
function applyFilters() {
    let filteredProducts = getAllProducts();
    
    // Filter by category
    const category = document.getElementById('category-filter')?.value;
    if (category) {
        filteredProducts = getProductsByCategory(category);
    }
    
    // Filter by brand
    const brand = document.getElementById('brand-filter')?.value;
    if (brand) {
        filteredProducts = filteredProducts.filter(p => p.brand === brand);
    }
    
    // Filter by price
    const priceRange = document.getElementById('price-filter')?.value;
    if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split('-').map(Number);
        filteredProducts = filterProductsByPrice(filteredProducts, minPrice, maxPrice);
    }
    
    // Apply search if exists
    const searchQuery = document.getElementById('search-input')?.value.trim();
    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    displayProducts(filteredProducts);
}

// Lọc theo danh mục
function filterByCategory(category) {
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.value = category;
        applyFilters();
    }
}

// Xóa tất cả filters
function clearAllFilters() {
    // Reset filter selects
    const filters = ['category-filter', 'brand-filter', 'price-filter'];
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) filter.value = '';
    });
    
    // Reset search
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    
    // Display all products
    displayProducts();
    
    // Clear URL params
    const url = new URL(window.location);
    url.search = '';
    window.history.replaceState({}, '', url);
}

// Xem chi tiết sản phẩm
function viewProductDetail(productId) {
    // Lưu ID sản phẩm vào localStorage để trang chi tiết đọc
    localStorage.setItem('selectedProductId', productId);
    window.location.href = 'product-detail.html';
}

// Scroll xuống phần sản phẩm
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Toggle wishlist (placeholder)
function toggleWishlist(productId) {
    // Lấy wishlist từ localStorage
    let wishlist = JSON.parse(localStorage.getItem('sportshop_wishlist') || '[]');
    
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        // Remove from wishlist
        wishlist.splice(index, 1);
        showNotification('Đã xóa khỏi danh sách yêu thích', 'info');
    } else {
        // Add to wishlist
        wishlist.push(productId);
        showNotification('Đã thêm vào danh sách yêu thích', 'success');
    }
    
    // Lưu lại
    localStorage.setItem('sportshop_wishlist', JSON.stringify(wishlist));
    
    // Cập nhật UI
    updateWishlistUI(productId, wishlist.includes(productId));
}

// Cập nhật UI wishlist
function updateWishlistUI(productId, isInWishlist) {
    const wishlistBtns = document.querySelectorAll(`[onclick="toggleWishlist(${productId})"]`);
    wishlistBtns.forEach(btn => {
        const icon = btn.querySelector('i');
        if (icon) {
            icon.className = isInWishlist ? 'fas fa-heart' : 'far fa-heart';
            btn.style.color = isInWishlist ? '#ff4757' : '';
        }
    });
}

// Hiển thị thông báo
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Hide and remove
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Khởi tạo từ URL parameters
function initializeFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Search query
    const searchQuery = urlParams.get('search');
    if (searchQuery) {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = searchQuery;
            handleSearch();
        }
    }
    
    // Category
    const category = urlParams.get('category');
    if (category) {
        filterByCategory(category);
    }
}

// CSS cho notifications
const notificationCSS = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10001;
    transform: translateX(400px);
    opacity: 0;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.notification.show {
    transform: translateX(0);
    opacity: 1;
}

.notification-success {
    background: #4caf50;
}

.notification-error {
    background: #f44336;
}

.notification-warning {
    background: #ff9800;
}

.notification-info {
    background: #2196f3;
}

/* Responsive */
@media (max-width: 480px) {
    .notification {
        right: 10px;
        left: 10px;
        width: auto;
        text-align: center;
    }
}

/* Loading animation */
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loading i {
    animation: spin 1s linear infinite;
}

/* Product card hover effects */
.product-card {
    transition: all 0.3s ease;
}

.product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

/* Search highlight */
.search-highlight {
    background: yellow;
    padding: 2px 4px;
    border-radius: 3px;
}

/* Filter badge */
.filter-badge {
    display: inline-block;
    background: #2c5aa0;
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    margin: 2px;
}

.filter-badges {
    margin: 10px 0;
}
</style>
`;

// Thêm CSS vào head
document.head.insertAdjacentHTML('beforeend', notificationCSS);

// Khởi tạo từ URL khi trang load xong
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeFromURL, 100);
});