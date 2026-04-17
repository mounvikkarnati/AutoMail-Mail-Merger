import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [template, setTemplate] = useState("");
  const [subject, setSubject] = useState("");

  const [logs, setLogs] = useState([]);
  // Upload file
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("http://localhost:5001/upload", formData);
    setData(res.data.data);

    alert("File uploaded & parsed!");
  };

  // Send emails
  const handleSend = async () => {
  const res = await axios.post("http://localhost:5001/send-mails", {
    subject,
    template,
    data,
  });

  setLogs(res.data.logs);

  alert("Emails sent successfully!");
};

  return (
  <div className="app-container">
  <h1 className="title">📧Linksphere-AutoMail</h1>

  {/* Upload */}
  <div className="section">
    <label className="label">Upload Excel File</label>
    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
    <br /><br />
    <button onClick={handleUpload}>Upload Excel</button>
  </div>

  {/* Subject */}
  <div className="section">
    <label className="label">Email Subject</label>
    <input
      type="text"
      placeholder="Enter subject"
      value={subject}
      onChange={(e) => setSubject(e.target.value)}
    />
  </div>

  {/* Template */}
  <div className="section">
    <label className="label">Email Template</label>
    <textarea
      rows="8"
      placeholder="Use {{Name}} etc..."
      value={template}
      onChange={(e) => setTemplate(e.target.value)}
    />
  </div>

  {/* Send */}
  <div className="section">
    <button className="secondary-btn" onClick={handleSend}>
      Send Emails
    </button>
  </div>

  {/* Preview */}
  <div className="section">
    <h3>Preview:</h3>
    <div
      className="preview-box"
      dangerouslySetInnerHTML={{
        __html:
          data.length > 0
            ? template.replace("{{Name}}", data[0]["Name"])
            : "No preview available",
      }}
    />
  </div>

  <div className="logs-section">
  <h3>📊 Mail Logs</h3>

  {logs.length === 0 && <p>No logs yet</p>}

  {logs.map((log, index) => (
    <div key={index} className="log-card">
      <p><strong>📧 Email:</strong> {log.email}</p>
      <p><strong>Status:</strong> 
        <span className={log.status === "success" ? "success" : "failed"}>
          {log.status}
        </span>
      </p>

      <details>
        <summary>View Details</summary>

        <pre>{JSON.stringify(log.row, null, 2)}</pre>
        <pre>{JSON.stringify(log.cleanRow, null, 2)}</pre>
      </details>
    </div>
  ))}
</div>
</div>
);
}

export default App;