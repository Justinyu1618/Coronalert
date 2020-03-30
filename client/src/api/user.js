import Request from './request'

class User {
  static submit(data) {
    return new Request("/user/submit", {
      data: data,
      method: "POST"
    })
  }

  static getData(number){
    return new Request("/user/get_data/?number=" + number)
  }
}

export default User;