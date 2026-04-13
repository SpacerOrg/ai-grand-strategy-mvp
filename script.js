const MAX_TURNS = 12;

const factions = [
  {
    id: "technocracy",
    name: "북방 기술관료 연합",
    summary: "연산 자원과 자동화를 기반으로 세계 표준을 장악하려는 고밀도 기술 국가입니다.",
    doctrine: "기술 우위와 국가 주도 최적화",
    worldTone: "AI 인프라와 연산 자원 확보 경쟁이 질서를 재편하고 있습니다.",
    victoryFocus: "기술 패권과 경제적 우월을 동시에 달성",
    stats: { stability: 58, economy: 66, military: 44, technology: 78 },
    resources: { energy: 62, compute: 84, legitimacy: 49 },
    actions: [
      {
        id: "compute-cluster",
        title: "연산 클러스터 확장",
        desc: "국가 규모 연산망을 확충해 모델 성능과 자동화 역량을 밀어 올립니다.",
        tag: "산업 정책",
        effects: { technology: 11, economy: 5, energy: -8, legitimacy: -3 },
        aiBias: "tech"
      },
      {
        id: "automation-dividend",
        title: "자동화 배당 도입",
        desc: "자동화 이익을 시민에게 분배해 체제 신뢰를 보강합니다.",
        tag: "내정",
        effects: { stability: 8, legitimacy: 10, economy: -4, compute: 3 },
        aiBias: "social"
      },
      {
        id: "drone-wall",
        title: "드론 방벽 전개",
        desc: "자율 방위망을 전국 경계선에 전개해 억지력을 끌어올립니다.",
        tag: "국방",
        effects: { military: 12, technology: 4, stability: -2, energy: -6 },
        aiBias: "military"
      },
      {
        id: "closed-model-regime",
        title: "폐쇄형 모델 규제체제",
        desc: "고위험 모델 접근을 중앙 허가제로 묶어 통제력을 강화합니다.",
        tag: "통치",
        effects: { stability: 6, legitimacy: -6, technology: 5 },
        aiBias: "control"
      }
    ]
  },
  {
    id: "maritime",
    name: "남해 무역 동맹",
    summary: "항로, 공급망, 자원 중계를 지배하며 외교와 시장을 동시에 흔드는 해상 상업 세력입니다.",
    doctrine: "무역 패권과 유연한 균형 외교",
    worldTone: "희토류, 배터리, 해상 물류 병목이 모든 외교 판단의 기준이 되었습니다.",
    victoryFocus: "경제 허브와 외교 중심국으로 올라서기",
    stats: { stability: 62, economy: 74, military: 38, technology: 52 },
    resources: { energy: 58, compute: 49, legitimacy: 63 },
    actions: [
      {
        id: "free-port",
        title: "자유항 확대",
        desc: "관세와 입항 규제를 낮춰 자본과 선단을 빨아들입니다.",
        tag: "무역",
        effects: { economy: 10, legitimacy: 5, military: -3, energy: 4 },
        aiBias: "economy"
      },
      {
        id: "rare-earth-contract",
        title: "희토류 장기계약",
        desc: "핵심 자원 선점 계약으로 제조업과 동맹 의존도를 높입니다.",
        tag: "자원",
        effects: { economy: 7, technology: 7, legitimacy: -2, energy: 5 },
        aiBias: "resource"
      },
      {
        id: "escort-fleet",
        title: "호위 함대 증설",
        desc: "전략 해협 통제와 상선 보호를 위해 기동전력을 강화합니다.",
        tag: "안보",
        effects: { military: 11, economy: -4, stability: 2, energy: -3 },
        aiBias: "military"
      },
      {
        id: "trade-charter",
        title: "민간 무역 헌장",
        desc: "도시 상인 연합에 자치권을 주고 시장 혁신을 유도합니다.",
        tag: "거버넌스",
        effects: { economy: 6, legitimacy: 8, stability: 3, military: -2 },
        aiBias: "diplomacy"
      }
    ]
  },
  {
    id: "commons",
    name: "연합 자치 코뮌",
    summary: "복원력 높은 지역 연합, 공공 연구, 생태 복원 프로젝트로 장기전을 버티는 연방형 공동체입니다.",
    doctrine: "사회적 결속과 분산 회복력",
    worldTone: "기후 충격, 인구 이동, 에너지 전환의 파도가 정치 질서를 흔들고 있습니다.",
    victoryFocus: "안정성과 정당성을 바탕으로 질서의 대안을 제시",
    stats: { stability: 76, economy: 48, military: 35, technology: 58 },
    resources: { energy: 68, compute: 52, legitimacy: 77 },
    actions: [
      {
        id: "climate-restoration",
        title: "기후 복원 공공사업",
        desc: "치수, 산림, 농업 회복을 동시에 밀어붙여 장기 지속성을 확보합니다.",
        tag: "환경",
        effects: { stability: 11, economy: 4, legitimacy: 7, energy: 6 },
        aiBias: "social"
      },
      {
        id: "civilian-defense",
        title: "시민 방위 네트워크",
        desc: "분산 방위 체계를 조직해 침투 비용을 높입니다.",
        tag: "방위",
        effects: { military: 8, stability: 6, economy: -2, legitimacy: 4 },
        aiBias: "military"
      },
      {
        id: "open-research-treaty",
        title: "개방형 연구 조약",
        desc: "연구 성과를 공유하며 기술 확산과 외교 신뢰를 동시에 확보합니다.",
        tag: "외교",
        effects: { technology: 10, legitimacy: 6, economy: 3, compute: 4 },
        aiBias: "tech"
      },
      {
        id: "food-cooperative-grid",
        title: "식량 협동망 재편",
        desc: "지역 단위 식량망을 통합해 충격 회복력을 높입니다.",
        tag: "복지",
        effects: { stability: 7, energy: 5, economy: 3, military: -2 },
        aiBias: "resilience"
      }
    ]
  }
];

const diplomacyTemplates = [
  {
    id: "research-pact",
    title: "연구 협정 제안",
    desc: "상대 세력과 공동 연구를 묶어 기술과 관계를 동시에 올립니다.",
    relationDelta: 14,
    effects: { technology: 4, legitimacy: 3, compute: 3 },
    tension: -3,
    type: "cooperate",
    minRelation: 0
  },
  {
    id: "resource-deal",
    title: "자원 교환 협상",
    desc: "에너지와 공급망을 교환하며 경제 압박을 완화합니다.",
    relationDelta: 9,
    effects: { economy: 5, energy: 6 },
    tension: -2,
    type: "trade",
    minRelation: 20
  },
  {
    id: "alliance-treaty",
    title: "정식 동맹 체결",
    desc: "상호 방위와 기술 공유를 약속해 강한 블록을 만듭니다.",
    relationDelta: 18,
    effects: { military: 5, technology: 3, legitimacy: 4 },
    tension: 1,
    type: "alliance",
    minRelation: 58
  },
  {
    id: "sanction-regime",
    title: "경제 제재",
    desc: "금융, 물류, 핵심 부품을 차단해 상대의 경제와 정당성을 깎습니다.",
    relationDelta: -16,
    effects: { economy: 2, legitimacy: -2 },
    tension: 7,
    type: "sanction",
    minRelation: 0
  },
  {
    id: "pressure-campaign",
    title: "압박 외교",
    desc: "관세, 해킹, 정보전을 동원해 상대를 압박합니다.",
    relationDelta: -18,
    effects: { economy: 4, military: 3, legitimacy: -4 },
    tension: 8,
    type: "hostile",
    minRelation: 0
  },
  {
    id: "limited-war",
    title: "제한전 개시",
    desc: "전면전은 아니지만 지정학적 분쟁 지역에 군사 개입을 시작합니다.",
    relationDelta: -32,
    effects: { military: 8, legitimacy: -8, economy: -5, energy: -4 },
    tension: 16,
    type: "war",
    minRelation: 0,
    minMilitary: 46
  }
];

const globalEvents = [
  {
    title: "대륙 규모 데이터 정전",
    desc: "대형 데이터센터 권역에서 연쇄 정전이 발생해 AI 의존 경제권이 일시 마비되었습니다.",
    impact: { technology: -7, economy: -5, energy: -6 },
    tension: 4,
    weight: (state) => state.player.stats.technology > 70 ? 1.5 : 1
  },
  {
    title: "희귀 광물 초과 발견",
    desc: "새로운 매장지 발견으로 배터리와 반도체 소재 가격이 하락했습니다.",
    impact: { economy: 7, technology: 4, energy: 3 },
    tension: -1,
    weight: (state) => state.player.stats.economy < 70 ? 1.4 : 1
  },
  {
    title: "알고리즘 금융 패닉",
    desc: "자율 거래망이 붕괴하며 국경 간 자본 이동이 급격히 얼어붙었습니다.",
    impact: { economy: -9, stability: -4, legitimacy: -2 },
    tension: 5,
    weight: (state) => state.worldTension > 55 ? 1.5 : 1
  },
  {
    title: "기후 회복 돌파구",
    desc: "탄소 포집과 생태 복원 기술의 조합이 상용화되며 불안이 완화되었습니다.",
    impact: { stability: 7, legitimacy: 5, technology: 3 },
    tension: -4,
    weight: (state) => state.player.stats.stability < 70 ? 1.3 : 1
  },
  {
    title: "자율무기 금지 협약 붕괴",
    desc: "군축 협상이 실패하면서 세계는 다시 재무장 경쟁에 돌입했습니다.",
    impact: { military: 8, stability: -5 },
    tension: 10,
    weight: () => 1
  },
  {
    title: "초국가 연구 연합 출범",
    desc: "국경을 넘는 연구 네트워크가 출범하며 개방형 기술 확산이 빨라졌습니다.",
    impact: { technology: 6, legitimacy: 4, compute: 4 },
    tension: -2,
    weight: () => 1
  },
  {
    title: "기후 난민 대이동",
    desc: "연안 침수와 폭염으로 대규모 인구 이동이 발생해 주변 지역의 정치가 흔들렸습니다.",
    impact: { stability: -6, legitimacy: -3, economy: -2 },
    tension: 6,
    weight: () => 1.2
  },
  {
    title: "에너지 저장 혁신",
    desc: "장주기 저장 기술이 상용화되며 에너지 안보와 산업 생산성이 동시에 개선되었습니다.",
    impact: { energy: 9, economy: 4, technology: 3 },
    tension: -2,
    weight: () => 1
  }
];

const statLabels = {
  stability: "안정성",
  economy: "경제력",
  military: "군사력",
  technology: "기술력"
};

const resourceLabels = {
  energy: "에너지",
  compute: "연산 자원",
  legitimacy: "정당성"
};

const STORAGE_KEY = "ai-grand-strategy-mvp-save";
const LLM_BRIDGE_URL = "http://127.0.0.1:8787";

const ui = {
  factionSelectList: document.getElementById("factionSelectList"),
  factionName: document.getElementById("factionName"),
  factionSummary: document.getElementById("factionSummary"),
  doctrineChip: document.getElementById("doctrineChip"),
  victoryChip: document.getElementById("victoryChip"),
  worldSummary: document.getElementById("worldSummary"),
  statsGrid: document.getElementById("statsGrid"),
  resourceGrid: document.getElementById("resourceGrid"),
  actionsList: document.getElementById("actionsList"),
  diplomacyList: document.getElementById("diplomacyList"),
  objectivesList: document.getElementById("objectivesList"),
  rivalBoard: document.getElementById("rivalBoard"),
  newsFeed: document.getElementById("newsFeed"),
  eventLog: document.getElementById("eventLog"),
  headline: document.getElementById("headline"),
  turnBadge: document.getElementById("turnBadge"),
  tensionValue: document.getElementById("tensionValue"),
  tensionBar: document.getElementById("tensionBar"),
  actionHint: document.getElementById("actionHint"),
  restartButton: document.getElementById("restartButton"),
  saveButton: document.getElementById("saveButton"),
  loadButton: document.getElementById("loadButton"),
  endTurnButton: document.getElementById("endTurnButton"),
  endgamePanel: document.getElementById("endgamePanel"),
  endingBadge: document.getElementById("endingBadge"),
  endingSummary: document.getElementById("endingSummary"),
  finalScoreGrid: document.getElementById("finalScoreGrid"),
  statusFlags: document.getElementById("statusFlags"),
  turnReport: document.getElementById("turnReport"),
  llmStatus: document.getElementById("llmStatus")
};

let state;

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function randomOf(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function chooseWeightedEvent() {
  const expanded = globalEvents.flatMap((event) => {
    const copies = Math.max(1, Math.round(event.weight(state) * 2));
    return Array.from({ length: copies }, () => event);
  });
  return randomOf(expanded);
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createInitialFactionState(faction) {
  return {
    id: faction.id,
    name: faction.name,
    summary: faction.summary,
    doctrine: faction.doctrine,
    worldTone: faction.worldTone,
    victoryFocus: faction.victoryFocus,
    stats: { ...faction.stats },
    resources: { ...faction.resources },
    actions: deepClone(faction.actions)
  };
}

function getRelationState(factionId) {
  return state.relations[factionId] || { score: 50, status: "neutral", sanctions: 0, warTurns: 0, allianceTurns: 0 };
}

function setRelationState(factionId, next) {
  state.relations[factionId] = next;
}

function relationLabel(relation) {
  if (relation.status === "war") return { text: "전쟁", className: "relation-war" };
  if (relation.status === "allied") return { text: "동맹", className: "relation-positive" };
  if (relation.score >= 65) return { text: "우호", className: "relation-positive" };
  if (relation.score <= 35) return { text: "긴장", className: "relation-negative" };
  return { text: "중립", className: "relation-neutral" };
}

function getObjectives(player) {
  const alliedCount = Object.values(state.relations).filter((relation) => relation.status === "allied").length;
  return [
    `기술력 + 경제력 합계 150 이상 달성, 현재 ${player.stats.technology + player.stats.economy}`,
    `정당성 60 이상 유지, 현재 ${player.resources.legitimacy}`,
    `동맹 1개 이상 또는 우호 관계 2개 이상 확보, 현재 동맹 ${alliedCount}개`,
    `12턴 종료 시 붕괴 조건 회피 (안정성, 경제력, 정당성, 에너지 중 1개라도 15 미만이면 실패)`
  ];
}

function computeScore(player) {
  const diplomacyBonus = Object.values(state.relations).reduce((sum, relation) => {
    if (relation.status === "allied") return sum + 18;
    if (relation.score >= 65) return sum + 12;
    if (relation.status === "war") return sum - 10;
    return sum;
  }, 0);

  return player.stats.stability + player.stats.economy + player.stats.military + player.stats.technology
    + player.resources.energy + player.resources.compute + player.resources.legitimacy + diplomacyBonus - state.worldTension;
}

function headlineFromState() {
  const player = state.player;
  const highStat = Object.entries(player.stats).sort((a, b) => b[1] - a[1])[0][0];
  const map = {
    stability: "국내 체제는 아직 균열보다 결속이 강합니다.",
    economy: "보급망과 자본 흐름이 세계 질서를 끌고 갑니다.",
    military: "군사 억지와 국지 충돌 위험이 동시에 상승하고 있습니다.",
    technology: "기술 패권 경쟁이 다음 시대의 규칙을 쓰고 있습니다."
  };
  return `${state.lastSummary || "새 캠페인이 시작되었습니다."} ${map[highStat]}`;
}

function applyEffects(target, effects) {
  Object.entries(effects).forEach(([key, value]) => {
    if (key in target.stats) target.stats[key] = clamp(target.stats[key] + value);
    if (key in target.resources) target.resources[key] = clamp(target.resources[key] + value);
  });
}

function applyDirectEffectsToFaction(targetFaction, effects) {
  Object.entries(effects).forEach(([key, value]) => {
    if (key in targetFaction.stats) targetFaction.stats[key] = clamp(targetFaction.stats[key] + value);
    if (key in targetFaction.resources) targetFaction.resources[key] = clamp(targetFaction.resources[key] + value);
  });
}

function chooseAiAction(aiFaction) {
  const aggressive = state.worldTension > 62 || aiFaction.stats.military > 60;
  const sorted = [...aiFaction.actions].sort((a, b) => {
    const valueA = Object.values(a.effects).reduce((sum, value) => sum + value, 0);
    const valueB = Object.values(b.effects).reduce((sum, value) => sum + value, 0);
    return valueB - valueA;
  });
  if (aggressive) {
    return sorted.find((item) => item.aiBias === "military") || sorted[0];
  }
  return sorted[Math.floor(Math.random() * Math.min(3, sorted.length))];
}

function tickRelationStates() {
  state.aiFactions.forEach((aiFaction) => {
    const relation = getRelationState(aiFaction.id);

    if (relation.status === "allied") {
      relation.allianceTurns += 1;
      relation.score = clamp(relation.score + 2, 0, 100);
      applyEffects(state.player, { legitimacy: 1, economy: 1 });
    }

    if (relation.status === "war") {
      relation.warTurns += 1;
      applyEffects(state.player, { stability: -4, economy: -3, energy: -3, legitimacy: -2 });
      applyDirectEffectsToFaction(aiFaction, { stability: -3, economy: -3, military: -2 });
      state.worldTension = clamp(state.worldTension + 4, 0, 100);
    }

    if (relation.sanctions > 0) {
      relation.sanctions -= 1;
      applyDirectEffectsToFaction(aiFaction, { economy: -3, legitimacy: -2 });
    }

    setRelationState(aiFaction.id, relation);
  });
}

function simulateAiTurn() {
  return state.aiFactions.map((aiFaction) => {
    const relation = getRelationState(aiFaction.id);
    const action = chooseAiAction(aiFaction);
    applyEffects(aiFaction, action.effects);

    if (relation.status !== "war") {
      relation.score = clamp(relation.score + (Math.floor(Math.random() * 7) - 3), 0, 100);
    }

    if (action.aiBias === "military") state.worldTension = clamp(state.worldTension + 4, 0, 100);
    if (action.aiBias === "tech") state.worldTension = clamp(state.worldTension + 1, 0, 100);
    if (action.aiBias === "social" || action.aiBias === "resilience") state.worldTension = clamp(state.worldTension - 1, 0, 100);

    if (relation.status !== "war" && relation.score <= 18 && aiFaction.stats.military >= 55 && state.worldTension >= 60) {
      relation.status = "war";
      relation.warTurns = 1;
      state.worldTension = clamp(state.worldTension + 8, 0, 100);
      setRelationState(aiFaction.id, relation);
      return `${aiFaction.name}이(가) 국경 분쟁을 전면전으로 확대했습니다.`;
    }

    if (relation.status === "allied" && relation.score < 48) {
      relation.status = "neutral";
      relation.allianceTurns = 0;
    }

    setRelationState(aiFaction.id, relation);
    return `${aiFaction.name}은(는) ${action.title}을(를) 실행했습니다.`;
  });
}

function getStatusFlags() {
  const flags = [];
  const player = state.player;
  const alliedCount = Object.values(state.relations).filter((relation) => relation.status === "allied").length;
  const warCount = Object.values(state.relations).filter((relation) => relation.status === "war").length;

  flags.push({
    label: `체제 안정도 ${player.stats.stability}`,
    tone: player.stats.stability >= 65 ? "good" : player.stats.stability <= 30 ? "bad" : "warn",
    desc: player.stats.stability >= 65 ? "정권 기반이 비교적 단단합니다." : player.stats.stability <= 30 ? "불안과 동요가 심각합니다." : "아직 통제 가능하지만 위험이 쌓이고 있습니다."
  });

  flags.push({
    label: `세계 긴장도 ${state.worldTension}`,
    tone: state.worldTension <= 35 ? "good" : state.worldTension >= 70 ? "bad" : "warn",
    desc: state.worldTension <= 35 ? "협상 여지가 남아 있습니다." : state.worldTension >= 70 ? "국지전이 전면전으로 번질 수 있습니다." : "강대국 충돌 위험이 커지고 있습니다."
  });

  flags.push({
    label: `동맹 ${alliedCount} / 전쟁 ${warCount}`,
    tone: warCount > alliedCount ? "bad" : alliedCount > 0 ? "good" : "neutral",
    desc: warCount > alliedCount ? "전선이 외교 성과보다 많습니다." : alliedCount > 0 ? "블록 정치의 우군이 형성되고 있습니다." : "아직 믿고 맡길 확실한 블록이 없습니다."
  });

  flags.push({
    label: `정당성 ${player.resources.legitimacy}`,
    tone: player.resources.legitimacy >= 70 ? "good" : player.resources.legitimacy <= 30 ? "bad" : "warn",
    desc: player.resources.legitimacy >= 70 ? "정권의 명분이 높습니다." : player.resources.legitimacy <= 30 ? "통치 정당성 붕괴 위험이 큽니다." : "성과가 필요합니다."
  });

  return flags;
}

function renderFactionSelect() {
  ui.factionSelectList.innerHTML = "";
  factions.forEach((faction) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `faction-option${state.selectedFactionId === faction.id ? " active" : ""}`;
    button.innerHTML = `
      <div>
        <div class="faction-option-footer">
          <strong>${faction.name}</strong>
          <span class="chip">${faction.doctrine}</span>
        </div>
        <p>${faction.summary}</p>
        <div class="faction-option-footer">
          <span class="muted">승리 초점: ${faction.victoryFocus}</span>
          <span class="badge">선택</span>
        </div>
      </div>
    `;
    button.addEventListener("click", () => {
      state.selectedFactionId = faction.id;
      initializeCampaign(faction.id);
    });
    ui.factionSelectList.appendChild(button);
  });
}

function renderStats() {
  ui.statsGrid.innerHTML = "";
  Object.entries(state.player.stats).forEach(([key, value]) => {
    const card = document.createElement("div");
    card.className = "stat-card";
    card.innerHTML = `<span class="muted">${statLabels[key]}</span><strong>${value}</strong><small>${value >= 70 ? "강점" : value <= 35 ? "취약" : "관리 필요"}</small>`;
    ui.statsGrid.appendChild(card);
  });
}

function renderResources() {
  ui.resourceGrid.innerHTML = "";
  Object.entries(state.player.resources).forEach(([key, value]) => {
    const card = document.createElement("div");
    card.className = "resource-card";
    card.innerHTML = `<span class="muted">${resourceLabels[key]}</span><strong>${value}</strong><small>${key === "compute" ? "LLM/산업 기반" : key === "energy" ? "산업 지속성" : "체제 신뢰 자본"}</small>`;
    ui.resourceGrid.appendChild(card);
  });
}

function renderActions() {
  ui.actionsList.innerHTML = "";
  state.player.actions.forEach((action) => {
    const wrapper = document.createElement("div");
    wrapper.className = `action-card${state.selectedActionId === action.id ? " selected" : ""}`;
    const effectText = Object.entries(action.effects)
      .map(([key, value]) => `${statLabels[key] || resourceLabels[key]} ${value > 0 ? "+" : ""}${value}`)
      .join(" · ");
    wrapper.innerHTML = `
      <div>
        <div class="log-entry-header">
          <div>
            <div class="news-tag">${action.tag}</div>
            <h3>${action.title}</h3>
          </div>
          <button type="button" data-action-id="${action.id}">${state.selectedActionId === action.id ? "선택됨" : "선택"}</button>
        </div>
        <p class="muted">${action.desc}</p>
        <p class="muted">효과: ${effectText}</p>
      </div>
    `;
    ui.actionsList.appendChild(wrapper);
  });
}

function isDiplomacyAvailable(template, aiFaction) {
  const relation = getRelationState(aiFaction.id);
  if (template.minRelation && relation.score < template.minRelation) return false;
  if (template.minMilitary && state.player.stats.military < template.minMilitary) return false;
  if (template.type === "alliance" && relation.status === "allied") return false;
  if (template.type === "war" && relation.status === "war") return false;
  return true;
}

function renderDiplomacy() {
  ui.diplomacyList.innerHTML = "";
  state.aiFactions.forEach((aiFaction) => {
    diplomacyTemplates.forEach((template) => {
      const optionId = `${template.id}:${aiFaction.id}`;
      const relation = getRelationState(aiFaction.id);
      const label = relationLabel(relation);
      const available = isDiplomacyAvailable(template, aiFaction);
      const requirementText = [];
      if (template.minRelation) requirementText.push(`관계 ${template.minRelation}+`);
      if (template.minMilitary) requirementText.push(`군사 ${template.minMilitary}+`);

      const card = document.createElement("div");
      card.className = `diplomacy-card${state.selectedDiplomacyId === optionId ? " selected" : ""}`;
      card.innerHTML = `
        <div>
          <div class="log-entry-header">
            <div>
              <div class="news-tag">${aiFaction.name}</div>
              <h3>${template.title}</h3>
            </div>
            <button type="button" data-diplomacy-id="${optionId}" ${available ? "" : "disabled"}>${state.selectedDiplomacyId === optionId ? "선택됨" : available ? "선택" : "잠김"}</button>
          </div>
          <p class="muted">${template.desc}</p>
          <p class="muted">현재 관계: <span class="${label.className}">${label.text} (${relation.score})</span>${relation.sanctions > 0 ? ` · 제재 ${relation.sanctions}턴` : ""}</p>
          <p class="muted">조건: ${requirementText.length ? requirementText.join(" · ") : "없음"}</p>
        </div>
      `;
      ui.diplomacyList.appendChild(card);
    });
  });
}

function renderObjectives() {
  ui.objectivesList.innerHTML = "";
  getObjectives(state.player).forEach((objective) => {
    const item = document.createElement("li");
    item.textContent = objective;
    ui.objectivesList.appendChild(item);
  });
}

function renderRivalBoard() {
  ui.rivalBoard.innerHTML = "";
  state.aiFactions.forEach((aiFaction) => {
    const relation = getRelationState(aiFaction.id);
    const label = relationLabel(relation);
    const row = document.createElement("div");
    row.className = "rival-row";
    row.innerHTML = `
      <div>
        <strong>${aiFaction.name}</strong>
        <p>${aiFaction.doctrine}</p>
      </div>
      <div>
        <div class="${label.className}">${label.text} ${relation.score}</div>
        <p>기술 ${aiFaction.stats.technology} · 군사 ${aiFaction.stats.military}${relation.sanctions > 0 ? ` · 제재 ${relation.sanctions}턴` : ""}</p>
      </div>
    `;
    ui.rivalBoard.appendChild(row);
  });
}

function renderNewsFeed() {
  ui.newsFeed.innerHTML = "";
  state.news.slice(0, 8).forEach((news) => {
    const item = document.createElement("li");
    item.className = "news-item";
    item.innerHTML = `
      <div class="log-entry-header">
        <strong>Turn ${news.turn}</strong>
        <span class="news-tag">${news.tag}</span>
      </div>
      <p>${news.text}</p>
    `;
    ui.newsFeed.appendChild(item);
  });
}

function renderLog() {
  ui.eventLog.innerHTML = "";
  state.log.slice(0, 12).forEach((entry) => {
    const item = document.createElement("li");
    item.className = "log-entry";
    item.innerHTML = `
      <div class="log-entry-header">
        <strong>Turn ${entry.turn}</strong>
        <span class="news-tag">${entry.tag}</span>
      </div>
      <p>${entry.summary}</p>
    `;
    ui.eventLog.appendChild(item);
  });
}

function renderStatusFlags() {
  ui.statusFlags.innerHTML = "";
  getStatusFlags().forEach((flag) => {
    const item = document.createElement("li");
    item.className = "status-flag";
    item.innerHTML = `
      <div>
        <strong>${flag.label}</strong>
        <p>${flag.desc}</p>
      </div>
      <span class="status-pill ${flag.tone}">${flag.tone === "good" ? "양호" : flag.tone === "bad" ? "위험" : flag.tone === "warn" ? "주의" : "중립"}</span>
    `;
    ui.statusFlags.appendChild(item);
  });
}

async function requestLlmBriefing(report) {
  try {
    const response = await fetch(`${LLM_BRIDGE_URL}/api/briefing`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        faction: state.player.name,
        action: report.action,
        diplomacy: report.diplomacy,
        event: report.event,
        worldTension: report.worldTension,
        allianceCount: report.allianceCount,
        warCount: report.warCount,
        summary: report.summary
      })
    });

    if (!response.ok) throw new Error(`bridge ${response.status}`);
    const data = await response.json();
    if (!data.ok || !data.briefing) throw new Error(data.error || 'briefing failed');
    state.llmBriefing = data.briefing;
    ui.llmStatus.textContent = 'LLM 브리핑: 연결됨';
  } catch (error) {
    state.llmBriefing = null;
    ui.llmStatus.textContent = 'LLM 브리핑: 로컬 브리지 연결 안 됨';
  }
}

function renderHeader() {
  ui.factionName.textContent = state.player.name;
  ui.factionSummary.textContent = state.player.summary;
  ui.doctrineChip.textContent = state.player.doctrine;
  ui.victoryChip.textContent = `승리 조건: ${state.player.victoryFocus}`;
  ui.worldSummary.textContent = state.player.worldTone;
  ui.turnBadge.textContent = `Turn ${Math.min(state.turn, MAX_TURNS)} / ${MAX_TURNS}`;
  ui.tensionValue.textContent = String(state.worldTension);
  ui.tensionBar.style.width = `${state.worldTension}%`;
  ui.headline.textContent = state.llmBriefing || headlineFromState();
  ui.actionHint.textContent = state.gameEnded
    ? "캠페인이 종료되었습니다. 새 캠페인을 시작할 수 있습니다."
    : `정책 1개와 대외 행동 1개를 선택하거나, 선택 없이 턴 진행 시 기본 선택이 자동 적용됩니다. 현재 선택: ${state.selectedActionId ? "정책 완료" : "정책 자동선택 가능"}, ${state.selectedDiplomacyId ? "대외 행동 완료" : "대외 행동 자동선택 가능"}`;
  ui.endTurnButton.disabled = state.gameEnded;
}

function renderTurnReport() {
  if (!state.turnReport) {
    ui.turnReport.className = "turn-report empty";
    ui.turnReport.textContent = "아직 턴이 진행되지 않았습니다.";
    return;
  }

  const report = state.turnReport;
  ui.turnReport.className = "turn-report";
  ui.turnReport.innerHTML = `
    <strong>Turn ${report.turn} 결과</strong>
    <p>${report.summary}</p>
    <ul>
      <li>정책: ${report.action}</li>
      <li>대외 행동: ${report.diplomacy}</li>
      <li>세계 이벤트: ${report.event}</li>
      <li>현재 동맹 ${report.allianceCount}, 전쟁 ${report.warCount}, 긴장도 ${report.worldTension}</li>
    </ul>
  `;
}

function renderEndgame() {
  if (!state.gameEnded) {
    ui.endgamePanel.classList.add("hidden");
    return;
  }

  ui.endgamePanel.classList.remove("hidden");
  ui.endingBadge.textContent = state.endgame.outcome;
  ui.endingSummary.textContent = state.endgame.summary;
  ui.finalScoreGrid.innerHTML = "";

  const alliedCount = Object.values(state.relations).filter((relation) => relation.status === "allied").length;
  const warCount = Object.values(state.relations).filter((relation) => relation.status === "war").length;
  const results = [
    ["최종 점수", state.endgame.score],
    ["동맹 수", alliedCount],
    ["전쟁 수", warCount],
    ["세계 긴장도", state.worldTension],
    ["최종 정당성", state.player.resources.legitimacy],
    ["최종 경제력", state.player.stats.economy]
  ];

  results.forEach(([label, value]) => {
    const card = document.createElement("div");
    card.className = "stat-card";
    card.innerHTML = `<span class="muted">${label}</span><strong>${value}</strong>`;
    ui.finalScoreGrid.appendChild(card);
  });
}

function render() {
  renderFactionSelect();
  renderHeader();
  renderStats();
  renderResources();
  renderActions();
  renderDiplomacy();
  renderObjectives();
  renderRivalBoard();
  renderNewsFeed();
  renderLog();
  renderStatusFlags();
  renderTurnReport();
  renderEndgame();
}

function immediateFailureReason(player) {
  if (player.stats.stability < 10) return "국내 질서가 붕괴했습니다.";
  if (player.stats.economy < 10) return "경제 기반이 붕괴했습니다.";
  if (player.resources.legitimacy < 10) return "정권 정당성이 붕괴했습니다.";
  if (player.resources.energy < 10) return "에너지 체계가 붕괴했습니다.";
  return null;
}

function evaluateEndgame() {
  const player = state.player;
  const collapse = player.stats.stability < 15 || player.stats.economy < 15 || player.resources.legitimacy < 15 || player.resources.energy < 15;
  const alliedCount = Object.values(state.relations).filter((relation) => relation.status === "allied").length;
  const strongDiplomacy = Object.values(state.relations).filter((relation) => relation.score >= 65).length;
  const warCount = Object.values(state.relations).filter((relation) => relation.status === "war").length;
  const score = computeScore(player);

  if (collapse) {
    return {
      outcome: "체제 붕괴",
      summary: "과도한 충격을 버티지 못하고 체제 유지에 실패했습니다. 전쟁과 내정 리스크가 동시에 폭발했습니다.",
      score
    };
  }

  if (score >= 490 && alliedCount >= 1 && player.stats.technology + player.stats.economy >= 150 && warCount === 0) {
    return {
      outcome: "질서 설계자",
      summary: "기술, 경제, 외교를 결합해 전쟁을 억제하면서 새로운 국제 질서를 설계했습니다.",
      score
    };
  }

  if (score >= 450 && (alliedCount >= 1 || strongDiplomacy >= 2)) {
    return {
      outcome: "패권 확립",
      summary: "강한 경제와 기술, 유효한 외교 자산을 묶어 시대의 핵심 강대국으로 부상했습니다.",
      score
    };
  }

  if (score >= 390) {
    return {
      outcome: "강대국 생존",
      summary: "위기 속에서도 체제를 지키며 다음 시대의 유력 행위자로 남았습니다.",
      score
    };
  }

  return {
    outcome: "미완의 질서",
    summary: "국가를 지켜냈지만 패권이나 질서 설계까지 도달하기엔 외교와 자원이 부족했습니다.",
    score
  };
}

function pushNews(tag, text) {
  state.news.unshift({ turn: state.turn, tag, text });
}

function pushLog(tag, summary) {
  state.log.unshift({ turn: state.turn, tag, summary });
}

function saveGame() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    pushNews("시스템", "캠페인을 브라우저 저장소에 저장했습니다.");
    render();
  } catch (error) {
    console.error(error);
  }
}

function loadGame() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    state = JSON.parse(raw);
    pushNews("시스템", "저장된 캠페인을 불러왔습니다.");
    render();
  } catch (error) {
    console.error(error);
  }
}

function applyDiplomacyOutcome(diplomacy, targetFaction) {
  const relation = getRelationState(targetFaction.id);
  applyEffects(state.player, diplomacy.effects);
  relation.score = clamp(relation.score + diplomacy.relationDelta, 0, 100);
  state.worldTension = clamp(state.worldTension + diplomacy.tension, 0, 100);

  if (diplomacy.type === "alliance") {
    relation.status = "allied";
    relation.allianceTurns = 1;
  }

  if (diplomacy.type === "sanction") {
    relation.sanctions = 3;
    applyDirectEffectsToFaction(targetFaction, { economy: -6, legitimacy: -5 });
  }

  if (diplomacy.type === "war") {
    relation.status = "war";
    relation.warTurns = 1;
    applyDirectEffectsToFaction(targetFaction, { military: -7, stability: -5, economy: -4 });
  }

  if (relation.status !== "war" && relation.score >= 70 && diplomacy.type !== "hostile" && diplomacy.type !== "sanction") {
    relation.status = relation.status === "allied" ? "allied" : "neutral";
  }

  if (relation.status !== "war" && relation.score < 45 && relation.status === "allied") {
    relation.status = "neutral";
    relation.allianceTurns = 0;
  }

  setRelationState(targetFaction.id, relation);
  return relation;
}

function autoPickAction() {
  return state.player.actions[0];
}

function autoPickDiplomacy() {
  for (const aiFaction of state.aiFactions) {
    for (const template of diplomacyTemplates) {
      if (isDiplomacyAvailable(template, aiFaction)) {
        return { template, aiFaction };
      }
    }
  }
  return null;
}

async function executeTurn() {
  if (state.gameEnded) return;

  const action = state.player.actions.find((item) => item.id === state.selectedActionId) || autoPickAction();
  const chosenDiplomacy = state.selectedDiplomacyId
    ? (() => {
        const [diplomacyId, targetId] = state.selectedDiplomacyId.split(":");
        return {
          template: diplomacyTemplates.find((item) => item.id === diplomacyId),
          aiFaction: state.aiFactions.find((item) => item.id === targetId)
        };
      })()
    : autoPickDiplomacy();

  const diplomacy = chosenDiplomacy?.template;
  const targetFaction = chosenDiplomacy?.aiFaction;
  if (!action || !diplomacy || !targetFaction) return;

  applyEffects(state.player, action.effects);
  const relation = applyDiplomacyOutcome(diplomacy, targetFaction);
  tickRelationStates();

  const globalEvent = chooseWeightedEvent();
  applyEffects(state.player, globalEvent.impact);
  state.worldTension = clamp(state.worldTension + globalEvent.tension, 0, 100);

  const aiSummaries = simulateAiTurn();

  const warCount = Object.values(state.relations).filter((item) => item.status === "war").length;
  const allianceCount = Object.values(state.relations).filter((item) => item.status === "allied").length;
  const summary = `${action.title} 실행, ${targetFaction.name} 대상 ${diplomacy.title}, 이어서 ${globalEvent.title} 발생. 현재 동맹 ${allianceCount}, 전쟁 ${warCount}.`;
  state.lastSummary = summary;
  state.turnReport = {
    turn: state.turn,
    summary,
    action: action.title,
    diplomacy: `${targetFaction.name} 대상 ${diplomacy.title}`,
    event: globalEvent.title,
    allianceCount,
    warCount,
    worldTension: state.worldTension
  };

  pushNews("정책", `${state.player.name}은(는) ${action.title}을(를) 실행했습니다.`);
  pushNews("대외 행동", `${targetFaction.name} 상대로 ${diplomacy.title}을(를) 진행했습니다. 현재 상태: ${relationLabel(relation).text}.`);
  pushNews("세계 이벤트", globalEvent.desc);
  aiSummaries.forEach((aiSummary) => pushNews("AI 세력", aiSummary));
  pushLog("턴 요약", `${summary} 세계 긴장도는 ${state.worldTension}입니다.`);

  const failure = immediateFailureReason(state.player);

  state.turn += 1;
  state.selectedActionId = null;
  state.selectedDiplomacyId = null;

  if (failure) {
    state.gameEnded = true;
    state.endgame = {
      outcome: "즉시 붕괴",
      summary: failure,
      score: computeScore(state.player)
    };
  } else if (state.turn > MAX_TURNS) {
    state.gameEnded = true;
    state.endgame = evaluateEndgame();
  }

  await requestLlmBriefing(state.turnReport);
  render();
}

function initializeCampaign(factionId) {
  const selected = factions.find((faction) => faction.id === factionId) || factions[0];
  state.selectedFactionId = selected.id;
  state.player = createInitialFactionState(selected);
  state.aiFactions = factions.filter((faction) => faction.id !== selected.id).map(createInitialFactionState);
  state.relations = Object.fromEntries(state.aiFactions.map((faction) => [faction.id, { score: 50, status: "neutral", sanctions: 0, warTurns: 0, allianceTurns: 0 }]));
  state.turn = 1;
  state.worldTension = 32;
  state.log = [];
  state.news = [];
  state.gameEnded = false;
  state.endgame = null;
  state.selectedActionId = null;
  state.selectedDiplomacyId = null;
  state.lastSummary = `${selected.name}의 새 집권 체제가 출범했습니다.`;
  state.turnReport = null;
  pushNews("시작", `${selected.name}이(가) 캠페인을 시작했습니다. doctrine: ${selected.doctrine}`);
  pushLog("캠페인 시작", `${selected.name}이(가) 세계 질서 경쟁에 뛰어들었습니다.`);
  render();
}

function startGame() {
  state = {
    selectedFactionId: factions[0].id,
    player: null,
    aiFactions: [],
    relations: {},
    turn: 1,
    worldTension: 32,
    log: [],
    news: [],
    gameEnded: false,
    endgame: null,
    selectedActionId: null,
    selectedDiplomacyId: null,
    lastSummary: "",
    turnReport: null,
    llmBriefing: null
  };
  initializeCampaign(state.selectedFactionId);
}

ui.actionsList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action-id]");
  if (!button || state.gameEnded) return;
  state.selectedActionId = button.dataset.actionId;
  render();
});

ui.diplomacyList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-diplomacy-id]");
  if (!button || state.gameEnded || button.disabled) return;
  state.selectedDiplomacyId = button.dataset.diplomacyId;
  render();
});

ui.endTurnButton.addEventListener("click", executeTurn);
ui.restartButton.addEventListener("click", startGame);
ui.saveButton.addEventListener("click", saveGame);
ui.loadButton.addEventListener("click", loadGame);

startGame();
