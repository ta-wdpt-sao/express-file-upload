document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('myForm').addEventListener('submit', (e) => {
    e.preventDefault();

    var formData = new FormData();
    var name = document.getElementById('myName').value;
    var file = document.getElementById('myFile').files[0];
    formData.append('name', name);
    formData.append('photo', file);
    
    // with XMLHttpRequest
    /*
    var xhr = new XMLHttpRequest();
    
    // your url upload
    xhr.open('post', '/upload', true);
    
    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        var percentage = (e.loaded / e.total) * 100;
        console.log(percentage + "%");

        document.getElementById('progress-bar').style.width = percentage + "%";
        document.getElementById('progress-bar').innerHTML = parseInt(percentage) + " %";

        if(percentage == 100) {
          document.getElementById('progress-bar').innerHTML = 'Success!';
        }
      }
    };
    
    xhr.onerror = function(e) {
      console.log('Error');
      console.log(e);
    };

    xhr.onload = function() {
      console.log(this.statusText);
      window.location.reload();
    };
    
    xhr.send(formData);
    */

    // with axios
    axios.post('/upload', formData, {
      onUploadProgress: event => {
        if (event.lengthComputable) {
          var percentage = (event.loaded / event.total) * 100;
          console.log(percentage + "%");
  
          document.getElementById('progress-bar').style.width = percentage + "%";
          document.getElementById('progress-bar').innerHTML = parseInt(percentage) + " %";
  
          if(percentage == 100) {
            document.getElementById('progress-bar').innerHTML = 'Success!';
          }
        }
      }
    })
    .then(response => {
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
    })
  })
}, false);
