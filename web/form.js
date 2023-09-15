import { server } from "./server.js"

const form = document.getElementById("form")
const url = document.getElementById("url")
const resumo = document.getElementById("resumo")

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const videoUrl = url.value

  if (!videoUrl.includes("shorts")) {
    return (resumo.textContent = "Esse vídeo não é um shorts")
  }

  const [_, params] = videoUrl.split("/shorts/")
  const [videoId] = params.split("?si")

  resumo.textContent = "Obtendo o texto do áudio..."

  const transcricao = await server.get("/summary/" + videoId)

  resumo.textContent = "Realizando resumo..."

  const summary = await server.post("/summary", {
    text: transcricao.data.result,
  })

  resumo.textContent = summary.data.result
})
