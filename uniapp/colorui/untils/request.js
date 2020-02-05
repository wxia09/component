export const request = (url, data, method = "GET") => {
  // 以下根据实际需要修改
  let token = uni.getStorageSync("token");
  return new Promise((res, rej) => {
    uni
      .request({
        url,
        data,
        method: method.toLocaleUpperCase(),
        header: 'xxxx' + token
      })
      .then(r => {
        let [data, err] = r;
        if (err) {
          console.log("出错了");
          return rej(err);
        }
        let statusCode = data.statusCode;
        switch (statusCode) {
          case 400:
            uni.showToast({
              title: data.dat.message,
              icon: "none"
            });
            rej(data.data);
            break;
          case 401:
            uni.showToast({
              title: data.data.message,
              iocn: "none"
            });
            rej(data.data);
            break;
          case 403:
            uni.showToast({
              title: data.data.message,
              iocn: "none"
            });
            rej(data.data);
            break;
          case 422:
            let e = data.data.errors;
            if (e) {
              let str = "";
              for (let i in e) {
                str += e[i].join(",");
              }
              uni.showToast({
                title: str,
                icon: "none"
              });
            }
            reject(new Error("表单不完整"));
            break;
          case 500:
            rej(new Error('500'));
            break;
          case 200:
            res(data.data);
            break;
          default:
            res(data.data);
            break;
        }
      })
      .catch(err => rej(err));
  });
};
