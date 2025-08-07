// 文献数据 - 示例
const literatureData = {
    root: {
        title: "堵桥学核心文献库",
        icon: "fas fa-book"
    },
    children: [
        {
            id: "theory",
            title: "基础理论体系",
            icon: "fas fa-atom",
            content: `
                <h4>堵桥学基本原理</h4>
                <p>堵桥学作为一门跨学科科学，其核心理论基础建立于马尔科夫决策过程与纳什均衡的交叉融合。基础理论框架包含以下核心要素：</p>
                
                <h4>核心公式推导</h4>
                <p>胜率概率期望函数：P(w) = ∑[S∈Ω] Pr(S) × U(S, a<sup>*</sup>)</p>
                <p>其中Ω代表所有可能状态空间，Pr(S)为状态S的出现概率，U是效用函数，a*为最优决策策略。</p>
                
                <h4>动态决策模型</h4>
                <p>基于状态转移方程：S<sub>t+1</sub> = f(S<sub>t</sub>, A<sub>t</sub>, Θ)</p>
                <p>通过逆向归纳算法求解最优策略序列，在最小化成本的前提下最大化整体期望胜率。</p>
                
                <h4>博弈论应用</h4>
                <p>在对抗环境下引入贝叶斯博弈框架，构建不完全信息动态博弈模型，通过信号博弈与精炼贝叶斯均衡优化决策树。</p>
            `
        },
        {
            id: "tech",
            title: "应用技术研究",
            icon: "fas fa-laptop-code",
            content: `
                <h4>战术地图建模技术</h4>
                <p>基于GIS系统开发三维战术地图渲染引擎，结合地形数据、建筑结构和植被覆盖建立战场数字孪生体。</p>
                <p>创新性应用热力图层技术可视化敌我活动趋势，通过K-Means聚类识别高风险区域。</p>
                
                <h4>ANN动态路径规划</h4>
                <p>开发自适应神经网络架构，动态生成最优路径集：</p>
                <p>➤ 输入层：20维环境特征向量</p>
                <p>➤ 隐藏层：4层512个LSTM单元</p>
                <p>➤ 输出层：路径评分矩阵与安全系数</p>
                
                <h4>什纳-马尔科夫决策框架</h4>
                <p>创新性融合纳什均衡与马尔科夫决策过程，引入Q-learning算法实现策略空间优化：</p>
                <p>Q(S,A) ← (1-α)Q(S,A) + α[R + γmax<sub>A</sub>Q(S',A')]</p>
                <p>通过动态ε-贪婪策略平衡探索与利用，显著提升决策模型的适应性与鲁棒性。</p>
            `
        },
        {
            id: "case",
            title: "经典案例解析",
            icon: "fas fa-map-marked-alt",
            content: `
                <h4>2019深谷通道战役</h4>
                <p>战场特征：峡谷地形，三桥两隧，敌方占据制高点</p>
                <p>战略决策：佯攻主力吸引火力，特战队通过水道突袭</p>
                <p>理论应用：</p>
                <p>➤ 构建混合策略纳什均衡模型</p>
                <p>➤ 计算最小成本控制点</p>
                <p>➤ 采用双线佯动降低敌方预期</p>
                <p>结果：胜率从32%提升至78%，时间成本降低60%</p>
                
                <h4>2021滨海城区对峙</h4>
                <p>城市环境下的堵桥学实践：</p>
                <p>➤ 基于Voronoi图建立领域控制模型</p>
                <p>➤ 应用流体力学的压力梯度原理控制人流</p>
                <p>➤ 分布式传感器网络实时更新态势图</p>
                
                <h4>经典理论验证</h4>
                <p>蒙特卡洛模拟验证决策树深度与胜率关系：</p>
                <p>决策层数 > 7时，每增加一层胜率提升5.3±0.7%</p>
                <p>但计算成本呈指数增长，需平衡精度与效率</p>
            `
        },
        {
            id: "future",
            title: "未来研究方向",
            icon: "fas fa-rocket",
            content: `
                <h4>多智能体强化学习系统</h4>
                <p>构建分布式堵桥学决策云平台：</p>
                <p>➤ MADDPG框架实现多智能体协同</p>
                <p>➤ 联邦学习保护数据隐私</p>
                <p>➤ 区块链技术保障决策不可篡改性</p>
                
                <h4>脑机接口的战术应用</h4>
                <p>开发基于EEG信号分析的决策辅助系统：</p>
                <p>➤ α波与β波模式识别决策压力</p>
                <p>➤ 经颅直流电刺激增强判断能力</p>
                <p>➤ 神经反馈训练优化团队协作</p>
                
                <h4>量子计算加速决策</h4>
                <p>研究量子算法在堵桥学中的应用：</p>
                <p>➤ Grover算法加速状态空间搜索</p>
                <p>➤ 量子退火解决组合优化问题</p>
                <p>➤ 量子机器学习突破传统计算瓶颈</p>
                
                <h4>跨学科融合发展</h4>
                <p>结合认知科学、气候学与社会心理学：</p>
                <p>➤ 预测大规模人群行为模式</p>
                <p>➤ 极端天气下的策略适应性</p>
                <p>➤ 社会网络分析预判冲突点</p>
            `
        }
    ]
};

// 初始化阅览室
function initLiteratureRoom() {
    // 创建文献树结构
    createTreeStructure();
    
    // 添加事件监听
    document.querySelectorAll('.tree-child').forEach(item => {
        item.addEventListener('click', function() {
            loadDocumentContent(this.dataset.id);
        });
    });
    
    // 文本缩放功能
    const textSizeUp = document.getElementById('textSizeUp');
    const textSizeDown = document.getElementById('textSizeDown');
    const content = document.getElementById('documentContent');
    
    let fontSize = 16;
    
    textSizeUp.addEventListener('click', () => {
        fontSize = Math.min(fontSize + 1, 24);
        content.style.fontSize = `${fontSize}px`;
    });
    
    textSizeDown.addEventListener('click', () => {
        fontSize = Math.max(fontSize - 1, 12);
        content.style.fontSize = `${fontSize}px`;
    });
    
    // 搜索功能
    const searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('click', searchLiterature);
    
    // 初始加载欢迎信息
    document.getElementById('documentTitle').textContent = "堵桥学文献库";
}

// 创建树状结构
function createTreeStructure() {
    const treeContainer = document.getElementById('literatureTree');
    
    // 创建根节点
    const rootElement = document.createElement('div');
    rootElement.className = 'tree-root';
    rootElement.innerHTML = `
        <i class="${literatureData.root.icon}"></i>
        <span>${literatureData.root.title}</span>
    `;
    treeContainer.appendChild(rootElement);
    
    // 创建子节点容器
    const childrenContainer = document.createElement('div');
    childrenContainer.className = 'tree-children';
    
    // 添加子节点
    literatureData.children.forEach(child => {
        const childElement = document.createElement('div');
        childElement.className = 'tree-child';
        childElement.dataset.id = child.id;
        childElement.innerHTML = `
            <i class="${child.icon}"></i>
            <span>${child.title}</span>
        `;
        childrenContainer.appendChild(childElement);
    });
    
    treeContainer.appendChild(childrenContainer);
}

// 加载文献内容
function loadDocumentContent(id) {
    const doc = literatureData.children.find(item => item.id === id);
    
    if (doc) {
        // 更新标题
        document.getElementById('documentTitle').textContent = doc.title;
        
        // 更新内容
        document.getElementById('documentContent').innerHTML = `
            <div class="document-header">
                <h4>${doc.title}</h4>
                <p>BIT堵桥学研究文献 | 编号：#${id.toUpperCase()}</p>
            </div>
            ${doc.content}
        `;
        
        // 更新激活状态
        document.querySelectorAll('.tree-child').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`.tree-child[data-id="${id}"]`).classList.add('active');
        
        // 平滑滚动到顶部
        document.getElementById('documentContent').scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// 文献搜索功能
function searchLiterature() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        // 重置显示所有文献
        document.querySelectorAll('.tree-child').forEach(item => {
            item.style.display = 'flex';
        });
        return;
    }
    
    // 搜索并过滤
    let found = false;
    document.querySelectorAll('.tree-child').forEach(item => {
        const title = item.querySelector('span').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            item.style.display = 'flex';
            found = true;
            if (!document.querySelector('.tree-child.active')) {
                loadDocumentContent(item.dataset.id);
            }
        } else {
            item.style.display = 'none';
        }
    });
    
    // 如果没有匹配的文献
    if (!found) {
        document.getElementById('documentTitle').textContent = "搜索结果";
        document.getElementById('documentContent').innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>未找到与"${searchTerm}"相关的文献</p>
            </div>
        `;
        
        document.querySelectorAll('.tree-child.active').forEach(item => {
            item.classList.remove('active');
        });
    }
}

// 初始化阅览室
document.addEventListener('DOMContentLoaded', initLiteratureRoom);
