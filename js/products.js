// Dữ liệu sản phẩm thể thao
const products = [
    {
        id: 1,
        name: "Áo thun thể thao Nike Dri-FIT",
        description: "Áo thun thể thao nam với công nghệ thấm hút mồ hôi Dri-FIT, chất liệu polyester cao cấp, thiết kế thoáng khí.",
        price: 690000,
        category: "ao",
        brand: "Nike",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect fill='%23f0f0f0' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='18' fill='%23666' text-anchor='middle' dy='.3em'%3EÁo Nike%3C/text%3E%3C/svg%3E",
        sizes: ["S", "M", "L", "XL"],
        inStock: true,
        featured: true,
        rating: 4.5,
        reviews: 128
    },
    {
        id: 2,
        name: "Quần short thể thao Adidas",
        description: "Quần short thể thao nam Adidas, chất liệu nylon co giãn, thiết kế 3 sọc iconic, phù hợp tập luyện và chạy bộ.",
        price: 450000,
        category: "quan",
        brand: "Adidas",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect fill='%23e8f4f8' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='16' fill='%23333' text-anchor='middle' dy='.3em'%3EQuần Adidas%3C/text%3E%3C/svg%3E",
        sizes: ["S", "M", "L", "XL", "XXL"],
        inStock: true,
        featured: true,
        rating: 4.3,
        reviews: 95
    },
    {
        id: 3,
        name: "Giày chạy bộ Nike Air Zoom",
        description: "Giày chạy bộ Nike Air Zoom với đệm khí Zoom Air, đế cao su chống trượt, thiết kế nhẹ và thoáng khí.",
        price: 2890000,
        category: "giay",
        brand: "Nike",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect fill='%23fff3cd' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='16' fill='%23856404' text-anchor='middle' dy='.3em'%3EGiày Nike%3C/text%3E%3C/svg%3E",
        sizes: ["39", "40", "41", "42", "43", "44"],
        inStock: true,
        featured: true,
        rating: 4.7,
        reviews: 256
    },
    {
        id: 4,
        name: "Áo khoác thể thao Puma",
        description: "Áo khoác thể thao Puma có mũ, chất liệu polyester chống gió, phù hợp mặc ngoài khi tập luyện.",
        price: 1250000,
        category: "ao",
        brand: "Puma",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect fill='%23f8d7da' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='16' fill='%23721c24' text-anchor='middle' dy='.3em'%3EÁo khoác Puma%3C/text%3E%3C/svg%3E",
        sizes: ["S", "M", "L", "XL"],
        inStock: true,
        featured: false,
        rating: 4.2,
        reviews: 73
    },
    {
        id: 5,
        name: "Quần dài thể thao Under Armour",
        description: "Quần dài thể thao Under Armour HeatGear, chất liệu co giãn 4 chiều, công nghệ chống mùi và thấm hút mồ hôi.",
        price: 890000,
        category: "quan",
        brand: "Under Armour",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect fill='%23d1ecf1' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='14' fill='%23055160' text-anchor='middle' dy='.3em'%3EQuần UA%3C/text%3E%3C/svg%3E",
        sizes: ["S", "M", "L", "XL", "XXL"],
        inStock: true,
        featured: false,
        rating: 4.4,
        reviews: 112
    },
    {
        id: 6,
        name: "Mũ lưỡi trai Nike",
        description: "Mũ lưỡi trai thể thao Nike, chất liệu cotton thoáng khí, có thể điều chỉnh size, bảo vệ khỏi ánh nắng.",
        price: 320000,
        category: "phu-kien",
        brand: "Nike",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect fill='%23d4edda' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='18' fill='%23155724' text-anchor='middle' dy='.3em'%3EMũ Nike%3C/text%3E%3C/svg%3E",
        sizes: ["One Size"],
        inStock: true,
        featured: false,
        rating: 4.1,
        reviews: 67
    },
    {
        id: 7,
        name: "Giày thể thao Adidas Ultraboost",
        description: "Giày thể thao Adidas Ultraboost với công nghệ Boost, đế giữa tăng khả năng đàn hồi, upper Primeknit ôm chân.",
        price: 3200000,
        category: "giay",
        brand: "Adidas",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect fill='%23e2e3e5' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='14' fill='%23383d41' text-anchor='middle' dy='.3em'%3EUltraboost%3C/text%3E%3C/svg%3E",
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        inStock: true,
        featured: true,
        rating: 4.8,
        reviews: 342
    },
    {
        id: 8,
        name: "Áo tank top nữ Nike",
        description: "Áo tank top thể thao nữ Nike, thiết kế tôn dáng, chất liệu Dri-FIT thấm hút mồ hôi tốt, phù hợp yoga và gym.",
        price: 560000,
        category: "ao",
        brand: "Nike",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect fill='%23fce4ec' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='16' fill='%23880e4f' text-anchor='middle' dy='.3em'%3ETank top Nike%3C/text%3E%3C/svg%3E",
        sizes: ["XS", "S", "M", "L", "XL"],
        inStock: true,
        featured: false,
        rating: 4.3,
        reviews: 89
    },
    {
        id: 9,
        name: "Quần legging Puma",
        description: "Quần legging thể thao nữ Puma, chất liệu co giãn 4 chiều, thiết kế high-waist tôn dáng, phù hợp mọi hoạt động.",
        price: 650000,
        category: "quan",
        brand: "Puma",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect fill='%23e7f3ff' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='16' fill='%23004085' text-anchor='middle' dy='.3em'%3ELegging Puma%3C/text%3E%3C/svg%3E",
        sizes: ["XS", "S", "M", "L", "XL"],
        inStock: true,
        featured: false,
        rating: 4.2,
        reviews: 156
    },
    {
        id: 10,
        name: "Tất thể thao Nike Cushioned",
        description: "Tất thể thao Nike với đệm tăng cường ở gót và mũi chân, chất liệu Dri-FIT, thiết kế mid-calf.",
        price: 180000,
        category: "phu-kien",
        brand: "Nike",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect fill='%23fff2cc' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='18' fill='%23664d03' text-anchor='middle' dy='.3em'%3ETất Nike%3C/text%3E%3C/svg%3E",
        sizes: ["S", "M", "L"],
        inStock: true,
        featured: false,
        rating: 4.0,
        reviews: 45
    },
    {
        id: 11,
        name: "Áo hoodie Adidas",
        description: "Áo hoodie thể thao Adidas, chất liệu cotton blend ấm áp, thiết kế 3 sọc, có túi kangaroo tiện lợi.",
        price: 1450000,
        category: "ao",
        brand: "Adidas",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect fill='%23f3e5f5' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='16' fill='%234a148c' text-anchor='middle' dy='.3em'%3EHoodie Adidas%3C/text%3E%3C/svg%3E",
        sizes: ["S", "M", "L", "XL", "XXL"],
        inStock: true,
        featured: false,
        rating: 4.4,
        reviews: 203
    },
    {
        id: 12,
        name: "Giày training Under Armour",
        description: "Giày training Under Armour HOVR, công nghệ đệm HOVR, thiết kế ổn định cho các bài tập gym và cross-training.",
        price: 2100000,
        category: "giay",
        brand: "Under Armour",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect fill='%23ffe6cc' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='14' fill='%23995700' text-anchor='middle' dy='.3em'%3ETraining UA%3C/text%3E%3C/svg%3E",
        sizes: ["39", "40", "41", "42", "43", "44"],
        inStock: true,
        featured: false,
        rating: 4.5,
        reviews: 178
    },
    {
        id: 13,
        name: "Quần short nữ Adidas",
        description: "Quần short thể thao nữ Adidas 3-Stripes, chất liệu recycled polyester, thiết kế thoải mái cho hoạt động.",
        price: 420000,
        category: "quan",
        brand: "Adidas",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect fill='%23e8f5e8' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='14' fill='%232e7d32' text-anchor='middle' dy='.3em'%3EShort nữ ADS%3C/text%3E%3C/svg%3E",
        sizes: ["XS", "S", "M", "L", "XL"],
        inStock: true,
        featured: false,
        rating: 4.1,
        reviews: 92
    },
    {
        id: 14,
        name: "Băng đô thể thao Nike",
        description: "Băng đô thể thao Nike Swoosh, chất liệu terry cotton thấm hút mồ hôi, thiết kế co giãn thoải mái.",
        price: 150000,
        category: "phu-kien",
        brand: "Nike",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect fill='%23ffebee' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='16' fill='%23c62828' text-anchor='middle' dy='.3em'%3EBăng đô Nike%3C/text%3E%3C/svg%3E",
        sizes: ["One Size"],
        inStock: true,
        featured: false,
        rating: 3.9,
        reviews: 34
    },
    {
        id: 15,
        name: "Áo polo thể thao Puma",
        description: "Áo polo thể thao Puma DryCELL, thiết kế classic fit, chất liệu polyester thoáng mát, phù hợp golf và tennis.",
        price: 780000,
        category: "ao",
        brand: "Puma",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect fill='%23e3f2fd' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='16' fill='%230277bd' text-anchor='middle' dy='.3em'%3EPolo Puma%3C/text%3E%3C/svg%3E",
        sizes: ["S", "M", "L", "XL", "XXL"],
        inStock: true,
        featured: false,
        rating: 4.3,
        reviews: 87
    },
    {
        id: 16,
        name: "Túi thể thao Adidas",
        description: "Túi thể thao Adidas Linear Duffel, thiết kế spacious với ngăn giày riêng, dây đeo có thể điều chỉnh.",
        price: 580000,
        category: "phu-kien",
        brand: "Adidas",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect fill='%23f1f8e9' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='16' fill='%2333691e' text-anchor='middle' dy='.3em'%3ETúi Adidas%3C/text%3E%3C/svg%3E",
        sizes: ["One Size"],
        inStock: true,
        featured: false,
        rating: 4.2,
        reviews: 156
    },
    {
        id: 17,
        name: "Giày lifestyle Nike Air Force 1",
        description: "Giày lifestyle Nike Air Force 1, thiết kế iconic với đế Air-Sole, upper leather cao cấp, phù hợp daily wear.",
        price: 2650000,
        category: "giay",
        brand: "Nike",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect fill='%23f5f5f5' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='14' fill='%23424242' text-anchor='middle' dy='.3em'%3EAir Force 1%3C/text%3E%3C/svg%3E",
        sizes: ["39", "40", "41", "42", "43", "44", "45"],
        inStock: true,
        featured: true,
        rating: 4.6,
        reviews: 289
    },
    {
        id: 18,
        name: "Quần jogger Under Armour",
        description: "Quần jogger Under Armour Rival Fleece, chất liệu fleece cotton blend ấm áp, thiết kế tapered fit hiện đại.",
        price: 990000,
        category: "quan",
        brand: "Under Armour",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect fill='%23e8eaf6' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='14' fill='%23283593' text-anchor='middle' dy='.3em'%3EJogger UA%3C/text%3E%3C/svg%3E",
        sizes: ["S", "M", "L", "XL", "XXL"],
        inStock: true,
        featured: false,
        rating: 4.4,
        reviews: 134
    },
    {
        id: 19,
        name: "Áo thun nữ Puma",
        description: "Áo thun thể thao nữ Puma Essential Logo, chất liệu cotton comfortable fit, thiết kế minimalist với logo Puma.",
        price: 490000,
        category: "ao",
        brand: "Puma",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect fill='%23fde7f3' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='14' fill='%23ad1457' text-anchor='middle' dy='.3em'%3EÁo thun nữ%3C/text%3E%3C/svg%3E",
        sizes: ["XS", "S", "M", "L", "XL"],
        inStock: true,
        featured: false,
        rating: 4.0,
        reviews: 76
    },
    {
        id: 20,
        name: "Găng tay tập gym",
        description: "Găng tay tập gym chống trượt, chất liệu synthetic leather bền bỉ, thiết kế breathable mesh, bảo vệ bàn tay.",
        price: 290000,
        category: "phu-kien",
        brand: "Nike",
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'%3E%3Crect fill='%23fff3e0' width='300' height='300'/%3E%3Ctext x='50%25' y='50%25' font-size='16' fill='%23e65100' text-anchor='middle' dy='.3em'%3EGăng tay%3C/text%3E%3C/svg%3E",
        sizes: ["S", "M", "L", "XL"],
        inStock: true,
        featured: false,
        rating: 4.1,
        reviews: 58
    }
];

// Hàm lấy tất cả sản phẩm
function getAllProducts() {
    return products;
}

// Hàm lấy sản phẩm theo ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Hàm lấy sản phẩm theo danh mục
function getProductsByCategory(category) {
    if (!category) return products;
    return products.filter(product => product.category === category);
}

// Hàm lấy sản phẩm theo thương hiệu
function getProductsByBrand(brand) {
    if (!brand) return products;
    return products.filter(product => product.brand === brand);
}

// Hàm tìm kiếm sản phẩm
function searchProducts(query) {
    if (!query) return products;
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm)
    );
}

// Hàm lọc sản phẩm theo giá
function filterProductsByPrice(products, minPrice, maxPrice) {
    return products.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
    );
}

// Hàm lấy sản phẩm nổi bật
function getFeaturedProducts() {
    return products.filter(product => product.featured);
}

// Hàm sắp xếp sản phẩm
function sortProducts(products, sortBy) {
    const sortedProducts = [...products];
    
    switch(sortBy) {
        case 'price-asc':
            return sortedProducts.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return sortedProducts.sort((a, b) => b.price - a.price);
        case 'name-asc':
            return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
            return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        case 'rating':
            return sortedProducts.sort((a, b) => b.rating - a.rating);
        default:
            return sortedProducts;
    }
}

// Hàm định dạng giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// Hàm tạo HTML cho sản phẩm
function createProductHTML(product) {
    return `
        <div class="product-card fade-in" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.featured ? '<span class="product-badge">Nổi bật</span>' : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-brand">${product.brand}</div>
                <div class="product-price">${formatPrice(product.price)}</div>
                <div class="product-rating">
                    ${generateStarRating(product.rating)}
                    <span class="review-count">(${product.reviews})</span>
                </div>
                <div class="product-actions">
                    <button class="btn-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Thêm vào giỏ
                    </button>
                    <button class="btn-wishlist" onclick="toggleWishlist(${product.id})">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Hàm lấy tên danh mục
function getCategoryName(category) {
    const categoryNames = {
        'ao': 'Áo thể thao',
        'quan': 'Quần thể thao',
        'giay': 'Giày thể thao',
        'phu-kien': 'Phụ kiện'
    };
    return categoryNames[category] || category;
}

// Hàm tạo rating sao
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    // Sao đầy
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Sao nửa
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Sao rỗng
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return `<span class="stars">${starsHTML}</span> <span class="rating-number">${rating}</span>`;
}