// All program page copy, keyed by slug. Each group file is written to the same schema (types.ts).
import type { ProgramContent } from './types';
import { portugal } from './portugal';
import { caribbean } from './caribbean';
import { europe } from './europe';
import { west } from './west';
import { world } from './world';
export type { ProgramContent, ProgramCopy } from './types';
export const programContent: Record<string, ProgramContent> = { portugal, ...caribbean, ...europe, ...west, ...world };
