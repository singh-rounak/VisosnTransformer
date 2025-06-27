document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const originalText = document.getElementById('originalText');
    const translatedText = document.getElementById('translatedText');
    
    // Handle click on upload area
    uploadArea.addEventListener('click', () => fileInput.click());
    
    // Handle drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#666';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#ccc';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#ccc';
        
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleFileUpload();
        }
    });
    
    // Handle file selection
    fileInput.addEventListener('change', handleFileUpload);
    
    function handleFileUpload() {
        const file = fileInput.files[0];
        if (!file) return;
        
        // Show loading state
        originalText.textContent = "Processing...";
        translatedText.textContent = "";
        
        const formData = new FormData();
        formData.append('file', file);
        
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                originalText.textContent = "Error: " + data.error;
                return;
            }
            
            originalText.textContent = data.original_text || "No text detected";
            translatedText.textContent = data.translated_text || "No translation available";
        })
        .catch(error => {
            originalText.textContent = "Error: " + error.message;
        });
    }
});