import { useState } from 'react'
import { Link } from 'react-router-dom'

function UrlEncodeTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('encode')

  const process = () => {
    if (mode === 'encode') {
      setOutput(encodeURIComponent(input))
    } else {
      try {
        setOutput(decodeURIComponent(input))
      } catch (e) {
        setOutput('解码失败: ' + e.message)
      }
    }
  }

  const swap = () => {
    setInput(output)
    setOutput('')
    setMode(mode === 'encode' ? 'decode' : 'encode')
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <div className="container">
      <Link to="/" className="back-link">← 返回首页</Link>
      <h1>🔗 URL 编解码</h1>
      
      <div className="tabs">
        <button className={mode === 'encode' ? 'active' : ''} onClick={() => { setMode('encode'); }}>编码</button>
        <button className={mode === 'decode' ? 'active' : ''} onClick={() => { setMode('decode'); }}>解码</button>
      </div>

      <div className="tool-area">
        <div className="input-area">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? '输入要URL编码的文本...' : '输入URL编码字符串...'}
            className="code-input"
          />
        </div>
        
        <div className="action-buttons">
          <button onClick={process}>{mode === 'encode' ? '编码' : '解码'}</button>
          <button onClick={swap}>↑↓ 交换</button>
        </div>

        <div className="output-area">
          <div className="output-header">
            <span>结果</span>
            {output && <button onClick={copyToClipboard} className="copy-btn">复制</button>}
          </div>
          <pre className="code-output">{output}</pre>
        </div>
      </div>
    </div>
  )
}

export default UrlEncodeTool
