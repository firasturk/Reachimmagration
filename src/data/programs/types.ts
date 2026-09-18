// Editorial content for one program page, in both languages. Figures are indicative and dated (`updated`);
// the page prints that date next to every amount so nobody mistakes them for a quote.
export interface ProgramCopy {
  tagline: string;                              // one line under the country name, ~8–14 words
  intro: string[];                              // 2 short paragraphs (each 2–3 sentences)
  why: { t: string; p: string }[];              // 4–5 benefits: short title + one sentence
  options: { t: string; p: string; from?: string }[]; // investment / eligibility routes; `from` = headline amount, e.g. 'USD 250,000'
  process: string[];                            // 5–6 steps, one sentence each, in order
  family: string;                               // who can be included, 1–2 sentences
  facts: { l: string; v: string }[];            // 5–7 key facts: label + short value (timeline, minimum, presence, dual citizenship, travel, path to citizenship…)
  faq: { q: string; a: string }[];              // 4 questions people actually ask, 1–3 sentence answers
}
export interface ProgramContent { updated: string; en: ProgramCopy; ar: ProgramCopy }
