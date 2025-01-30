function downloadVideo() {
    var url = document.getElementById("videoUrl").value;
    var loadingText = document.getElementById("loadingText");

    if (url === "") {
        alert("Masukkan URL YouTube terlebih dahulu!");
        return;
    }

    loadingText.style.display = "block";

    fetch('/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Gagal mengunduh video");
        }
        return response.blob();
    })
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "video.mp4";
        document.body.appendChild(a);
        a.click();
        a.remove();
        loadingText.style.display = "none";
    })
    .catch(error => {
        alert(error.message);
        loadingText.style.display = "none";
    });
}
