import http from 'node:http';

const PORT = Number(process.env.PORT || 8787);
const MODEL_ENDPOINT = process.env.MODEL_ENDPOINT || 'http://127.0.0.1:11434/api/generate';
const MODEL_NAME = process.env.MODEL_NAME || 'qwen2.5:7b';

function sendJson(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks).toString('utf8');
}

function buildPrompt(payload) {
  return [
    '너는 세계사 시뮬레이터의 국제 뉴스 편집장이다.',
    '아래 턴 결과를 바탕으로 3~5문장 분량의 짧고 선명한 한국어 브리핑을 작성하라.',
    '과장된 판타지 표현은 피하고, 국제정치/경제/전략 보고서 톤을 유지하라.',
    '',
    `플레이 세력: ${payload.faction}`,
    `정책: ${payload.action}`,
    `대외 행동: ${payload.diplomacy}`,
    `세계 이벤트: ${payload.event}`,
    `세계 긴장도: ${payload.worldTension}`,
    `동맹 수: ${payload.allianceCount}`,
    `전쟁 수: ${payload.warCount}`,
    `요약: ${payload.summary}`
  ].join('\n');
}

async function generateBriefing(payload) {
  const response = await fetch(MODEL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL_NAME,
      prompt: buildPrompt(payload),
      stream: false
    })
  });

  if (!response.ok) {
    throw new Error(`Model request failed: ${response.status}`);
  }

  const json = await response.json();
  return json.response || '';
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    return sendJson(res, 200, { ok: true });
  }

  if (req.url === '/health') {
    return sendJson(res, 200, { ok: true, modelEndpoint: MODEL_ENDPOINT, modelName: MODEL_NAME });
  }

  if (req.url === '/api/briefing' && req.method === 'POST') {
    try {
      const body = await readBody(req);
      const payload = JSON.parse(body || '{}');
      const briefing = await generateBriefing(payload);
      return sendJson(res, 200, { ok: true, briefing });
    } catch (error) {
      return sendJson(res, 500, { ok: false, error: String(error.message || error) });
    }
  }

  return sendJson(res, 404, { ok: false, error: 'Not found' });
});

server.listen(PORT, () => {
  console.log(`LLM bridge listening on http://127.0.0.1:${PORT}`);
});
