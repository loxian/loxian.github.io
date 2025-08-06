document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const menuItems = document.querySelectorAll('.flat-menu-item');
    const topicContent = document.getElementById('topic-content');
    const currentTopic = document.getElementById('current-topic');
    const contentPlaceholder = document.querySelector('.content-placeholder');
    
    // 加载JSON数据
    fetch('data/review-content.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应不正常');
            }
            return response.json();
        })
        .then(data => {
            // 处理菜单点击事件
            menuItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // 移除所有active类
                    menuItems.forEach(i => i.classList.remove('active'));
                    
                    // 设置当前选中项
                    this.classList.add('active');
                    
                    // 获取主题ID
                    const topicId = this.dataset.topic;
                    
                    // 查找内容
                    const topic = data.find(t => t.id === topicId);
                    
                    if (topic) {
                        // 更新当前主题显示
                        currentTopic.textContent = topic.title;
                        
                        // 隐藏占位符
                        contentPlaceholder.style.display = 'none';
                        
                        // 填充内容
                        topicContent.innerHTML = `
                            <h2>${topic.title}</h2>
                            <div class="topic-description">
                                ${topic.content}
                            </div>
                        `;
                        
                        // 显示内容区域
                        topicContent.style.display = 'block';
                    } else {
                        // 如果未找到主题，显示错误信息
                        topicContent.innerHTML = `
                            <div class="error-message">
                                <i class="fas fa-exclamation-circle"></i>
                                <h3>内容未找到</h3>
                                <p>抱歉，请求的内容暂时不可用</p>
                            </div>
                        `;
                        topicContent.style.display = 'block';
                    }
                });
            });
            
            // 默认选择第一个菜单项
            if (menuItems.length > 0) {
                menuItems[0].click();
            }
        })
        .catch(error => {
            console.error('加载内容数据失败:', error);
            contentPlaceholder.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>数据加载失败</h3>
                    <p>请检查网络连接或稍后再试</p>
                    <p>错误信息: ${error.message}</p>
                </div>
            `;
        });
});
