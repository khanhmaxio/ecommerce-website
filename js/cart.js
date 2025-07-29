// Quản lý giỏ hàng
class Cart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartCount();
    }

    // Tải giỏ hàng từ localStorage
    loadCart() {
        const cartData = localStorage.getItem('sportshop_cart');
        return cartData ? JSON.parse(cartData) : [];
    }

    // Lưu giỏ hàng vào localStorage
    saveCart() {
        localStorage.setItem('sportshop_cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    // Thêm sản phẩm vào giỏ hàng
    addItem(productId, size = null, quantity = 1) {
        const product = getProductById(productId);
        if (!product) {
            console.error('Không tìm thấy sản phẩm với ID:', productId);
            return false;
        }

        // Kiểm tra xem sản phẩm đã có trong giỏ chưa (cùng size)
        const existingItemIndex = this.items.findIndex(item => 
            item.productId === productId && item.size === size
        );

        if (existingItemIndex > -1) {
            // Nếu đã có, tăng số lượng
            this.items[existingItemIndex].quantity += quantity;
        } else {
            // Nếu chưa có, thêm mới
            this.items.push({
                productId: productId,
                size: size,
                quantity: quantity,
                addedAt: new Date().toISOString()
            });
        }

        this.saveCart();
        this.showAddToCartMessage(product.name);
        return true;
    }

    // Xóa sản phẩm khỏi giỏ hàng
    removeItem(productId, size = null) {
        this.items = this.items.filter(item => 
            !(item.productId === productId && item.size === size)
        );
        this.saveCart();
    }

    // Cập nhật số lượng sản phẩm
    updateQuantity(productId, size, quantity) {
        const itemIndex = this.items.findIndex(item => 
            item.productId === productId && item.size === size
        );

        if (itemIndex > -1) {
            if (quantity <= 0) {
                this.removeItem(productId, size);
            } else {
                this.items[itemIndex].quantity = quantity;
                this.saveCart();
            }
        }
    }

    // Lấy tất cả items trong giỏ
    getItems() {
        return this.items.map(item => {
            const product = getProductById(item.productId);
            return {
                ...item,
                product: product
            };
        });
    }

    // Lấy tổng số lượng sản phẩm
    getTotalQuantity() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Lấy tổng giá trị giỏ hàng
    getTotalPrice() {
        return this.items.reduce((total, item) => {
            const product = getProductById(item.productId);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
    }

    // Xóa toàn bộ giỏ hàng
    clear() {
        this.items = [];
        this.saveCart();
    }

    // Cập nhật số lượng hiển thị trên icon giỏ hàng
    updateCartCount() {
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            const count = this.getTotalQuantity();
            cartCountElement.textContent = count;
            cartCountElement.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    // Hiển thị thông báo đã thêm vào giỏ
    showAddToCartMessage(productName) {
        // Tạo và hiển thị toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Đã thêm "${productName}" vào giỏ hàng!</span>
        `;
        
        document.body.appendChild(toast);
        
        // Hiển thị toast
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Ẩn toast sau 3 giây
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    }

    // Kiểm tra xem có mã giảm giá không
    applyDiscount(code) {
        const discountCodes = {
            'WELCOME10': { type: 'percentage', value: 10, description: 'Giảm 10%' },
            'SAVE50K': { type: 'fixed', value: 50000, description: 'Giảm 50.000đ' },
            'NEWBIE20': { type: 'percentage', value: 20, description: 'Giảm 20% cho khách hàng mới' }
        };

        const discount = discountCodes[code.toUpperCase()];
        if (discount) {
            const currentTotal = this.getTotalPrice();
            let discountAmount = 0;
            
            if (discount.type === 'percentage') {
                discountAmount = currentTotal * (discount.value / 100);
            } else {
                discountAmount = Math.min(discount.value, currentTotal);
            }
            
            return {
                valid: true,
                description: discount.description,
                amount: discountAmount,
                finalTotal: currentTotal - discountAmount
            };
        }
        
        return { valid: false, message: 'Mã giảm giá không hợp lệ' };
    }
}

// Khởi tạo giỏ hàng
const cart = new Cart();

// Hàm thêm sản phẩm vào giỏ hàng (gọi từ UI)
function addToCart(productId, size = null, quantity = 1) {
    const product = getProductById(productId);
    if (!product) return;

    // Nếu sản phẩm có nhiều size và chưa chọn size
    if (product.sizes.length > 1 && !size) {
        showSizeSelectionModal(productId);
        return;
    }

    // Nếu chỉ có 1 size, sử dụng size đó
    if (product.sizes.length === 1 && !size) {
        size = product.sizes[0];
    }

    cart.addItem(productId, size, quantity);
}

// Hiển thị modal chọn size
function showSizeSelectionModal(productId) {
    const product = getProductById(productId);
    if (!product) return;

    // Tạo modal
    const modal = document.createElement('div');
    modal.className = 'size-modal-overlay';
    modal.innerHTML = `
        <div class="size-modal">
            <div class="size-modal-header">
                <h3>Chọn size cho ${product.name}</h3>
                <button class="close-modal" onclick="closeSizeModal()">&times;</button>
            </div>
            <div class="size-modal-body">
                <div class="size-options">
                    ${product.sizes.map(size => 
                        `<button class="size-option" data-size="${size}">${size}</button>`
                    ).join('')}
                </div>
                <div class="quantity-selector">
                    <label>Số lượng:</label>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus">-</button>
                        <input type="number" class="quantity-input" value="1" min="1">
                        <button class="quantity-btn plus">+</button>
                    </div>
                </div>
            </div>
            <div class="size-modal-footer">
                <button class="btn-secondary" onclick="closeSizeModal()">Hủy</button>
                <button class="btn-primary" onclick="confirmAddToCart(${productId})">Thêm vào giỏ</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Xử lý click chọn size
    modal.querySelectorAll('.size-option').forEach(btn => {
        btn.addEventListener('click', function() {
            modal.querySelectorAll('.size-option').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Xử lý quantity controls
    const quantityInput = modal.querySelector('.quantity-input');
    const minusBtn = modal.querySelector('.quantity-btn.minus');
    const plusBtn = modal.querySelector('.quantity-btn.plus');

    minusBtn.addEventListener('click', () => {
        const current = parseInt(quantityInput.value);
        if (current > 1) quantityInput.value = current - 1;
    });

    plusBtn.addEventListener('click', () => {
        const current = parseInt(quantityInput.value);
        quantityInput.value = current + 1;
    });

    // Focus vào modal
    setTimeout(() => modal.classList.add('show'), 50);
}

// Đóng modal chọn size
function closeSizeModal() {
    const modal = document.querySelector('.size-modal-overlay');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }, 300);
    }
}

// Xác nhận thêm vào giỏ sau khi chọn size
function confirmAddToCart(productId) {
    const modal = document.querySelector('.size-modal-overlay');
    const selectedSize = modal.querySelector('.size-option.selected');
    const quantity = parseInt(modal.querySelector('.quantity-input').value);

    if (!selectedSize) {
        alert('Vui lòng chọn size!');
        return;
    }

    cart.addItem(productId, selectedSize.dataset.size, quantity);
    closeSizeModal();
}

// CSS cho modal và toast
const modalCSS = `
<style>
.size-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.size-modal-overlay.show {
    opacity: 1;
}

.size-modal {
    background: white;
    border-radius: 15px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow: hidden;
    transform: scale(0.8);
    transition: transform 0.3s ease;
}

.size-modal-overlay.show .size-modal {
    transform: scale(1);
}

.size-modal-header {
    padding: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.size-modal-header h3 {
    margin: 0;
    color: #333;
}

.close-modal {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #999;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-modal:hover {
    color: #333;
}

.size-modal-body {
    padding: 20px;
}

.size-options {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
}

.size-option {
    background: #f8f9fa;
    border: 2px solid #e9ecef;
    padding: 10px 15px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    min-width: 50px;
    text-align: center;
}

.size-option:hover {
    border-color: #2c5aa0;
    color: #2c5aa0;
}

.size-option.selected {
    background: #2c5aa0;
    border-color: #2c5aa0;
    color: white;
}

.quantity-selector {
    display: flex;
    align-items: center;
    gap: 15px;
}

.quantity-controls {
    display: flex;
    align-items: center;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    overflow: hidden;
}

.quantity-btn {
    background: #f8f9fa;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s ease;
}

.quantity-btn:hover {
    background: #e9ecef;
}

.quantity-input {
    border: none;
    padding: 8px 12px;
    width: 60px;
    text-align: center;
    font-weight: 600;
    outline: none;
}

.size-modal-footer {
    padding: 20px;
    border-top: 1px solid #eee;
    display: flex;
    gap: 15px;
    justify-content: flex-end;
}

.toast-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #2c5aa0;
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 10001;
    transform: translateX(400px);
    opacity: 0;
    transition: all 0.3s ease;
}

.toast-notification.show {
    transform: translateX(0);
    opacity: 1;
}

.toast-notification i {
    color: #4caf50;
    font-size: 18px;
}

@media (max-width: 480px) {
    .size-modal {
        width: 95%;
        margin: 20px;
    }
    
    .toast-notification {
        right: 10px;
        left: 10px;
        width: auto;
    }
}
</style>
`;

// Thêm CSS vào head
document.head.insertAdjacentHTML('beforeend', modalCSS);