// Every call to the server goes through this file: one function per endpoint
// in the handbook's API table. Each returns the response data or throws an
// ApiError with a code. Pieces catch it, show the message in plain words,
// and offer a way to retry.
//
// Fake data: add ?fake to the page URL and every call reads its example
// response from /fixtures instead of the server (the default outcome is "ok").
// To see another outcome, name it:
//   play.html?fake=clues.save.notEvidence
//   play.html?fake=clues.save.notEvidence,accusation.make.noProof
// A call whose fixture doesn't exist yet throws ApiError "noFixture".

export class ApiError extends Error {
  constructor(code, message, status = null) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
  }
}

const fakeParam = new URLSearchParams(location.search).get("fake");
const FAKE = fakeParam !== null;
const fakeOutcomes = (fakeParam ?? "").split(",").filter(Boolean);
const FAKE_DELAY_MS = 300; // so loading states get seen while faking

async function call({ method = "GET", path, body, fixture }) {
  return FAKE ? fromFixture(fixture) : fromServer(method, path, body);
}

async function fromServer(method, path, body) {
  let response;
  try {
    response = await fetch(`/api${path}`, {
      method,
      credentials: "same-origin",
      headers: body === undefined ? {} : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError("network", "Can't reach the server. Check your connection and try again.");
  }

  const data = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    const error = data?.error ?? {};
    throw new ApiError(
      error.code ?? "unknown",
      error.message ?? "Something went wrong. Try again.",
      response.status,
    );
  }
  return data;
}

async function fromFixture(fixture) {
  const chosen = fakeOutcomes.find((name) => name.startsWith(`${fixture}.`));
  const file = chosen ?? `${fixture}.ok`;

  await new Promise((resolve) => setTimeout(resolve, FAKE_DELAY_MS));

  const response = await fetch(`/fixtures/${file}.json`);
  if (!response.ok) {
    throw new ApiError("noFixture", `No example response yet: fixtures/${file}.json`);
  }
  const data = await response.json();
  if (data?.error) throw new ApiError(data.error.code, data.error.message);
  return data;
}

const id = encodeURIComponent;

// Accounts
export const register = ({ displayName, email, password }) =>
  call({ method: "POST", path: "/auth/register", body: { displayName, email, password }, fixture: "auth.register" });
export const login = ({ email, password }) =>
  call({ method: "POST", path: "/auth/login", body: { email, password }, fixture: "auth.login" });
export const logout = () =>
  call({ method: "POST", path: "/auth/logout", fixture: "auth.logout" });
export const getMe = () =>
  call({ path: "/me", fixture: "me.get" });

// Cases
export const listCases = () =>
  call({ path: "/cases", fixture: "cases.list" });
export const getCase = (caseId) =>
  call({ path: `/cases/${id(caseId)}`, fixture: "cases.get" });

// Runs
export const startRun = (caseId, mode = "story") =>
  call({ method: "POST", path: `/cases/${id(caseId)}/runs`, body: { mode }, fixture: "runs.create" });
export const getRun = (runId) =>
  call({ path: `/runs/${id(runId)}`, fixture: "runs.get" });
export const getSource = (runId, pageId) =>
  call({ path: `/runs/${id(runId)}/source/${id(pageId)}`, fixture: "source.get" });
export const saveClue = (runId, token) =>
  call({ method: "POST", path: `/runs/${id(runId)}/clues`, body: { token }, fixture: "clues.save" });
export const nextHint = (runId) =>
  call({ method: "POST", path: `/runs/${id(runId)}/hints`, fixture: "hints.next" });
export const linkClue = (runId, clueId, suspectId) =>
  call({ method: "PUT", path: `/runs/${id(runId)}/links`, body: { clueId, suspectId }, fixture: "links.put" });
export const unlinkClue = (runId, clueId, suspectId) =>
  call({ method: "DELETE", path: `/runs/${id(runId)}/links`, body: { clueId, suspectId }, fixture: "links.delete" });
export const accuse = (runId, suspectId) =>
  call({ method: "POST", path: `/runs/${id(runId)}/accusation`, body: { suspectId }, fixture: "accusation.make" });
export const chat = (runId, suspectId, message) =>
  call({ method: "POST", path: `/runs/${id(runId)}/chat`, body: { suspectId, message }, fixture: "chat.send" });

// Leaderboard
export const getLeaderboard = () =>
  call({ path: "/leaderboard", fixture: "leaderboard.get" });
