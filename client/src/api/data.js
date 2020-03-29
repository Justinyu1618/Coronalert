import Request from './request'

class Data {
  static get_data(info) {
    return new Request("/datapull/get_data", {
      data: info,
      method: "POST"
    })
  }

  static test_get_data(){
    return new Request("/datapull/test_get_data")
  }
}

export default Data;