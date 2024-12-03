document.getElementById("upload-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData();
  const audioFile = document.getElementById("audio-file").files[0];

  if (!audioFile) {
      alert("Selecione um arquivo de áudio!");
      return;
  }

  formData.append("audio", audioFile);

  try {
      const response = await fetch("http://127.0.0.1:8000//api/transcribe/", {
          method: "POST",
          body: formData,
      });

      const result = await response.json();
      if (response.ok) {
          document.getElementById("transcription-text").innerText = result.transcription;
      } else {
          document.getElementById("transcription-text").innerText = "Erro: " + result.error;
      }
  } catch (error) {
      document.getElementById("transcription-text").innerText = "Erro: " + error.message;
  }})