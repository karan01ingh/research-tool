import { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const res = await axios.post(
  "http://localhost:5000/api/upload",
        formData
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Error processing file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600,
    margin: "0 auto",
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)" }}>
      <h2>Research Tool – Earnings Summary</h2>

      <input
        type="file"
        accept=".txt"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload}>
        {loading ? "Processing..." : "Analyze"}
      </button>

      {result && (
        <div style={{ marginTop: 30, textAlign: "left" }}>
          <h3>Summary</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default FileUpload;

