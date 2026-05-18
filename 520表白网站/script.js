// 520表白网站交互脚本

// 全局变量
let meterValue = 0;
let meterInterval;
let isMeterFull = false;

// 页面切换函数
function showPage(pageId) {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示目标页面
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        setTimeout(() => {
            targetPage.classList.add('active');
        }, 100);
    }
}

// 开始旅程
function startJourney() {
    // 尝试播放背景音乐
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.play().catch(e => {
        console.log('音乐自动播放被阻止，需要用户交互');
    });
    
    showPage('memory-page');
    createPetals();
}

// 显示隐藏消息
function showMessage(id) {
    const msg = document.getElementById('msg' + id);
    if (msg) {
        msg.classList.add('show');
        
        // 添加爱心特效
        createHeartBurst(event.clientX, event.clientY);
    }
}

// 前往心动测试
function goToQuestion() {
    showPage('test-page');
    initHeartMeter();
}

// 初始化心动测试
function initHeartMeter() {
    const heartIcon = document.querySelector('.heart-icon');
    const meterFill = document.getElementById('meterFill');
    const testResult = document.getElementById('test-result');
    const btnToLetter = document.getElementById('btnToLetter');
    
    // 鼠标/触摸按下事件
    const startPumping = (e) => {
        e.preventDefault();
        if (isMeterFull) return;
        
        heartIcon.classList.add('pumping');
        
        meterInterval = setInterval(() => {
            meterValue += 2;
            if (meterValue > 100) meterValue = 100;
            
            meterFill.style.width = meterValue + '%';
            
            // 添加心跳音效（可选）
            if (meterValue % 20 === 0) {
                heartIcon.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    heartIcon.style.transform = 'scale(1)';
                }, 100);
            }
            
            if (meterValue >= 100 && !isMeterFull) {
                isMeterFull = true;
                clearInterval(meterInterval);
                
                // 显示结果
                setTimeout(() => {
                    testResult.classList.remove('hidden');
                    btnToLetter.style.display = 'inline-block';
                    
                    // 庆祝特效
                    createFireworks();
                }, 500);
            }
        }, 50);
    };
    
    // 鼠标/触摸释放事件
    const stopPumping = () => {
        heartIcon.classList.remove('pumping');
        clearInterval(meterInterval);
        
        // 如果不满，慢慢减少
        if (!isMeterFull) {
            const decreaseInterval = setInterval(() => {
                meterValue -= 1;
                if (meterValue < 0) meterValue = 0;
                meterFill.style.width = meterValue + '%';
                
                if (meterValue === 0) {
                    clearInterval(decreaseInterval);
                }
            }, 100);
        }
    };
    
    // 绑定事件
    heartIcon.addEventListener('mousedown', startPumping);
    heartIcon.addEventListener('mouseup', stopPumping);
    heartIcon.addEventListener('mouseleave', stopPumping);
    heartIcon.addEventListener('touchstart', startPumping);
    heartIcon.addEventListener('touchend', stopPumping);
}

// 前往表白信
function goToLoveLetter() {
    showPage('letter-page');
}

// 打开信封
function openEnvelope() {
    const envelope = document.querySelector('.envelope');
    const btnToFinal = document.getElementById('btnToFinal');
    
    envelope.classList.add('open');
    
    // 显示继续按钮
    setTimeout(() => {
        btnToFinal.style.display = 'inline-block';
    }, 1500);
    
    // 播放打开信封的音效（可选）
    createHeartBurst(window.innerWidth / 2, window.innerHeight / 2);
}

// 前往最终页面
function goToFinal() {
    showPage('final-page');
    startFloatingHearts();
}

// 点击"我愿意"
function sayYes() {
    const successMessage = document.getElementById('success-message');
    const finalButtons = document.querySelector('.final-buttons');
    
    finalButtons.style.display = 'none';
    successMessage.classList.remove('hidden');
    
    // 开始计时
    startLoveTimer();
    
    // 盛大庆祝
    createGrandCelebration();
}

// "不愿意"按钮逃跑效果
function runAway() {
    const btnNo = document.getElementById('btnNo');
    const container = document.querySelector('.final-container');
    const containerRect = container.getBoundingClientRect();
    
    // 计算随机位置
    const maxX = containerRect.width - btnNo.offsetWidth - 20;
    const maxY = containerRect.height - btnNo.offsetHeight - 20;
    
    const randomX = Math.random() * maxX - maxX / 2;
    const randomY = Math.random() * maxY - maxY / 2;
    
    btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    // 改变按钮文字
    const texts = ['再想想？', '不要嘛', '点左边', '选我呀', '❤️'];
    btnNo.textContent = texts[Math.floor(Math.random() * texts.length)];
}

// 创建花瓣飘落效果
function createPetals() {
    const container = document.getElementById('petals-container');
    const petals = ['🌸', '🌺', '🌹', '💮', '🏵️', '❤️', '💕', '💖'];
    
    setInterval(() => {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 3 + 3) + 's';
        petal.style.fontSize = (Math.random() * 15 + 15) + 'px';
        
        container.appendChild(petal);
        
        // 动画结束后移除
        setTimeout(() => {
            petal.remove();
        }, 6000);
    }, 300);
}

// 创建爱心爆发效果
function createHeartBurst(x, y) {
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘'];
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = '24px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.animation = 'heartBurst 1s ease-out forwards';
        
        // 随机方向
        const angle = (i / 8) * Math.PI * 2;
        const distance = 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty + 'px');
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
    }
}

// 创建烟花效果
function createFireworks() {
    const colors = ['#ff6b6b', '#ff9a9e', '#ffd93d', '#6bcf7f', '#4d96ff'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.style.position = 'fixed';
            firework.style.left = Math.random() * window.innerWidth + 'px';
            firework.style.top = Math.random() * window.innerHeight + 'px';
            firework.style.width = '10px';
            firework.style.height = '10px';
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            firework.style.borderRadius = '50%';
            firework.style.pointerEvents = 'none';
            firework.style.zIndex = '9999';
            firework.style.animation = 'firework 1s ease-out forwards';
            
            document.body.appendChild(firework);
            
            setTimeout(() => firework.remove(), 1000);
        }, i * 100);
    }
}

// 盛大庆祝
function createGrandCelebration() {
    // 大量烟花
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createFireworks(), i * 500);
    }
    
    // 爱心雨
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘', '💓', '💞'];
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = '-50px';
            heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9998';
            heart.style.animation = 'heartRain 3s linear forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 3000);
        }, i * 100);
    }
}

// 浮动爱心动画
function startFloatingHearts() {
    const floatingHearts = document.querySelectorAll('.floating-heart');
    floatingHearts.forEach((heart, index) => {
        heart.style.animationDelay = (index * 0.2) + 's';
    });
}

// 爱情计时器
function startLoveTimer() {
    // 设置开始日期（可以根据实际情况修改）
    const startDate = new Date('2025-05-20');
    
    function updateTimer() {
        const now = new Date();
        const diff = now - startDate;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        const daysElement = document.getElementById('days');
        if (daysElement) {
            daysElement.textContent = Math.max(1, days);
        }
    }
    
    updateTimer();
    setInterval(updateTimer, 1000 * 60 * 60); // 每小时更新一次
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes heartBurst {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes firework {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
    
    @keyframes heartRain {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加页面可见性检测，当页面可见时重新启动花瓣
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
            createPetals();
        }
    });
    
    // 添加键盘支持
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const activePage = document.querySelector('.page.active');
            if (activePage) {
                const nextBtn = activePage.querySelector('.btn-next, .btn-start');
                if (nextBtn && nextBtn.style.display !== 'none') {
                    nextBtn.click();
                }
            }
        }
    });
});

// 防止右键菜单（可选，增加神秘感）
document.addEventListener('contextmenu', function(e) {
    // 可以选择取消注释下面这行来禁用右键
    // e.preventDefault();
});

// 控制台彩蛋
console.log('%c❤️ 520 我爱你 ❤️', 'font-size: 30px; color: #ff6b6b; font-weight: bold;');
console.log('%c这是一份特别的表白礼物', 'font-size: 14px; color: #666;');
console.log('%c祝你们幸福！💕', 'font-size: 14px; color: #ff9a9e;');
