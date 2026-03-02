import { useState } from 'react'
import { Link } from 'react-router-dom'

function JsonFormatTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [options, setOptions] = useState({ indent: 2, sortKeys: false })

  const format = () => {
    try {
      let parsed = JSON.parse(input)
      if (options.sortKeys) {
        parsed = sortKeys(parsed)
      }
      setOutput(JSON.stringify(parsed, null, options.indent))
      setError('')
    } catch (e) {
      setError('JSON格式错误: ' + e.message)
      setOutput('')
    }
  }

  const minify = () => {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (e) {
      setError('JSON格式错误: ' + e.message)
      setOutput('')
    }
  }

  const sortKeys = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(sortKeys)
    }
    if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj).sort().reduce((result, key) => {
        result[key] = sortKeys(obj[key])
        return result
      }, {})
    }
    return obj
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <div className="container">
      <Link to="/" className="back-link">← 返回首页</Link>
      <h1>📄 JSON格式化工具</h1>
      
      <div className="options-bar">
        <label>
          缩进:
          <select value={options.indent} onChange={(e) => setOptions({...options, indent: Number(e.target.value)})}>
            <option value={2}>2空格</option>
            <option value={4}>4空格</option>
            <option value={0}>无缩进</option>
          </select>
        </label>
        <label>
          <input type="checkbox" checked={options.sortKeys} onChange={(e) => setOptions({...options, sortKeys: e.target.checked})} />
          排序键名
        </label>
      </div>

      <div className="tool-area">
        <div className="input-area">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="粘贴JSON到这里..."
            className="code-input"
          />
        </div>
        
        <div className="action-buttons">
          <button onClick={format}>格式化</button>
          <button onClick={minify}>压缩</button>
        </div>

        <div className="output-area">
          <div className="output-header">
            <span>结果</span>
            {output && <button onClick={copyToClipboard} className="copy-btn">复制</button>}
          </div>
          <pre className="code-output">{error || output}</pre>
        </div>
      </div>
    </div>
  )
}

export default JsonFormatTool
