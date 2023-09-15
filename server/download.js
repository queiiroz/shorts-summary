import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) =>
  new Promise((resolve, rejects) => {
    const videoUrl = "https://www.youtube.com/watch?v=" + videoId
    console.log("Ralizando o download do vídeo:", videoId)

    ytdl(videoUrl, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const segundos = info.formats[0].approxDurationMs / 1000

        if (segundos > 60) {
          throw new Error("A duração desse vídeo é maior que 60 segundos")
        }
        
      })
      .on("end", () => {
        console.log("Download finalizado")
        resolve()
      })
      .on("error", (error) => {
        console.log(
          "Não foi posivel fazer o download do vídeo. Detalhes do erro:",
          error
        )
        rejects(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
