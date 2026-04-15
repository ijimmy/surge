let body = $response.body;

try {
  const data = JSON.parse(body);

  if (data?.data) {
    data.data.saleState = 2;
    data.data.sellOut = false;
    data.data.canAddCart = true;
  }

  if (Array.isArray(data?.data?.eventVoList)) {
    data.data.eventVoList.forEach((event) => {
      event.saleState = 2;
      event.eventSaleStage = 2;

      event.sellOut = false;
      event.canAddCart = true;

      event.buttonState = 1;
      event.buttonStateDes = "立即购票";

      event.channelAuthorizeStatus = 1;
      event.guideState = 1;

      const now = Date.now();
      event.saleStartTime = now - 1000;
      event.saleEndTime = now + 86400000;

      if (Array.isArray(event.priceList)) {
        event.priceList.forEach((price) => {
          price.sellOut = false;
          price.canAddCart = true;
          price.marginCount = 9999;
          price.channelAuthorizeStatus = 1;
        });
      }
    });
  }

  body = JSON.stringify(data);
} catch (e) {
  console.log("JSON parse error:", e);
}

$done({ body });
