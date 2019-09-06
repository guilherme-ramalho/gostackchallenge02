class RestHelper {
  getMeta(status = "success", message = "Teste") {
    return {
      status: status,
      message: message
    };
  }
}

export default new RestHelper();
