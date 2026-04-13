import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  RalphRuntime,
  FileFlowStore,
  bindSession,
  attachDefaultValidators,
  driveUntilBoundary,
} from '../../../../spacer-runtime/src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const flowDir = path.join(__dirname, 'flows');

const runtime = new RalphRuntime({
  store: new FileFlowStore({ dir: flowDir }),
});

function makeFlowId(prefix = 'briefing') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createBriefingFlow(payload, meta = {}) {
  const taskflow = bindSession({
    sessionKey: meta.sessionKey ?? 'agent:main:discord:channel:1492803134433792091',
    requesterOrigin: meta.requesterOrigin ?? 'discord:#people-hq',
    runtime,
  });

  const flow = taskflow.createManaged({
    controllerId: 'spacerorg/project-pm',
    flowId: makeFlowId(),
    goal: 'Generate world briefing with runtime-tracked execution',
    dri: 'project-pm',
    chapter: 'projects',
    silo: 'delivery',
    doneCriteria: [
      'payload validated',
      'validator findings attached',
      'briefing generation attempted',
      'result reported or failure recorded'
    ],
    currentStep: 'intake-briefing-request',
    stateJson: {
      openQuestions: [],
      blockers: [],
    },
  });

  const withValidators = attachDefaultValidators(runtime, flow.flowId, flow.revision, {
    auditorSummary: 'Payload shape and reporting objective reviewed',
    riskSummary: 'Local model bridge failure and fallback path reviewed',
    devilsAdvocateSummary: 'Check whether rule-based fallback is simpler or sufficient',
  });

  const progressed = runtime.transition(withValidators.flowId, {
    currentStep: 'ready-to-generate-briefing',
  }, withValidators.revision);

  return { taskflow, flow: progressed, payload };
}

export function runBriefingFlow(flowId, stepFn) {
  return driveUntilBoundary({
    runtime,
    flowId,
    maxSteps: 6,
    stepFn,
  });
}

export function markBriefingSuccess(flowId, revision, summary) {
  const ready = runtime.markReviewReady(flowId, summary, revision);
  return runtime.finish(flowId, ready.revision);
}

export function markBriefingFailure(flowId, revision, reason) {
  return runtime.transition(flowId, {
    status: 'failed',
    blockers: [reason],
    currentStep: 'briefing-failed',
  }, revision);
}

export function getRuntime() {
  return runtime;
}
