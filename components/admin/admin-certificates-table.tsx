"use client";

import * as React from "react";
import Link from "next/link";

import type { AdminCertificateRecord } from "@/types/admin-certificate";
import { batchRefFromDetails } from "@/lib/data/admin-certificates";
import { CertificateViewer } from "@/components/certificates/certificate-viewer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const STATUS_OPTIONS = ["all", "verified", "pending", "revoked"] as const;

function statusBadgeVariant(
  status: string,
): "default" | "secondary" | "destructive" | "outline" {
  const s = status.toLowerCase();
  if (s === "verified") return "default";
  if (s === "pending") return "outline";
  if (s === "revoked") return "destructive";
  return "secondary";
}

export function AdminCertificatesTable({
  certificates,
}: {
  certificates: AdminCertificateRecord[];
}) {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] =
    React.useState<(typeof STATUS_OPTIONS)[number]>("all");
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<AdminCertificateRecord | null>(
    null,
  );

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return certificates.filter((c) => {
      if (status !== "all" && String(c.status).toLowerCase() !== status) {
        return false;
      }
      if (!q) return true;
      const batch = batchRefFromDetails(c.details) ?? "";
      const hay = [
        c.code,
        c.peptide_name,
        c.owner_email ?? "",
        batch,
        String(c.status),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [certificates, query, status]);

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1 space-y-2">
          <label htmlFor="admin-cert-search" className="sr-only">
            Search certificates
          </label>
          <Input
            id="admin-cert-search"
            placeholder="Search code, peptide, owner email, batch, status…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-xl rounded-xl border-slate-200 bg-white"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {STATUS_OPTIONS.map((s) => (
            <Button
              key={s}
              type="button"
              size="sm"
              variant={status === s ? "default" : "outline"}
              className={cn(
                "rounded-xl capitalize",
                status === s && "bg-success-600 hover:bg-success-600/90",
              )}
              onClick={() => setStatus(s)}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Showing {filtered.length} of {certificates.length} rows
      </p>

      <div className="min-w-0 overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-md [-webkit-overflow-scrolling:touch]">
        <Table className="min-w-[52rem] w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Peptide</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Batch / ref</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Purity %</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-12 text-center text-muted-foreground"
                >
                  No rows match your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-mono text-xs">{c.code}</TableCell>
                  <TableCell className="font-medium">{c.peptide_name}</TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant(String(c.status))}>
                      {c.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[10rem] truncate text-sm text-muted-foreground">
                    {batchRefFromDetails(c.details) ?? "—"}
                  </TableCell>
                  <TableCell className="max-w-[11rem] truncate text-sm text-muted-foreground">
                    {c.owner_email ?? "—"}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {c.purity_percent != null ? `${c.purity_percent}%` : "—"}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(c.created_at).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelected(c);
                          setOpen(true);
                        }}
                      >
                        View
                      </Button>
                      <Link
                        href={`/verify?code=${encodeURIComponent(c.code)}`}
                        className={cn(
                          buttonVariants({ variant: "default", size: "sm" }),
                          "inline-flex",
                        )}
                      >
                        Public page
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) setSelected(null);
        }}
      >
        <DialogContent
          className="max-h-[90vh] min-w-0 max-w-4xl overflow-y-auto sm:max-w-4xl"
          showCloseButton
        >
          <DialogHeader>
            <DialogTitle>Certificate</DialogTitle>
          </DialogHeader>
          {selected ? (
            <CertificateViewer certificate={selected} variant="modal" />
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
