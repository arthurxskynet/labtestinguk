-- Verifypeps — Supabase schema & demo data (run in SQL editor or via migration)
-- Requires: uuid extension (gen_random_uuid is in pgcrypto on some hosts; Supabase has it)
--
-- Admin portal: if you need `public.profiles` and admin certificate RLS, run
-- `migration_profiles_admin.sql` after this file (safe on existing DBs that already ran seed).

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- certificates
-- ---------------------------------------------------------------------------
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  peptide_name text not null,
  purity_percent numeric(8, 4),
  molecular_weight numeric(14, 6),
  hplc_purity text,
  lcms_ppm numeric(14, 6),
  status text not null default 'verified',
  created_at timestamptz not null default now(),
  user_id uuid references auth.users (id) on delete set null,
  details jsonb not null default '{}'::jsonb
);

create index if not exists certificates_code_idx on public.certificates (code);
create index if not exists certificates_user_id_idx on public.certificates (user_id);

alter table public.certificates enable row level security;

-- Authenticated users can insert/update/delete only their own rows
create policy "certificates_authenticated_manage_own"
  on public.certificates
  for all
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Direct table reads for authenticated users: own rows only
create policy "certificates_authenticated_select_own"
  on public.certificates
  for select
  to authenticated
  using (user_id = auth.uid());

-- Public (anon) cannot read the table directly — use function below

-- RPC: public lookup by certificate code (SECURITY DEFINER)
create or replace function public.get_certificate_by_code (lookup_code text)
returns table (
  id uuid,
  code text,
  peptide_name text,
  purity_percent numeric,
  molecular_weight numeric,
  hplc_purity text,
  lcms_ppm numeric,
  status text,
  created_at timestamptz,
  details jsonb
)
language sql
security definer
set search_path = public
as $$
  select
    c.id,
    c.code,
    c.peptide_name,
    c.purity_percent,
    c.molecular_weight,
    c.hplc_purity,
    c.lcms_ppm,
    c.status,
    c.created_at,
    c.details
  from public.certificates c
  where c.code = lookup_code
  limit 1;
$$;

grant execute on function public.get_certificate_by_code (text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Demo rows (user_id null = catalogue / demo certificates)
-- ---------------------------------------------------------------------------
insert into public.certificates (
  code,
  peptide_name,
  purity_percent,
  molecular_weight,
  hplc_purity,
  lcms_ppm,
  status,
  details
)
values
  (
    'VP-A3F7B2-KPVX',
    'BPC-157',
    99.8600,
    1419.000000,
    'Single peak HPLC; baseline resolved',
    12.500000,
    'verified',
    jsonb_build_object(
      'batch', 'LAB-2026-0142',
      'batch_ref', 'LAB-2026-0142',
      'internal_registry_id', 'VPK-RM-2026-0001',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'chromatogram_profile', 'high_purity',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Laboratory archive photograph not attached to this registry entry.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'BPC-157', 'rt', 4.23, 'area_pct', 99.86),
        jsonb_build_object('name', 'Baseline', 'rt', 2.10, 'area_pct', 0.09)
      )
    )
  ),
  (
    'VP-M9K2L1-QRND',
    'TB-500 (fragment)',
    99.6500,
    4961.200000,
    'Primary peak >99.5% area',
    18.200000,
    'verified',
    jsonb_build_object(
      'batch', 'LAB-2026-0098',
      'batch_ref', 'LAB-2026-0098',
      'internal_registry_id', 'VPK-RM-2026-0002',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'chromatogram_profile', 'high_purity',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Laboratory archive photograph not attached to this registry entry.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'TB-500 (fragment)', 'rt', 4.08, 'area_pct', 99.65),
        jsonb_build_object('name', 'Aggregate shoulder', 'rt', 3.22, 'area_pct', 0.20),
        jsonb_build_object('name', 'Late eluent', 'rt', 5.91, 'area_pct', 0.15)
      )
    )
  ),
  (
    'VP-X4T8N3-ZWLP',
    'GHK-Cu',
    99.4200,
    340.800000,
    'Single major peak',
    22.000000,
    'verified',
    jsonb_build_object(
      'batch', 'LAB-2026-0201',
      'batch_ref', 'LAB-2026-0201',
      'internal_registry_id', 'VPK-RM-2026-0003',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'chromatogram_profile', 'blend',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Laboratory archive photograph not attached to this registry entry.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'GHK-Cu', 'rt', 3.76, 'area_pct', 99.42),
        jsonb_build_object('name', 'Polar trace', 'rt', 2.44, 'area_pct', 0.33),
        jsonb_build_object('name', 'Baseline', 'rt', 5.18, 'area_pct', 0.25)
      )
    )
  ),
  (
    'VP-H7R5C9-JMBK',
    'Ipamorelin',
    99.7800,
    711.900000,
    'HPLC purity per specification',
    9.800000,
    'pending',
    jsonb_build_object(
      'batch', 'LAB-2026-0177',
      'batch_ref', 'LAB-2026-0177',
      'internal_registry_id', 'VPK-RM-2026-0004',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'chromatogram_profile', 'high_purity',
      'notes', 'Pending final review — research reference material; chain-of-custody retained per lab SOP.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Laboratory archive photograph not attached to this registry entry.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'Ipamorelin', 'rt', 4.12, 'area_pct', 99.78),
        jsonb_build_object('name', 'Early system peak', 'rt', 2.05, 'area_pct', 0.12),
        jsonb_build_object('name', 'Late eluent', 'rt', 6.33, 'area_pct', 0.10)
      )
    )
  )
on conflict (code) do nothing;

insert into public.certificates (
  code,
  peptide_name,
  purity_percent,
  molecular_weight,
  hplc_purity,
  lcms_ppm,
  status,
  details
)
values
  (
    'VP-K8NQ3P-7H2R',
    'Bacteriostatic water (diluent)',
    99.4212,
    null,
    'HPLC: benzyl alcohol and aqueous vehicle profile per internal SOP; no peptide peak expected.',
    12.300000,
    'verified',
    jsonb_build_object(
      'batch', 'LAB-2026-2844',
      'batch_ref', 'LAB-2026-2844',
      'internal_registry_id', 'VPK-RM-2026-1001',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'chromatogram_profile', 'blend',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP. Pack size variants recorded under internal SKU only.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Laboratory archive photograph not attached to this registry entry.',
      'additional_tests', jsonb_build_array('Appearance', 'Particulate observation (visual)'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'Benzyl alcohol', 'rt', 3.12, 'area_pct', 99.42),
        jsonb_build_object('name', 'Early system peak', 'rt', 1.88, 'area_pct', 0.35),
        jsonb_build_object('name', 'Baseline artefact', 'rt', 5.41, 'area_pct', 0.23)
      )
    )
  ),
  (
    'VP-R4M9YL-W3BT',
    'Melanotan II (reference peptide)',
    99.7388,
    1024.180000,
    'Single major HPLC peak; LC-MS identity consistent with reference sequence (research material).',
    18.700000,
    'verified',
    jsonb_build_object(
      'batch', 'LAB-2026-2910',
      'batch_ref', 'LAB-2026-2910',
      'internal_registry_id', 'VPK-RM-2026-1002',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'chromatogram_profile', 'blend',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP. Mass recorded as monoisotopic convention for the stated salt form.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Laboratory archive photograph not attached to this registry entry.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'Melanotan II', 'rt', 4.31, 'area_pct', 99.74),
        jsonb_build_object('name', 'Polar impurity', 'rt', 2.45, 'area_pct', 0.14),
        jsonb_build_object('name', 'Late eluent', 'rt', 6.02, 'area_pct', 0.12)
      )
    )
  ),
  (
    'VP-T2V6KQ-P8NM',
    'Peptide blend reference (GHK / BPC-157 / TB-500)',
    99.2156,
    null,
    'Multi-component UV envelope; integration reported for dominant chromatographic feature.',
    9.100000,
    'verified',
    jsonb_build_object(
      'batch', 'LAB-2026-3033',
      'batch_ref', 'LAB-2026-3033',
      'internal_registry_id', 'VPK-RM-2026-1003',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'chromatogram_profile', 'default',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP. Line comprises multiple named analytes; see recorded components.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Laboratory archive photograph not attached to this registry entry.',
      'component_analytes', jsonb_build_array(
        'GHK (reference)',
        'BPC-157 (reference)',
        'TB-500 fragment (reference)'
      ),
      'component_purity', jsonb_build_array(
        jsonb_build_object('analyte', 'GHK (reference)', 'purity_percent', 99.1100, 'rt', 3.76),
        jsonb_build_object('analyte', 'BPC-157 (reference)', 'purity_percent', 99.2800, 'rt', 4.23),
        jsonb_build_object('analyte', 'TB-500 fragment (reference)', 'purity_percent', 99.2568, 'rt', 4.08)
      ),
      'additional_tests', jsonb_build_array('LC-MS identity (representative)', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'Primary envelope', 'rt', 4.18, 'area_pct', 99.22),
        jsonb_build_object('name', 'Secondary feature', 'rt', 3.05, 'area_pct', 0.42),
        jsonb_build_object('name', 'Late eluent', 'rt', 6.71, 'area_pct', 0.36)
      )
    )
  ),
  (
    'VP-Z7H4JN-4QR9',
    'Retatrutide (reference peptide)',
    99.8600,
    4113.500000,
    'Single dominant HPLC peak; LC-MS within expected mass tolerance for research reference.',
    14.200000,
    'verified',
    jsonb_build_object(
      'batch', 'LAB-2026-3156',
      'batch_ref', 'LAB-2026-3156',
      'internal_registry_id', 'VPK-RM-2026-1004',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'chromatogram_profile', 'high_purity',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP. Pack sizes supplied under discrete internal SKUs.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Laboratory archive photograph not attached to this registry entry.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'Retatrutide', 'rt', 4.56, 'area_pct', 99.86),
        jsonb_build_object('name', 'Baseline', 'rt', 2.22, 'area_pct', 0.14)
      )
    )
  ),
  (
    'VP-Q9W3KP-2LX7',
    'NAD+ (reference material)',
    99.5834,
    663.447000,
    'Nucleotide HPLC profile; principal peak area % as recorded.',
    21.400000,
    'verified',
    jsonb_build_object(
      'batch', 'LAB-2026-3278',
      'batch_ref', 'LAB-2026-3278',
      'internal_registry_id', 'VPK-RM-2026-1005',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'chromatogram_profile', 'high_purity',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Laboratory archive photograph not attached to this registry entry.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'Optical characterisation (where applicable)'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'NAD+', 'rt', 3.67, 'area_pct', 99.58),
        jsonb_build_object('name', 'ADP-ribose trace', 'rt', 2.94, 'area_pct', 0.28),
        jsonb_build_object('name', 'System', 'rt', 5.88, 'area_pct', 0.14)
      )
    )
  ),
  (
    'VP-M5B8YT-K6Z2',
    'Tesamorelin (reference peptide)',
    99.1122,
    5135.800000,
    'Primary peak integrated per validated peptide method.',
    16.800000,
    'verified',
    jsonb_build_object(
      'batch', 'LAB-2026-3385',
      'batch_ref', 'LAB-2026-3385',
      'internal_registry_id', 'VPK-RM-2026-1006',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'chromatogram_profile', 'default',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Laboratory archive photograph not attached to this registry entry.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'Tesamorelin', 'rt', 4.44, 'area_pct', 99.11),
        jsonb_build_object('name', 'Deamidation shoulder', 'rt', 3.71, 'area_pct', 0.52),
        jsonb_build_object('name', 'Late eluent', 'rt', 6.15, 'area_pct', 0.37)
      )
    )
  ),
  (
    'VP-Y3N7RQ-H8V4',
    'GHK-Cu (reference tripeptide)',
    99.3490,
    402.926000,
    'Single major HPLC peak; copper-associated tripeptide reference line.',
    11.200000,
    'verified',
    jsonb_build_object(
      'batch', 'LAB-2026-3491',
      'batch_ref', 'LAB-2026-3491',
      'internal_registry_id', 'VPK-RM-2026-1007',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'chromatogram_profile', 'default',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP. Pack sizes supplied under discrete internal SKUs.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Laboratory archive photograph not attached to this registry entry.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'GHK-Cu', 'rt', 3.89, 'area_pct', 99.35),
        jsonb_build_object('name', 'Polar trace', 'rt', 2.31, 'area_pct', 0.38),
        jsonb_build_object('name', 'Baseline', 'rt', 5.62, 'area_pct', 0.27)
      )
    )
  )
on conflict (code) do nothing;

-- ---------------------------------------------------------------------------
-- Catalogue expansion — twelve reference lines (blends, peptides, materials)
-- ---------------------------------------------------------------------------
insert into public.certificates (
  code,
  peptide_name,
  purity_percent,
  molecular_weight,
  hplc_purity,
  lcms_ppm,
  status,
  details
)
values
  (
    'VP-W3NP8K-7M2R',
    'Peptide blend reference (CJC-1295 / Ipamorelin)',
    99.4521,
    null,
    'Multi-component UV envelope; dominant integration region as recorded for this reference blend.',
    16.400000,
    'verified',
    jsonb_build_object(
      'batch', 'LAB-2026-4101',
      'batch_ref', 'LAB-2026-4101',
      'internal_registry_id', 'VPK-RM-2026-1101',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'chromatogram_profile', 'default',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP. Blend line; MW reported per-component where applicable.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'component_analytes', jsonb_build_array(
        'CJC-1295 without DAC (reference)',
        'Ipamorelin (reference)'
      ),
      'component_purity', jsonb_build_array(
        jsonb_build_object('analyte', 'CJC-1295 without DAC (reference)', 'purity_percent', 99.3900, 'rt', 4.31),
        jsonb_build_object('analyte', 'Ipamorelin (reference)', 'purity_percent', 99.5142, 'rt', 4.14)
      ),
      'additional_tests', jsonb_build_array('LC-MS identity (representative)', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'Primary envelope', 'rt', 4.31, 'area_pct', 99.45),
        jsonb_build_object('name', 'Secondary feature', 'rt', 3.04, 'area_pct', 0.30),
        jsonb_build_object('name', 'Late eluent', 'rt', 6.52, 'area_pct', 0.25)
      )
    )
  ),
  (
    'VP-Q9KL4T-5H8Y',
    'Peptide blend reference (BPC-157 / TB-500 fragment)',
    99.6734,
    null,
    'Multi-component chromatogram; resolved regions integrated per validated blend method.',
    17.800000,
    'verified',
    jsonb_build_object(
      'batch', 'LAB-2026-4102',
      'batch_ref', 'LAB-2026-4102',
      'internal_registry_id', 'VPK-RM-2026-1102',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'chromatogram_profile', 'high_purity',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP. Blend line.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'component_analytes', jsonb_build_array(
        'BPC-157 (reference)',
        'TB-500 fragment (reference)'
      ),
      'component_purity', jsonb_build_array(
        jsonb_build_object('analyte', 'BPC-157 (reference)', 'purity_percent', 99.6200, 'rt', 4.23),
        jsonb_build_object('analyte', 'TB-500 fragment (reference)', 'purity_percent', 99.7268, 'rt', 4.08)
      ),
      'additional_tests', jsonb_build_array('LC-MS identity (representative)', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'Primary envelope', 'rt', 4.19, 'area_pct', 99.67),
        jsonb_build_object('name', 'Aggregate shoulder', 'rt', 3.27, 'area_pct', 0.18),
        jsonb_build_object('name', 'Late eluent', 'rt', 6.08, 'area_pct', 0.15)
      )
    )
  ),
  (
    'VP-R6MJ2V-4N9P',
    'PT-141 (reference peptide)',
    99.8567,
    1047.220000,
    'Single dominant HPLC peak; LC-MS consistent with reference sequence (research material).',
    14.600000,
    'verified',
    jsonb_build_object(
      'batch', 'LAB-2026-4103',
      'batch_ref', 'LAB-2026-4103',
      'internal_registry_id', 'VPK-RM-2026-1103',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'chromatogram_profile', 'high_purity',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP. Mass convention: monoisotopic for stated salt form.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'PT-141', 'rt', 4.47, 'area_pct', 99.86),
        jsonb_build_object('name', 'Polar trace', 'rt', 2.61, 'area_pct', 0.09),
        jsonb_build_object('name', 'Baseline', 'rt', 5.94, 'area_pct', 0.05)
      )
    )
  ),
  (
    'VP-Y8BK3N-6T2W',
    'MOTS-C (reference peptide)',
    99.2312,
    2174.640000,
    'Primary peak integrated per mitochondrial-derived peptide reference method.',
    19.300000,
    'verified',
    jsonb_build_object(
      'batch', 'LAB-2026-4104',
      'batch_ref', 'LAB-2026-4104',
      'internal_registry_id', 'VPK-RM-2026-1104',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'chromatogram_profile', 'default',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'MOTS-C', 'rt', 3.94, 'area_pct', 99.23),
        jsonb_build_object('name', 'Early system peak', 'rt', 2.18, 'area_pct', 0.45),
        jsonb_build_object('name', 'Late eluent', 'rt', 6.41, 'area_pct', 0.32)
      )
    )
  ),
  (
    'VP-Z4HW9M-3K7L',
    'HCG (reference material)',
    99.6245,
    null,
    'Broad glycoprotein envelope with variant shoulders; integration per internal reference SOP.',
    22.100000,
    'verified',
    jsonb_build_object(
      'batch', 'LAB-2026-4105',
      'batch_ref', 'LAB-2026-4105',
      'internal_registry_id', 'VPK-RM-2026-1105',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'chromatogram_profile', 'high_purity',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP. Glycoform heterogeneity expected; MW not quoted as single value.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'additional_tests', jsonb_build_array('Identity check (reference method)', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'Major envelope', 'rt', 4.02, 'area_pct', 99.62),
        jsonb_build_object('name', 'Glyco shoulder', 'rt', 3.35, 'area_pct', 0.22),
        jsonb_build_object('name', 'Late fraction', 'rt', 5.78, 'area_pct', 0.16)
      )
    )
  ),
  (
    'VP-L2VX6Q-8R4J',
    'Ipamorelin (reference peptide)',
    99.3421,
    711.868000,
    'Single major HPLC peak; LC-MS within tolerance for reference sequence.',
    11.900000,
    'verified',
    jsonb_build_object(
      'batch', 'LAB-2026-4106',
      'batch_ref', 'LAB-2026-4106',
      'internal_registry_id', 'VPK-RM-2026-1106',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'chromatogram_profile', 'default',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'Ipamorelin', 'rt', 4.14, 'area_pct', 99.34),
        jsonb_build_object('name', 'Deamidation trace', 'rt', 3.52, 'area_pct', 0.41),
        jsonb_build_object('name', 'Baseline', 'rt', 6.02, 'area_pct', 0.25)
      )
    )
  ),
  (
    'VP-P7NM5K-9Y3H',
    'DSIP (reference peptide)',
    99.5987,
    848.812000,
    'Primary peak resolved; LC-MS identity consistent with reference material.',
    13.500000,
    'verified',
    jsonb_build_object(
      'batch', 'LAB-2026-4107',
      'batch_ref', 'LAB-2026-4107',
      'internal_registry_id', 'VPK-RM-2026-1107',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'chromatogram_profile', 'high_purity',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'DSIP', 'rt', 3.81, 'area_pct', 99.60),
        jsonb_build_object('name', 'Polar impurity', 'rt', 2.44, 'area_pct', 0.22),
        jsonb_build_object('name', 'Late eluent', 'rt', 5.67, 'area_pct', 0.18)
      )
    )
  ),
  (
    'VP-J9KT4W-2M6L',
    'GHRP-6 (reference peptide)',
    99.4123,
    873.032000,
    'Single major peak; gradient method as validated for ghrelin analogue reference.',
    15.700000,
    'verified',
    jsonb_build_object(
      'batch', 'LAB-2026-4108',
      'batch_ref', 'LAB-2026-4108',
      'internal_registry_id', 'VPK-RM-2026-1108',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'chromatogram_profile', 'default',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'GHRP-6', 'rt', 4.06, 'area_pct', 99.41),
        jsonb_build_object('name', 'Aggregate trace', 'rt', 3.18, 'area_pct', 0.35),
        jsonb_build_object('name', 'Baseline', 'rt', 6.22, 'area_pct', 0.24)
      )
    )
  ),
  (
    'VP-F5RQ8N-7P1T',
    'Glutathione (reference material)',
    99.7234,
    307.323000,
    'Small-molecule HPLC; principal peak area % as recorded; LC-MS identity for reduced form.',
    10.400000,
    'verified',
    jsonb_build_object(
      'batch', 'LAB-2026-4109',
      'batch_ref', 'LAB-2026-4109',
      'internal_registry_id', 'VPK-RM-2026-1109',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'chromatogram_profile', 'high_purity',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP. Identity as reduced glutathione (reference).',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'Identity by retention'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'Glutathione', 'rt', 2.76, 'area_pct', 99.72),
        jsonb_build_object('name', 'Polar trace', 'rt', 1.92, 'area_pct', 0.18),
        jsonb_build_object('name', 'System', 'rt', 4.55, 'area_pct', 0.10)
      )
    )
  ),
  (
    'VP-C8YL3M-4W9K',
    'KPV (reference tripeptide)',
    99.1876,
    340.418000,
    'Tripeptide reference profile; single dominant peak with minor polar traces.',
    12.800000,
    'verified',
    jsonb_build_object(
      'batch', 'LAB-2026-4110',
      'batch_ref', 'LAB-2026-4110',
      'internal_registry_id', 'VPK-RM-2026-1110',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'chromatogram_profile', 'default',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'KPV', 'rt', 3.28, 'area_pct', 99.19),
        jsonb_build_object('name', 'Early peak', 'rt', 2.05, 'area_pct', 0.52),
        jsonb_build_object('name', 'Late eluent', 'rt', 5.44, 'area_pct', 0.29)
      )
    )
  ),
  (
    'VP-H6NW2R-5Q8M',
    'Semax (reference peptide)',
    99.3891,
    848.816000,
    'Primary peak integrated; LC-MS consistent with reference sequence.',
    17.200000,
    'verified',
    jsonb_build_object(
      'batch', 'LAB-2026-4111',
      'batch_ref', 'LAB-2026-4111',
      'internal_registry_id', 'VPK-RM-2026-1111',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'chromatogram_profile', 'default',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'Semax', 'rt', 3.97, 'area_pct', 99.39),
        jsonb_build_object('name', 'Polar trace', 'rt', 2.72, 'area_pct', 0.38),
        jsonb_build_object('name', 'Baseline', 'rt', 6.11, 'area_pct', 0.23)
      )
    )
  ),
  (
    'VP-D4PK9L-6J3V',
    'Selank (reference peptide)',
    99.1145,
    751.928000,
    'Single major HPLC peak; LC-MS within expected tolerance.',
    14.900000,
    'verified',
    jsonb_build_object(
      'batch', 'LAB-2026-4112',
      'batch_ref', 'LAB-2026-4112',
      'internal_registry_id', 'VPK-RM-2026-1112',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'chromatogram_profile', 'default',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'Selank', 'rt', 3.69, 'area_pct', 99.11),
        jsonb_build_object('name', 'Shoulder', 'rt', 2.88, 'area_pct', 0.54),
        jsonb_build_object('name', 'Late eluent', 'rt', 5.95, 'area_pct', 0.35)
      )
    )
  )
on conflict (code) do nothing;
