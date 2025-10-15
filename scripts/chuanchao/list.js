let body = $response.body;
try {
  let data = JSON.parse(body);

  if (data && data.data) {
    let list = data.data.dataList;
    if (Array.isArray(list)) {
      list.forEach((p) => {
        // systemTime = 1760772600000
        // 创建日期对象（时间戳单位是毫秒）
        const date = new Date(Number(p.systemTime));

        const now = Date.now();

        const diffMs = now - Number(p.systemTime);

        // 转换为中国时间字符串
        const time = date.toLocaleString("zh-CN", {
          timeZone: "Asia/Shanghai",
        });

        p.siteName = time + ' ' + diffMs;
      });
    }
    body = JSON.stringify(data);
  }
} catch (e) {
  console.log("maitix event parse error:", e);
}

$done({ body });
