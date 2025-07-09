# -*- coding: utf-8 -*-
from flask import Flask, jsonify
from flask_cors import CORS  # 添加 CORS 支持

app = Flask(__name__)
CORS(app)  # 启用 CORS

# 模拟数据
mock_data = {
    "knowledgeGraph": {
        "nodes": [
            {"id": "1", "name": "JavaScript基础", "symbolSize": 50, "category": 1, "value": 20},
            {"id": "2", "name": "变量作用域", "symbolSize": 40, "category": 1, "value": 15},
            {"id": "3", "name": "闭包", "symbolSize": 45, "category": 2, "value": 18},
            {"id": "4", "name": "异步编程", "symbolSize": 50, "category": 0, "value": 25},
            {"id": "5", "name": "Promise", "symbolSize": 45, "category": 0, "value": 22},
            {"id": "6", "name": "事件循环", "symbolSize": 35, "category": 2, "value": 12},
            {"id": "7", "name": "DOM操作", "symbolSize": 30, "category": 1, "value": 10},
            {"id": "8", "name": "ES6+", "symbolSize": 48, "category": 1, "value": 19}
        ],
        "links": [
            {"source": "1", "target": "2"},
            {"source": "1", "target": "3"},
            {"source": "1", "target": "7"},
            {"source": "1", "target": "8"},
            {"source": "3", "target": "6"},
            {"source": "4", "target": "5"},
            {"source": "4", "target": "6"},
            {"source": "8", "target": "4"}
        ],
        "categories": [
            {"name": "薄弱点"},
            {"name": "已掌握"},
            {"name": "待加强"}
        ]
    },
    "questionSequence": [
        {
            "title": "题目 1：关于变量作用域",
            "time": "2023-10-01 10:30",
            "status": "已掌握"
        },
        {
            "title": "题目 2：深入理解闭包",
            "time": "2023-10-01 11:15",
            "status": "待加强"
        },
        {
            "title": "题目 3：异步编程与Promise",
            "time": "2023-10-02 09:00",
            "status": "薄弱点"
        }
    ],
    "errorAnalysis": '在“异步编程与Promise”题目中，主要错误在于对 <span class="keyword">Promise.all</span> 的使用场景理解不清。当其中一个Promise被 reject 时，整个 Promise.all 会立即失败，而未考虑到需要等待所有Promise完成（无论成功或失败）的场景，此时应使用 <span class="keyword">Promise.allSettled</span>。此外，对于<span class="keyword">事件循环(Event Loop)</span>的宏任务与微任务执行顺序的掌握也存在不足。',
    "knowledgeGaps": [
        "Promise.allSettled 的具体用法",
        "宏任务与微任务的执行差异",
        "JavaScript 垃圾回收机制"
    ],
    "knowledgeTree": {
        "name": "JavaScript",
        "children": [
            {
                "name": "异步编程",
                "itemStyle": {"color": "#ff4d4f", "borderColor": "#ff4d4f"},
                "children": [
                    {"name": "Promise", "itemStyle": {"color": "#ff4d4f"}},
                    {"name": "async/await", "itemStyle": {"color": "#faad14"}}
                ]
            },
            {
                "name": "ES6+",
                "itemStyle": {"color": "#52c41a", "borderColor": "#52c41a"},
                "children": [
                    {"name": "箭头函数", "itemStyle": {"color": "#52c41a"}},
                    {"name": "解构赋值", "itemStyle": {"color": "#52c41a"}}
                ]
            }
        ]
    }
}

# 修正端点返回格式
@app.route('/knowledge-graph', methods=['GET'])
def get_knowledge_graph():
    return jsonify(mock_data["knowledgeGraph"])

@app.route('/question-sequence', methods=['GET'])
def get_question_sequence():
    return jsonify(mock_data["questionSequence"])

@app.route('/error-analysis', methods=['GET'])
def get_error_analysis():
    # 确保返回字符串而不是再次 jsonify
    return mock_data["errorAnalysis"]

@app.route('/knowledge-gaps', methods=['GET'])
def get_knowledge_gaps():
    return jsonify(mock_data["knowledgeGaps"])

@app.route('/knowledge-tree', methods=['GET'])
def get_knowledge_tree():
    return jsonify(mock_data["knowledgeTree"])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)