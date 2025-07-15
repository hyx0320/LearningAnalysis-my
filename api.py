# -*- coding: utf-8 -*-
from flask import Flask, jsonify
from flask_cors import CORS  # 添加 CORS 支持

app = Flask(__name__)
CORS(app)  # 启用 CORS

def transform_data(input_data):
    # 1. 知识图谱转换
    knowledge_graph = {
        "nodes": [],
        "links": [],
        "categories": [
            {"name": "薄弱点"},
            {"name": "待加强"},
            {"name": "已掌握"}
        ]
    }
    
    # 添加核心知识点节点
    for concept in input_data["core_concept_mastery"]["concepts"]:
        # 根据掌握程度分配类别
        if concept["mastery_level"] < 0.6:
            category = 0  # 薄弱点
        elif concept["mastery_level"] < 0.8:
            category = 1  # 待加强
        else:
            category = 2  # 已掌握
            
        knowledge_graph["nodes"].append({
            "id": str(concept["concept_id"]),
            "name": concept["concept_name"],
            "symbolSize": 30 + int(concept["mastery_level"] * 20),
            "category": category,
            "value": int(concept["mastery_level"] * 100)
        })
    
    # 添加薄弱知识点节点
    for weak_concept in input_data["weak_concept_progress"]:
        knowledge_graph["nodes"].append({
            "id": str(weak_concept["concept_id"]),
            "name": weak_concept["concept_name"],
            "symbolSize": 30 + int(weak_concept["mastery_level"] * 20),
            "category": 0,  # 薄弱点
            "value": int(weak_concept["mastery_level"] * 100)
        })
    
    # 创建知识点之间的链接（简化版，实际应用中应有更复杂的逻辑）
    if knowledge_graph["nodes"]:
        # 链接前两个节点作为示例
        if len(knowledge_graph["nodes"]) > 1:
            knowledge_graph["links"].append({
                "source": knowledge_graph["nodes"][0]["id"],
                "target": knowledge_graph["nodes"][1]["id"]
            })
    
    # 2. 做题序列转换
    question_sequence = []
    for i, exercise in enumerate(input_data["key_exercises"], 1):
        # 根据错误分析数据分配状态
        if i % 3 == 0:
            status = "薄弱点"
        elif i % 3 == 1:
            status = "待加强"
        else:
            status = "已掌握"
            
        question_sequence.append({
            "title": f"题目 {exercise['exercise_id']}",
            "time": f"耗时: {exercise['time_taken']}秒",
            "status": status
        })
    
    # 3. 错题原因分析转换
    error_analysis = "在最近的练习中，主要错误原因有：<br>"
    for reason in input_data["error_analysis"]["error_reasons"]:
        percentage = int(reason["error_rate"] * 100)
        error_analysis += f"<span class='keyword'>{reason['reason_name']}</span>（{reason['num_errors']}次错误，占比{percentage}%），"
    error_analysis = error_analysis.rstrip('，') + "。"
    
    # 4. 知识盲点转换
    knowledge_gaps = [concept["concept_name"] for concept in input_data["weak_concept_progress"]]
    
    # 5. 知识树转换
    knowledge_tree = {
        "name": "知识点掌握情况",
        "children": []
    }
    
    # 添加核心知识点
    core_concepts = {
        "name": "核心知识点",
        "itemStyle": {"color": "#52c41a", "borderColor": "#52c41a"},
        "children": []
    }
    for concept in input_data["core_concept_mastery"]["concepts"]:
        if concept["mastery_level"] < 0.6:
            color = "#ff4d4f"
        elif concept["mastery_level"] < 0.8:
            color = "#faad14"
        else:
            color = "#52c41a"
            
        core_concepts["children"].append({
            "name": concept["concept_name"],
            "itemStyle": {"color": color},
            "value": int(concept["mastery_level"] * 100)
        })
    
    # 添加薄弱知识点
    weak_concepts = {
        "name": "薄弱知识点",
        "itemStyle": {"color": "#ff4d4f", "borderColor": "#ff4d4f"},
        "children": []
    }
    for concept in input_data["weak_concept_progress"]:
        weak_concepts["children"].append({
            "name": concept["concept_name"],
            "itemStyle": {"color": "#ff4d4f"},
            "value": int(concept["mastery_level"] * 100)
        })
    
    knowledge_tree["children"].append(core_concepts)
    knowledge_tree["children"].append(weak_concepts)
    
    return {
        "knowledgeGraph": knowledge_graph,
        "questionSequence": question_sequence,
        "errorAnalysis": error_analysis,
        "knowledgeGaps": knowledge_gaps,
        "knowledgeTree": knowledge_tree
    }

# 示例输入数据（实际应用中应从数据库获取）
input_data = {
    "user_id": 5,
    "student_id": 20250005,
    "key_exercises": [
        {
            "exercise_id": 101,
            "time_taken": 120
        },
        {
            "exercise_id": 102,
            "time_taken": 150
        }
    ],
    "core_concept_mastery": {
        "overall_mastery": 0.75,
        "concepts": [
            {
                "concept_id": 1,
                "concept_name": "Algebra",
                "mastery_level": 0.9,
                "num_exercises": 30
            },
            {
                "concept_id": 2,
                "concept_name": "Geometry",
                "mastery_level": 0.85,
                "num_exercises": 25
            },
            {
                "concept_id": 3,
                "concept_name": "Calculus",
                "mastery_level": 0.8,
                "num_exercises": 20
            }
        ]
    },
    "error_analysis": {
        "total_errors": 50,
        "error_rate": 0.5,
        "error_reasons": [
            {
                "reason_name": "Conceptual misunderstanding",
                "num_errors": 20,
                "error_rate": 0.4
            },
            {
                "reason_name": "Calculation mistakes",
                "num_errors": 15,
                "error_rate": 0.3
            },
            {
                "reason_name": "Misinterpretation of question",
                "num_errors": 15,
                "error_rate": 0.3
            }
        ]
    },
    "weak_concept_progress": [
        {
            "concept_id": 4,
            "concept_name": "Statistics",
            "mastery_level": 0.6,
            "recommended_study_time": 30
        },
        {
            "concept_id": 5,
            "concept_name": "Probability",
            "mastery_level": 0.5,
            "recommended_study_time": 40
        }
    ]
}

# 转换数据
transformed_data = transform_data(input_data)

# API端点
@app.route('/knowledge-graph', methods=['GET'])
def get_knowledge_graph():
    return jsonify(transformed_data["knowledgeGraph"])

@app.route('/question-sequence', methods=['GET'])
def get_question_sequence():
    return jsonify(transformed_data["questionSequence"])

@app.route('/error-analysis', methods=['GET'])
def get_error_analysis():
    return transformed_data["errorAnalysis"]

@app.route('/knowledge-gaps', methods=['GET'])
def get_knowledge_gaps():
    return jsonify(transformed_data["knowledgeGaps"])

@app.route('/knowledge-tree', methods=['GET'])
def get_knowledge_tree():
    return jsonify(transformed_data["knowledgeTree"])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)