import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import TimestampTool from './pages/timestamp'
import CodeDiffTool from './pages/code-diff'
import JsonFormatTool from './pages/json-format'
import Base64Tool from './pages/base64'
import UrlEncodeTool from './pages/url-encode'
import './App.css'

function Home() {
  const tools = [
    { path: 'timestamp', name: '🕐', title: '时间戳转换', desc: '时间戳与日期互转' },
    { path: 'json-format', name: '📄', title: 'JSON格式化', desc: '美化/压缩JSON' },
    { path: 'base64', name: '🔐', title: 'Base64', desc: 'Base64编解码' },
    { path: 'url-encode', name: '🔗', title: 'URL编码', desc: 'URL编解码' },
    { path: 'code-diff', name: '🔄', title: '代码对比', desc: '对比两段代码的差异' },
  ]

  return (
    <div className="home">
      <header className="hero">
        <h1>🛠️ Cores Tools</h1>
        <p className="subtitle">常用在线工具集合</p>
      </header>
      
      <div className="tools-grid">
        {tools.map(tool => (
          <Link to={tool.path} key={tool.path} className="tool-card">
            <div className="tool-icon">{tool.name}</div>
            <div className="tool-info">
              <div className="tool-title">{tool.title}</div>
              <div className="tool-desc">{tool.desc}</div>
            </div>
          </Link>
        ))}
      </div>

      <footer className="home-footer">
        <p>点击卡片开始使用工具</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timestamp/*" element={<TimestampTool />} />
        <Route path="/json-format/*" element={<JsonFormatTool />} />
        <Route path="/base64/*" element={<Base64Tool />} />
        <Route path="/url-encode/*" element={<UrlEncodeTool />} />
        <Route path="/code-diff/*" element={<CodeDiffTool />} />
      </Routes>
    </HashRouter>
  )
}

export default App
