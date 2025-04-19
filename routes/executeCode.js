const express = require('express');
const router = express.Router();
const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');
const { v4: uuidv4 } = require('uuid');

// Base temporary directory
const tempDir = path.join(__dirname, '..', 'temp');

// Timeout for code execution
const MAX_EXECUTION_TIME = parseInt(process.env.MAX_EXECUTION_TIME) || 10000; // 10 seconds default

// Execute JavaScript code
router.post('/javascript', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: 'No code provided' });
    }

    const id = uuidv4();
    const tmpFile = path.join(tempDir, `${id}.js`);
    
    await fs.writeFile(tmpFile, code);
    
    exec(`node "${tmpFile}"`, { timeout: MAX_EXECUTION_TIME }, (error, stdout, stderr) => {
      if (error && error.killed) {
        return res.status(408).json({ error: 'Execution timed out' });
      }
      
      // Clean up
      fs.remove(tmpFile).catch(err => console.error('Error removing temp file:', err));
      
      res.json({
        output: stdout,
        error: stderr
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Execute Python code
router.post('/python', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: 'No code provided' });
    }

    const id = uuidv4();
    const tmpFile = path.join(tempDir, `${id}.py`);
    
    await fs.writeFile(tmpFile, code);
    
    exec(`python "${tmpFile}"`, { timeout: MAX_EXECUTION_TIME }, (error, stdout, stderr) => {
      if (error && error.killed) {
        return res.status(408).json({ error: 'Execution timed out' });
      }
      
      // Clean up
      fs.remove(tmpFile).catch(err => console.error('Error removing temp file:', err));
      
      res.json({
        output: stdout,
        error: stderr
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Execute Java code
router.post('/java', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: 'No code provided' });
    }

    const id = uuidv4();
    const dirPath = path.join(tempDir, id);
    const className = 'Main'; // Java class name must match the one in the code
    const javaFile = path.join(dirPath, `${className}.java`);
    
    await fs.ensureDir(dirPath);
    await fs.writeFile(javaFile, code);
    
    // Compile and run
    exec(`javac "${javaFile}" && java -cp "${dirPath}" ${className}`, { timeout: MAX_EXECUTION_TIME }, (error, stdout, stderr) => {
      if (error && error.killed) {
        return res.status(408).json({ error: 'Execution timed out' });
      }
      
      // Clean up
      fs.remove(dirPath).catch(err => console.error('Error removing temp directory:', err));
      
      res.json({
        output: stdout,
        error: stderr
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Execute C++ code
router.post('/cpp', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: 'No code provided' });
    }

    const id = uuidv4();
    const dirPath = path.join(tempDir, id);
    const cppFile = path.join(dirPath, 'main.cpp');
    const exeFile = path.join(dirPath, process.platform === 'win32' ? 'main.exe' : 'main');
    
    await fs.ensureDir(dirPath);
    await fs.writeFile(cppFile, code);
    
    // Compile and run
    const compileCmd = process.platform === 'win32' 
      ? `g++ "${cppFile}" -o "${exeFile}"`
      : `g++ "${cppFile}" -o "${exeFile}"`;
    
    exec(compileCmd, { timeout: MAX_EXECUTION_TIME / 2 }, (compileError, compileStdout, compileStderr) => {
      if (compileError) {
        // Clean up
        fs.remove(dirPath).catch(err => console.error('Error removing temp directory:', err));
        
        return res.json({
          output: '',
          error: compileStderr || compileError.message
        });
      }
      
      // Execute the compiled program
      exec(`"${exeFile}"`, { timeout: MAX_EXECUTION_TIME / 2 }, (runError, runStdout, runStderr) => {
        // Clean up
        fs.remove(dirPath).catch(err => console.error('Error removing temp directory:', err));
        
        if (runError && runError.killed) {
          return res.status(408).json({ error: 'Execution timed out' });
        }
        
        res.json({
          output: runStdout,
          error: runStderr
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = router; 