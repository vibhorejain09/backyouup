import React, { useState } from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import "./Dashboard.css"
import {
  Button,
  OutlinedInput,
  TextField,
  Typography
} from "@mui/material"
import { CloudUpload } from "@mui/icons-material"
import { db, storage } from "../../Utils/firebase"
import { ref, uploadBytes } from "@firebase/storage"
import { nanoid } from "nanoid"
import { addDoc, collection } from "@firebase/firestore"
function Upload() {
  const [type, setType] = useState("")

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [file, setFile] = useState()
  const [uploading, setUploading] = useState(false)
  async function handleSubmit(e) {
    e.preventDefault()
    setUploading(true)
    const fileName = nanoid(10)
    if (type === "pdf") {
      if (file.type !== "application/pdf") {
        setUploading(false)
        return alert("Only Pdf File Allowed")
      }
      const storageRef = ref(storage, fileName)
      await uploadBytes(storageRef, file).then(async (snapshot) => {
        console.log("Upload Success")
        const data = {
          content: fileName,
          title: title,
          type: type,
        }
        await addDoc(collection(db, "pendingUploads"), data)
        setUploading(false)
        setType("")
        setContent("")

        setFile("")
        setTitle("")
      })
      return
    }
    const data = {
      content: content,
      title: title,
      type: type,
    }
    await addDoc(collection(db, "pendingUploads"), data)
    setUploading(false)
    setType("")
    setContent("")
    setFile("")
    setTitle("")
  }


  return (
    <div id="dashboard">
      <Box sx={{ maxWidth: 850, width: "100%" }}>
        <Box component="form" sx={{ p: 10 }} onSubmit={handleSubmit}>
          <Typography component="h2" variant="h5" sx={{ textAlign: "center" }} style={{ color: "rgb(var(--green-color))", fontWeight: "bold" }}>
            Upload Your Document Here
          </Typography>
          <Typography component="h4" variant="h5" sx={{ pt: 2, textAlign: "center" }} style={{ color: "rgb(var(--blackshade-color))", fontWeight: "300", fontSize: "1.5rem" }}>
            Instructions for Document Uploadation
          </Typography>
          <Typography component="h4" variant="h5" sx={{ pt: 1, textAlign: "center" }} style={{ color: "rgb(var(--green-color))", fontWeight: "300", fontSize: "1rem" }}>
            1. Documents Required: Aadhar, Previous Sem Marksheet, Prveious Fee Reciept, Passport Size Photo. 
          </Typography>
          <Typography component="h4" variant="h5" sx={{ pt: 1, textAlign: "center" }} style={{ color: "rgb(var(--green-color))", fontWeight: "300", fontSize: "1rem" }}>
            2. All the Documnet should be merged in a one PDF and then submitted.
          </Typography>
          <Typography component="h4" variant="h5" sx={{ pt: 2, textAlign: "center" }} style={{ color: "rgb(var(--green-color))", fontWeight: "300", fontSize: "1rem" }}>
            3. File Name: EnrollmentNumber_Name (ex: 0801CS191101_VibhoreJain).
          </Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ my: 2 }} fullWidth>
              <InputLabel id="upload-type-label">Type</InputLabel>
              <Select
                labelId="upload-type-label"
                id="upload-type-select"
                value={type}
                label="Type"
                onChange={(e) => setType(e.target.value)}>
                <MenuItem value="pdf">PDF</MenuItem>
              </Select>
            </FormControl>
            <TextField
              sx={{ my: 2 }}
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {type === "pdf" ? (
              <OutlinedInput
                sx={{ my: 2 }}
                type="file"
                required
                fullWidth
                id="file"
                name="File"
                onChange={(e) => setFile(e.target.files[0])}
              />
            ) : (
              <TextField
                sx={{ my: 2 }}
                required
                fullWidth
                id="uploadhere"
                label="Upload Here"
                name="Uplaod Here"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            )}
            <Button
              type="Submit"
              variant="contained"
              disabled={uploading}
              fullWidth style={{ backgroundColor: "rgb(var(--green-color))" }}>
              {" "}
              <CloudUpload />
              <span>{uploading ? "Uploading..." : "Upload"}</span>
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Upload