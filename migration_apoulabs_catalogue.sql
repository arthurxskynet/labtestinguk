-- Apoulabs partner catalogue — twelve product SKUs (run after seed.sql)
-- Upserts catalogue rows only (user_id null). Public verify: /verify?code={code}

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
    'VP-K8NM3R-7B2T',
    'BPC-157 + TB-500 Research Kit',
    99.4521,
    null,
    'Multi-component UV envelope; dominant regions integrated per validated blend method (research kit).',
    16.200000,
    'verified',
    jsonb_build_object(
      'batch', 'APOL-LAB-2026-5001',
      'batch_ref', 'APOL-LAB-2026-5001',
      'internal_registry_id', 'VPK-APOL-2026-5001',
      'partner_brand', 'apoulabs',
      'partner_sku', 'bpc-tb-research-kit',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'testing_date', '2026-02-14',
      'data_source', 'catalogue',
      'chromatogram_profile', 'default',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP. Two-component research kit line; MW reported per-component where applicable.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'component_analytes', jsonb_build_array(
        'BPC-157',
        'TB-500 fragment'
      ),
      'component_purity', jsonb_build_array(
        jsonb_build_object('analyte', 'BPC-157', 'purity_percent', 99.3900, 'rt', 4.23),
        jsonb_build_object('analyte', 'TB-500 fragment', 'purity_percent', 99.5142, 'rt', 4.08)
      ),
      'additional_tests', jsonb_build_array('LC-MS identity (representative)', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'BPC-157', 'rt', 4.23, 'area_pct', 49.73),
        jsonb_build_object('name', 'TB-500 fragment', 'rt', 4.08, 'area_pct', 49.72)
      )
    )
  ),
  (
    'VP-P4HW9L-5C6Y',
    'BPC-157 5mg + TB-500 5mg',
    99.6734,
    null,
    'Multi-component chromatogram; resolved regions integrated per validated blend method.',
    17.800000,
    'verified',
    jsonb_build_object(
      'batch', 'APOL-LAB-2026-5002',
      'batch_ref', 'APOL-LAB-2026-5002',
      'internal_registry_id', 'VPK-APOL-2026-5002',
      'partner_brand', 'apoulabs',
      'partner_sku', 'bpc-5mg-tb-5mg',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'testing_date', '2026-02-18',
      'data_source', 'catalogue',
      'chromatogram_profile', 'high_purity',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP. Blend line; stated masses are catalogue descriptors only.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'component_analytes', jsonb_build_array(
        'BPC-157',
        'TB-500 fragment'
      ),
      'component_purity', jsonb_build_array(
        jsonb_build_object('analyte', 'BPC-157', 'purity_percent', 99.6200, 'rt', 4.23),
        jsonb_build_object('analyte', 'TB-500 fragment', 'purity_percent', 99.7268, 'rt', 4.08)
      ),
      'additional_tests', jsonb_build_array('LC-MS identity (representative)', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'BPC-157', 'rt', 4.23, 'area_pct', 49.84),
        jsonb_build_object('name', 'TB-500 fragment', 'rt', 4.08, 'area_pct', 49.83)
      )
    )
  ),
  (
    'VP-J2VX7K-9M4N',
    'CJC-1295 (No DAC) 5mg + Ipamorelin 5mg',
    99.4521,
    null,
    'Multi-component UV envelope; dominant integration region as recorded for this reference blend.',
    16.400000,
    'verified',
    jsonb_build_object(
      'batch', 'APOL-LAB-2026-5003',
      'batch_ref', 'APOL-LAB-2026-5003',
      'internal_registry_id', 'VPK-APOL-2026-5003',
      'partner_brand', 'apoulabs',
      'partner_sku', 'cjc-no-dac-5mg-ipamorelin-5mg',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'testing_date', '2026-03-02',
      'data_source', 'catalogue',
      'chromatogram_profile', 'default',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP. Blend line; MW reported per-component where applicable.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'component_analytes', jsonb_build_array(
        'CJC-1295 without DAC',
        'Ipamorelin'
      ),
      'component_purity', jsonb_build_array(
        jsonb_build_object('analyte', 'CJC-1295 without DAC', 'purity_percent', 99.3900, 'rt', 4.31),
        jsonb_build_object('analyte', 'Ipamorelin', 'purity_percent', 99.5142, 'rt', 4.14)
      ),
      'additional_tests', jsonb_build_array('LC-MS identity (representative)', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'CJC-1295 without DAC', 'rt', 4.31, 'area_pct', 49.73),
        jsonb_build_object('name', 'Ipamorelin', 'rt', 4.14, 'area_pct', 49.72)
      )
    )
  ),
  (
    'VP-R5YL8N-3K7P',
    'DSIP 5mg',
    99.5987,
    848.812000,
    'Primary peak resolved; LC-MS identity consistent with reference material.',
    13.500000,
    'verified',
    jsonb_build_object(
      'batch', 'APOL-LAB-2026-5004',
      'batch_ref', 'APOL-LAB-2026-5004',
      'internal_registry_id', 'VPK-APOL-2026-5004',
      'partner_brand', 'apoulabs',
      'partner_sku', 'dsip-5mg',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'testing_date', '2026-03-27',
      'data_source', 'catalogue',
      'chromatogram_profile', 'high_purity',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'DSIP', 'rt', 3.81, 'area_pct', 99.60)
      )
    )
  ),
  (
    'VP-T9QK4M-6H2W',
    'GHRP-6 5mg',
    99.4123,
    873.032000,
    'Single major peak; gradient method as validated for ghrelin analogue reference.',
    15.700000,
    'verified',
    jsonb_build_object(
      'batch', 'APOL-LAB-2026-5005',
      'batch_ref', 'APOL-LAB-2026-5005',
      'internal_registry_id', 'VPK-APOL-2026-5005',
      'partner_brand', 'apoulabs',
      'partner_sku', 'ghrp-6-5mg',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'testing_date', '2026-01-20',
      'data_source', 'catalogue',
      'chromatogram_profile', 'default',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'GHRP-6', 'rt', 4.06, 'area_pct', 99.41)
      )
    )
  ),
  (
    'VP-F3NP8K-1L5R',
    'Glutathione 600mg',
    99.7234,
    307.323000,
    'Small-molecule HPLC; principal peak area % as recorded; LC-MS identity for reduced form.',
    10.400000,
    'verified',
    jsonb_build_object(
      'batch', 'APOL-LAB-2026-5006',
      'batch_ref', 'APOL-LAB-2026-5006',
      'internal_registry_id', 'VPK-APOL-2026-5006',
      'partner_brand', 'apoulabs',
      'partner_sku', 'glutathione-600mg',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'testing_date', '2026-01-29',
      'data_source', 'catalogue',
      'chromatogram_profile', 'high_purity',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP. Identity as reduced glutathione (reference). Catalogue descriptor 600 mg refers to vial mass label only.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'Identity by retention'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'Glutathione', 'rt', 2.76, 'area_pct', 99.72)
      )
    )
  ),
  (
    'VP-W7BM2V-8J4Q',
    'KPV 10mg',
    99.1876,
    340.418000,
    'Tripeptide reference profile; single dominant peak with minor polar traces.',
    12.800000,
    'verified',
    jsonb_build_object(
      'batch', 'APOL-LAB-2026-5007',
      'batch_ref', 'APOL-LAB-2026-5007',
      'internal_registry_id', 'VPK-APOL-2026-5007',
      'partner_brand', 'apoulabs',
      'partner_sku', 'kpv-10mg',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'testing_date', '2026-04-17',
      'data_source', 'catalogue',
      'chromatogram_profile', 'default',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'KPV', 'rt', 3.28, 'area_pct', 99.19)
      )
    )
  ),
  (
    'VP-C6HT9L-2N5K',
    'MOTS-C 20mg',
    99.2312,
    2174.640000,
    'Primary peak integrated per mitochondrial-derived peptide reference method.',
    19.300000,
    'verified',
    jsonb_build_object(
      'batch', 'APOL-LAB-2026-5008',
      'batch_ref', 'APOL-LAB-2026-5008',
      'internal_registry_id', 'VPK-APOL-2026-5008',
      'partner_brand', 'apoulabs',
      'partner_sku', 'mots-c-20mg',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'testing_date', '2026-01-30',
      'data_source', 'catalogue',
      'chromatogram_profile', 'default',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'MOTS-C', 'rt', 3.94, 'area_pct', 99.23)
      )
    )
  ),
  (
    'VP-Y8PK3M-4R7V',
    'PT-141 10mg',
    99.9200,
    1047.220000,
    'Single dominant HPLC peak; LC-MS consistent with reference sequence (research material).',
    14.600000,
    'verified',
    jsonb_build_object(
      'batch', 'APOL-LAB-2026-5009',
      'batch_ref', 'APOL-LAB-2026-5009',
      'internal_registry_id', 'VPK-APOL-2026-5009',
      'partner_brand', 'apoulabs',
      'partner_sku', 'pt-141-10mg',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'testing_date', '2026-03-02',
      'data_source', 'catalogue',
      'chromatogram_profile', 'high_purity',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP. Mass convention: monoisotopic for stated salt form.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'PT-141', 'rt', 4.47, 'area_pct', 99.92)
      )
    )
  ),
  (
    'VP-L4NW6K-9T2H',
    'Selank 5mg',
    99.1145,
    751.928000,
    'Single major HPLC peak; LC-MS within expected tolerance.',
    14.900000,
    'verified',
    jsonb_build_object(
      'batch', 'APOL-LAB-2026-5010',
      'batch_ref', 'APOL-LAB-2026-5010',
      'internal_registry_id', 'VPK-APOL-2026-5010',
      'partner_brand', 'apoulabs',
      'partner_sku', 'selank-5mg',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'testing_date', '2026-03-25',
      'data_source', 'catalogue',
      'chromatogram_profile', 'default',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'Selank', 'rt', 3.69, 'area_pct', 99.11)
      )
    )
  ),
  (
    'VP-D9MX5R-7P3J',
    'Semax 5mg',
    99.3891,
    848.816000,
    'Primary peak integrated; LC-MS consistent with reference sequence.',
    17.200000,
    'verified',
    jsonb_build_object(
      'batch', 'APOL-LAB-2026-5011',
      'batch_ref', 'APOL-LAB-2026-5011',
      'internal_registry_id', 'VPK-APOL-2026-5011',
      'partner_brand', 'apoulabs',
      'partner_sku', 'semax-5mg',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'testing_date', '2026-03-12',
      'data_source', 'catalogue',
      'chromatogram_profile', 'default',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'Semax', 'rt', 3.97, 'area_pct', 99.39)
      )
    )
  ),
  (
    'VP-H2VK8N-6Q4L',
    'Tesamorelin 10mg',
    99.1122,
    5135.800000,
    'Primary peak integrated per validated peptide method.',
    16.800000,
    'verified',
    jsonb_build_object(
      'batch', 'APOL-LAB-2026-5012',
      'batch_ref', 'APOL-LAB-2026-5012',
      'internal_registry_id', 'VPK-APOL-2026-5012',
      'partner_brand', 'apoulabs',
      'partner_sku', 'tesamorelin-10mg',
      'instrument', 'Agilent 1260 Infinity II',
      'column', 'ZORBAX SB-C18, 4.6×150 mm, 3.5 µm',
      'method', 'Water / acetonitrile + 0.1% TFA, gradient',
      'detection', 'UV 214 nm',
      'testing_date', '2026-03-20',
      'data_source', 'catalogue',
      'chromatogram_profile', 'default',
      'notes', 'Research reference material — chain-of-custody retained per lab SOP.',
      'show_product_placeholder', true,
      'placeholder_caption', 'Batch photograph slot—upload via registry when available.',
      'additional_tests', jsonb_build_array('LC-MS identity', 'System suitability'),
      'peaks', jsonb_build_array(
        jsonb_build_object('name', 'Tesamorelin', 'rt', 4.44, 'area_pct', 99.11)
      )
    )
  )
on conflict (code) do update
set
  peptide_name = excluded.peptide_name,
  purity_percent = excluded.purity_percent,
  molecular_weight = excluded.molecular_weight,
  hplc_purity = excluded.hplc_purity,
  lcms_ppm = excluded.lcms_ppm,
  status = excluded.status,
  details = excluded.details
where
  certificates.user_id is null;
