let body = $response.body;
try {
  let data = JSON.parse(body);

  if (data && data.data) {
    let ev = data.data;

    // ✅ 模拟开售状态
    ev.saleState = 2;
    ev.eventSaleStage = 2;
    // ev.canAddCart = true;
    ev.sellOut = false;
    // ev.channelAuthorizeStatus = 1;
    // ev.buttonState = 1;
    // ev.buttonStateDes = "立即购票";
    // ev.autoSaleStartTime = Date.now() - 60 * 1000; // 提前一分钟
    // ev.systemTime = Date.now();

    // ✅ 修改所有票档为可购买
    if (Array.isArray(ev.priceVoList)) {
      ev.priceVoList.forEach((p) => {
        // p.canAddCart = true;
        // p.channelAuthorizeStatus = 1;
        // p.goodCount = 99;
        // p.saleCount = 99;
        p.sellOut = false;
      });
    }

    body = JSON.stringify(data);
  }
} catch (e) {
  console.log("maitix event parse error:", e);
}

$done({ body });