export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-10-01';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || 'production';

/**
 * Sanity Project ID.
 * Must only contain lowercase a-z, 0-9, and dashes.
 * If unset, empty, or set to an invalid placeholder (e.g. containing underscores like 'your_project_id_here'),
 * falls back to the project default ('bt5m0mkt') to prevent build failures during static page generation on Vercel.
 */
const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
export const projectId =
  rawProjectId && /^[a-z0-9-]+$/.test(rawProjectId)
    ? rawProjectId
    : 'bt5m0mkt';

