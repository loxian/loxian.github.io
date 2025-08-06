// script.js
document.addEventListener('DOMContentLoaded', function() {
    // 所有需要动画的元素
    const animatedElements = document.querySelectorAll('.animated');
    
    // 应用动画延迟
    animatedElements.forEach(el => {
        const delay = el.classList.contains('delay-1') ? 0.1 : 
                    el.classList.contains('delay-2') ? 0.2 : 
                    el.classList.contains('delay-3') ? 0.3 : 0;
        
        el.style.animationDelay = delay + 's';
    });
});
