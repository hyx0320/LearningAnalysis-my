// 页面数据定义
const pageData = {
    knowledgeGraph: {
        nodes: [
            { id: '1', name: 'JavaScript基础', symbolSize: 50, category: 1, value: 20 },
            { id: '2', name: '变量作用域', symbolSize: 40, category: 1, value: 15 },
            { id: '3', name: '闭包', symbolSize: 45, category: 2, value: 18 },
            { id: '4', name: '异步编程', symbolSize: 50, category: 0, value: 25 },
            { id: '5', name: 'Promise', symbolSize: 45, category: 0, value: 22 },
            { id: '6', name: '事件循环', symbolSize: 35, category: 2, value: 12 },
            { id: '7', name: 'DOM操作', symbolSize: 30, category: 1, value: 10 },
            { id: '8', name: 'ES6+', symbolSize: 48, category: 1, value: 19 },
        ],
        links: [
            { source: '1', target: '2' },
            { source: '1', target: '3' },
            { source: '1', target: '7' },
            { source: '1', target: '8' },
            { source: '3', target: '6' },
            { source: '4', target: '5' },
            { source: '4', target: '6' },
            { source: '8', target: '4' },
        ],
        categories: [
            { name: '薄弱点' },
            { name: '已掌握' },
            { name: '待加强' }
        ]
    },
    timelineItems: [
        { title: '题目 1：关于变量作用域', time: '2023-10-01 10:30', status: '已掌握', statusClass: 'status-mastered' },
        { title: '题目 2：深入理解闭包', time: '2023-10-01 11:15', status: '待加强', statusClass: 'status-improving' },
        { title: '题目 3：异步编程与Promise', time: '2023-10-02 09:00', status: '薄弱点', statusClass: 'status-weak' },
        { title: '题目 4：事件循环与宏任务', time: '2023-10-03 14:20', status: '薄弱点', statusClass: 'status-weak' },
        { title: '题目 5：ES6箭头函数', time: '2023-10-04 10:45', status: '已掌握', statusClass: 'status-mastered' }
    ],
    errorAnalysis: `
        <p>
            在"异步编程与Promise"题目中，主要错误在于对 <span class="keyword">Promise.all</span> 的使用场景理解不清。当其中一个Promise被 reject 时，整个 Promise.all 会立即失败，而未考虑到需要等待所有Promise完成（无论成功或失败）的场景，此时应使用 <span class="keyword">Promise.allSettled</span>。
        </p>
        <p>
            此外，对于<span class="keyword">事件循环(Event Loop)</span>的宏任务与微任务执行顺序的掌握也存在不足，特别是对setTimeout与Promise执行顺序的理解不够深入。
        </p>
    `,
    knowledgeGaps: [
        'Promise.allSettled 的具体用法',
        '宏任务与微任务的执行差异',
        'JavaScript 垃圾回收机制',
        '闭包的内存泄漏问题',
        'async/await错误处理'
    ],
    knowledgeTree: {
        name: 'JavaScript',
        children: [
            {
                name: '异步编程',
                itemStyle: { color: '#ff4d4f', borderColor: '#ff4d4f' },
                children: [
                    { name: 'Promise', itemStyle: { color: '#ff4d4f' } },
                    { name: 'async/await', itemStyle: { color: '#faad14' } },
                    { name: '事件循环', itemStyle: { color: '#ff4d4f' } }
                ]
            },
            {
                name: 'ES6+',
                itemStyle: { color: '#52c41a', borderColor: '#52c41a' },
                children: [
                    { name: '箭头函数', itemStyle: { color: '#52c41a' } },
                    { name: '解构赋值', itemStyle: { color: '#52c41a' } },
                    { name: '模板字符串', itemStyle: { color: '#52c41a' } }
                ]
            },
            {
                name: '作用域',
                itemStyle: { color: '#faad14', borderColor: '#faad14' },
                children: [
                    { name: '闭包', itemStyle: { color: '#faad14' } },
                    { name: '变量提升', itemStyle: { color: '#52c41a' } }
                ]
            }
        ]
    }
};

// API接口 - 模拟从后端获取数据
function fetchData() {
    return new Promise((resolve) => {
        // 模拟网络延迟
        setTimeout(() => {
            resolve(pageData);
        }, 1500);
    });
}

// 页面初始化函数
document.addEventListener('DOMContentLoaded', function () {
    const loadingOverlay = document.getElementById('loading');
    
    // 初始化图表
    function initCharts(data) {
        // 知识图谱
        const graphChart = echarts.init(document.getElementById('knowledge-graph'));
        const graphOption = {
            tooltip: {
                formatter: '{b}'
            },
            legend: [{
                data: data.knowledgeGraph.categories.map(a => a.name),
                textStyle: { color: '#fff' },
                right: 20,
                top: 20
            }],
            color: ['#ff4d4f', '#52c41a', '#faad14'],
            animationDuration: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [{
                type: 'graph',
                layout: 'force',
                data: data.knowledgeGraph.nodes.map(node => ({
                    ...node,
                    itemStyle: {
                        color: ['#ff4d4f', '#52c41a', '#faad14'][node.category]
                    },
                    label: {
                        show: true,
                        position: 'right',
                        formatter: '{b}',
                        color: '#fff',
                        fontSize: 14
                    }
                })),
                links: data.knowledgeGraph.links,
                categories: data.knowledgeGraph.categories,
                roam: true,
                force: {
                    repulsion: 150,
                    edgeLength: 80,
                    gravity: 0.1
                },
                lineStyle: {
                    color: '#00ffff',
                    width: 2,
                    curveness: 0.1,
                    opacity: 0.7
                },
                edgeSymbol: ['none', 'arrow'],
                edgeSymbolSize: [4, 10],
                emphasis: {
                    focus: 'adjacency',
                    lineStyle: {
                        width: 4
                    }
                },
                rippleEffect: {
                    brushType: 'stroke',
                    scale: 3
                }
            }]
        };
        graphChart.setOption(graphOption);

        // 弱项分布树
        const treeChart = echarts.init(document.getElementById('knowledge-tree'));
        const treeOption = {
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove',
                formatter: '{b}'
            },
            series: [{
                type: 'tree',
                data: [data.knowledgeTree],
                top: '5%',
                left: '15%',
                bottom: '5%',
                right: '15%',
                symbolSize: 12,
                label: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 14,
                    color: '#e0e0e0'
                },
                leaves: {
                    label: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                },
                itemStyle: {
                    borderColor: '#00ffff',
                    borderWidth: 1
                },
                lineStyle: {
                    color: '#00ffff',
                    width: 1,
                    curveness: 0.3
                },
                emphasis: {
                    focus: 'descendant'
                },
                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750
            }]
        };
        treeChart.setOption(treeOption);

        // 窗口大小变化时重绘
        window.addEventListener('resize', function() {
            graphChart.resize();
            treeChart.resize();
        });
    }

    // 渲染做题序列
    function renderTimeline(items) {
        const container = document.getElementById('timeline-container');
        container.innerHTML = '';
        
        items.forEach((item, index) => {
            const element = document.createElement('div');
            element.className = 'timeline-item';
            element.innerHTML = `
                <div class="question-card">
                    <h3>${item.title}</h3>
                    <p>完成时间：${item.time}</p>
                    <span class="${item.statusClass}">状态：${item.status}</span>
                </div>
            `;
            container.appendChild(element);
            
            // 添加延迟动画
            setTimeout(() => {
                element.classList.add('visible');
            }, 300 + (index * 200));
        });
    }

    // 渲染错题分析和知识盲点
    function renderContent(data) {
        document.getElementById('error-analysis').innerHTML = data.errorAnalysis;
        
        const gapsContainer = document.getElementById('knowledge-gaps');
        gapsContainer.innerHTML = '';
        
        data.knowledgeGaps.forEach(gap => {
            const li = document.createElement('li');
            li.innerHTML = `
                <svg viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L383 361.7l.3-66.1c0-4.4 3.5-8 8-8 1.9 0 3.7.7 5.2 1.9l155 130.1 118.4-99.3.3 66.1c0 4.4-3.5 8-8 8a8 8 0 01-5.2-1.9L563.4 512l118.4 99.3.3 66.1c0 4.4-3.5 8-8 8z"></path></svg>
                ${gap}
            `;
            gapsContainer.appendChild(li);
        });
    }

    // 加载数据并初始化页面
    async function initPage() {
        try {
            // 使用fetchData API获取数据
            const data = await fetchData();
            
            // 初始化图表
            initCharts(data);
            
            // 渲染内容
            renderTimeline(data.timelineItems);
            renderContent(data);
            
            // 隐藏加载动画
            setTimeout(() => {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                }, 500);
            }, 500);
        } catch (error) {
            console.error('数据加载失败:', error);
            loadingOverlay.querySelector('.loading-text').textContent = '数据加载失败，请刷新重试';
        }
    }

    // 启动页面初始化
    initPage();
});