"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, ImageOff, ShieldCheck } from "lucide-react";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChromatogramChart } from "@/components/verify/chromatogram-chart";
import {
  isMixCertificate,
  parseCertificateDetails,
  sumPeakAreaPercent,
} from "@/lib/certificate-details";
import { loadImageDataUrlForPdf } from "@/lib/certificate-pdf-image";
import {
  VERIFY_QR_PDF_OPTIONS,
  VERIFY_QR_SCREEN_OPTIONS,
  getCertificateVerifyUrl,
} from "@/lib/verify-qr";
import { cn } from "@/lib/utils";
import type { CertificateRecord } from "@/types/certificate";

function statusBadgeClass(status: string): string {
  if (status === "verified")
    return "border-success-500/30 bg-success-500 text-white hover:bg-success-500";
  if (status === "pending")
    return "border-amber-500/40 bg-amber-500 text-white hover:bg-amber-500";
  if (status === "revoked")
    return "border-[#ef4444]/30 bg-[#ef4444] text-white hover:bg-[#ef4444]";
  return "";
}

/** jsPDF `addImage` format inferred from the data URL header. */
function pdfImageFormat(dataUrl: string): "JPEG" | "PNG" | "WEBP" {
  const head = dataUrl.slice(0, 48).toLowerCase();
  if (head.includes("image/jpeg")) return "JPEG";
  if (head.includes("image/webp")) return "WEBP";
  return "PNG";
}

export function CertificateViewer({
  certificate,
  variant = "page",
}: {
  certificate: CertificateRecord;
  variant?: "page" | "modal";
}) {
  const [qrDataUrl, setQrDataUrl] = React.useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = React.useState(false);
  const [batchImageError, setBatchImageError] = React.useState(false);

  const detail = React.useMemo(
    () => parseCertificateDetails(certificate.details),
    [certificate.details],
  );

  React.useEffect(() => {
    setBatchImageError(false);
  }, [certificate.code, detail.batchImageUrl]);

  const showDetailLabNotes = React.useMemo(() => {
    const d = detail.hplcLcmsNotes?.trim();
    if (!d) return false;
    const col = certificate.hplc_purity?.trim() ?? "";
    if (!col) return true;
    return col !== d;
  }, [detail.hplcLcmsNotes, certificate.hplc_purity]);

  const chromatogramDescription = React.useMemo(() => {
    if (
      detail.componentAnalytes.length >= 2 ||
      /blend reference/i.test(certificate.peptide_name)
    ) {
      return "UV trace (normalised). Blend line—composite profile reflects recorded purity class.";
    }
    const name = certificate.peptide_name.toLowerCase();
    if (name.includes("hcg")) {
      return "UV trace (normalised). Glycoprotein envelope—illustrative profile for reference material.";
    }
    if (name.includes("glutathione")) {
      return "UV trace (normalised). Small-molecule profile class as recorded.";
    }
    return "UV trace (normalised). Profile reflects recorded purity class.";
  }, [certificate.peptide_name, detail.componentAnalytes.length]);

  const peakAreaTotal = React.useMemo(
    () => sumPeakAreaPercent(detail.peaks),
    [detail.peaks],
  );
  const mixCertificate = React.useMemo(() => isMixCertificate(detail), [detail]);

  /** Same URL string used for on-screen QR and PDF (single source of truth). */
  const verifyPageUrl = React.useMemo(
    () => getCertificateVerifyUrl(certificate.code),
    [certificate.code],
  );

  React.useEffect(() => {
    if (!verifyPageUrl) return;
    let cancelled = false;
    QRCode.toDataURL(verifyPageUrl, VERIFY_QR_SCREEN_OPTIONS)
      .then((url) => {
        if (!cancelled) setQrDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) setQrDataUrl(null);
      });
    return () => {
      cancelled = true;
    };
  }, [verifyPageUrl]);

  const downloadPdf = async () => {
    setPdfLoading(true);
    try {
      const verifyUrl = getCertificateVerifyUrl(certificate.code);
      if (!verifyUrl) return;

      let batchImageDataUrl: string | null = null;
      if (detail.batchImageUrl) {
        batchImageDataUrl = await loadImageDataUrlForPdf(detail.batchImageUrl);
      }

      const doc = new jsPDF({ unit: "mm", format: "a4" });
      doc.setProperties({
        title: `Certificate ${certificate.code}`,
        subject: certificate.peptide_name,
        author: "Verifypeps",
        keywords: "certificate, analysis, verification",
      });

      const margin = 14;
      let y = 18;
      const pageW = doc.internal.pageSize.getWidth();
      const footerY = doc.internal.pageSize.getHeight() - 9;

      let qrImg: string | null = null;
      try {
        qrImg = await QRCode.toDataURL(verifyUrl, VERIFY_QR_PDF_OPTIONS);
      } catch {
        qrImg = qrDataUrl;
      }

      doc.setFillColor(15, 118, 110);
      doc.rect(0, 0, pageW, 28, "F");
      doc.setDrawColor(6, 95, 87);
      doc.setLineWidth(0.35);
      doc.line(0, 28, pageW, 28);

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.text("Verifypeps — Certificate of analysis", margin, 18);
      doc.setFontSize(9);
      doc.text("Research use only — verifypeps.com", margin, 24);

      if (qrImg) {
        doc.addImage(qrImg, "PNG", pageW - margin - 34, 5, 34, 34);
      }

      doc.setTextColor(30, 41, 59);
      y = 38;
      doc.setFontSize(11);
      doc.text(`Certificate ID: ${certificate.code}`, margin, y);
      y += 7;
      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text(certificate.peptide_name, margin, y);
      y += 8;

      if (certificate.status === "verified") {
        doc.setFillColor(16, 185, 129);
        doc.rect(margin, y - 4, 46, 9, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.text("VERIFIED", margin + 4, y + 1.5);
        doc.setTextColor(30, 41, 59);
        y += 12;
      } else {
        y += 6;
      }

      doc.setFontSize(9);
      const rows: [string, string][] = [
        ["Status", String(certificate.status)],
        [
          mixCertificate ? "Blend summary purity (area %)" : "Purity (area %)",
          certificate.purity_percent != null
            ? `${Number(certificate.purity_percent).toFixed(2)}%`
            : "—",
        ],
        [
          "Molecular weight (Da)",
          certificate.molecular_weight != null
            ? String(certificate.molecular_weight)
            : "—",
        ],
        ["HPLC / LC-MS notes", certificate.hplc_purity ?? "—"],
        [
          "LC-MS (ppm)",
          certificate.lcms_ppm != null ? String(certificate.lcms_ppm) : "—",
        ],
        ["Batch / reference", detail.batchRef ?? detail.batch ?? "—"],
        ["Instrument", detail.instrument ?? "—"],
        ["Column", detail.column ?? "—"],
        ["Method", detail.method ?? "—"],
        ["Detection", detail.detection ?? "—"],
        [
          "Issued",
          new Date(certificate.created_at).toLocaleString("en-GB", {
            dateStyle: "medium",
            timeStyle: "short",
          }),
        ],
      ];

      if (detail.internalRegistryId) {
        rows.push(["Internal registry ID", detail.internalRegistryId]);
      }
      if (detail.batchImageUrl) {
        rows.push([
          "Product / batch image",
          batchImageDataUrl
            ? "Photograph embedded in this export (see figure below)."
            : "Registry URL present; embedding failed from this browser (host or CORS). The live page may still show the asset.",
        ]);
      } else if (detail.showProductPlaceholder) {
        rows.push([
          "Product imaging",
          "Not recorded in registry (placeholder only on live view).",
        ]);
      }

      for (const [label, val] of rows) {
        if (y > 270) {
          doc.addPage();
          y = 18;
        }
        doc.setTextColor(100, 116, 139);
        doc.text(label, margin, y);
        doc.setTextColor(15, 23, 42);
        const lines = doc.splitTextToSize(val, pageW - margin * 2 - 55);
        doc.text(lines, margin + 55, y);
        y += Math.max(6, lines.length * 5);
      }

      if (batchImageDataUrl) {
        const maxImgW = pageW - margin * 2;
        const maxImgH = 95;
        let props: { width: number; height: number };
        try {
          props = doc.getImageProperties(batchImageDataUrl);
        } catch {
          props = { width: 1, height: 1 };
        }
        const iw = props.width || 1;
        const ih = props.height || 1;
        const scale = Math.min(maxImgW / iw, maxImgH / ih);
        const drawW = iw * scale;
        const drawH = ih * scale;

        y += 6;
        if (y + drawH + 28 > footerY - 8) {
          doc.addPage();
          y = 18;
        }

        doc.setFontSize(10);
        doc.setTextColor(15, 118, 110);
        doc.text("Batch reference photograph", margin, y);
        y += 6;
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        const capLines = doc.splitTextToSize(
          "Illustrative batch photography for registry traceability only; not a product specification.",
          pageW - margin * 2,
        );
        doc.text(capLines, margin, y);
        y += capLines.length * 4 + 4;

        if (y + drawH > footerY - 6) {
          doc.addPage();
          y = 18;
        }

        try {
          doc.addImage(
            batchImageDataUrl,
            pdfImageFormat(batchImageDataUrl),
            margin,
            y,
            drawW,
            drawH,
          );
          y += drawH + 8;
        } catch {
          doc.setFontSize(8);
          doc.setTextColor(180, 83, 9);
          doc.text(
            "Image could not be rendered in PDF (unsupported format).",
            margin,
            y,
          );
          y += 10;
        }
      }

      if (detail.additionalTests.length > 0) {
        y += 4;
        if (y > 250) {
          doc.addPage();
          y = 18;
        }
        doc.setFontSize(10);
        doc.setTextColor(15, 118, 110);
        doc.text("Additional tests recorded", margin, y);
        y += 6;
        doc.setFontSize(9);
        doc.setTextColor(30, 41, 59);
        for (const t of detail.additionalTests) {
          doc.text(`• ${t}`, margin + 2, y);
          y += 5;
        }
      }

      if (detail.componentAnalytes.length > 0) {
        y += 4;
        if (y > 245) {
          doc.addPage();
          y = 18;
        }
        doc.setFontSize(10);
        doc.setTextColor(15, 118, 110);
        doc.text("Recorded components", margin, y);
        y += 6;
        doc.setFontSize(9);
        doc.setTextColor(30, 41, 59);
        for (const c of detail.componentAnalytes) {
          doc.text(`• ${c}`, margin + 2, y);
          y += 5;
        }
      }

      if (detail.componentPurity.length > 0) {
        y += 4;
        if (y > 245) {
          doc.addPage();
          y = 18;
        }
        doc.setFontSize(10);
        doc.setTextColor(15, 118, 110);
        doc.text("Component purity", margin, y);
        y += 6;
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text("Analyte", margin, y);
        doc.text("Purity %", margin + 85, y);
        doc.text("RT (min)", margin + 120, y);
        y += 5;
        doc.setTextColor(15, 23, 42);
        for (const c of detail.componentPurity) {
          if (y > 285) {
            doc.addPage();
            y = 18;
          }
          doc.text(c.analyte, margin, y);
          doc.text(c.purity_percent.toFixed(2), margin + 85, y);
          doc.text(c.rt != null ? String(c.rt) : "—", margin + 120, y);
          y += 5;
        }
      }

      if (detail.peaks.length > 0) {
        y += 4;
        if (y > 230) {
          doc.addPage();
          y = 18;
        }
        doc.setFontSize(10);
        doc.setTextColor(15, 118, 110);
        doc.text("Peak table", margin, y);
        y += 7;
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text("Peak", margin, y);
        doc.text("RT (min)", margin + 70, y);
        doc.text("Area %", margin + 110, y);
        y += 5;
        doc.setTextColor(15, 23, 42);
        const totalPct = sumPeakAreaPercent(detail.peaks);
        for (const p of detail.peaks) {
          if (y > 285) {
            doc.addPage();
            y = 18;
          }
          doc.text(p.name, margin, y);
          doc.text(String(p.rt), margin + 70, y);
          doc.text(p.area_pct.toFixed(2), margin + 110, y);
          y += 5;
        }
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text("Total (integrated area %)", margin, y);
        doc.setTextColor(15, 23, 42);
        doc.text(totalPct.toFixed(2), margin + 110, y);
        y += 7;
      }

      y += 6;
      if (y > 240) {
        doc.addPage();
        y = 18;
      }
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      const tamper = doc.splitTextToSize(
        "Tamper notice: This document is generated from the Verifypeps verification registry. " +
          "The authoritative record is the online verification result at the QR link above. " +
          "Altered or retyped copies are not valid for chain-of-custody. " +
          "Not for clinical or human use.",
        pageW - margin * 2,
      );
      doc.text(tamper, margin, y);
      y += tamper.length * 3.8 + 4;

      doc.setTextColor(148, 163, 184);
      doc.text(
        "verifypeps.com · hello@verifypeps.com",
        margin,
        Math.min(y + 4, footerY - 4),
      );

      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184);
        doc.text(
          `Page ${i} of ${totalPages}`,
          pageW - margin,
          footerY,
          { align: "right" },
        );
      }

      doc.save(`verifypeps-${certificate.code}.pdf`);
    } finally {
      setPdfLoading(false);
    }
  };

  const containerClass =
    variant === "page"
      ? "mx-auto max-w-4xl px-4 py-12 sm:px-6"
      : "max-h-[85vh] overflow-y-auto px-4 py-6 sm:px-6";

  const isVerified = certificate.status === "verified";

  return (
    <div className={cn(containerClass, "animate-fade-in")}>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <p className="text-sm font-medium text-brand-700">
            Certificate located
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
            {certificate.peptide_name}
          </h1>
          <p className="mt-2 font-mono text-sm text-slate-600">
            {certificate.code}
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 sm:items-end">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
            {isVerified ? (
              <span
                className="inline-flex items-center gap-2 rounded-full border border-success-500/25 bg-gradient-to-r from-success-500 to-success-600 px-4 py-2 text-sm font-semibold text-white shadow-md ring-1 ring-success-500/30"
                data-testid="verified-badge"
              >
                <ShieldCheck className="size-5 shrink-0" aria-hidden />
                Verified
              </span>
            ) : (
              <Badge
                variant="outline"
                className={cn("capitalize", statusBadgeClass(certificate.status))}
              >
                {certificate.status}
              </Badge>
            )}
          </div>
          <div className="flex max-w-md flex-col items-center gap-3 sm:flex-row sm:items-start sm:gap-4">
            <div
              className="relative size-[7.25rem] shrink-0 overflow-hidden rounded-2xl border border-accent-sky-200/80 bg-white shadow-md ring-1 ring-slate-100/90"
              aria-busy={!qrDataUrl}
            >
              {qrDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrDataUrl}
                  alt=""
                  width={116}
                  height={116}
                  aria-hidden
                  className="h-full w-full object-contain p-1.5 [image-rendering:crisp-edges]"
                />
              ) : (
                <div
                  className="flex h-full min-h-[7.25rem] w-full animate-pulse items-center justify-center rounded-xl bg-gradient-to-br from-slate-50 to-slate-100"
                  aria-hidden
                />
              )}
            </div>
            <p className="max-w-[14rem] text-center text-xs leading-relaxed text-slate-600 sm:text-left">
              Scan to open the live verification page for this certificate.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => void downloadPdf()}
            disabled={pdfLoading}
            className="border-slate-200"
          >
            {pdfLoading ? "Preparing PDF…" : "Download PDF"}
          </Button>
        </div>
      </div>

      <Card className="lab-gradient-verified mt-8 rounded-2xl border border-success-500/20 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-card-foreground">
            Tamper-proof verification
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            The QR code and verification URL resolve to this registry entry only.
            Printed or forwarded PDFs are informational; the online record is the
            reference for authenticity checks.
          </CardDescription>
        </CardHeader>
      </Card>

      <div
        className="mt-6 hidden min-w-0 gap-3 rounded-2xl border border-slate-200/90 bg-gradient-to-b from-slate-50/90 to-white p-4 shadow-sm lg:grid lg:grid-cols-4"
        aria-label="Registry summary"
      >
        <div className="min-w-0 rounded-xl border border-slate-100 bg-white/90 px-3 py-2.5 text-center shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            {mixCertificate ? "Blend summary %" : "HPLC area %"}
          </p>
          <p className="mt-1 tabular-nums text-lg font-semibold text-slate-900">
            {certificate.purity_percent != null
              ? `${Number(certificate.purity_percent).toFixed(2)}%`
              : "—"}
          </p>
        </div>
        <div className="min-w-0 rounded-xl border border-slate-100 bg-white/90 px-3 py-2.5 text-center shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            LC-MS (ppm)
          </p>
          <p className="mt-1 tabular-nums text-lg font-semibold text-slate-900">
            {certificate.lcms_ppm != null ? String(certificate.lcms_ppm) : "—"}
          </p>
        </div>
        <div className="min-w-0 rounded-xl border border-slate-100 bg-white/90 px-3 py-2.5 text-center shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Batch / reference
          </p>
          <p className="mt-1 truncate font-mono text-sm font-semibold text-slate-900 tabular-nums">
            {detail.batchRef ?? detail.batch ?? "—"}
          </p>
        </div>
        <div className="min-w-0 rounded-xl border border-slate-100 bg-white/90 px-3 py-2.5 text-center shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Registry ID
          </p>
          <p className="mt-1 truncate font-mono text-sm font-semibold text-slate-900 tabular-nums">
            {detail.internalRegistryId ?? "—"}
          </p>
        </div>
      </div>

      <div className="mt-8 grid min-w-0 gap-6 lg:grid-cols-5">
        <Card className="min-w-0 rounded-2xl border-slate-200/90 bg-card shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Analytical summary</CardTitle>
            <CardDescription>
              Values as recorded for this batch reference.
            </CardDescription>
          </CardHeader>
          <CardContent className="min-w-0 overflow-x-auto">
            <Table className="min-w-[260px] w-full">
              <TableBody>
                <TableRow className="lg:hidden">
                  <TableCell className="text-slate-500">
                    {mixCertificate ? "Blend summary purity" : "Purity"}
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    {certificate.purity_percent != null
                      ? `${Number(certificate.purity_percent).toFixed(2)}%`
                      : "—"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-slate-500 align-top">
                    Molecular weight
                  </TableCell>
                  <TableCell className="text-right align-top">
                    <div className="font-medium tabular-nums">
                      {certificate.molecular_weight != null
                        ? `${certificate.molecular_weight} Da`
                        : "—"}
                    </div>
                    {certificate.molecular_weight == null &&
                    detail.componentAnalytes.length > 0 ? (
                      <p className="mt-1 max-w-[220px] text-xs font-normal text-slate-500">
                        Multi-component reference line; MW quoted per analyte where
                        applicable.
                      </p>
                    ) : null}
                    {certificate.molecular_weight == null &&
                    detail.componentAnalytes.length === 0 &&
                    /HCG/i.test(certificate.peptide_name) ? (
                      <p className="mt-1 max-w-[220px] text-xs font-normal text-slate-500">
                        Not quoted as a single value (heterogeneous reference
                        material).
                      </p>
                    ) : null}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-slate-500">
                    HPLC / LC-MS notes
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {certificate.hplc_purity ?? "—"}
                  </TableCell>
                </TableRow>
                <TableRow className="lg:hidden">
                  <TableCell className="text-slate-500">LC-MS (ppm)</TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    {certificate.lcms_ppm != null ? certificate.lcms_ppm : "—"}
                  </TableCell>
                </TableRow>
                <TableRow className="lg:hidden">
                  <TableCell className="text-slate-500">
                    Batch / reference
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm tabular-nums">
                    {detail.batchRef ?? detail.batch ?? "—"}
                  </TableCell>
                </TableRow>
                {detail.internalRegistryId ? (
                  <TableRow className="lg:hidden">
                    <TableCell className="text-slate-500">
                      Registry ID
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm tabular-nums">
                      {detail.internalRegistryId}
                    </TableCell>
                  </TableRow>
                ) : null}
                <TableRow>
                  <TableCell className="text-slate-500">Instrument</TableCell>
                  <TableCell className="text-right text-sm">
                    {detail.instrument ?? "—"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-slate-500">Column</TableCell>
                  <TableCell className="text-right text-sm">
                    {detail.column ?? "—"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-slate-500">Method</TableCell>
                  <TableCell className="text-right text-sm">
                    {detail.method ?? "—"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-slate-500">Detection</TableCell>
                  <TableCell className="text-right text-sm">
                    {detail.detection ?? "—"}
                  </TableCell>
                </TableRow>
                {showDetailLabNotes ? (
                  <TableRow>
                    <TableCell className="text-slate-500">
                      Lab notes (details)
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {detail.hplcLcmsNotes}
                    </TableCell>
                  </TableRow>
                ) : null}
                {detail.endotoxinRequested != null ? (
                  <TableRow>
                    <TableCell className="text-slate-500">
                      Endotoxin requested
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {detail.endotoxinRequested ? "Yes" : "No"}
                    </TableCell>
                  </TableRow>
                ) : null}
                {detail.notes ? (
                  <TableRow>
                    <TableCell className="text-slate-500">Notes</TableCell>
                    <TableCell className="text-right text-sm">
                      {detail.notes}
                    </TableCell>
                  </TableRow>
                ) : null}
                <TableRow>
                  <TableCell className="text-slate-500">Issued</TableCell>
                  <TableCell className="text-right text-sm">
                    {new Date(certificate.created_at).toLocaleString("en-GB", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="min-w-0 rounded-2xl border-slate-200/90 shadow-sm lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg">Representative chromatogram</CardTitle>
            <CardDescription>{chromatogramDescription}</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px] w-full min-h-[220px] pt-2">
            <ChromatogramChart
              peptideName={certificate.peptide_name}
              profile={detail.chromatogramProfile}
            />
          </CardContent>
        </Card>
      </div>

      {detail.componentAnalytes.length > 0 ? (
        <Card className="mt-6 rounded-2xl border-slate-200/90 bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recorded components</CardTitle>
            <CardDescription>
              Analytes named for this reference line (laboratory traceability).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc space-y-1 text-sm text-slate-700">
              {detail.componentAnalytes.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : null}

      {detail.componentPurity.length > 0 ? (
        <Card className="mt-6 rounded-2xl border-slate-200/90 bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Component purity</CardTitle>
            <CardDescription>
              Individual analyte purity values recorded for this blend line.
            </CardDescription>
          </CardHeader>
          <CardContent className="min-w-0 overflow-x-auto">
            <Table className="min-w-[280px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Analyte</TableHead>
                  <TableHead className="text-right">Purity %</TableHead>
                  <TableHead className="text-right">RT (min)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {detail.componentPurity.map((component) => (
                  <TableRow key={`${component.analyte}-${component.rt ?? "na"}`}>
                    <TableCell>{component.analyte}</TableCell>
                    <TableCell className="text-right font-mono text-sm tabular-nums">
                      {component.purity_percent.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm tabular-nums">
                      {component.rt != null ? component.rt : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : null}

      {detail.batchImageUrl ? (
        <Card className="mt-6 overflow-hidden rounded-2xl border border-slate-200/90 bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Batch reference photograph</CardTitle>
            <CardDescription>
              Illustrative imagery linked from the verification registry for this
              batch reference (research traceability only).
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-5 pt-0">
            {batchImageError ? (
              <div className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-8 text-center">
                <ImageOff className="size-8 text-slate-400" aria-hidden />
                <p className="text-xs text-slate-600">
                  Image could not be loaded in this browser. Try again later or open
                  the asset URL from your lab files.
                </p>
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element -- public registry URL (Supabase / same-origin)
              <img
                src={detail.batchImageUrl}
                alt="Batch reference photograph"
                className="max-h-[min(22rem,55vh)] w-full rounded-xl border border-slate-200/90 bg-slate-50 object-contain"
                loading="lazy"
                decoding="async"
                onError={() => setBatchImageError(true)}
              />
            )}
          </CardContent>
        </Card>
      ) : detail.showProductPlaceholder ? (
        <Card className="mt-6 overflow-hidden rounded-2xl border border-dashed border-slate-300/90 bg-slate-50/50 shadow-sm">
          <CardContent className="flex min-h-[140px] flex-col items-center justify-center gap-3 px-6 py-8 text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-400 shadow-sm">
              <ImageOff className="size-7" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Batch imaging (placeholder)
              </p>
              <p className="mt-1 max-w-md text-xs text-slate-600">
                {detail.productPlaceholderCaption ??
                  "No product photograph is stored in the verification registry for this batch."}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {detail.additionalTests.length > 0 ? (
        <Card className="mt-6 rounded-2xl border-slate-200/90 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Additional tests</CardTitle>
            <CardDescription>
              Requested or recorded supplementary analyses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc space-y-1 text-sm text-slate-700">
              {detail.additionalTests.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : null}

      {detail.peaks.length > 0 ? (
        <Card className="mt-6 rounded-2xl border-slate-200/90 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Peak table</CardTitle>
            <CardDescription>
              Integrated peak summary; reported areas sum to the total integration
              window.
            </CardDescription>
          </CardHeader>
          <CardContent className="min-w-0 overflow-x-auto">
            <Table className="min-w-[280px]">
              <TableHeader>
                <TableRow>
                  <TableHead>Peak</TableHead>
                  <TableHead className="text-right">RT (min)</TableHead>
                  <TableHead className="text-right">Area %</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {detail.peaks.map((p) => (
                  <TableRow key={`${p.name}-${p.rt}`}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell className="text-right font-mono text-sm tabular-nums">
                      {p.rt}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm tabular-nums">
                      {p.area_pct.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t border-slate-200 bg-slate-50/80">
                  <TableCell
                    colSpan={2}
                    className="text-sm font-medium text-slate-600"
                  >
                    Total (integrated area %)
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm font-semibold tabular-nums text-slate-900">
                    {peakAreaTotal.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ) : null}

      <p className="mt-8 text-sm text-slate-600">
        Reference data is provided for laboratory research traceability only.
        It does not constitute a specification for clinical or human use.
      </p>

      {variant === "page" ? (
        <Link
          href="/verify"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "mt-6 inline-flex text-brand-600 transition-colors hover:text-brand-500",
          )}
        >
          <ArrowLeft className="mr-2 size-4" aria-hidden />
          Verify another code
        </Link>
      ) : null}
    </div>
  );
}
