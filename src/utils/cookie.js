export const setCookie = (name, val, ex) => {
  const d = new Date()
  d.setTime(d.getTime() + ex * 24 * 60 * 60 * 1000)
  const expires = 'expires=' + d.toUTCString()
  document.cookie = `${name}=${val};${expires};path=/`
}

export const getCookie = (cname) => {
  let name = cname + "="
  let ca = document.cookie.split(';')
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ""
}