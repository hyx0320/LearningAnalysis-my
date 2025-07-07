document.addEventListener('DOMContentLoaded', function () {

    // --- 1. 左侧知识图谱可视化 ---
    const graphChart = echarts.init(document.getElementById('knowledge-graph'));

    // 示例数据
    const graphData = {
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
        categories: [ // 节点类别，用于图例
            { name: '薄弱点' },
            { name: '已掌握' },
            { name: '待加强' }
        ]
    };

    const graphOption = {
        tooltip: {
            formatter: '{b}'
        },
        legend: [{
            data: graphData.categories.map(a => a.name),
            textStyle: { color: '#fff' }
        }],
        color: ['#ff4d4f', '#52c41a', '#faad14'], // 对应薄弱点、已掌握、待加强
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [{
            type: 'graph',
            layout: 'force',
            data: graphData.nodes.map(node => ({
                ...node,
                // 根据 category 设置颜色
                itemStyle: {
                    color: ['#ff4d4f', '#52c41a', '#faad14'][node.category]
                }
            })),
            links: graphData.links,
            categories: graphData.categories,
            roam: true, // 开启缩放和平移
            label: {
                show: true,
                position: 'right',
                formatter: '{b}',
                color: '#fff'
            },
            force: {
                repulsion: 150,
                edgeLength: 80
            },
            lineStyle: {
                color: '#00ffff',
                width: 2,
                curveness: 0.1
            },
            // 连接线霓虹动画效果
            edgeSymbol: ['none', 'arrow'],
            edgeSymbolSize: [4, 10],
            emphasis: {
                focus: 'adjacency',
                lineStyle: {
                    width: 4
                }
            },
            // 涟漪特效配置
            rippleEffect: {
                brushType: 'stroke'
            }
        }]
    };
    
    // 使用 requestAnimationFrame 进行分片渲染（大数据量时）
    // 这是一个简化示例，实际应用中需要更复杂的逻辑
    let renderedNodeCount = 0;
    const totalNodes = graphData.nodes.length;
    const nodesPerFrame = 5; // 每帧渲染的节点数

    function progressiveRender() {
        if (renderedNodeCount < totalNodes) {
            // 此处应为实际的分片加载和设置数据的逻辑
            // ECharts 本身对大数据有优化，这里仅为演示概念
            renderedNodeCount += nodesPerFrame;
            requestAnimationFrame(progressiveRender);
        }
    }
    // progressiveRender(); // 如果数据量巨大，可以启用此函数

    graphChart.setOption(graphOption);


    // --- 2. 右侧弱项分布树 ---
    const treeChart = echarts.init(document.getElementById('knowledge-tree'));
    const treeData = {
        name: 'JavaScript',
        children: [
            {
                name: '异步编程',
                itemStyle: { color: '#ff4d4f', borderColor: '#ff4d4f' }, // 薄弱点
                children: [
                    { name: 'Promise', itemStyle: { color: '#ff4d4f' } },
                    { name: 'async/await', itemStyle: { color: '#faad14' } }
                ]
            },
            {
                name: 'ES6+',
                itemStyle: { color: '#52c41a', borderColor: '#52c41a' }, // 已掌握
                children: [
                    { name: '箭头函数', itemStyle: { color: '#52c41a' } },
                    { name: '解构赋值', itemStyle: { color: '#52c41a' } }
                ]
            }
        ]
    };

    const treeOption = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [{
            type: 'tree',
            data: [treeData],
            top: '5%',
            left: '15%',
            bottom: '5%',
            right: '15%',
            symbolSize: 10,
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
            emphasis: {
                focus: 'descendant'
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
        }]
    };

    treeChart.setOption(treeOption);

    // --- 3. 交互与性能优化 ---

    // 节点点击联动数据更新
    graphChart.on('click', function (params) {
        if (params.dataType === 'node') {
            console.log('点击了节点:', params.name);
            // 假设这里会根据点击的节点名称，去请求并更新右侧的数据
            const rightPanel = document.querySelector('.right-panel');
            const analysisTitle = rightPanel.querySelector('h2');
            analysisTitle.textContent = `关于“${params.name}”的分析`;
            // ...此处可以添加更多数据更新逻辑...
        }
    });

    // IntersectionObserver 处理滚动固定/动画
    const sequenceSection = document.getElementById('sequence-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                // 可以取消观察以避免重复触发
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.5 // 当元素50%可见时触发
    });

    // 为做题序列卡片添加入场动画
    document.querySelectorAll('.question-card').forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // 确保图表在窗口大小变化时自适应
    window.addEventListener('resize', function() {
        graphChart.resize();
        treeChart.resize();
    });
});