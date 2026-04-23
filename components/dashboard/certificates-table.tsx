"use client";

import * as React from "react";
import Link from "next/link";

import type { CertificateRecord } from "@/types/certificate";
import { CertificateViewer } from "@/components/certificates/certificate-viewer";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
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

export function CertificatesTable({
  certificates,
}: {
  certificates: CertificateRecord[];
}) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<CertificateRecord | null>(null);

  function openView(c: CertificateRecord) {
    setSelected(c);
    setOpen(true);
  }

  return (
    <>
      <div className="min-w-0 overflow-x-auto rounded-2xl border border-border bg-card shadow-md [-webkit-overflow-scrolling:touch]">
        <Table className="min-w-[36rem] w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Peptide</TableHead>
              <TableHead className="text-right">Purity %</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certificates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                  No certificates yet.{" "}
                  <Link
                    href="/dashboard/new"
                        className="font-medium text-[var(--accent-primary)] underline-offset-2 hover:underline"
                  >
                    Add a new lab test
                  </Link>
                  .
                </TableCell>
              </TableRow>
            ) : (
              certificates.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-mono text-xs">{c.code}</TableCell>
                  <TableCell className="font-medium">{c.peptide_name}</TableCell>
                  <TableCell className="text-right">
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
                        onClick={() => openView(c)}
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
