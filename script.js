// ===================== 配置区域 =====================
        // 模拟数据开关 - true: 使用模拟数据, false: 使用真实API
        let USE_MOCK_DATA = true;
        
        // 真实API端点 - 修改为你的真实API地址
        let API_ENDPOINT = 'https://your-backend-api.com/analysis';
        
        // 身份验证令牌（如果需要）
        const AUTH_TOKEN = 'your_auth_token_here';
        // ===================== 配置结束 =====================
        
        // 模拟数据（开发阶段使用）
        const mockData = {
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
            },
            
            // 新增节点详细分析数据
            nodeDetails: {
                '1': {
                    title: 'JavaScript基础概念分析',
                    content: `<p>在基础概念部分，发现您对数据类型转换的理解存在混淆。特别是对<span class="keyword">隐式类型转换</span>规则的掌握不够扎实，在涉及"+"运算符和不同类型操作数时容易出错。</p>
                              <div class="node-highlight">
                                  <p>📌 典型错误案例：</p>
                                  <pre>console.log(1 + "1");   // 期望: 2 实际: "11"
console.log([] + {});     // 期望: 报错 实际: "[object Object]"
console.log({} + []);     // 期望: 报错 实际: 0</pre>
                              </div>
                              <h4>建议重点复习：</h4>
                              <ul>
                                <li>原始类型之间的转换规则</li>
                                <li>对象到原始值的转换过程</li>
                                <li>== 和 === 的区别</li>
                              </ul>`
                },
                '2': {
                    title: '变量作用域深度解析',
                    content: `<p>在变量作用域题目中，主要问题出现在对<span class="keyword">块级作用域</span>的理解上。特别是在使用let/const的for循环和if语句中，对变量生命周期的把握不够准确。</p>
                              <div class="node-highlight">
                                  <p>📌 典型错误案例：</p>
                                  <pre>for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
} // 输出3次3而不是0,1,2</pre>
                              </div>
                              <h4>解决方案：</h4>
                              <ul>
                                <li>使用IIFE创建独立作用域</li>
                                <li>利用块级作用域变量(let/const)</li>
                                <li>理解闭包的内存管理机制</li>
                              </ul>`
                },
                '3': {
                    title: '闭包常见误区',
                    content: `<p>闭包问题中，您对<span class="keyword">词法环境</span>的创建时机理解有偏差。特别是在循环中创建闭包时，未能正确捕获每次迭代的变量状态。</p>
                              <div class="node-highlight">
                                  <p>📌 典型错误案例：</p>
                                  <pre>function createFunctions() {
  var result = [];
  for (var i = 0; i < 3; i++) {
    result[i] = function() { return i; };
  }
  return result;
}
var funcs = createFunctions();
console.log(funcs[0]()); // 期望: 0 实际: 3</pre>
                              </div>
                              <h4>解决方案：</h4>
                              <ul>
                                <li>使用IIFE创建独立作用域</li>
                                <li>利用块级作用域变量(let/const)</li>
                                <li>理解闭包的内存管理机制</li>
                              </ul>`
                },
                '4': {
                    title: '异步编程核心概念',
                    content: `<p>在异步编程题目中，主要错误在于对 <span class="keyword">Promise.all</span> 的使用场景理解不清。当其中一个Promise被 reject 时，整个 Promise.all 会立即失败，而未考虑到需要等待所有Promise完成（无论成功或失败）的场景。</p>
                              <div class="node-highlight">
                                  <p>📌 解决方案：</p>
                                  <pre>// 使用Promise.allSettled代替
Promise.allSettled(promises)
  .then(results => {
    results.forEach(result => {
      if(result.status === 'fulfilled') {
        console.log(result.value);
      } else {
        console.error(result.reason);
      }
    });
  });</pre>
                              </div>`
                },
                '5': {
                    title: 'Promise高级用法',
                    content: `<p>在Promise相关题目中，发现您对<span class="keyword">链式调用</span>和<span class="keyword">错误处理</span>的掌握不够深入，特别是多个异步操作串联时的错误处理逻辑。</p>
                              <div class="node-highlight">
                                  <p>📌 最佳实践：</p>
                                  <pre>fetchData()
  .then(processData)
  .catch(handleFetchError)  // 捕获fetchData和processData的错误
  .then(updateUI)
  .catch(handleUnexpectedError); // 捕获updateUI的错误</pre>
                              </div>`
                },
                '6': {
                    title: '事件循环机制',
                    content: `<p>事件循环(Event Loop)的宏任务与微任务执行顺序的掌握也存在不足，特别是对setTimeout与Promise执行顺序的理解不够深入。</p>
                              <div class="node-highlight">
                                  <p>📌 经典面试题：</p>
                                  <pre>console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');

// 正确输出顺序:
// script start
// script end
// promise1
// promise2
// setTimeout</pre>
                              </div>`
                }
            },
            
            // 默认总体分析
            defaultAnalysis: {
                title: '综合错误分析报告',
                content: `<p>在最近的练习中，您的主要薄弱环节集中在异步编程和闭包相关概念上：</p>
                          <p>1. 在<span class="keyword">异步编程与Promise</span>题目中，主要错误在于对 Promise.all 的使用场景理解不清。当其中一个Promise被 reject 时，整个 Promise.all 会立即失败，而未考虑到需要等待所有Promise完成（无论成功或失败）的场景，此时应使用 Promise.allSettled。</p>
                          <p>2. 在<span class="keyword">闭包</span>相关题目中，对词法作用域链的追踪能力需要加强，特别是在循环中创建闭包时未能正确捕获每次迭代的变量状态。</p>
                          <p>3. 在<span class="keyword">事件循环(Event Loop)</span>题目中，对宏任务与微任务执行顺序的掌握存在不足，特别是对setTimeout与Promise执行顺序的理解不够深入。</p>
                          <div class="node-highlight">
                              <p>📌 总体建议：</p>
                              <ul>
                                  <li>重点复习异步编程中的Promise链式调用和错误处理</li>
                                  <li>理解闭包在循环中的应用和解决方案</li>
                                  <li>掌握事件循环中宏任务与微任务的执行顺序</li>
                              </ul>
                          </div>`
            }
        };

        // ===================== 数据获取函数 =====================
        function fetchData() {
            // 显示加载状态
            const loadingOverlay = document.getElementById('loading');
            loadingOverlay.style.display = 'flex';
            loadingOverlay.style.opacity = '1';
            
            // 更新加载文本
            const loadingText = document.getElementById('loadingText');
            loadingText.textContent = USE_MOCK_DATA 
                ? '正在加载模拟数据...' 
                : '正在从API加载数据...';
            
            if (USE_MOCK_DATA) {
                // 使用模拟数据 - 添加延迟模拟网络请求
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(mockData);
                        // 隐藏加载状态
                        loadingOverlay.style.opacity = '0';
                        setTimeout(() => {
                            loadingOverlay.style.display = 'none';
                        }, 500);
                    }, 1500);
                });
            } else {
                // 使用真实API
                // 添加身份验证令牌（如果需要）
                const headers = new Headers();
                if (AUTH_TOKEN) {
                    headers.append('Authorization', `Bearer ${AUTH_TOKEN}`);
                }
                headers.append('Content-Type', 'application/json');
                
                return fetch(API_ENDPOINT, { headers })
                    .then(response => {
                        if (response.status === 401) {
                            // 处理未授权情况
                            window.location.href = '/login';
                            return;
                        }
                        if (!response.ok) {
                            throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
                        }
                        return response.json();
                    })
                    .then(apiData => {
                        return apiData;
                    })
                    .catch(error => {
                        console.error('API请求错误:', error);
                        updateApiStatus(false);
                        throw error;
                    })
                    .finally(() => {
                        // 隐藏加载状态
                        loadingOverlay.style.opacity = '0';
                        setTimeout(() => {
                            loadingOverlay.style.display = 'none';
                        }, 500);
                    });
            }
        }

        // ===================== 通用函数 =====================
        // 更新API连接状态显示
        function updateApiStatus(connected) {
            const statusElement = document.getElementById('apiStatus');
            if (USE_MOCK_DATA) {
                statusElement.className = 'api-status connected';
                statusElement.innerHTML = '<i class="fas fa-database"></i> 正在使用模拟数据';
            } else {
                if (connected) {
                    statusElement.className = 'api-status connected';
                    statusElement.innerHTML = '<i class="fas fa-plug"></i> API 已连接';
                } else {
                    statusElement.className = 'api-status disconnected';
                    statusElement.innerHTML = '<i class="fas fa-exclamation-triangle"></i> API 连接失败';
                }
            }
        }
        
        // ===================== 节点点击处理函数 =====================
        function handleNodeClick(nodeData) {
            const analysisContainer = document.getElementById('error-analysis');
            
            // 获取节点详细分析数据，若无则使用默认
            const detail = mockData.nodeDetails[nodeData.id] || {
                title: `${nodeData.name}分析`,
                content: `<p>暂无关于<span class="keyword">${nodeData.name}</span>的详细分析数据</p>`
            };
            
            // 更新HTML内容
            analysisContainer.innerHTML = `
                <div class="node-analysis-header">
                    <h3>${detail.title}</h3>
                    <button id="backToOverview" class="back-button">
                        <i class="fas fa-arrow-left"></i> 返回总体分析
                    </button>
                </div>
                <div class="node-analysis-content">
                    ${detail.content}
                </div>
            `;
            
            // 添加返回按钮事件
            document.getElementById('backToOverview').addEventListener('click', renderDefaultAnalysis);
        }

        // ===================== 渲染默认总体分析 =====================
        function renderDefaultAnalysis() {
            const analysisContainer = document.getElementById('error-analysis');
            analysisContainer.innerHTML = `
                <h3>${mockData.defaultAnalysis.title}</h3>
                <div class="node-analysis-content">
                    ${mockData.defaultAnalysis.content}
                </div>
            `;
        }

        // ===================== 页面初始化函数 =====================
        document.addEventListener('DOMContentLoaded', function () {
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
                
                // 添加点击事件监听
                graphChart.on('click', function(params) {
                    if (params.dataType === 'node') {
                        handleNodeClick(params.data);
                    }
                });

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

            // 渲染知识盲点
            function renderContent(data) {
                // 初始化时渲染默认分析
                renderDefaultAnalysis();
                
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
                    const data = await fetchData();
                    updateApiStatus(true);
                    initCharts(data);
                    renderTimeline(data.timelineItems);
                    renderContent(data);
                } catch (error) {
                    console.error('页面初始化失败:', error);
                    const loadingText = document.getElementById('loadingText');
                    loadingText.textContent = `加载失败: ${error.message}`;
                    updateApiStatus(false);
                }
            }

            // ===================== 控制面板事件监听 =====================
            // 切换数据源按钮
            document.getElementById('useMockData').addEventListener('click', () => {
                if (USE_MOCK_DATA) return;
                
                USE_MOCK_DATA = true;
                updateButtonStates();
                initPage();
            });
            
            document.getElementById('useRealApi').addEventListener('click', () => {
                if (!USE_MOCK_DATA) return;
                
                USE_MOCK_DATA = false;
                updateButtonStates();
                initPage();
            });
            
            // 重新加载按钮
            document.getElementById('reloadData').addEventListener('click', () => {
                initPage();
            });
            
            // API端点输入框
            document.getElementById('apiEndpoint').addEventListener('change', (e) => {
                API_ENDPOINT = e.target.value;
            });
            
            // 更新按钮状态
            function updateButtonStates() {
                const mockBtn = document.getElementById('useMockData');
                const apiBtn = document.getElementById('useRealApi');
                
                if (USE_MOCK_DATA) {
                    mockBtn.classList.add('active');
                    apiBtn.classList.remove('active');
                } else {
                    mockBtn.classList.remove('active');
                    apiBtn.classList.add('active');
                }
                
                updateApiStatus(true);
            }
            
            // 初始化按钮状态
            updateButtonStates();
            
            // 启动页面初始化
            initPage();
        });