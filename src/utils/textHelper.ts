import { round } from './mathHelper'

export const copyToClipboard = (text: string, consoleIt: boolean = false): boolean => {
  try {
    var textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    if (consoleIt) window.alert(`Text copied! ${text}`)
    return true
  } catch (e) {
    console.error(e)
    if (consoleIt) window.alert('Text failed to be copied!')
    return false
  }
}

const htmlTagsIndexes = [
  '<div>',
  '</div>',
  '<p>',
  '</p>',
  '<a>',
  '</a>',
  '<br>',
  '<br/>',
  '<br />',
  '<h1>',
  '</h1>',
  '<h2>',
  '</h2>',
  '<h3>',
  '</h3>',
  '<h4>',
  '</h4>',
  '<h5>',
  '</h5>',
  '<h6>',
  '</h6>',
  '<b>',
  '</b>',
  '<i>',
  '</i>',
  '<u>',
  '</u>',
  '<strong>',
  '</strong>',
  '<em>',
  '</em>',
  '<abbr>',
  '</abbr>',
  '<address>',
  '</address>',
  '<blockquote>',
  '</blockquote>',
  '<bdo>',
  '</bdo>',
  '<pre>',
  '</pre>',
  '<ul>',
  '</ul>',
  '<ol>',
  '</ol>',
  '<li>',
  '</li>',
  '<table>',
  '</table>',
  '<thead>',
  '</thead>',
  '<tbody>',
  '</tbody>',
  '<tr>',
  '</tr>',
  '<th>',
  '</th>',
  '<td>',
  '</td>'
]
export function cleanHTMLFromTextV1(text: string) {
  htmlTagsIndexes.forEach(tag => {
    text = text.replaceAll(tag, ' ')
  })
  return text.trim()
}

const bibleVerses = [
  'Kejadian',
  'Keluaran',
  'Imamat',
  'Bilangan',
  'Ulangan',
  'Yosua',
  'Hakim-Hakim',
  'Rut',
  '1 Samuel',
  '2 Samuel',
  '1 Raja-raja',
  '2 Raja-raja',
  '1 Tawarikh',
  '2 Tawarikh',
  'Ezra',
  'Nehemia',
  'Ester',
  'Ayub',
  'Mazmur',
  'Amsal',
  'Pengkhotbah',
  'Kidung Agung',
  'Yesaya',
  'Yeremia',
  'Ratapan',
  'Yehezkiel',
  'Daniel',
  'Hosea',
  'Yoel',
  'Amos',
  'Obaja',
  'Yunus',
  'Mikha',
  'Nahum',
  'Habakuk',
  'Zefanya',
  'Hagai',
  'Zakharia',
  'Maleakhi',
  // "Tobit", "Yudit", "1 Makabe", "2 Makabe", "Kebijaksanaan Salomo", "Yesus bin Sirakh", "Barukh", "Surat Yeremia", "Tambahan Daniel", "Tambahan Ester",
  'Matius',
  'Markus',
  'Lukas',
  'Yohanes',
  'Kisah Para Rasul',
  'Roma',
  '1 Korintus',
  '2 Korintus',
  'Galatia',
  'Efesus',
  'Filipi',
  'Kolose',
  '1 Tesalonika',
  '2 Tesalonika',
  '1 Timotius',
  '2 Timotius',
  'Titus',
  'Filemon',
  'Ibrani',
  'Yakobus',
  '1 Petrus',
  '2 Petrus',
  '1 Yohanes',
  '2 Yohanes',
  '3 Yohanes',
  'Yudas',
  'Wahyu'
]

const commonWords = [
  'tuhan',
  'kitab',
  'alkitab',
  'hari',
  'ibadah',
  'renungan',
  'pbc',
  'allah',
  'aku',
  'terlalu',
  'begitu',
  'saya',
  'merasakan'
]

type scoreItemKeys = 'isNormal' | 'isVerse' | 'isNumber' | 'isCommon'
export function checkStringCategory(value: string): scoreItemKeys {
  if (!isNaN(Number(value))) return 'isNumber'
  if (commonWords.map(verse => verse.toLocaleLowerCase()).includes(value)) return 'isCommon'
  if (bibleVerses.map(verse => verse.toLocaleLowerCase()).includes(value)) return 'isVerse'
  return 'isNormal'
}

export function filterPokokDoaKeywordArray(keywordArr: string[]) {
  const excludedKeywords = ['saya', 'aku', 'tuhan', 'hari', 'allah', 'doakan', 'berdoa', 'doa', 'merasa', 'agar']
  let result: string[] = []
  keywordArr.forEach(keyword => {
    if (!excludedKeywords.includes(keyword)) result.push(keyword)
  })
  return result
}

export const getShortenNumber = (value: number) => {
  let result = value.toString()
  // if (value >= 1000 && value < 10000) result = String(value/1000) + "K"
  if (value >= 1000 && value < 10000)
    result = (value % 1000 >= 100 ? round(value / 1000, 1).toFixed(1) : round(value / 1000, 0).toFixed(0)) + 'K'
  return result
}

export const getWhatsappShareLink = (text: string, title?: string) => {
  return 'https://web.whatsapp.com/send?text=' + (title ?? 'Lihat apa yang saya share!%0a') + text
}

export const getWhatsappDirectLink = (phone: string, text: string, title?: string) => {
  const numberOnly = /^\d+$/.test(phone)
  if (!numberOnly) return undefined
  if (phone.charAt(0) === '0') phone = phone.replace('0', '62')
  return (
    `https://web.whatsapp.com/send?phone=${phone}&text=` + (title ?? 'Halo, saya pengunjung pada web anda!%0a') + text
  )
}

export const getTwitterShareLink = (link: string) => {
  return 'https://twitter.com/share?url=' + link
}

export const getForumEmailShareLink = (title: string, link: string) => {
  return `mailto:?subject=${title}&body=Baca ${title} di Forum GKT Pondok Indah - ${link}`
}

// %3A = :
// %2F = /
// %0a = enter

// https://twitter.com/share?url=https://www.kaskus.co.id/thread/633526e5011f9e307b34435f/massage-panggilan-jakarta-terpercaya---aurelspamassagecom

// https://web.whatsapp.com/send?text=https://www.kaskus.co.id/thread/633526e5011f9e307b34435f/massage-panggilan-jakarta-terpercaya---aurelspamassagecom/

// mailto:?subject=MAN%20CITY%20VS%20MU%3A%20MAU%20BIKIN%20BERAPA%20GOL%2C%20HAALAND%3F&body=MAN%20CITY%20VS%20MU%3A%20MAU%20BIKIN%20BERAPA%20GOL%2C%20HAALAND%3F - https%3A%2F%2Fwww.kaskus.co.id%2Fthread%2F6335c78e91885010d547d46c%2Fman-city-vs-mu-mau-bikin-berapa-gol-haaland%2F%3Futm_source%3Demail%26utm_medium%3Dsocial%26utm_content%3D%26utm_campaign%3Dorganic-share
