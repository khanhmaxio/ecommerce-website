// Hệ thống xác thực người dùng
class Auth {
    constructor() {
        this.currentUser = this.loadUser();
        this.updateAuthUI();
    }

    // Tải thông tin người dùng từ localStorage
    loadUser() {
        const userData = localStorage.getItem('sportshop_user');
        return userData ? JSON.parse(userData) : null;
    }

    // Lưu thông tin người dùng vào localStorage
    saveUser(user) {
        localStorage.setItem('sportshop_user', JSON.stringify(user));
        this.currentUser = user;
        this.updateAuthUI();
    }

    // Đăng xuất
    logout() {
        localStorage.removeItem('sportshop_user');
        this.currentUser = null;
        this.updateAuthUI();
        
        // Chuyển về trang chủ nếu đang ở trang yêu cầu đăng nhập
        if (window.location.pathname.includes('profile.html') || 
            window.location.pathname.includes('orders.html')) {
            window.location.href = 'index.html';
        }
    }

    // Kiểm tra xem người dùng đã đăng nhập chưa
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Lấy thông tin người dùng hiện tại
    getCurrentUser() {
        return this.currentUser;
    }

    // Đăng ký tài khoản mới
    register(userData) {
        // Kiểm tra dữ liệu đầu vào
        const validation = this.validateRegistrationData(userData);
        if (!validation.valid) {
            return { success: false, message: validation.message };
        }

        // Kiểm tra email đã tồn tại chưa
        const existingUsers = this.getAllUsers();
        const emailExists = existingUsers.some(user => user.email === userData.email);
        
        if (emailExists) {
            return { success: false, message: 'Email này đã được sử dụng!' };
        }

        // Tạo tài khoản mới
        const newUser = {
            id: Date.now(),
            email: userData.email,
            password: this.hashPassword(userData.password), // Trong thực tế cần hash phức tạp hơn
            firstName: userData.firstName,
            lastName: userData.lastName,
            phone: userData.phone || '',
            address: userData.address || '',
            dateOfBirth: userData.dateOfBirth || '',
            gender: userData.gender || '',
            createdAt: new Date().toISOString(),
            isVerified: false
        };

        // Lưu vào danh sách users
        existingUsers.push(newUser);
        localStorage.setItem('sportshop_users', JSON.stringify(existingUsers));

        // Tự động đăng nhập
        this.saveUser({
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            phone: newUser.phone,
            address: newUser.address,
            isVerified: newUser.isVerified
        });

        return { success: true, message: 'Đăng ký thành công!' };
    }

    // Đăng nhập
    login(email, password) {
        const users = this.getAllUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            return { success: false, message: 'Email không tồn tại!' };
        }

        if (user.password !== this.hashPassword(password)) {
            return { success: false, message: 'Mật khẩu không chính xác!' };
        }

        // Đăng nhập thành công
        this.saveUser({
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            address: user.address,
            isVerified: user.isVerified
        });

        return { success: true, message: 'Đăng nhập thành công!' };
    }

    // Lấy tất cả users (chỉ dùng để kiểm tra)
    getAllUsers() {
        const usersData = localStorage.getItem('sportshop_users');
        return usersData ? JSON.parse(usersData) : [];
    }

    // Validate dữ liệu đăng ký
    validateRegistrationData(data) {
        if (!data.email || !this.isValidEmail(data.email)) {
            return { valid: false, message: 'Email không hợp lệ!' };
        }

        if (!data.password || data.password.length < 6) {
            return { valid: false, message: 'Mật khẩu phải có ít nhất 6 ký tự!' };
        }

        if (data.password !== data.confirmPassword) {
            return { valid: false, message: 'Xác nhận mật khẩu không khớp!' };
        }

        if (!data.firstName || data.firstName.trim().length < 2) {
            return { valid: false, message: 'Tên phải có ít nhất 2 ký tự!' };
        }

        if (!data.lastName || data.lastName.trim().length < 2) {
            return { valid: false, message: 'Họ phải có ít nhất 2 ký tự!' };
        }

        return { valid: true };
    }

    // Kiểm tra email hợp lệ
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Hash mật khẩu (đơn giản, trong thực tế cần phức tạp hơn)
    hashPassword(password) {
        // Đây chỉ là ví dụ đơn giản, thực tế cần dùng thư viện hash mạnh hơn
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString();
    }

    // Cập nhật UI dựa trên trạng thái đăng nhập
    updateAuthUI() {
        const authLink = document.getElementById('auth-link');
        
        if (authLink) {
            if (this.isLoggedIn()) {
                const user = this.getCurrentUser();
                authLink.innerHTML = `
                    <div class="user-menu">
                        <span class="user-name">Xin chào, ${user.firstName}!</span>
                        <div class="user-dropdown">
                            <a href="profile.html"><i class="fas fa-user"></i> Tài khoản</a>
                            <a href="orders.html"><i class="fas fa-box"></i> Đơn hàng</a>
                            <a href="#" onclick="auth.logout()"><i class="fas fa-sign-out-alt"></i> Đăng xuất</a>
                        </div>
                    </div>
                `;
            } else {
                authLink.innerHTML = '<a href="login.html">Đăng nhập</a>';
            }
        }
    }

    // Cập nhật thông tin người dùng
    updateProfile(userData) {
        if (!this.isLoggedIn()) {
            return { success: false, message: 'Bạn chưa đăng nhập!' };
        }

        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        
        if (userIndex === -1) {
            return { success: false, message: 'Không tìm thấy thông tin người dùng!' };
        }

        // Cập nhật thông tin
        const updatedUser = {
            ...users[userIndex],
            firstName: userData.firstName || users[userIndex].firstName,
            lastName: userData.lastName || users[userIndex].lastName,
            phone: userData.phone || users[userIndex].phone,
            address: userData.address || users[userIndex].address,
            dateOfBirth: userData.dateOfBirth || users[userIndex].dateOfBirth,
            gender: userData.gender || users[userIndex].gender
        };

        users[userIndex] = updatedUser;
        localStorage.setItem('sportshop_users', JSON.stringify(users));

        // Cập nhật current user
        this.saveUser({
            id: updatedUser.id,
            email: updatedUser.email,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            phone: updatedUser.phone,
            address: updatedUser.address,
            isVerified: updatedUser.isVerified
        });

        return { success: true, message: 'Cập nhật thông tin thành công!' };
    }

    // Đổi mật khẩu
    changePassword(currentPassword, newPassword) {
        if (!this.isLoggedIn()) {
            return { success: false, message: 'Bạn chưa đăng nhập!' };
        }

        const users = this.getAllUsers();
        const user = users.find(u => u.id === this.currentUser.id);
        
        if (!user) {
            return { success: false, message: 'Không tìm thấy thông tin người dùng!' };
        }

        // Kiểm tra mật khẩu hiện tại
        if (user.password !== this.hashPassword(currentPassword)) {
            return { success: false, message: 'Mật khẩu hiện tại không chính xác!' };
        }

        // Kiểm tra mật khẩu mới
        if (newPassword.length < 6) {
            return { success: false, message: 'Mật khẩu mới phải có ít nhất 6 ký tự!' };
        }

        // Cập nhật mật khẩu
        user.password = this.hashPassword(newPassword);
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        users[userIndex] = user;
        localStorage.setItem('sportshop_users', JSON.stringify(users));

        return { success: true, message: 'Đổi mật khẩu thành công!' };
    }

    // Kiểm tra quyền truy cập trang
    requireAuth() {
        if (!this.isLoggedIn()) {
            alert('Bạn cần đăng nhập để truy cập trang này!');
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
}

// Khởi tạo hệ thống auth
const auth = new Auth();

// CSS cho user menu
const authCSS = `
<style>
.user-menu {
    position: relative;
    cursor: pointer;
}

.user-name {
    color: white;
    font-weight: 500;
    padding: 8px 12px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.1);
    transition: background 0.3s ease;
}

.user-menu:hover .user-name {
    background: rgba(255, 255, 255, 0.2);
}

.user-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    min-width: 180px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.15);
    border-radius: 8px;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    margin-top: 10px;
}

.user-menu:hover .user-dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.user-dropdown a {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    color: #333;
    text-decoration: none;
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.3s ease;
}

.user-dropdown a:last-child {
    border-bottom: none;
}

.user-dropdown a:hover {
    background: #f8f9fa;
    color: #2c5aa0;
}

.user-dropdown a i {
    margin-right: 8px;
    width: 16px;
    text-align: center;
}

@media (max-width: 768px) {
    .user-dropdown {
        right: -20px;
    }
}
</style>
`;

// Thêm CSS vào head
document.head.insertAdjacentHTML('beforeend', authCSS);