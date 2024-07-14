let cropper;

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        document.getElementById('imageToCrop').src = e.target.result;
        document.getElementById('cropContainer').style.display = 'block';
        if (cropper) {
            cropper.destroy();
        }
        cropper = new Cropper(document.getElementById('imageToCrop'), {
            aspectRatio: 1,
            viewMode: 1,
        });
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

document.getElementById('cropBtn').addEventListener('click', function() {
    if (cropper) {
        const canvas = cropper.getCroppedCanvas({
            width: 30,
            height: 30,
        });
        document.getElementById('croppedImage').src = canvas.toDataURL('image/png');
        document.getElementById('cropContainer').style.display = 'none';
        cropper.destroy();
        cropper = null;
    }
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    const name = document.getElementById('nameInput').value;
    html2canvas(document.getElementById('imageUploadContainer'), { scale: 2 }).then(function(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'black';
        ctx.fillText(name, canvas.width / 2, canvas.height - 20);
        
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'combined_image.png';
        link.click();
    });
});
