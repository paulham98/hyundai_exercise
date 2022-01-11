import axios from 'axios'

const get_hostname = () =>{
  window.location.hostname;
  if (process.env.NODE_ENV === 'local'){
    return 'http://'
  } else {
    return ''      // Else, return the original string.
  }
}
const config = {
  hostname: get_hostname()
}
function fetchApi31(robot_data_key){
  // Line List
  let api31URL = `${config.hostname}/hiweld/api/dashboard/storage/${robot_data_key}?factory=F100`;
  return fetch(api31URL).then(res=>res.json()).then(data=>data.data)
}

function putApi32(data){
  // Line List저장
  return axios.put(`${config.hostname}/hiweld/api/dashboard/storage/`, data)
}

const putApi40 = (device_info) => {
  // 용접기 저장
  let api40URL = `${config.hostname}/hiweld/api/info/factories/F100/lines/${device_info.lineCd}/processes/${device_info.processCd}/device/${device_info.device_cd}/location`;
  let body = {
    colCd: device_info.column,
    position: device_info.position,
    device: `${device_info.device_cd}`,
    factory: "F100",
    line : `${device_info.lineCd}`,
    process: `${device_info.processCd}`
  }
  console.log(body)
  return axios.put(api40URL, body)
}

function fetchApi6(){
  return fetch(`${config.hostname}/hiweld/api/config/devices?all=false&factory=F100`).then(res=>res.json()).then(data=>data.data)
}
function fetchEntireLines(){
  return fetch(`${config.hostname}/hiweld/api/code/factories/F100/lines`).then(res=>res.json()).then(data=>data.data)
}


export {
  fetchApi6,
  fetchApi31,
  putApi32,
  putApi40,
  fetchEntireLines
}
