(async () => {
  const res = await fetch('https://www.ubereats.com/_p/api/getStoreV1', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-csrf-token': 'x' },
    body: JSON.stringify({
      storeUuid: 'f49456b2-bcba-4a4d-a865-aba34032b7b1',
      diningMode: 'PICKUP',
    }),
  });
  const json = await res.json();
  const out = [];
  const map = json.data?.catalogSectionsMap || {};
  for (const sections of Object.values(map)) {
    for (const sec of sections || []) {
      const payload = sec?.payload?.standardItemsPayload;
      const section = payload?.title?.text || payload?.title || 'Unknown';
      for (const it of payload?.catalogItems || []) {
        out.push({
          section,
          name: it.title,
          description: it.itemDescription || '',
          price: it.price,
          imageUrl: it.imageUrl || '',
          uuid: it.uuid,
        });
      }
    }
  }
  const hero =
    json.data?.heroImageUrls?.[0]?.url ||
    json.data?.heroImageUrls?.[0] ||
    null;
  return JSON.stringify({ count: out.length, hero, items: out });
})();
