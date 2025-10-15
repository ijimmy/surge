// 获取响应体
let body = $response.body;

try {
  const data = JSON.parse(body);

  // ✅ 顶层可售状态模拟
  if (data?.data) {
    console.log(data.data);
    data.data.saleState = 2; // 在售状态
    // data.data.canAddCart = true;
    // data.data.buttonState = 1;
    // data.data.buttonStateDes = "立即购票";
    // data.data.allowChooseSeat = true;

    // 防止一些前端校验为空
    // data.data.guideState = 1;
    // data.data.channelAuthorizeStatus = 1;
    // data.data.eventSaleStage = 2;
  }

  // ✅ 子赛事可售状态模拟
  if (Array.isArray(data?.data?.eventVoList)) {
    data.data.eventVoList.forEach((event) => {
      event.saleState = 2;
      event.eventSaleStage = 2;
    //   event.canAddCart = true;
      event.buttonState = 1;
      event.buttonStateDes = "立即购票";
      event.channelAuthorizeStatus = 1;
      event.guideState = 1;

      // 时间强制为当前时间之后，防止过期判断
      const now = Date.now();
      if (event.saleStartTime && event.saleStartTime < now) {
        event.saleStartTime = now - 1000;
      }
      if (event.saleEndTime && event.saleEndTime < now) {
        event.saleEndTime = now + 3600 * 1000 * 24;
      }

      // ✅ 子价位配置可售
      if (Array.isArray(event.priceVoList)) {
        event.priceVoList.forEach((price) => {
          price.sellOut = false;
        //   price.canAddCart = true;
          price.channelAuthorizeStatus = 1;
        });
      }
    });
  }

  body = JSON.stringify(data);
} catch (e) {
  console.log("JSON parse error:", e);

  // 如果不是 JSON，尝试兜底修改 saleState 值
  body = body
    .replace(/"saleState"\s*:\s*0/g, '"saleState":2')
    .replace(/"eventSaleStage"\s*:\s*0/g, '"eventSaleStage":2')
    .replace(/"channelAuthorizeStatus"\s*:\s*0/g, '"channelAuthorizeStatus":1');
}

// ✅ 输出修改后的响应
$done({ body });