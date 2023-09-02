export const formatRupiah = (angka: string, prefix?: string) => {
  let separator = ''
  const number_string = angka.replace(/[^,\d]/g, '').toString()
  const split = number_string.split(',')
  const sisa = split[0].length % 3
  let rupiah = split[0].substring(0, sisa)
  const ribuan = split[0].substring(sisa).match(/\d{3}/gi)

  if (ribuan) {
    separator = sisa ? '.' : ''
    rupiah += separator + ribuan.join('.')
  }

  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah
  return prefix == undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : ''
}

export const decodeRupiah = (rupiah: string) => {
  return parseInt(rupiah.replace(/,.*|[^0-9]/g, ''), 10)
}
