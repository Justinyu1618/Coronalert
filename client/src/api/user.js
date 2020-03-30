import Request from './request'

class User {
  static submit(data) {
    console.log(data)
    return new Request("/user/submit", {
      data: data,
      method: "POST"
    })
  }

  static getData(number){
    return new Request("/user/get_data", {
      data: {number: number},
      method: "POST"
    })
  }
}

export default User;