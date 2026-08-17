export type LegalDocumentKind = "terms" | "privacy" | "cookies";

export type LegalCustomDocumentEntry = {
  useCustom: boolean;
  body: string;
};

export type LegalCustomDocuments = Record<LegalDocumentKind, LegalCustomDocumentEntry>;

export type LegalInfoStored = {
  companyName: string;
  eik: string;
  managerName: string;
  address: string;
  contactEmail: string;
  customDocuments: LegalCustomDocuments;
};

const EMPTY_ENTRY: LegalCustomDocumentEntry = {
  useCustom: false,
  body: ""
};

function defaultLegalCustomDocuments(): LegalCustomDocuments {
  return {
    terms: { ...EMPTY_ENTRY },
    privacy: { ...EMPTY_ENTRY },
    cookies: { ...EMPTY_ENTRY }
  };
}

function defaultLegalInfoStored(): LegalInfoStored {
  return {
    companyName: "",
    eik: "",
    managerName: "",
    address: "",
    contactEmail: "",
    customDocuments: defaultLegalCustomDocuments()
  };
}

function normalizeEntry(raw: unknown): LegalCustomDocumentEntry {
  if (!raw || typeof raw !== "object") return { ...EMPTY_ENTRY };

  const entry = raw as Record<string, unknown>;

  return {
    useCustom: entry.useCustom === true,
    body: String(entry.body ?? "").trim()
  };
}

function normalizeLegalCustomDocuments(raw: unknown): LegalCustomDocuments {
  const base = defaultLegalCustomDocuments();
  if (!raw || typeof raw !== "object") return base;

  const documents = raw as Record<string, unknown>;

  return {
    terms: normalizeEntry(documents.terms),
    privacy: normalizeEntry(documents.privacy),
    cookies: normalizeEntry(documents.cookies)
  };
}

export function normalizeLegalInfoFromDb(raw: unknown): LegalInfoStored {
  if (!raw || typeof raw !== "object") return defaultLegalInfoStored();

  const legal = raw as Record<string, unknown>;

  return {
    companyName: String(legal.companyName ?? "").trim(),
    eik: String(legal.eik ?? "").trim(),
    managerName: String(legal.managerName ?? "").trim(),
    address: String(legal.address ?? "").trim(),
    contactEmail: String(legal.contactEmail ?? "").trim(),
    customDocuments: normalizeLegalCustomDocuments(legal.customDocuments)
  };
}

function escapeLegalHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatLegalDocumentBody(body: string): string {
  const trimmed = body.trim();
  if (!trimmed) return "";

  return trimmed
    .split(/\n{2,}/)
    .map((block) => {
      const inner = escapeLegalHtml(block).replace(/\n/g, "<br />");
      return `<p>${inner}</p>`;
    })
    .join("\n");
}

export function getCustomDocumentHtml(
  stored: LegalInfoStored,
  kind: LegalDocumentKind
): string | null {
  const entry = stored.customDocuments[kind];
  if (!entry.useCustom || !entry.body.trim()) return null;
  return formatLegalDocumentBody(entry.body);
}
