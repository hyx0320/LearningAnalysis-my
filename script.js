import { 
    getKnowledgeGraphData, 
    getQuestionSequenceData, 
    getErrorAnalysisData, 
    getKnowledgeGapsData, 
    getKnowledgeTreeData 
} from './api.js';

// 加载状态管理
const setLoading = (elementId, isLoading) => {
    const container = document.getElementById(elementId);
    if (!container) return;
    
    if (isLoading) {
        container.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>加载中...</p>
            </div>
        `;
    }
};

document.addEventListener('DOMContentLoaded', async function () {
    // 1. 知识图谱可视化
    await renderKnowledgeGraph();
    
    // 2. 做题序列展示
    await renderQuestionSequence();
    
    // 3. 错题原因分析
    await renderErrorAnalysis();
    
    // 4. 知识盲点提示
    await renderKnowledgeGaps();
    
    // 5. 弱项分布树
    await renderKnowledgeTree();
    
    // 6. 添加事件监听
    setupEventListeners();
});

async function renderKnowledgeGraph() {
    const container = document.getElementById('knowledge-graph');
    setLoading('knowledge-graph', true);
    
    try {
        const graphData = await getKnowledgeGraphData();
        if (!graphData) throw new Error('知识图谱数据为空');
        
        const graphChart = echarts.init(container);
        const graphOption = {
            tooltip: {
                formatter: '{b}'
            },
            legend: {
                data: graphData.categories.map(a => a.name),
                textStyle: { color: '#fff' },
                bottom: 0
            },
            animationDuration: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [{
                type: 'graph',
                layout: 'force',
                data: graphData.nodes.map(node => ({
                    ...node,
                    itemStyle: {
                        color: ['#ff4d4f', '#52c41a', '#faad14'][node.category]
                    },
                    label: {
                        show: true,
                        color: '#fff'
                    }
                })),
                links: graphData.links,
                categories: graphData.categories,
                roam: true,
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
                    color: 'rgba(0, 255, 255, 0.6)',
                    width: 2,
                    curveness: 0.1
                },
                edgeSymbol: ['none', 'arrow'],
                edgeSymbolSize: [4, 10],
                emphasis: {
                    focus: 'adjacency',
                    lineStyle: {
                        width: 4
                    }
                }
            }]
        };
        
        graphChart.setOption(graphOption);
    } catch (error) {
        container.innerHTML = `<p class="error-message">知识图谱加载失败: ${error.message}</p>`;
    }
}

async function renderQuestionSequence() {
    const container = document.querySelector('.timeline');
    if (!container) return;
    
    try {
        const sequenceData = await getQuestionSequenceData();
        if (!sequenceData || !sequenceData.length) throw new Error('做题序列数据为空');
        
        container.innerHTML = '';
        
        sequenceData.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'timeline-item';
            card.innerHTML = `
                <div class="question-card" style="opacity:0;transform:translateY(30px)">
                    <h3>${item.title}</h3>
                    <p>完成时间：${item.time}</p>
                    <span>状态：${item.status}</span>
                </div>
            `;
            container.appendChild(card);
            
            // 添加动画
            setTimeout(() => {
                const questionCard = card.querySelector('.question-card');
                if (questionCard) {
                    questionCard.style.opacity = 1;
                    questionCard.style.transform = 'translateY(0)';
                    questionCard.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
                }
            }, 100);
        });
    } catch (error) {
        container.innerHTML = `<p class="error-message">做题序列加载失败: ${error.message}</p>`;
    }
}

async function renderErrorAnalysis() {
    const container = document.querySelector('.error-analysis');
    if (!container) return;
    
    try {
        const analysisData = await getErrorAnalysisData();
        if (!analysisData) throw new Error('错题分析数据为空');
        
        container.innerHTML = analysisData;
    } catch (error) {
        container.innerHTML = `<p class="error-message">错题分析加载失败: ${error.message}</p>`;
    }
}

async function renderKnowledgeGaps() {
    const container = document.querySelector('.knowledge-gaps-list');
    if (!container) return;
    
    try {
        const gapsData = await getKnowledgeGapsData();
        if (!gapsData || !gapsData.length) throw new Error('知识盲点数据为空');
        
        container.innerHTML = '';
        
        gapsData.forEach(gap => {
            const li = document.createElement('li');
            li.innerHTML = `
                <svg viewBox="64 64 896 896" focusable="false" data-icon="close-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L383 361.7l.3-66.1c0-4.4 3.5-8 8-8 1.9 0 3.7.7 5.2 1.9l155 130.1 118.4-99.3.3 66.1c0 4.4-3.5 8-8 8a8 8 0 01-5.2-1.9L563.4 512l118.4 99.3.3 66.1c0 4.4-3.5 8-8 8z"></path>
                </svg>
                ${gap}
            `;
            container.appendChild(li);
        });
    } catch (error) {
        container.innerHTML = `<p class="error-message">知识盲点加载失败: ${error.message}</p>`;
    }
}

async function renderKnowledgeTree() {
    const container = document.getElementById('knowledge-tree');
    if (!container) return;
    
    setLoading('knowledge-tree', true);
    
    try {
        const treeData = await getKnowledgeTreeData();
        if (!treeData) throw new Error('知识树数据为空');
        
        const treeChart = echarts.init(container);
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
    } catch (error) {
        container.innerHTML = `<p class="error-message">知识树加载失败: ${error.message}</p>`;
    }
}

function setupEventListeners() {
    // 窗口大小变化时重绘图表
    window.addEventListener('resize', () => {
        const charts = [
            document.getElementById('knowledge-graph'),
            document.getElementById('knowledge-tree')
        ];
        
        charts.forEach(container => {
            if (container && container.querySelector('canvas')) {
                const chart = echarts.getInstanceByDom(container);
                if (chart) chart.resize();
            }
        });
    });
    
    // 节点点击事件
    const graphContainer = document.getElementById('knowledge-graph');
    if (graphContainer) {
        const chart = echarts.getInstanceByDom(graphContainer);
        if (chart) {
            chart.on('click', (params) => {
                if (params.dataType === 'node') {
                    const analysisTitle = document.querySelector('.right-panel .card-section:nth-child(1) h2');
                    if (analysisTitle) {
                        analysisTitle.textContent = `关于“${params.name}”的分析`;
                    }
                }
            });
        }
    }
}