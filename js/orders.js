// Quản lý đơn hàng
class OrderManager {
    constructor() {
        this.orders = this.loadOrders();
    }

    // Tải đơn hàng từ localStorage
    loadOrders() {
        const ordersData = localStorage.getItem('sportshop_orders');
        return ordersData ? JSON.parse(ordersData) : [];
    }

    // Lưu đơn hàng vào localStorage
    saveOrders() {
        localStorage.setItem('sportshop_orders', JSON.stringify(this.orders));
    }

    // Tạo đơn hàng mới
    createOrder(orderData) {
        const newOrder = {
            id: this.generateOrderId(),
            userId: orderData.userId,
            items: orderData.items,
            customerInfo: orderData.customerInfo,
            shippingAddress: orderData.shippingAddress,
            paymentMethod: orderData.paymentMethod,
            subtotal: orderData.subtotal,
            shippingFee: orderData.shippingFee,
            discount: orderData.discount || 0,
            total: orderData.total,
            status: 'pending',
            createdAt: new Date().toISOString(),
            estimatedDelivery: this.calculateEstimatedDelivery(),
            trackingNumber: this.generateTrackingNumber()
        };

        this.orders.push(newOrder);
        this.saveOrders();

        return newOrder;
    }

    // Tạo ID đơn hàng
    generateOrderId() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `SP${timestamp}${random}`.substr(0, 12);
    }

    // Tạo mã tracking
    generateTrackingNumber() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = 'SP';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // Tính ngày giao hàng dự kiến
    calculateEstimatedDelivery() {
        const now = new Date();
        const deliveryDate = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000)); // +3 ngày
        return deliveryDate.toISOString();
    }

    // Lấy đơn hàng theo user ID
    getOrdersByUserId(userId) {
        return this.orders.filter(order => order.userId === userId)
                          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // Lấy đơn hàng theo ID
    getOrderById(orderId) {
        return this.orders.find(order => order.id === orderId);
    }

    // Cập nhật trạng thái đơn hàng
    updateOrderStatus(orderId, newStatus) {
        const orderIndex = this.orders.findIndex(order => order.id === orderId);
        if (orderIndex > -1) {
            this.orders[orderIndex].status = newStatus;
            this.orders[orderIndex].updatedAt = new Date().toISOString();
            
            // Cập nhật thông tin theo trạng thái
            if (newStatus === 'shipping') {
                this.orders[orderIndex].shippedAt = new Date().toISOString();
            } else if (newStatus === 'delivered') {
                this.orders[orderIndex].deliveredAt = new Date().toISOString();
            }
            
            this.saveOrders();
            return true;
        }
        return false;
    }

    // Hủy đơn hàng
    cancelOrder(orderId, reason = '') {
        const orderIndex = this.orders.findIndex(order => order.id === orderId);
        if (orderIndex > -1 && this.orders[orderIndex].status === 'pending') {
            this.orders[orderIndex].status = 'cancelled';
            this.orders[orderIndex].cancelledAt = new Date().toISOString();
            this.orders[orderIndex].cancelReason = reason;
            this.saveOrders();
            return true;
        }
        return false;
    }

    // Lấy tên trạng thái bằng tiếng Việt
    getStatusName(status) {
        const statusNames = {
            'pending': 'Chờ xử lý',
            'confirmed': 'Đã xác nhận',
            'processing': 'Đang chuẩn bị',
            'shipping': 'Đang giao hàng',
            'delivered': 'Đã giao hàng',
            'cancelled': 'Đã hủy',
            'returned': 'Đã trả hàng'
        };
        return statusNames[status] || status;
    }

    // Lấy màu trạng thái
    getStatusColor(status) {
        const statusColors = {
            'pending': '#ffc107',
            'confirmed': '#17a2b8',
            'processing': '#6f42c1',
            'shipping': '#fd7e14',
            'delivered': '#28a745',
            'cancelled': '#dc3545',
            'returned': '#6c757d'
        };
        return statusColors[status] || '#6c757d';
    }

    // Lấy icon trạng thái
    getStatusIcon(status) {
        const statusIcons = {
            'pending': 'fas fa-clock',
            'confirmed': 'fas fa-check-circle',
            'processing': 'fas fa-cog fa-spin',
            'shipping': 'fas fa-truck',
            'delivered': 'fas fa-box',
            'cancelled': 'fas fa-times-circle',
            'returned': 'fas fa-undo'
        };
        return statusIcons[status] || 'fas fa-question-circle';
    }

    // Tính tổng đã chi tiêu của user
    getTotalSpentByUser(userId) {
        return this.orders
            .filter(order => order.userId === userId && 
                    ['confirmed', 'processing', 'shipping', 'delivered'].includes(order.status))
            .reduce((total, order) => total + order.total, 0);
    }

    // Đếm đơn hàng theo trạng thái
    getOrderCountByStatus(userId, status) {
        return this.orders.filter(order => 
            order.userId === userId && order.status === status
        ).length;
    }

    // Tạo HTML cho item đơn hàng trong danh sách
    createOrderItemHTML(order) {
        const statusColor = this.getStatusColor(order.status);
        const statusIcon = this.getStatusIcon(order.status);
        const statusName = this.getStatusName(order.status);
        
        return `
            <div class="order-item" data-order-id="${order.id}">
                <div class="order-header">
                    <div class="order-info">
                        <h3 class="order-id">Đơn hàng #${order.id}</h3>
                        <div class="order-date">Đặt ngày: ${this.formatDate(order.createdAt)}</div>
                    </div>
                    <div class="order-status" style="color: ${statusColor}">
                        <i class="${statusIcon}"></i>
                        <span>${statusName}</span>
                    </div>
                </div>
                
                <div class="order-items">
                    ${order.items.slice(0, 3).map(item => {
                        const product = getProductById(item.productId);
                        return product ? `
                            <div class="order-product">
                                <img src="${product.image}" alt="${product.name}">
                                <div class="product-info">
                                    <div class="product-name">${product.name}</div>
                                    <div class="product-details">Size: ${item.size} | SL: ${item.quantity}</div>
                                </div>
                            </div>
                        ` : '';
                    }).join('')}
                    ${order.items.length > 3 ? `<div class="more-items">+${order.items.length - 3} sản phẩm khác</div>` : ''}
                </div>
                
                <div class="order-footer">
                    <div class="order-total">
                        <strong>Tổng: ${formatPrice(order.total)}</strong>
                    </div>
                    <div class="order-actions">
                        <button class="btn-secondary" onclick="viewOrderDetail('${order.id}')">
                            Xem chi tiết
                        </button>
                        ${order.status === 'pending' ? `
                            <button class="btn-danger" onclick="cancelOrder('${order.id}')">
                                Hủy đơn
                            </button>
                        ` : ''}
                        ${order.status === 'delivered' ? `
                            <button class="btn-primary" onclick="reorderItems('${order.id}')">
                                Đặt lại
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    // Tạo HTML chi tiết đơn hàng
    createOrderDetailHTML(order) {
        const statusColor = this.getStatusColor(order.status);
        const statusIcon = this.getStatusIcon(order.status);
        const statusName = this.getStatusName(order.status);

        return `
            <div class="order-detail">
                <div class="order-detail-header">
                    <h2>Chi tiết đơn hàng #${order.id}</h2>
                    <div class="order-status" style="color: ${statusColor}">
                        <i class="${statusIcon}"></i>
                        <span>${statusName}</span>
                    </div>
                </div>

                <div class="order-progress">
                    ${this.createOrderProgressHTML(order)}
                </div>

                <div class="order-sections">
                    <div class="section">
                        <h3>Thông tin giao hàng</h3>
                        <div class="info-grid">
                            <div class="info-item">
                                <label>Họ tên:</label>
                                <span>${order.customerInfo.fullName}</span>
                            </div>
                            <div class="info-item">
                                <label>Số điện thoại:</label>
                                <span>${order.customerInfo.phone}</span>
                            </div>
                            <div class="info-item">
                                <label>Email:</label>
                                <span>${order.customerInfo.email}</span>
                            </div>
                            <div class="info-item">
                                <label>Địa chỉ:</label>
                                <span>${order.shippingAddress}</span>
                            </div>
                            <div class="info-item">
                                <label>Mã vận đơn:</label>
                                <span>${order.trackingNumber}</span>
                            </div>
                            <div class="info-item">
                                <label>Dự kiến giao:</label>
                                <span>${this.formatDate(order.estimatedDelivery)}</span>
                            </div>
                        </div>
                    </div>

                    <div class="section">
                        <h3>Sản phẩm đặt mua</h3>
                        <div class="order-products">
                            ${order.items.map(item => {
                                const product = getProductById(item.productId);
                                return product ? `
                                    <div class="product-row">
                                        <img src="${product.image}" alt="${product.name}">
                                        <div class="product-info">
                                            <div class="product-name">${product.name}</div>
                                            <div class="product-brand">${product.brand}</div>
                                            <div class="product-size">Size: ${item.size}</div>
                                        </div>
                                        <div class="product-quantity">x${item.quantity}</div>
                                        <div class="product-price">${formatPrice(product.price * item.quantity)}</div>
                                    </div>
                                ` : '';
                            }).join('')}
                        </div>
                    </div>

                    <div class="section">
                        <h3>Thanh toán</h3>
                        <div class="payment-summary">
                            <div class="summary-row">
                                <span>Tạm tính:</span>
                                <span>${formatPrice(order.subtotal)}</span>
                            </div>
                            <div class="summary-row">
                                <span>Phí vận chuyển:</span>
                                <span>${order.shippingFee > 0 ? formatPrice(order.shippingFee) : 'Miễn phí'}</span>
                            </div>
                            ${order.discount > 0 ? `
                                <div class="summary-row">
                                    <span>Giảm giá:</span>
                                    <span>-${formatPrice(order.discount)}</span>
                                </div>
                            ` : ''}
                            <div class="summary-row total">
                                <span>Tổng cộng:</span>
                                <span>${formatPrice(order.total)}</span>
                            </div>
                            <div class="payment-method">
                                <span>Phương thức thanh toán: ${order.paymentMethod}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Tạo HTML cho thanh tiến trình đơn hàng
    createOrderProgressHTML(order) {
        const steps = [
            { key: 'pending', name: 'Đặt hàng', icon: 'fas fa-shopping-cart' },
            { key: 'confirmed', name: 'Xác nhận', icon: 'fas fa-check' },
            { key: 'processing', name: 'Chuẩn bị', icon: 'fas fa-box' },
            { key: 'shipping', name: 'Vận chuyển', icon: 'fas fa-truck' },
            { key: 'delivered', name: 'Hoàn thành', icon: 'fas fa-check-circle' }
        ];

        const currentStepIndex = steps.findIndex(step => step.key === order.status);
        
        return `
            <div class="progress-steps">
                ${steps.map((step, index) => {
                    const isCompleted = index <= currentStepIndex && order.status !== 'cancelled';
                    const isActive = index === currentStepIndex && order.status !== 'cancelled';
                    const isCancelled = order.status === 'cancelled' && index > 0;
                    
                    return `
                        <div class="progress-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''} ${isCancelled ? 'cancelled' : ''}">
                            <div class="step-icon">
                                <i class="${step.icon}"></i>
                            </div>
                            <div class="step-name">${step.name}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    // Format ngày tháng
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Khởi tạo order manager
const orderManager = new OrderManager();