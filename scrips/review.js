document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const menuItems = document.querySelectorAll('.menu-item');
    const topicContent = document.getElementById('topic-content');
    const currentTopic = document.getElementById('current-topic');
    const contentPlaceholder = document.querySelector('.content-placeholder');
    
    // 加载JSON数据
    fetch('data/review-content.json')
        .then(response => response.json())
        .then(data => {
            // 处理菜单点击事件
            menuItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // 移除所有active类
                    menuItems.forEach(i => i.classList.remove('active'));
                    topicContent.classList.remove('active');
                    
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
                        topicContent.classList.add('active');
                    }
                });
            });
        })
        .catch(error => {
            console.error('加载内容数据失败:', error);
            contentPlaceholder.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <p>加载内容失败，请稍后再试</p>
            `;
        });
});
