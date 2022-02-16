export default function parseQueryString(query) {
  query = query || window.location.search
  let queryObj = {}
  query.replace(
    new RegExp('([^?=&]+)(=([^&]*))?', 'g'),
    function (a, b, c, d) {
      queryObj[b] = d
    }
  )
  return queryObj
}
