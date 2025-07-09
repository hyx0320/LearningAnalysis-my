const apiUrl = 'http://127.0.0.1:5000';

// 通用请求函数
const fetchData = async (endpoint) => {
    try {
        const response = await fetch(`${apiUrl}${endpoint}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return endpoint === '/error-analysis' ? response.text() : response.json();
    } catch (error) {
        console.error(`获取${endpoint}数据失败:`, error);
        return null;
    }
};

export const getKnowledgeGraphData = () => fetchData('/knowledge-graph');
export const getQuestionSequenceData = () => fetchData('/question-sequence');
export const getErrorAnalysisData = () => fetchData('/error-analysis');
export const getKnowledgeGapsData = () => fetchData('/knowledge-gaps');
export const getKnowledgeTreeData = () => fetchData('/knowledge-tree');