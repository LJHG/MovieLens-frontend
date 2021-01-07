const host = "http://127.0.0.1:5000";

const POST_FIX = "UX182_CR2,0,182,268_AL_"

const POST_FIX_BIG = "UX270_CR2,0,270,400_AL_"


const genMovieUrl = (url) => {
  let pos = url.length - 4
  return url.slice(0, pos) + POST_FIX + url.slice(pos)
}

const genMovieUrlBig = (url) => {
  let pos = url.length - 4
  return url.slice(0, pos) + POST_FIX_BIG + url.slice(pos)
}

export {host,genMovieUrl,genMovieUrlBig};